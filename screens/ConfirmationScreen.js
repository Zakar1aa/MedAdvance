// screens/ConfirmationScreen.js
import { router } from 'expo-router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createLoan, getAllLoans } from '../services/loansService';
import theme from '../styles/theme';

const { colors } = theme;

export default function ConfirmationScreen({ amount, interest, total, monthlyPayment, pharmacy }) {
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    try {
      setSaving(true);
      
      // Save the loan to AsyncStorage
      await createLoan({
        amount: Number.parseInt(amount, 10),
        interest: Number.parseInt(interest, 10),
        total: Number.parseInt(total, 10),
        monthlyPayment: Number.parseInt(monthlyPayment, 10),
        pharmacy: pharmacy,
      });

      // Navigate back to home
      router.push('/(tabs)');
    } catch (error) {
      console.error('Error saving loan:', error);
      // If user already has an active loan, show a specific alert with quick action
      if (error && (error.code === 'ACTIVE_LOAN_EXISTS' || error.message === 'ACTIVE_LOAN_EXISTS')) {
        const handleViewLoan = async () => {
          try {
            const loans = await getAllLoans();
            const active = loans.find((l) => l.status === 'active');
            if (active) {
              // Navigate to loan details screen
              router.push({ pathname: '/loan-details', params: { loanId: active.id } });
            } else {
              // Fallback to loans list
              router.push('/loans');
            }
          } catch (e) {
            console.error('Error opening loan details:', e);
            // On error, navigate to loans list
            router.push('/loans');
          }
        };

        Alert.alert(
          'Prêt en cours',
          "Vous avez déjà un prêt actif. Vous ne pouvez pas prendre un nouveau prêt tant que l'ancien n'est pas remboursé.",
          [
            { text: 'Voir mon prêt', onPress: handleViewLoan },
            { text: 'Annuler', style: 'cancel' },
          ]
        );
      } else {
        Alert.alert('Erreur', 'Impossible de sauvegarder le prêt');
      }
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmation</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <Text style={styles.title}>Approuvé !</Text>
        <Text style={styles.subtitle}>Montant</Text>
        <Text style={styles.amount}>{amount} DH</Text>
        <Text style={styles.pharmacy}>Pharmacie</Text>
        <Text style={styles.pharmacyName}>{pharmacy?.name}</Text>

        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>⚡ Partager le Code</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.continueButton, saving && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={saving}
        >
          <Text style={styles.continueButtonText}>
            {saving ? 'Enregistrement...' : 'Continuer'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 24,
    marginRight: 12,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 48,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  pharmacy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 40,
  },
  shareButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    width: '100%',
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00A0DC',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#FF8C42',
    borderRadius: 12,
    paddingVertical: 16,
    width: '100%',
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

ConfirmationScreen.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  interest: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  monthlyPayment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pharmacy: PropTypes.shape({
    name: PropTypes.string,
  }),
};