// screens/HomeScreen.js
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mockUser } from '../services/mockData';
import theme from '../styles/theme';

// Extract theme values for StyleSheet
const { colors, shadows, spacing, typography, gradients } = theme;

// Extract user initials for profile
const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <View style={styles.container}>
      {/* Professional Header with CIH Branding and User Profile */}
      <View style={[styles.header]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="account-balance" size={24} color={colors.primary} />
          <Text style={styles.logo}>CIH</Text>
        </View>
        <View style={styles.profileSection}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitials}>{getInitials(mockUser.name)}</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.greetingText}>Bonjour</Text>
            <Text style={styles.profileName}>{mockUser.name}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Premium CIH Bank Card with Gradient */}
        <LinearGradient
          colors={gradients && gradients.card ? gradients.card : ['#00A0E1', '#FFCDB2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card]}
        >
          {/* Top Row: Card Chip and Contactless Icon */}
          <View style={styles.cardTopRow}>
            <MaterialIcons name="credit-card" size={32} color="#FFD700" />
            <MaterialIcons name="contactless" size={28} color="rgba(255,255,255,0.8)" />
          </View>

          {/* Card Header: Name and Type */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardName}>{mockUser.name}</Text>
            <Text style={styles.cardType}>Premium Account</Text>
          </View>

          {/* Card Body: Number and Balance */}
          <View style={styles.cardBody}>
            <Text style={styles.cardNumber}>4755 •••• •••• 9018</Text>
            <Text style={styles.cardBalance}>{mockUser.salary.toLocaleString()} DHS</Text>
          </View>

          {/* Card Footer: CIH Logo */}
          <View style={styles.cardFooter}>
            <Text style={styles.cihLogo}>CIH BANK</Text>
          </View>
        </LinearGradient>

        <View style={styles.services}
        >
          <TouchableOpacity style={styles.serviceItem} onPress={() => router.push('/add-card')}>
            <View style={styles.serviceIcon}>
              <MaterialIcons name="credit-card" size={24} color={colors.primary} />
            </View>
            <Text style={styles.serviceLabel}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem} onPress={() => router.push('/loans')}>
            <View style={styles.serviceIcon}>
              <MaterialIcons name="receipt-long" size={24} color={colors.primary} />
            </View>
            <Text style={styles.serviceLabel}>My Loans</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem} onPress={() => router.push('/salary-advance')}>
            <View style={styles.serviceIcon}>
              <MaterialIcons name="payment" size={24} color={colors.primary} />
            </View>
            <Text style={styles.serviceLabel}>Pay</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem} onPress={() => router.push('/upload-document')}>
            <View style={[styles.serviceIcon, styles.medadvanceIcon]}>
              <MaterialIcons name="local-pharmacy" size={24} color={colors.secondary} />
            </View>
            <Text style={styles.serviceLabel}>MedAdvance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem} onPress={() => router.push('/(tabs)') }>
            <View style={styles.serviceIcon}>
              <MaterialIcons name="bar-chart" size={24} color={colors.primary} />
            </View>
            <Text style={styles.serviceLabel}>Stats</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: colors.card,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.small,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    fontSize: typography.h2.fontSize,
    fontWeight: 'bold',
    color: colors.primary,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileText: {
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 12,
    color: colors.textLight,
  },
  profileName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    padding: spacing.lg,
  },
  // Premium Bank Card Styles
  card: {
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    minHeight: 200,
    ...shadows.large,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  cardHeader: {
    marginBottom: 40,
  },
  cardName: {
    fontSize: typography.h3.fontSize,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardType: {
    fontSize: typography.caption.fontSize,
    color: 'rgba(255,255,255,0.9)',
  },
  cardBody: {
    marginBottom: 16,
  },
  cardNumber: {
    fontSize: typography.body.fontSize,
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 2,
  },
  cardBalance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  cihLogo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 24,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.brand.ceruleanLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    ...shadows.small,
  },
  medadvanceIcon: {
    backgroundColor: colors.brand.peachLight,
  },
  serviceEmoji: {
    fontSize: 24,
  },
  serviceLabel: {
    fontSize: 11,
    color: colors.text,
    textAlign: 'center',
  },
}); 