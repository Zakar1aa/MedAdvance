// services/mockData.js
export const mockUser = {
  cin: 'AB123456',
  name: 'Fatima Benali',
  salary: 8500,
  cnss_verified: true,
  tenure_months: 24,
};

export const mockPharmacies = [
  {
    id: 'ph_001',
    name: 'Pharmacie Al Anadalous',
    address: 'Avenue Hassan II, Maarif',
    city: 'Ouvert',
    distance: '60 m',
    rating: 4.8,
    certified: true,
  },
  {
    id: 'ph_002',
    name: 'Pharmacie Centrale',
    address: 'Boulevard Zerktouni',
    city: 'Ouvert',
    distance: '1.5 km',
    rating: 4.6,
    certified: true,
  },
  {
    id: 'ph_003',
    name: 'Pharmacie Agdal',
    address: 'Rue Abdelmoumen',
    city: 'Fermé',
    distance: '3.8 km',
    rating: 4.7,
    certified: true,
  },
];

export const mockEligibilityResponse = {
  decision: 'APPROVED',
  credit_limit: 2500,
  credit_score: 680,
  reasons: {
    employment_verified: true,
    salary: 8500,
    avg_balance_3m: 2100,
    overdrafts: 0,
  },
};