// services/supabaseService.js
import { supabase } from '../config/supabase';
import { cihWalletApi } from './cihWalletApi';

// ==================== USER OPERATIONS ====================
export const createUser = async (userData) => {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        supabase_user_id: userData.supabaseUserId,
        full_name: userData.fullName,
        cin: userData.cin,
        phone: userData.phone,
        salary: parseInt(userData.salary)
      }
    ])
    .select()
    .single();

  if (error) throw error;
  
  // Also create wallet in CIH system (mock)
  try {
    const walletResponse = await cihWalletApi.createWalletPreSubscription({
      phoneNumber: userData.phone,
      phoneOperator: "IAM",
      clientFirstName: userData.fullName.split(' ')[0],
      clientLastName: userData.fullName.split(' ').slice(1).join(' '),
      email: `${userData.cin}@medadvance.ma`,
      placeOfBirth: "Rabat",
      dateOfBirth: "01011990",
      clientAddress: "Morocco",
      gender: "M",
      legalType: "CIN",
      legalId: userData.cin
    });
    
    console.log('✅ CIH Wallet Created:', walletResponse.result.token);
  } catch (error) {
    console.error('⚠️ CIH Wallet creation failed (continuing anyway):', error);
  }
  
  return data;
};

export const getUserById = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const getUserByPhone = async (phone) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('phone', phone)
    .single();

  if (error) throw error;
  return data;
};

// ==================== WALLET OPERATIONS ====================
export const createWallet = async (userId) => {
  const { data, error } = await supabase
    .from('wallets')
    .insert([
      {
        user_id: userId,
        balance: 0,
        credit_limit: 0
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getWalletByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateWalletCreditLimit = async (userId, creditLimit) => {
  const { data, error } = await supabase
    .from('wallets')
    .update({ 
      credit_limit: creditLimit, 
      updated_at: new Date().toISOString() 
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateWalletBalance = async (userId, newBalance) => {
  const { data, error } = await supabase
    .from('wallets')
    .update({ 
      balance: newBalance,
      updated_at: new Date().toISOString() 
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ==================== PHARMACY OPERATIONS ====================
export const getAllPharmacies = async () => {
  const { data, error } = await supabase
    .from('pharmacies')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
};

export const getPharmacyById = async (pharmacyId) => {
  const { data, error } = await supabase
    .from('pharmacies')
    .select('*')
    .eq('id', pharmacyId)
    .single();

  if (error) throw error;
  return data;
};

export const createPharmacy = async (pharmacyData) => {
  const { data, error } = await supabase
    .from('pharmacies')
    .insert([pharmacyData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ==================== CREDIT CHECK OPERATIONS ====================
export const performCreditCheck = async (userId, salary, cin) => {
  // Enhanced credit scoring algorithm
  const calculateCreditScore = (salary) => {
    let score = 0;
    
    // Salary-based scoring (0-40 points)
    if (salary >= 8000) score += 40;
    else if (salary >= 6000) score += 30;
    else if (salary >= 4000) score += 20;
    else score += 10;
    
    // Add randomization for demo (0-20 points)
    score += Math.floor(Math.random() * 20);
    
    // Simulate tenure bonus (0-20 points)
    score += Math.floor(Math.random() * 20);
    
    // Simulate payment history (0-20 points)
    score += Math.floor(Math.random() * 20);
    
    return Math.min(score, 100);
  };

  const calculateCreditLimit = (salary, score) => {
    if (score >= 80) return Math.round(Math.min(salary * 0.4, 3000));
    if (score >= 60) return Math.round(Math.min(salary * 0.3, 2500));
    if (score >= 40) return Math.round(Math.min(salary * 0.25, 2000));
    return 0;
  };

  const score = calculateCreditScore(salary);
  const maxLimit = calculateCreditLimit(salary, score);
  const decision = score >= 40 ? 'approved' : 'declined';
  const reason = decision === 'approved' 
    ? `Score de crédit: ${score}/100 - Limite approuvée de ${maxLimit} DH` 
    : `Score de crédit insuffisant: ${score}/100 (minimum requis: 40)`;

  const { data, error } = await supabase
    .from('credit_checks')
    .insert([
      {
        user_id: userId,
        score: score,
        max_limit: maxLimit,
        decision: decision,
        reason: reason
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getLatestCreditCheck = async (userId) => {
  const { data, error } = await supabase
    .from('credit_checks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
};

// ==================== TRANSACTION OPERATIONS ====================
export const createTransaction = async (transactionData) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([
      {
        user_id: transactionData.userId,
        pharmacy_id: transactionData.pharmacyId,
        amount: parseInt(transactionData.amount),
        status: 'pending',
        pharmacy_receipt_url: transactionData.receiptUrl
      }
    ])
    .select()
    .single();

  if (error) throw error;
  
  // Simulate CIH Wallet transaction
  try {
    const user = await getUserById(transactionData.userId);
    const pharmacy = await getPharmacyById(transactionData.pharmacyId);
    
    const simulationResponse = await cihWalletApi.walletToMerchantSimulation(
      "MOCK_CONTRACT_" + user.id,
      transactionData.amount.toString(),
      pharmacy.phone || "212600000000"
    );
    
    console.log('✅ CIH Transaction Simulated:', simulationResponse.result.referenceId);
  } catch (error) {
    console.error('⚠️ CIH Transaction simulation failed (continuing anyway):', error);
  }
  
  return data;
};

export const approveTransaction = async (transactionId) => {
  const { data, error } = await supabase
    .from('transactions')
    .update({ 
      status: 'approved',
      approved_at: new Date().toISOString()
    })
    .eq('id', transactionId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getTransactionsByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      pharmacies (
        name,
        city,
        address
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getActiveTransactions = async (userId) => {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      pharmacies (
        name,
        city,
        address
      ),
      payments (
        id,
        due_date,
        amount,
        status
      )
    `)
    .eq('user_id', userId)
    .in('status', ['pending', 'approved'])
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// ==================== PAYMENT OPERATIONS ====================
export const createPaymentSchedule = async (transactionId, totalAmount, months = 3) => {
  const monthlyPayment = Math.round(totalAmount / months);
  const payments = [];
  
  for (let i = 0; i < months; i++) {
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + i + 1);
    dueDate.setDate(10); // Always 10th of the month
    
    payments.push({
      transaction_id: transactionId,
      due_date: dueDate.toISOString().split('T')[0],
      amount: monthlyPayment,
      status: 'scheduled'
    });
  }

  const { data, error } = await supabase
    .from('payments')
    .insert(payments)
    .select();

  if (error) throw error;
  return data;
};

export const getUpcomingPayments = async (userId, daysAhead = 7) => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + daysAhead);

  const { data, error } = await supabase
    .from('payments')
    .select(`
      *,
      transactions!inner (
        user_id,
        pharmacies (
          name
        )
      )
    `)
    .eq('transactions.user_id', userId)
    .eq('status', 'scheduled')
    .gte('due_date', today.toISOString().split('T')[0])
    .lte('due_date', futureDate.toISOString().split('T')[0])
    .order('due_date', { ascending: true });

  if (error) throw error;
  return data;
};

export const markPaymentAsPaid = async (paymentId) => {
  const { data, error } = await supabase
    .from('payments')
    .update({ status: 'paid' })
    .eq('id', paymentId)
    .select()
    .single();

  if (error) throw error;
  
  // Simulate CIH payment
  try {
    const cashInResponse = await cihWalletApi.cashInConfirmation(
      "MOCK_TOKEN_" + paymentId,
      data.amount.toString()
    );
    
    console.log('✅ CIH Payment Processed:', cashInResponse.result.transactionReference);
  } catch (error) {
    console.error('⚠️ CIH Payment processing failed (continuing anyway):', error);
  }
  
  return data;
};

// ==================== COMPLETE WORKFLOW ====================
export const completeAdvanceWorkflow = async (workflowData) => {
  try {
    console.log('🚀 Starting MedAdvance Workflow...');
    
    // 1. Get or create user
    let user = await getUserByPhone(workflowData.phone).catch(() => null);
    
    if (!user) {
      console.log('👤 Creating new user...');
      user = await createUser({
        supabaseUserId: workflowData.supabaseUserId,
        fullName: workflowData.fullName,
        cin: workflowData.cin,
        phone: workflowData.phone,
        salary: workflowData.salary
      });
    }

    // 2. Get or create wallet
    let wallet = await getWalletByUserId(user.id).catch(() => null);
    if (!wallet) {
      console.log('💳 Creating wallet...');
      wallet = await createWallet(user.id);
    }

    // 3. Perform credit check
    console.log('🔍 Performing credit check...');
    const creditCheck = await performCreditCheck(
      user.id,
      workflowData.salary,
      workflowData.cin
    );

    if (creditCheck.decision !== 'approved') {
      throw new Error('Credit check failed: ' + creditCheck.reason);
    }

    // 4. Update wallet credit limit
    console.log('💰 Updating credit limit...');
    await updateWalletCreditLimit(user.id, creditCheck.max_limit);

    // 5. Create transaction
    console.log('📝 Creating transaction...');
    const transaction = await createTransaction({
      userId: user.id,
      pharmacyId: workflowData.pharmacyId,
      amount: workflowData.amount,
      receiptUrl: workflowData.receiptUrl
    });

    // 6. Auto-approve (for demo purposes)
    console.log('✅ Auto-approving transaction...');
    await approveTransaction(transaction.id);

    // 7. Create payment schedule
    console.log('📅 Creating payment schedule...');
    const totalWithInterest = Math.round(workflowData.amount * 1.05); // 5% interest
    await createPaymentSchedule(transaction.id, totalWithInterest, 3);

    console.log('✅ MedAdvance Workflow Complete!');

    return {
      success: true,
      user,
      creditCheck,
      transaction,
      wallet
    };
  } catch (error) {
    console.error('❌ Workflow error:', error);
    throw error;
  }
};