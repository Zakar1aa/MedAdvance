// screens/NotEligibleScreen.js
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../styles/theme';

const { colors } = theme;

export default function NotEligibleScreen() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Retour</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.limitCard}>
          <Text style={styles.limitLabel}>VOTRE LIMIT DISPONIBLE</Text>
          <Text style={styles.limitAmount}>2000 DH</Text>
          <Text style={styles.limitSubtext}>maximum disponible</Text>
        </View>

        <TouchableOpacity style={styles.requestButton} disabled>
          <Text style={styles.requestButtonText}>Demande une Avance</Text>
        </TouchableOpacity>

        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>VOTRE SITUATION</Text>
          
          <View style={styles.statusRow}>
            <Text style={styles.statusIconError}>✗</Text>
            <Text style={styles.statusText}>Aucune avance active</Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.statusIconError}>✗</Text>
            <Text style={styles.statusText}>Historique excellent</Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.statusIcon}>✓</Text>
            <Text style={styles.statusText}>Compte vérifié</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.cancelButtonText}>Annuler</Text>
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
    padding: 20,
  },
  limitCard: {
    backgroundColor: '#00A0DC',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  limitLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  limitAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  limitSubtext: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  requestButton: {
    backgroundColor: '#FF8C42',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    opacity: 0.5,
  },
  requestButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statusTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIcon: {
    fontSize: 18,
    color: '#4CAF50',
    marginRight: 12,
  },
  statusIconError: {
    fontSize: 18,
    color: '#F44336',
    marginRight: 12,
  },
  statusText: {
    fontSize: 15,
    color: '#333',
  },
  cancelButton: {
    backgroundColor: '#FF8C42',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});