/**
 * CIH Bank Official Brand Colors
 * Primary Color: Cerulean Blue (#00A0E1)
 * Secondary Color: Vibrant Orange (#FF8C42)
 * Accent Color: Light Orange (#FFB366)
 */
export const colors = {
  // Primary CIH Brand Colors
  primary: '#00A0E1', // Cerulean Blue
  secondary: '#FF8C42', // Vibrant Orange
  accent: '#FFB366', // Light Orange
  
  // UI Colors
  background: '#FFFFFF',
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
    vibrantOrange: '#FF8C42',
    accentOrange: '#FFB366',
    ceruleanLight: '#33B3E8',
    ceruleanDark: '#0080B8',
    orangeLight: '#FFD699',
  },
};

/**
 * Gradient Definitions for Premium Card Designs
 */
export const gradients = {
  primary: ['#00A0E1', '#0080B8'], // Cerulean Blue to darker blue
  card: ['#00A0E1', '#FF8C42'], // Cerulean to Orange
  accent: ['#FF8C42', '#FFB366'], // Orange variations
  dark: ['#FF8C42', '#E67A30'], // Orange variations
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