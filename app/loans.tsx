// app/loans.tsx
import { Stack } from 'expo-router';
import LoansScreen from '../screens/LoansScreen';

export default function Loans() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LoansScreen />
    </>
  );
}
