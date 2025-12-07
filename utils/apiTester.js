// utils/apiTester.js
import { cihWalletApi, mockHelpers } from '../services/cihWalletApi';
import {
    completeAdvanceWorkflow,
    createUser,
    getAllPharmacies,
    getUpcomingPayments,
    performCreditCheck
} from '../services/supabaseService';

// Test results tracker
const testResults = [];

const logTest = (testName, status, details) => {
  const result = {
    test: testName,
    status: status ? '✅ PASS' : '❌ FAIL',
    details,
    timestamp: new Date().toISOString()
  };
  testResults.push(result);
  console.log(`${result.status} - ${testName}`);
  if (details) console.log('  Details:', details);
};

// ==================== CIH WALLET API TESTS ====================

export const testCihWalletCreation = async () => {
  console.log('\n🧪 TEST 1: CIH Wallet Creation\n');
  
  try {
    // Step 1: Pre-create wallet
    const preCreateResponse = await cihWalletApi.createWalletPreSubscription({
      phoneNumber: '212700123456',
      phoneOperator: 'IAM',
      clientFirstName: 'Test',
      clientLastName: 'User',
      email: 'test@example.com',
      placeOfBirth: 'Rabat',
      dateOfBirth: '01011990',
      clientAddress: '123 Test St',
      gender: 'M',
      legalType: 'CIN',
      legalId: 'TEST123'
    });
    
    logTest('Wallet Pre-creation', true, {
      token: preCreateResponse.result.token,
      otp: preCreateResponse.result.otp
    });
    
    // Step 2: Activate wallet with OTP
    const activationResponse = await cihWalletApi.activateWallet(
      preCreateResponse.result.token,
      mockHelpers.MOCK_OTP
    );
    
    logTest('Wallet Activation', true, {
      contractId: activationResponse.result.contractId,
      rib: activationResponse.result.rib
    });
    
    return activationResponse.result;
  } catch (error) {
    logTest('Wallet Creation', false, error.message);
    throw error;
  }
};

export const testCihBalanceCheck = async (contractId) => {
  console.log('\n🧪 TEST 2: Balance Check\n');
  
  try {
    const balanceResponse = await cihWalletApi.getWalletBalance(contractId);
    
    logTest('Balance Check', true, {
      balance: balanceResponse.result.balance[0].value + ' MAD'
    });
    
    return balanceResponse.result;
  } catch (error) {
    logTest('Balance Check', false, error.message);
    throw error;
  }
};

export const testCihCashIn = async (contractId) => {
  console.log('\n🧪 TEST 3: Cash IN Transaction\n');
  
  try {
    // Step 1: Simulate Cash IN
    const simulationResponse = await cihWalletApi.cashInSimulation(
      contractId,
      '212700123456',
      '1000'
    );
    
    logTest('Cash IN Simulation', true, {
      token: simulationResponse.result.token,
      amount: simulationResponse.result.amountToCollect + ' MAD'
    });
    
    // Step 2: Confirm Cash IN
    const confirmationResponse = await cihWalletApi.cashInConfirmation(
      simulationResponse.result.token,
      '1000'
    );
    
    logTest('Cash IN Confirmation', true, {
      transactionRef: confirmationResponse.result.transactionReference
    });
    
    return confirmationResponse.result;
  } catch (error) {
    logTest('Cash IN', false, error.message);
    throw error;
  }
};

export const testCihWalletToMerchant = async (contractId) => {
  console.log('\n🧪 TEST 4: Wallet to Merchant Transaction\n');
  
  try {
    // Step 1: Simulate transaction
    const simulationResponse = await cihWalletApi.walletToMerchantSimulation(
      contractId,
      '500',
      '212600000000' // Merchant phone
    );
    
    logTest('Wallet to Merchant Simulation', true, {
      referenceId: simulationResponse.result.referenceId,
      amount: simulationResponse.result.amount + ' MAD'
    });
    
    // Step 2: Get OTP
    const otpResponse = await cihWalletApi.walletToMerchantOTP('212700123456');
    
    logTest('OTP Generation', true, {
      otp: otpResponse.result[0].codeOtp
    });
    
    // Step 3: Confirm transaction
    const confirmationResponse = await cihWalletApi.walletToMerchantConfirmation(
      contractId,
      mockHelpers.MOCK_OTP,
      simulationResponse.result.referenceId,
      '212600000000',
      'QR_CODE_123'
    );
    
    logTest('Wallet to Merchant Confirmation', true, {
      status: confirmationResponse.result.item3
    });
    
    return confirmationResponse.result;
  } catch (error) {
    logTest('Wallet to Merchant', false, error.message);
    throw error;
  }
};

export const testCihQRCodeGeneration = async (contractId) => {
  console.log('\n🧪 TEST 5: QR Code Generation\n');
  
  try {
    const qrResponse = await cihWalletApi.generateDynamicQRCode(
      '212700123456',
      contractId,
      '750'
    );
    
    logTest('QR Code Generation', true, {
      token: qrResponse.result.token,
      hasBase64: !!qrResponse.result.base64Content
    });
    
    return qrResponse.result;
  } catch (error) {
    logTest('QR Code Generation', false, error.message);
    throw error;
  }
};

// ==================== SUPABASE DATABASE TESTS ====================

export const testSupabaseUserCreation = async () => {
  console.log('\n🧪 TEST 6: Supabase User Creation\n');
  
  try {
    const user = await createUser({
      supabaseUserId: '00000000-0000-0000-0000-000000000001',
      fullName: 'Test User',
      cin: 'TEST' + Date.now(),
      phone: '2127001' + Math.floor(Math.random() * 100000),
      salary: 8500
    });
    
    logTest('User Creation', true, {
      userId: user.id,
      fullName: user.full_name,
      salary: user.salary
    });
    
    return user;
  } catch (error) {
    logTest('User Creation', false, error.message);
    throw error;
  }
};

export const testSupabaseCreditCheck = async (userId) => {
  console.log('\n🧪 TEST 7: Credit Check System\n');
  
  try {
    const creditCheck = await performCreditCheck(userId, 8500, 'TEST123');
    
    logTest('Credit Check', true, {
      score: creditCheck.score,
      decision: creditCheck.decision,
      maxLimit: creditCheck.max_limit + ' MAD'
    });
    
    return creditCheck;
  } catch (error) {
    logTest('Credit Check', false, error.message);
    throw error;
  }
};

export const testSupabasePharmacies = async () => {
  console.log('\n🧪 TEST 8: Pharmacy Data Retrieval\n');
  
  try {
    const pharmacies = await getAllPharmacies();
    
    logTest('Get Pharmacies', true, {
      count: pharmacies.length,
      first: pharmacies[0]?.name
    });
    
    return pharmacies;
  } catch (error) {
    logTest('Get Pharmacies', false, error.message);
    throw error;
  }
};

export const testCompleteWorkflow = async () => {
  console.log('\n🧪 TEST 9: Complete MedAdvance Workflow\n');
  
  try {
    const pharmacies = await getAllPharmacies();
    if (pharmacies.length === 0) {
      throw new Error('No pharmacies found in database');
    }
    
    const workflowData = {
      supabaseUserId: '00000000-0000-0000-0000-000000000002',
      fullName: 'Workflow Test User',
      cin: 'WF' + Date.now(),
      phone: '2127002' + Math.floor(Math.random() * 100000),
      salary: 9000,
      pharmacyId: pharmacies[0].id,
      amount: 1500,
      receiptUrl: null
    };
    
    const result = await completeAdvanceWorkflow(workflowData);
    
    logTest('Complete Workflow', true, {
      userId: result.user.id,
      creditLimit: result.creditCheck.max_limit + ' MAD',
      transactionId: result.transaction.id,
      transactionStatus: result.transaction.status
    });
    
    return result;
  } catch (error) {
    logTest('Complete Workflow', false, error.message);
    throw error;
  }
};

export const testPaymentReminders = async (userId) => {
  console.log('\n🧪 TEST 10: Payment Reminders\n');
  
  try {
    const payments = await getUpcomingPayments(userId, 30);
    
    logTest('Get Upcoming Payments', true, {
      count: payments.length,
      nextPayment: payments[0]?.due_date
    });
    
    return payments;
  } catch (error) {
    logTest('Get Upcoming Payments', false, error.message);
    throw error;
  }
};

// ==================== RUN ALL TESTS ====================

export const runAllTests = async () => {
  console.log('\n');
  console.log('═══════════════════════════════════════════════');
  console.log('    🧪 MEDADVANCE API TEST SUITE 🧪');
  console.log('═══════════════════════════════════════════════');
  console.log('\n');
  
  try {
    // CIH Wallet API Tests
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  CIH WALLET API TESTS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const wallet = await testCihWalletCreation();
    await testCihBalanceCheck(wallet.contractId);
    await testCihCashIn(wallet.contractId);
    await testCihWalletToMerchant(wallet.contractId);
    await testCihQRCodeGeneration(wallet.contractId);
    
    // Supabase Database Tests
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  SUPABASE DATABASE TESTS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const user = await testSupabaseUserCreation();
    await testSupabaseCreditCheck(user.id);
    await testSupabasePharmacies();
    
    // Complete Workflow Test
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  COMPLETE WORKFLOW TEST');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const workflow = await testCompleteWorkflow();
    await testPaymentReminders(workflow.user.id);
    
    // Print Summary
    console.log('\n');
    console.log('═══════════════════════════════════════════════');
    console.log('    📊 TEST SUMMARY');
    console.log('═══════════════════════════════════════════════');
    console.log('\n');
    
    const passed = testResults.filter(r => r.status.includes('PASS')).length;
    const failed = testResults.filter(r => r.status.includes('FAIL')).length;
    const total = testResults.length;
    
    console.log(`Total Tests: ${total}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`Success Rate: ${((passed/total)*100).toFixed(1)}%`);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    return {
      total,
      passed,
      failed,
      results: testResults
    };
    
  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    throw error;
  }
};

// Export test results
export const getTestResults = () => testResults;