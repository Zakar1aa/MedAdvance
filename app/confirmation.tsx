// app/confirmation.tsx
import { Stack, useLocalSearchParams } from 'expo-router';
import ConfirmationScreen from '../screens/ConfirmationScreen';

export default function Confirmation() {
  const params = useLocalSearchParams();
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ConfirmationScreen 
        amount={params.amount as string}
        interest={params.interest as string}
        total={params.total as string}
        monthlyPayment={params.monthlyPayment as string}
        pharmacy={typeof params.pharmacy === 'string' ? JSON.parse(params.pharmacy) : params.pharmacy}
      />
    </>
  );
}