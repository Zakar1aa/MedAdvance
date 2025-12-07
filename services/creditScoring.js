export const calculateEligibility = (userData) => {
  const { 
    cnss_salary, 
    cnss_tenure_months, 
    avg_balance_3m, 
    overdraft_count, 
    existing_loans 
  } = userData;

  let score = 0;
  let limit = 0;

  if (cnss_salary >= 8000) score += 40;
  else if (cnss_salary >= 6000) score += 30;
  else if (cnss_salary >= 4000) score += 20;
  else return { approved: false, reason: 'SALARY_TOO_LOW' };

  if (cnss_tenure_months >= 24) score += 20;
  else if (cnss_tenure_months >= 12) score += 15;
  else if (cnss_tenure_months >= 6) score += 10;
  else return { approved: false, reason: 'TENURE_TOO_SHORT' };

  const balance_ratio = avg_balance_3m / cnss_salary;
  if (balance_ratio >= 0.3) score += 25;
  else if (balance_ratio >= 0.2) score += 18;
  else if (balance_ratio >= 0.1) score += 10;
  else score += 5;

  if (overdraft_count === 0) score += 10;
  else if (overdraft_count <= 2) score += 5;
  else score -= 5;

  if (existing_loans === 0) score += 5;
  else if (existing_loans <= 1) score += 2;

  if (score >= 80) limit = Math.floor(cnss_salary * 0.40);
  else if (score >= 60) limit = Math.floor(cnss_salary * 0.30);
  else if (score >= 40) limit = Math.floor(cnss_salary * 0.25);
  else return { approved: false, reason: 'SCORE_TOO_LOW' };

  limit = Math.min(limit, 3000);
  limit = Math.max(limit, 500);

  return {
    approved: true,
    credit_score: score,
    credit_limit: limit,
    interest_rate: score >= 70 ? 0.04 : 0.05,
  };
};