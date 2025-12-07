// app/pharmacy-selection.tsx
import { Stack, useLocalSearchParams } from 'expo-router';
import PharmacySelectionScreen from '../screens/PharmacySelectionScreen';

export default function PharmacySelection() {
  const params = useLocalSearchParams();
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PharmacySelectionScreen creditLimit={parseInt(params.creditLimit as string)} />
    </>
  );
}