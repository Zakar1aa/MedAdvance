// components/PharmacyCard.js
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../styles/theme';

const { colors } = theme;

export default function PharmacyCard({ pharmacy, onSelect, selected }) {
  return (
    <TouchableOpacity 
      style={[styles.card, selected && styles.cardSelected]}
      onPress={() => onSelect(pharmacy)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{pharmacy.name}</Text>
        {pharmacy.certified && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✓ Certifiée CIH</Text>
          </View>
        )}
      </View>
      <Text style={styles.address}>{pharmacy.address}</Text>
      <Text style={styles.city}>{pharmacy.city}</Text>
      <View style={styles.footer}>
        <Text style={styles.distance}>📍 {pharmacy.distance}</Text>
        <Text style={styles.rating}>⭐ {pharmacy.rating}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  address: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  city: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  distance: {
    fontSize: 14,
    color: colors.textLight,
  },
  rating: {
    fontSize: 14,
    color: colors.textLight,
  },
});