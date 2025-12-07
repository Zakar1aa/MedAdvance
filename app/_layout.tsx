// app/_layout.tsx
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    async function hideSplash() {
      try {
        // Simulate app initialization (remove if you have real initialization)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Hide the native splash screen
        await SplashScreen.hideAsync();
      } catch (error) {
        console.log('Error hiding splash screen:', error);
      }
    }

    hideSplash();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="upload-document" />
        <Stack.Screen name="eligibility-check" />
        <Stack.Screen name="salary-advance" />
        <Stack.Screen name="pharmacy-selection" />
        <Stack.Screen name="amount-selection" />
        <Stack.Screen name="confirmation" />
        <Stack.Screen name="not-eligible" />
        <Stack.Screen name="loans" />
        <Stack.Screen name="loan-details" />
      </Stack>
    </GestureHandlerRootView>
  );
}