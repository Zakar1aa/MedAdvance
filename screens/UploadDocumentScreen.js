// screens/UploadDocumentScreen.js
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../styles/theme';

const { colors } = theme;

export default function UploadDocumentScreen() {
  const [document, setDocument] = useState(null);

  const handlePickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: false,
    });
    
    if (!result.canceled) {
      const picked = result.assets && result.assets.length ? result.assets[0] : result;
      setDocument(picked);
    }
  };

  const handleSkip = () => {
    router.push('/eligibility-check');
  };

  const handleContinue = () => {
    router.push('/eligibility-check');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MedAdvance</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dossier Médicales</Text>
          <Text style={styles.cardSubtitle}>
            Soyez assuré(e) que vos données restent{'\n'}confidentielles et sécurisées.
          </Text>
          <Text style={styles.cardNote}>Vos documents resteront confidentiels et chiffrés.</Text>
          <TouchableOpacity 
            style={styles.uploadContainer}
            onPress={handlePickDocument}
          >
            <Text style={styles.icon}>📋</Text>
            <Text style={styles.uploadLabel}>{document ? document.name : 'Select file'}</Text>
            <MaterialIcons name="cloud-upload" size={40} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.timeline}>
          {document && document.uri && (
            <View style={styles.previewRow}>
              {document.mimeType && document.mimeType.startsWith('image') ? (
                <Image source={{ uri: document.uri }} style={styles.previewImage} />
              ) : (
                <MaterialIcons name="description" size={40} color={theme.colors.textLight} />
              )}
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.previewName}>{document.name}</Text>
                {document.size && <Text style={styles.previewMeta}>{(document.size/1024).toFixed(1)} KB</Text>}
              </View>
            </View>
          )}
          <View style={styles.timelineDot} />
          <View style={styles.timelineLine} />
          <View style={styles.timelineDotInactive} />
        </View>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Passer cette étape</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.continueButton, !document && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={!document}
        >
          <Text style={styles.continueButtonText}>Continuer</Text>
        </TouchableOpacity>
      </View>
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
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 32,
  },
  cardNote: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 16,
  },
  uploadContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    borderStyle: 'dashed',
  },
  icon: {
    fontSize: 48,
    marginBottom: 8,
  },
  uploadLabel: {
    fontSize: 14,
    color: colors.primary,
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  timelineDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  timelineLine: {
    width: 60,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  skipButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  continueButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
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