// services/loansService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOANS_STORAGE_KEY = '@medadvance_loans';

/**
 * Generates a unique ID for loans
 */
const generateLoanId = () => {
  return `loan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculates payment due dates for 3 months
 */
const generatePaymentSchedule = (monthlyPayment) => {
  const today = new Date();
  const payments = [];
  
  for (let i = 1; i <= 3; i++) {
    const dueDate = new Date(today);
    dueDate.setMonth(dueDate.getMonth() + i);
    
    payments.push({
      month: i,
      dueDate: dueDate.toISOString(),
      amount: monthlyPayment,
      paid: false,
      paidDate: null,
    });
  }
  
  return payments;
};

/**
 * Create a new loan
 */
export const createLoan = async (loanData) => {
  try {
    const {
      amount,
      interest,
      total,
      monthlyPayment,
      pharmacy,
    } = loanData;

    const newLoan = {
      id: generateLoanId(),
      amount,
      interest,
      total,
      monthlyPayment,
      pharmacy,
      createdDate: new Date().toISOString(),
      payments: generatePaymentSchedule(monthlyPayment),
      status: 'active', // active, completed, defaulted
    };

    // Get existing loans
    const existingLoans = await getAllLoans();

    // Prevent taking a new loan if there's already an active loan
    const hasActiveLoan = existingLoans.some((l) => l.status === 'active');
    if (hasActiveLoan) {
      const err = new Error('ACTIVE_LOAN_EXISTS');
      err.code = 'ACTIVE_LOAN_EXISTS';
      throw err;
    }

    // Add new loan
    const updatedLoans = [...existingLoans, newLoan];
    
    // Save to AsyncStorage
    await AsyncStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(updatedLoans));
    
    return newLoan;
  } catch (error) {
    console.error('Error creating loan:', error);
    throw error;
  }
};

/**
 * Get all loans
 */
export const getAllLoans = async () => {
  try {
    const loansJson = await AsyncStorage.getItem(LOANS_STORAGE_KEY);
    
    if (!loansJson) {
      return [];
    }
    
    return JSON.parse(loansJson);
  } catch (error) {
    console.error('Error getting loans:', error);
    return [];
  }
};

/**
 * Get a specific loan by ID
 */
export const getLoanById = async (loanId) => {
  try {
    const loans = await getAllLoans();
    return loans.find((loan) => loan.id === loanId);
  } catch (error) {
    console.error('Error getting loan by ID:', error);
    return null;
  }
};

/**
 * Mark a payment as paid
 */
export const markPaymentAsPaid = async (loanId, monthIndex) => {
  try {
    const loans = await getAllLoans();
    const loanIndex = loans.findIndex((l) => l.id === loanId);
    
    if (loanIndex === -1) {
      throw new Error('Loan not found');
    }

    // Mark payment as paid
    loans[loanIndex].payments[monthIndex].paid = true;
    loans[loanIndex].payments[monthIndex].paidDate = new Date().toISOString();

    // Check if all payments are paid
    const allPaid = loans[loanIndex].payments.every((p) => p.paid);
    if (allPaid) {
      loans[loanIndex].status = 'completed';
    }

    // Save updated loans
    await AsyncStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(loans));
    
    return loans[loanIndex];
  } catch (error) {
    console.error('Error marking payment as paid:', error);
    throw error;
  }
};

/**
 * Delete a loan
 */
export const deleteLoan = async (loanId) => {
  try {
    const loans = await getAllLoans();
    const filteredLoans = loans.filter((l) => l.id !== loanId);
    
    await AsyncStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(filteredLoans));
    
    return true;
  } catch (error) {
    console.error('Error deleting loan:', error);
    throw error;
  }
};

/**
 * Get loan statistics
 */
export const getLoanStats = async () => {
  try {
    const loans = await getAllLoans();
    
    const stats = {
      totalLoans: loans.length,
      activeLoans: loans.filter((l) => l.status === 'active').length,
      completedLoans: loans.filter((l) => l.status === 'completed').length,
      totalBorrowed: loans.reduce((sum, l) => sum + l.amount, 0),
      totalOutstanding: loans
        .filter((l) => l.status === 'active')
        .reduce((sum, l) => {
          const unpaidPayments = l.payments.filter((p) => !p.paid);
          return sum + (unpaidPayments.length * l.monthlyPayment);
        }, 0),
    };
    
    return stats;
  } catch (error) {
    console.error('Error getting loan stats:', error);
    return null;
  }
};
