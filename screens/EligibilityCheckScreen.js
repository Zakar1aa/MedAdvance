// screens/EligibilityCheckScreen.js
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import LoadingAnimation from '../components/LoadingAnimation';
import { checkEligibility } from '../services/api';
import { mockUser } from '../services/mockData';
import theme from '../styles/theme';

const { colors } = theme;

export default function EligibilityCheckScreen() {
  useEffect(() => {
    checkUserEligibility();
  }, []);

  const checkUserEligibility = async () => {
    const result = await checkEligibility(mockUser.cin);
    
    if (result.decision === 'APPROVED') {
      router.replace({
        pathname: '/salary-advance',
        params: { eligibility: JSON.stringify(result) }
      });
    } else {
      router.replace('/not-eligible');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={{ flex: 1 }}>
        <LoadingAnimation message="Vérification d'éligibilité en cours..." />
      </View>
    </SafeAreaView>
  );
}