/**
 * CIH Bank Official Brand Colors
 * Primary Color: Cerulean Blue (#00A0E1)
 * Secondary Color: Walnut Brown (#764318)
 * Accent Color: Romantic Peach (#FFCDB2)
 */
export const colors = {
  // Primary CIH Brand Colors
  primary: '#00A0E1', // Cerulean Blue
  secondary: '#764318', // Walnut Brown
  accent: '#FFCDB2', // Romantic Peach
  
  // UI Colors
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  border: '#E0E0E0',
  
  // Status Colors
  error: '#D32F2F',
  success: '#00A0E1', // Updated to match primary
  warning: '#FFA726',
  
  // Brand Specific Colors (Semantic Naming)
  brand: {
    ceruleanBlue: '#00A0E1',
    romanticPeach: '#FFCDB2',
    walnutBrown: '#764318',
    ceruleanLight: '#33B3E8',
    ceruleanDark: '#0080B8',
    peachLight: '#FFE5D9',
  },
};

/**
 * Gradient Definitions for Premium Card Designs
 */
export const gradients = {
  primary: ['#00A0E1', '#0080B8'], // Cerulean Blue to darker blue
  card: ['#00A0E1', '#FFCDB2'], // Cerulean to Peach
  accent: ['#FFCDB2', '#FFB89A'], // Peach variations
  dark: ['#764318', '#4A2A0F'], // Walnut Brown variations
};

/**
 * Shadow Definitions for Premium Card Styling
 */
export const shadows = {
  small: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

/**
 * Typography Definitions
 * All text colors reference the centralized color palette
 */
export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  caption: {
    fontSize: 14,
    color: colors.textLight,
  },
  small: {
    fontSize: 12,
    color: colors.textLight,
  },
  cardText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
};

/**
 * Centralized Theme Export
 * Provides single source of truth for all design tokens
 */
export default {
  colors,
  gradients,
  shadows,
  spacing,
  typography,
};