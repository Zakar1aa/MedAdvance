// app/eligibility-check.tsx
import { Stack } from 'expo-router';
import EligibilityCheckScreen from '../screens/EligibilityCheckScreen';

export default function EligibilityCheck() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EligibilityCheckScreen />
    </>
  );
}