// screens/LoanDetailsScreen.js
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { deleteLoan, getLoanById, markPaymentAsPaid } from '../services/loansService';
import theme from '../styles/theme';

const { colors, shadows, spacing, typography } = theme;

export default function LoanDetailsScreen({ loanId }) {
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLoan();
  }, [loanId]);

  const loadLoan = async () => {
    try {
      setLoading(true);
      const loanData = await getLoanById(loanId);
      setLoan(loanData);
    } catch (error) {
      console.error('Error loading loan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async (monthIndex) => {
    try {
      const updated = await markPaymentAsPaid(loanId, monthIndex);
      setLoan(updated);
      Alert.alert('Succès', 'Paiement marqué comme effectué');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de marquer le paiement');
    }
  };

  const handleDeleteLoan = async () => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer ce prêt ?',
      [
        { text: 'Annuler', onPress: () => {} },
        {
          text: 'Supprimer',
          onPress: async () => {
            try {
              await deleteLoan(loanId);
              Alert.alert('Succès', 'Prêt supprimé');
              router.back();
            } catch (error) {
              Alert.alert('Erreur', 'Impossible de supprimer le prêt');
            }
          },
          style: 'destructive',
        },
      ]
    );
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

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Détails du Prêt</Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!loan) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Détails du Prêt</Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={styles.centerContent}>
            <Text style={styles.errorText}>Prêt non trouvé</Text>
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
        <Text style={styles.headerTitle}>Détails du Prêt</Text>
        <TouchableOpacity onPress={handleDeleteLoan}>
          <MaterialIcons name="delete" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Pharmacy Card */}
        <View style={[styles.card, shadows.small]}>
          <View style={styles.pharmacyHeader}>
            <MaterialIcons name="local-pharmacy" size={32} color={colors.primary} />
            <View style={styles.pharmacyInfo}>
              <Text style={styles.pharmacyName}>{loan.pharmacy.name}</Text>
              <Text style={styles.pharmacyAddress}>{loan.pharmacy.address}</Text>
            </View>
          </View>
        </View>

        {/* Loan Summary */}
        <View style={[styles.card, shadows.small]}>
          <Text style={styles.cardTitle}>Résumé du Prêt</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.label}>Date de Création</Text>
            <Text style={styles.value}>{formatDate(loan.createdDate)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.label}>Montant Emprunté</Text>
            <Text style={[styles.value, { color: colors.primary }]}>
              {formatCurrency(loan.amount)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.label}>Frais</Text>
            <Text style={[styles.value, { color: colors.accent }]}>
              {formatCurrency(loan.interest)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={[styles.label, { fontWeight: 'bold' }]}>Total à Rembourser</Text>
            <Text style={[styles.value, { fontWeight: 'bold', fontSize: 18 }]}>
              {formatCurrency(loan.total)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.label}>Paiement Mensuel</Text>
            <Text style={[styles.value, { fontWeight: '600', fontSize: 16 }]}>
              {formatCurrency(loan.monthlyPayment)}
            </Text>
          </View>
        </View>

        {/* Payment Schedule */}
        <View style={[styles.card, shadows.small]}>
          <Text style={styles.cardTitle}>Échéancier de Paiement</Text>

          {loan.payments.map((payment, index) => (
            <View key={index}>
              <View style={styles.paymentItemDetailed}>
                <View style={styles.paymentItemContent}>
                  <View style={styles.paymentItemHeader}>
                    <Text style={styles.paymentMonthLabel}>Mois {payment.month}</Text>
                    {payment.paid && (
                      <View style={styles.paidBadge}>
                        <MaterialIcons name="check" size={14} color={colors.success} />
                        <Text style={styles.paidBadgeText}>Payé</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.paymentDateLabel}>
                    Échéance: {formatDate(payment.dueDate)}
                  </Text>

                  {payment.paid && (
                    <Text style={styles.paymentPaidDateLabel}>
                      Payé le: {formatDate(payment.paidDate)}
                    </Text>
                  )}
                </View>

                <View style={styles.paymentItemRight}>
                  <Text style={styles.paymentAmountDetailed}>
                    {formatCurrency(payment.amount)}
                  </Text>
                  {!payment.paid && (
                    <TouchableOpacity
                      style={styles.markPaidButton}
                      onPress={() => handleMarkAsPaid(index)}
                    >
                      <Text style={styles.markPaidButtonText}>Marquer Payé</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {index < loan.payments.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Status Section */}
        <View style={[styles.card, shadows.small]}>
          <View style={styles.statusSection}>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor:
                    loan.status === 'completed'
                      ? colors.success
                      : loan.status === 'active'
                      ? colors.primary
                      : colors.warning,
                },
              ]}
            />
            <View>
              <Text style={styles.statusLabel}>État du Prêt</Text>
              <Text style={styles.statusValue}>
                {loan.status === 'completed'
                  ? 'Complètement Remboursé'
                  : loan.status === 'active'
                  ? 'Prêt Actif'
                  : 'Non Remboursé'}
              </Text>
            </View>
          </View>
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
  errorText: {
    fontSize: typography.body.fontSize,
    color: colors.error,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  pharmacyAddress: {
    fontSize: typography.caption.fontSize,
    color: colors.textLight,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: typography.body.fontSize,
    color: colors.textLight,
  },
  value: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  paymentItemDetailed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
  },
  paymentItemContent: {
    flex: 1,
  },
  paymentItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  paymentMonthLabel: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.text,
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.background,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: 4,
  },
  paidBadgeText: {
    fontSize: typography.caption.fontSize,
    fontWeight: '600',
    color: colors.success,
  },
  paymentDateLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  paymentPaidDateLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.success,
    fontWeight: '600',
  },
  paymentItemRight: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  paymentAmountDetailed: {
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
    color: colors.primary,
  },
  markPaidButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 4,
  },
  markPaidButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.textLight,
  },
  statusValue: {
    fontSize: typography.body.fontSize,
    fontWeight: '600',
    color: colors.text,
  },
});
