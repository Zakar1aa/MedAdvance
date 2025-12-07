// screens/PharmacySelectionScreen.js
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mockPharmacies } from '../services/mockData';
import theme from '../styles/theme';

const { colors } = theme;

export default function PharmacySelectionScreen({ creditLimit }) {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const handlePharmacySelect = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  const handleContinue = () => {
    if (selectedPharmacy) {
      router.push({
        pathname: '/amount-selection',
        params: { 
          creditLimit: creditLimit,
          pharmacy: JSON.stringify(selectedPharmacy)
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pharmacies</Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>🗺️</Text>
        </View>
      </View>

      <ScrollView style={styles.pharmacyList}>
        {mockPharmacies.map((pharmacy) => (
          <TouchableOpacity
            key={pharmacy.id}
            style={[
              styles.pharmacyCard,
              selectedPharmacy?.id === pharmacy.id && styles.pharmacyCardSelected
            ]}
            onPress={() => handlePharmacySelect(pharmacy)}
          >
            <View style={styles.pharmacyIcon}>
              <Text style={styles.locationIcon}>📍</Text>
            </View>
            <View style={styles.pharmacyInfo}>
              <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
              <Text style={[
                styles.pharmacyStatus,
                pharmacy.city === 'Fermé' && styles.pharmacyStatusClosed
              ]}>
                {pharmacy.city}
              </Text>
              <Text style={styles.pharmacyAddress}>{pharmacy.address}</Text>
            </View>
            <View style={styles.pharmacyMeta}>
              <Text style={styles.pharmacyDistance}>{pharmacy.distance}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={[styles.continueButton, !selectedPharmacy && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!selectedPharmacy}
      >
        <Text style={styles.continueButtonText}>Continuer</Text>
      </TouchableOpacity>
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
  mapContainer: {
    height: 200,
    backgroundColor: colors.brand.ceruleanLight,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 48,
  },
  pharmacyList: {
    flex: 1,
    padding: 16,
  },
  pharmacyCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  pharmacyCardSelected: {
    borderColor: colors.primary,
  },
  pharmacyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.brand.ceruleanLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationIcon: {
    fontSize: 20,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  pharmacyStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 2,
  },
  pharmacyStatusClosed: {
    color: '#F44336',
  },
  pharmacyAddress: {
    fontSize: 13,
    color: colors.textLight,
  },
  pharmacyMeta: {
    justifyContent: 'center',
  },
  pharmacyDistance: {
    fontSize: 13,
    color: colors.textLight,
  },
  continueButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});