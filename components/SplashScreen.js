import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, View } from 'react-native';
import theme from '../styles/theme';

/**
 * MedAdvance Splash/Loading Screen
 * Displays during app initialization with professional branding
 */
export default function SplashScreen({ visible = true, onComplete }) {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    if (visible) {
      // Animate logo entrance
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Gradient background effect */}
      <View style={styles.gradientOverlay} />

      {/* Logo and branding */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Icon */}
        <View style={styles.iconWrapper}>
          <MaterialIcons
            name="health-and-safety"
            size={80}
            color={theme.colors.card}
          />
        </View>

        {/* App name */}
        <Text style={styles.appName}>MedAdvance</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Healthcare Solutions</Text>

        {/* CIH Partnership text */}
        <View style={styles.partnershipContainer}>
          <Text style={styles.partnershipText}>Powered by CIH Bank</Text>
          <View style={styles.partnershipBar} />
        </View>
      </Animated.View>

      {/* Loading indicator */}
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="small"
          color={theme.colors.primary}
          style={styles.spinner}
        />
        <Text style={styles.loadingText}>Initializing...</Text>
      </View>

      {/* Bottom brand accent */}
      <View style={styles.bottomAccent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 160, 225, 0.03)', // Subtle Cerulean overlay
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    ...theme.shadows.large,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    color: theme.colors.textLight,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  partnershipContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  partnershipText: {
    fontSize: 12,
    color: theme.colors.secondary,
    fontWeight: '600',
    marginBottom: 6,
  },
  partnershipBar: {
    height: 1,
    width: 60,
    backgroundColor: theme.colors.accent,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  spinner: {
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 12,
    color: theme.colors.textLight,
    letterSpacing: 1,
  },
  bottomAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: theme.colors.primary,
  },
});
