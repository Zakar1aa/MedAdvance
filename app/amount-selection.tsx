import { Stack, useLocalSearchParams } from 'expo-router';
import AmountSelectionScreen from '../screens/AmountSelectionScreen';

export default function AmountSelection() {
  const params = useLocalSearchParams();
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AmountSelectionScreen 
        creditLimit={parseInt(params.creditLimit as string)}
        pharmacy={JSON.parse(params.pharmacy as string)}
      />
    </>
  );
}