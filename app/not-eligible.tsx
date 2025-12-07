// app/not-eligible.tsx
import { Stack } from 'expo-router';
import NotEligibleScreen from '../screens/NotEligibleScreen';

export default function NotEligible() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <NotEligibleScreen />
    </>
  );
}