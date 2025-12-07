// screens/SalaryAdvanceScreen.js
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import PropTypes from 'prop-types';
import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../styles/theme';

export default function SalaryAdvanceScreen({ eligibility }) {
  const handleContinue = () => {
    router.push({
      pathname: '/pharmacy-selection',
      params: { creditLimit: eligibility.credit_limit }
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerTextWrap}>
              <Text style={styles.headerTitle}>Avance sur Salaire</Text>
              <Text style={styles.headerSubtitle}>Obtenez une avance instantanée en 3 étapes</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/help')}>
              <MaterialIcons name="info-outline" size={20} color={theme.colors.textLight} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatar} onPress={() => router.push('/profile')}>
              <Text style={styles.avatarInitials}>U</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <LinearGradient colors={theme.gradients.card} style={styles.limitCard}>
            <Text style={styles.limitLabel}>VOTRE LIMITE DISPONIBLE</Text>
            <Text style={styles.limitAmount}>{eligibility.credit_limit} DH</Text>
            <Text style={styles.limitSubtext}>maximum disponible</Text>
          </LinearGradient>

          <TouchableOpacity style={styles.requestButton} onPress={handleContinue}>
            <Text style={styles.requestButtonText}>Demander une avance</Text>
          </TouchableOpacity>

          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>VOTRE SITUATION</Text>
            
            <View style={styles.statusRow}>
              <Text style={styles.statusIcon}>✓</Text>
              <Text style={styles.statusText}>Aucune avance active</Text>
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.statusIcon}>✓</Text>
              <Text style={styles.statusText}>Historique excellent</Text>
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.statusIcon}>✓</Text>
              <Text style={styles.statusText}>Compte vérifié</Text>
            </View>
          </View>

          <View style={styles.advantagesCard}>
            <Text style={styles.advantagesTitle}>AVANTAGES</Text>
            
            <View style={styles.advantageRow}>
              <Text style={styles.advantageIcon}>💰</Text>
              <Text style={styles.advantageText}>Approbation rapide</Text>
            </View>

            <View style={styles.advantageRow}>
              <Text style={styles.advantageIcon}>⚡</Text>
              <Text style={styles.advantageText}>Prélèvement automatique</Text>
            </View>

            <View style={styles.advantageRow}>
              <Text style={styles.advantageIcon}>📱</Text>
              <Text style={styles.advantageText}>Parcours digitalisé</Text>
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
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextWrap: {
    marginLeft: 8,
  },
  headerSubtitle: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: theme.colors.card,
    fontWeight: '700',
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
    padding: 20,
  },
  limitCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    ...theme.shadows.medium,
  },
  limitLabel: {
    fontSize: 12,
    color: theme.colors.card,
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 1,
  },
  limitAmount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.colors.card,
    marginBottom: 6,
  },
  limitSubtext: {
    fontSize: 13,
    color: theme.colors.card,
  },
  requestButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  requestButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.card,
  },
  statusCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...theme.shadows.small,
  },
  statusTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textLight,
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIcon: {
    fontSize: 18,
    color: theme.colors.success,
    marginRight: 12,
  },
  statusText: {
    fontSize: 15,
    color: '#333',
  },
  advantagesCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    ...theme.shadows.small,
  },
  advantagesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
  },
  advantageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  advantageIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  advantageText: {
    fontSize: 15,
    color: '#333',
  },
  continueButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.card,
  },
});

SalaryAdvanceScreen.propTypes = {
  eligibility: PropTypes.shape({
    credit_limit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};