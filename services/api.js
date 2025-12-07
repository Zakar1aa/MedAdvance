// services/api.js
import { calculateEligibility } from './creditScoring';

export const checkEligibility = async (cin) => {
  const mockUserData = {
    cnss_salary: 8500,
    cnss_tenure_months: 24,
    avg_balance_3m: 2100,
    overdraft_count: 0,
    existing_loans: 0,
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      const result = calculateEligibility(mockUserData);
      resolve({
        decision: result.approved ? 'APPROVED' : 'DECLINED',
        credit_limit: result.credit_limit || 0,
        credit_score: result.credit_score || 0,
        reasons: {
          employment_verified: true,
          salary: mockUserData.cnss_salary,
          avg_balance_3m: mockUserData.avg_balance_3m,
          overdrafts: mockUserData.overdraft_count,
        },
      });
    }, 3000);
  });
};

export const submitAdvanceRequest = async (pharmacyId, amount) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        transaction_id: 'TX' + Date.now(),
        status: 'PENDING_PHARMACY_APPROVAL',
        amount: amount,
        interest: Math.round(amount * 0.05),
        total: Math.round(amount * 1.05),
        timestamp: new Date().toISOString(),
      });
    }, 1500);
  });
};

export const calculateRepaymentPlan = (amount) => {
  const interest = Math.round(amount * 0.05);
  const total = amount + interest;
  
  return [
    {
      months: 1,
      monthly: total,
      total: total,
    },
    {
      months: 2,
      monthly: Math.round(total / 2),
      total: total,
    },
    {
      months: 3,
      monthly: Math.round(total / 3),
      total: total,
    },
  ];
};