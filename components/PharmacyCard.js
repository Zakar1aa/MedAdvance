// components/PharmacyCard.js
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  cardSelected: {
    borderColor: '#00A0DC',
    backgroundColor: '#F0F9F4',
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
    color: '#333',
    flex: 1,
  },
  badge: {
    backgroundColor: '#00A0DC',
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
    color: '#333',
    marginBottom: 4,
  },
  city: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
});