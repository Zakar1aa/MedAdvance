// app/salary-advance.tsx
import { Stack, useLocalSearchParams } from 'expo-router';
import SalaryAdvanceScreen from '../screens/SalaryAdvanceScreen';

export default function SalaryAdvance() {
  const params = useLocalSearchParams();
  let eligibilityObj = {};
  try {
    eligibilityObj = params?.eligibility ? JSON.parse(params.eligibility as string) : {};
  } catch (e) {
    console.warn('Invalid eligibility param for salary-advance route', e);
    eligibilityObj = {};
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SalaryAdvanceScreen eligibility={eligibilityObj} />
    </>
  );
}