import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import SplashScreenComponent from './SplashScreen';

/**
 * SplashScreenWrapper
 * Manages the Expo splash screen and custom loading screen display
 */
export function useSplashScreen() {
  const [isReady, setIsReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the native splash screen visible
        await SplashScreen.preventAutoHideAsync();

        // Simulate app initialization (API calls, theme loading, etc.)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Hide custom splash after initialization
        setShowCustomSplash(false);

        // Small delay before hiding native splash for smooth transition
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 300);

        setIsReady(true);
      } catch (e) {
        console.warn('Error in splash screen setup:', e);
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  return {
    isReady,
    showCustomSplash,
    SplashScreenComponent: (
      <SplashScreenComponent visible={showCustomSplash} />
    ),
  };
}

/**
 * SplashScreenProvider Component
 * Wraps the app to show splash screen during initialization
 */
export function SplashScreenProvider({ children }) {
  const { isReady, SplashScreenComponent } = useSplashScreen();

  if (!isReady) {
    return SplashScreenComponent;
  }

  return (
    <>
      {SplashScreenComponent}
      {children}
    </>
  );
}
