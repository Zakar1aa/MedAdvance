// test/testCihApi.js
import { cihWalletApi, mockHelpers } from '../services/cihWalletApi';

export const testAllEndpoints = async () => {
  console.log('🧪 Testing CIH Wallet Mock API...\n');
  
  try {
    // Test 1: Create Wallet
    console.log('1️⃣ Testing Wallet Creation...');
    const walletPre = await cihWalletApi.createWalletPreSubscription({
      phoneNumber: '212700446631',
      phoneOperator: 'IAM',
      clientFirstName: 'Fatima',
      clientLastName: 'Benali',
      email: 'fatima@example.com',
      dateOfBirth: '01011990',
      clientAddress: 'Rabat',
      gender: 'F',
      legalId: 'BK12345'
    });
    console.log('✅ Token:', walletPre.result.token);
    console.log('✅ OTP:', walletPre.result.otp);
    
    // Test 2: Activate Wallet
    console.log('\n2️⃣ Testing Wallet Activation...');
    const activation = await cihWalletApi.activateWallet(
      walletPre.result.token,
      mockHelpers.MOCK_OTP
    );
    console.log('✅ Contract ID:', activation.result.contractId);
    
    // Test 3: Get Balance
    console.log('\n3️⃣ Testing Balance Check...');
    const balance = await cihWalletApi.getWalletBalance(activation.result.contractId);
    console.log('✅ Balance:', balance.result.balance[0].value);
    
    // Test 4: Cash IN
    console.log('\n4️⃣ Testing Cash IN...');
    const cashInSim = await cihWalletApi.cashInSimulation(
      activation.result.contractId,
      '212700446631',
      '1000'
    );
    console.log('✅ Token:', cashInSim.result.token);
    
    const cashInConf = await cihWalletApi.cashInConfirmation(
      cashInSim.result.token,
      '1000'
    );
    console.log('✅ Transaction Ref:', cashInConf.result.transactionReference);
    
    // Test 5: Wallet to Merchant
    console.log('\n5️⃣ Testing Wallet to Merchant...');
    const w2mSim = await cihWalletApi.walletToMerchantSimulation(
      activation.result.contractId,
      '500',
      '212600000000'
    );
    console.log('✅ Reference:', w2mSim.result.referenceId);
    
    console.log('\n✅ All tests passed!');
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
};