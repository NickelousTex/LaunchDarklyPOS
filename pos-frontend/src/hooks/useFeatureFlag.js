import { useLaunchDarkly } from '../contexts/LaunchDarklyContext';

/**
 * Custom hook for using LaunchDarkly feature flags
 * @param {string} flagKey - The key of the feature flag
 * @param {*} defaultValue - Default value if flag is not available
 * @returns {*} The flag value or default value
 */
export const useFeatureFlag = (flagKey, defaultValue = false) => {
  const { getFlag, isLoading, isReady } = useLaunchDarkly();
  
  return {
    value: getFlag(flagKey, defaultValue),
    isLoading,
    isReady
  };
};

/**
 * Custom hook for using LaunchDarkly feature flag values (for non-boolean flags)
 * @param {string} flagKey - The key of the feature flag
 * @param {*} defaultValue - Default value if flag is not available
 * @returns {*} The flag value or default value
 */
export const useFeatureFlagValue = (flagKey, defaultValue = null) => {
  const { getFlagValue, isLoading, isReady } = useLaunchDarkly();
  
  return {
    value: getFlagValue(flagKey, defaultValue),
    isLoading,
    isReady
  };
};
