// LaunchDarkly Configuration
export const LAUNCHDARKLY_CONFIG = {
  // Replace with your actual LaunchDarkly client-side ID
  CLIENT_ID: '68da9d852bd0a909bbebcfc3',
  
  // Default user context for anonymous users
  DEFAULT_USER: {
    key: 'anonymous',
    name: 'Anonymous User',
    email: 'anonymous@example.com',
    custom: {
      role: 'Guest',
      phone: '',
      avatar: '👤'
    }
  }
};

// Feature flag keys
export const FEATURE_FLAGS = {
  // Example feature flag for the POS system
  NEW_MENU_DESIGN: 'new_menu_design',
  BEIJING_CORN_SOUP: 'beijing_corn_soup',
  SEARCH_BAR_ENABLED: 'search_bar_enabled',
  TIMEZONE_OFFSET: 'timezone_offset'
};
