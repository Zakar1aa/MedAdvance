// screens/AmountSelectionScreen.js
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../styles/theme';

const { colors, spacing, typography } = theme;

export default function AmountSelectionScreen({ creditLimit, pharmacy }) {
  const [amount, setAmount] = useState(500);
  
  const interest = Math.round(amount * 0.05);
  const total = amount + interest;
  const monthlyPayment = Math.round(total / 3);

  const handleContinue = () => {
    router.push({
      pathname: '/confirmation',
      params: {
        amount: amount.toString(),
        interest: interest.toString(),
        total: total.toString(),
        monthlyPayment: monthlyPayment.toString(),
        pharmacy: JSON.stringify(pharmacy),
      }
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CIH🏦BANK</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.question}>De combien avez-vous besoin ?</Text>
        
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>VOTRE LIMIT DISPONIBLE</Text>
          <Text style={styles.amountValue}>{amount} DH</Text>
          <Text style={styles.amountSubtext}>maximum disponible</Text>
        </View>

        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={500}
            maximumValue={creditLimit}
            step={100}
            value={amount}
            onValueChange={setAmount}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.border}
            thumbTintColor={colors.secondary}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>500 DH</Text>
            <Text style={styles.sliderLabel}>{creditLimit} DH</Text>
          </View>
        </View>

        <View style={styles.repaymentCard}>
          <Text style={styles.repaymentTitle}>Vous rembourserez</Text>
          <Text style={styles.repaymentAmount}>{monthlyPayment} DH</Text>
          <Text style={styles.repaymentSubtext}>x 3 mois</Text>
          <Text style={styles.repaymentTotal}>(Total : {total} DH)</Text>
          <View style={styles.breakdown}>
            <Text style={styles.breakdownText}>Frais : {interest} DH</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continuer</Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 24,
    marginRight: 12,
    color: colors.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  amountCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  amountLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  amountValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  amountSubtext: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  sliderContainer: {
    marginBottom: 32,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  sliderLabel: {
    fontSize: 13,
    color: colors.textLight,
  },
  repaymentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  repaymentTitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 12,
  },
  repaymentAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  repaymentSubtext: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 8,
  },
  repaymentTotal: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
  },
  breakdown: {
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  breakdownText: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  continueButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});