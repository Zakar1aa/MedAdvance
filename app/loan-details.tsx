// app/loan-details.tsx
import { Stack, useLocalSearchParams } from 'expo-router';
import LoanDetailsScreen from '../screens/LoanDetailsScreen.js';

export default function LoanDetails() {
  const params = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LoanDetailsScreen loanId={params.loanId as string} />
    </>
  );
}
