// screens/LoansScreen.js
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { getAllLoans, getLoanStats } from '../services/loansService';
import theme from '../styles/theme';

const { colors, shadows, spacing, typography } = theme;
const windowWidth = Dimensions.get('window').width;

export default function LoansScreen() {
  const [loans, setLoans] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch loans when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadLoans();
    }, [])
  );

  const loadLoans = async () => {
    try {
      setLoading(true);
      const allLoans = await getAllLoans();
      const loanStats = await getLoanStats();
      
      setLoans(allLoans);
      setStats(loanStats);
    } catch (error) {
      console.error('Error loading loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return `${amount.toLocaleString('fr-FR')} DH`;
  };

  const getPaymentStatus = (payments) => {
    const paid = payments.filter((p) => p.paid).length;
    return `${paid}/3`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return colors.success;
      case 'active':
        return colors.primary;
      default:
        return colors.warning;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Complété';
      case 'active':
        return 'Actif';
      default:
        return 'Par défaut';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Mes Prêts</Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, shadows.small]}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes Prêts</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Statistics Cards */}
        {stats && stats.activeLoans > 0 && (
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { borderLeftColor: colors.primary }]}>
              <Text style={styles.statLabel}>Prêts Actifs</Text>
              <Text style={styles.statValue}>{stats.activeLoans}</Text>
            </View>
            <View style={[styles.statCard, { borderLeftColor: colors.accent }]}>
              <Text style={styles.statLabel}>Montant Dû</Text>
              <Text style={[styles.statValue, { color: colors.accent }]}>
                {formatCurrency(stats.totalOutstanding)}
              </Text>
            </View>
          </View>
        )}

        {/* Empty State */}
        {loans.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="inbox" size={64} color={colors.textLight} />
            <Text style={styles.emptyStateTitle}>Aucun Prêt</Text>
            <Text style={styles.emptyStateSubtitle}>{"Vous n\u2019avez pas encore de prêts enregistrés"}</Text>
            <TouchableOpacity
              style={styles.emptyStateButton}
              onPress={() => router.push('/(tabs)/')}
            >
              <Text style={styles.emptyStateButtonText}>Demander un Prêt</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Historique des Prêts</Text>
            {loans.map((loan) => (
              <TouchableOpacity
                key={loan.id}
                style={[styles.loanCard, shadows.small]}
                onPress={() =>
                  router.push({
                    pathname: '/loan-details',
                    params: { loanId: loan.id },
                  })
                }
              >
                {/* Loan Header */}
                <View style={styles.loanHeader}>
                  <View style={styles.loanHeaderLeft}>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: getStatusColor(loan.status),
                        },
                      ]}
                    >
                      <Text style={styles.statusBadgeText}>
                        {getStatusLabel(loan.status)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.loanDate}>{formatDate(loan.createdDate)}</Text>
                </View>

                {/* Pharmacy Info */}
                <View style={styles.pharmacyInfo}>
                  <MaterialIcons name="local-pharmacy" size={20} color={colors.primary} />
                  <Text style={styles.pharmacyName}>{loan.pharmacy.name}</Text>
                </View>

                {/* Amount Info */}
                <View style={styles.amountSection}>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Montant</Text>
                    <Text style={styles.amountValue}>
                      {formatCurrency(loan.amount)}
                    </Text>
                  </View>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Frais</Text>
                    <Text style={styles.interestValue}>
                      {formatCurrency(loan.interest)}
                    </Text>
                  </View>
                </View>

                {/* Payment Schedule */}
                <View style={styles.paymentSection}>
                  <View style={styles.paymentHeader}>
                    <Text style={styles.paymentTitle}>Échéancier</Text>
                    <Text style={styles.paymentStatus}>
                      {getPaymentStatus(loan.payments)}
                    </Text>
                  </View>

                  <View style={styles.paymentItems}>
                    {loan.payments.map((payment, index) => (
                      <View key={index} style={styles.paymentItem}>
                        <View style={styles.paymentItemLeft}>
                          <Text style={styles.paymentMonth}>
                            Mois {payment.month}
                          </Text>
                          <Text style={styles.paymentDate}>
                            {formatDate(payment.dueDate)}
                          </Text>
                        </View>
                        <View style={styles.paymentItemRight}>
                          <Text style={styles.paymentAmount}>
                            {formatCurrency(payment.amount)}
                          </Text>
                          <View
                            style={[
                              styles.paymentIndicator,
                              payment.paid && styles.paymentPaid,
                            ]}
                          >
                            {payment.paid && (
                              <MaterialIcons
                                name="check-circle"
                                size={16}
                                color={colors.success}
                              />
                            )}
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Total Info */}
                <View style={styles.totalSection}>
                  <Text style={styles.totalLabel}>Total à Rembourser</Text>
                  <Text style={styles.totalAmount}>{formatCurrency(loan.total)}</Text>
                </View>

                {/* Details Arrow */}
                <View style={styles.arrowContainer}>
                  <MaterialIcons name="chevron-right" size={24} color={colors.primary} />
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
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
  },
  headerTitle: {
    fontSize: typography.h2.fontSize,
    fontWeight: 'bold',
    color: colors.primary,
  },
  content: {
    padding: spacing.lg,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: spacing.md,
    ...shadows.small,
  },
  statLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  loanCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  loanHeaderLeft: {
    flex: 1,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loanDate: {
    fontSize: typography.caption.fontSize,
    color: colors.textLight,
  },
  pharmacyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  pharmacyName: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  amountSection: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  amountLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.textLight,
  },
  amountValue: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.primary,
  },
  interestValue: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.accent,
  },
  paymentSection: {
    marginBottom: spacing.md,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  paymentTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: '600',
    color: colors.text,
  },
  paymentStatus: {
    fontSize: typography.caption.fontSize,
    fontWeight: '600',
    color: colors.primary,
  },
  paymentItems: {
    gap: spacing.sm,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  paymentItemLeft: {
    flex: 1,
  },
  paymentMonth: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  paymentDate: {
    fontSize: typography.caption.fontSize,
    color: colors.textLight,
  },
  paymentItemRight: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  paymentAmount: {
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
    color: colors.primary,
  },
  paymentIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentPaid: {
    backgroundColor: colors.background,
    borderColor: colors.success,
  },
  totalSection: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: typography.caption.fontSize,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  totalAmount: {
    fontSize: typography.h3.fontSize,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  arrowContainer: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: typography.h2.fontSize,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.md,
  },
  emptyStateSubtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textLight,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  emptyStateButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    ...shadows.small,
  },
  emptyStateButtonText: {
    color: '#FFFFFF',
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
});
