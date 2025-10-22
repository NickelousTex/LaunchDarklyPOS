import React, { createContext, useContext, useEffect, useState } from 'react';
import { initialize } from 'launchdarkly-js-client-sdk';
import { useSelector } from 'react-redux';
import { LAUNCHDARKLY_CONFIG } from '../config/launchdarkly';

const LaunchDarklyContext = createContext();

export const useLaunchDarkly = () => {
  const context = useContext(LaunchDarklyContext);
  if (!context) {
    throw new Error('useLaunchDarkly must be used within a LaunchDarklyProvider');
  }
  return context;
};

export const LaunchDarklyProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [flags, setFlags] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    const initializeLaunchDarkly = async () => {
      try {
        // LaunchDarkly client-side ID
        const clientSideId = LAUNCHDARKLY_CONFIG.CLIENT_ID;
        
        // Create user context based on logged-in user
        const userContext = {
          key: userData._id || 'anonymous',
          name: userData.name || 'Anonymous User',
          email: userData.email || 'anonymous@example.com',
          custom: {
            role: userData.role || 'Guest',
            phone: userData.phone || '',
            avatar: userData.avatar || '👤'
          }
        };

        // Initialize LaunchDarkly client
        const ldClient = initialize(clientSideId, userContext);
        
        // Wait for client to be ready
        await ldClient.waitForInitialization();
        
        setClient(ldClient);
        
        // Get all flags
        const allFlags = ldClient.allFlags();
        setFlags(allFlags);
        
        // Listen for flag changes
        ldClient.on('change', (settings) => {
          setFlags(ldClient.allFlags());
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize LaunchDarkly:', error);
        setIsLoading(false);
      }
    };

    // Initialize LaunchDarkly for both authenticated and anonymous users
    initializeLaunchDarkly();

    // Cleanup on unmount
    return () => {
      if (client) {
        client.close();
      }
    };
  }, [userData._id, userData.name, userData.email, userData.role]);

  const getFlag = (flagKey, defaultValue = false) => {
    return flags[flagKey] !== undefined ? flags[flagKey] : defaultValue;
  };

  const getFlagValue = (flagKey, defaultValue = null) => {
    return flags[flagKey] !== undefined ? flags[flagKey] : defaultValue;
  };

  const value = {
    client,
    flags,
    isLoading,
    getFlag,
    getFlagValue,
    isReady: !isLoading && client !== null
  };

  return (
    <LaunchDarklyContext.Provider value={value}>
      {children}
    </LaunchDarklyContext.Provider>
  );
};
