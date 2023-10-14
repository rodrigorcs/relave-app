export default {
  expo: {
    name: 'Relave',
    slug: 'relave',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'relave',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.rodrigorcs.relave',
      googleServicesFile: './GoogleService-Info.plist',
      supportsTablet: true,
      infoPlist: {
        CFBundleDevelopmentRegion: 'pt_BR',
        LSApplicationQueriesSchemes: ['relave'],
        NSLocationWhenInUseUsageDescription: 'Allow $(PRODUCT_NAME) to use your location',
        NSLocationAlwaysUsageDescription: 'Allow $(PRODUCT_NAME) to use your location',
        NSLocationAlwaysAndWhenInUseUsageDescription: 'Allow $(PRODUCT_NAME) to use your location',
      },
    },
    android: {
      package: 'com.rodrigorcs.relave',
      googleServicesFile: './google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-location',
        {
          locationAlwaysPermission: 'Allow $(PRODUCT_NAME) to use your location.',
          locationWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
          locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
        },
      ],
      '@react-native-firebase/app',
      '@react-native-firebase/auth',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
      [
        '@stripe/stripe-react-native',
        {
          enableGooglePay: true,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '418938d2-991f-4103-9363-98969edccc5a',
      },
    },
    owner: 'rodrigo.rcs',
  },
}
