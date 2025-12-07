const MOCK_DELAY = 1000; // Simulate network delay

// Helper to simulate API delay
const mockDelay = () => new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

// Generate mock transaction reference
const generateReference = () => {
  return Math.random().toString(36).substring(2, 12).toUpperCase();
};

// Generate mock contract ID
const generateContractId = () => {
  return 'LAN' + Date.now().toString().substring(5);
};

// Generate mock token
const generateToken = () => {
  return 'TR' + Date.now().toString();
};

export const cihWalletApi = {
  // ==================== 4.1 - CREATE WALLET ====================
  
  // 4.1.1 - Wallet Pre-registration
  async createWalletPreSubscription(userData) {
    await mockDelay();
    
    console.log('📝 CIH API: Wallet Pre-registration', userData);
    
    return {
      result: {
        activityArea: null,
        addressLine1: userData.clientAddress || "",
        addressLine2: null,
        addressLine3: null,
        addressLine4: null,
        agenceId: "211",
        averageIncome: null,
        birthDay: null,
        channelId: "P",
        city: null,
        country: null,
        dateOfBirth: userData.dateOfBirth || "",
        distributeurId: "000104",
        documentExpiryDate1: null,
        documentExpiryDate2: null,
        documentScan1: "",
        documentScan2: "",
        documentType1: "",
        documentType2: null,
        email: userData.email || "",
        familyStatus: null,
        firstName: userData.clientFirstName,
        fonction: null,
        gender: userData.gender || "",
        institutionId: "0001",
        landLineNumber: null,
        lastName: userData.clientLastName,
        legalId1: userData.legalId || "",
        legalId2: null,
        level: null,
        mailaddress: null,
        mobileNumber: userData.phoneNumber,
        nationalite: null,
        numberofchildren: null,
        optField1: null,
        optField2: null,
        otp: "123456",
        phoneNumber: null,
        placeOfBirth: userData.placeOfBirth || "",
        postCode: null,
        productId: "000",
        productTypeId: "000",
        profession: null,
        provider: userData.phoneOperator || "INWI",
        raisonSocial: null,
        region: null,
        registrationDate: null,
        title: null,
        token: generateToken()
      }
    };
  },

  // 4.1.2 - Wallet Activation
  async activateWallet(token, otp) {
    await mockDelay();
    
    console.log('✅ CIH API: Wallet Activation', { token, otp });
    
    // Simulate OTP validation
    if (otp !== "123456") {
      return {
        error: "Invalid OTP",
        status: 400
      };
    }
    
    return {
      result: {
        contractId: generateContractId(),
        reference: "",
        level: "000",
        rib: "853780241716465970216211"
      }
    };
  },

  // ==================== 4.2 - CUSTOMER INFO ====================
  
  async getClientInfo(phoneNumber, identificationType, identificationNumber) {
    await mockDelay();
    
    console.log('👤 CIH API: Get Client Info', { phoneNumber });
    
    return {
      result: {
        adressLine1: "123 Rue Mohammed V",
        city: "Rabat",
        contractId: null,
        country: "MAR",
        description: null,
        email: "user@example.com",
        numberOfChildren: null,
        phoneNumber: phoneNumber,
        pidNUmber: null,
        pidType: identificationType,
        products: [
          {
            abbreviation: null,
            contractId: generateContractId(),
            description: null,
            email: "user@example.com",
            level: "000",
            name: "CDP BASIC",
            phoneNumber: phoneNumber,
            productTypeId: "000",
            productTypeName: "PARTICULIER",
            provider: "ORANGE",
            rib: "853455230818452878570832",
            solde: "0.00",
            statusId: "1",
            tierType: "03",
            uid: "000"
          }
        ],
        radical: "",
        soldeCumule: "0.00",
        statusId: null,
        tierFirstName: "Fatima",
        tierId: generateToken(),
        tierLastName: "Benali",
        userName: null,
        familyStatus: null
      }
    };
  },

  // ==================== 4.3 - TRANSACTION HISTORY ====================
  
  async getTransactionHistory(contractId) {
    await mockDelay();
    
    console.log('📜 CIH API: Transaction History', { contractId });
    
    return {
      result: [
        {
          amount: "500.00",
          Fees: "4",
          beneficiaryFirstName: "Pharmacie",
          beneficiaryLastName: "Al Andalous",
          beneficiaryRIB: null,
          clientNote: "Achat médicaments",
          contractId: null,
          currency: "MAD",
          date: new Date().toLocaleString(),
          dateToCompare: "0001-01-01T00:00:00Z",
          frais: [],
          numTel: null,
          operation: null,
          referenceId: generateReference(),
          sign: null,
          srcDestNumber: "212700446631",
          status: "000",
          totalAmount: "500.00",
          totalFrai: "25.00",
          type: "MMD",
          isCanceled: false,
          isTierCashIn: false,
          totalPage: 1
        }
      ]
    };
  },

  // ==================== 4.4 - BALANCE CONSULTATION ====================
  
  async getWalletBalance(contractId) {
    await mockDelay();
    
    console.log('💰 CIH API: Get Balance', { contractId });
    
    return {
      result: {
        balance: [
          {
            value: "2500.00"
          }
        ]
      }
    };
  },

  // ==================== 4.5 - CASH IN ====================
  
  // 4.5.1 - Cash IN Simulation
  async cashInSimulation(contractId, phoneNumber, amount) {
    await mockDelay();
    
    console.log('💵 CIH API: Cash IN Simulation', { contractId, amount });
    
    return {
      result: {
        Fees: "0.0",
        feeDetail: "[{Nature:\"COM\",InvariantFee:0.000,VariantFee:0.0000000}]",
        token: generateToken(),
        amountToCollect: parseFloat(amount),
        isTier: true,
        cardId: contractId,
        transactionId: Date.now().toString(),
        benFirstName: "User",
        benLastName: "Name"
      }
    };
  },

  // 4.5.2 - Cash IN Confirmation
  async cashInConfirmation(token, amount) {
    await mockDelay();
    
    console.log('✅ CIH API: Cash IN Confirmation', { token, amount });
    
    return {
      result: {
        Fees: "0.0",
        feeDetails: null,
        token: token,
        amount: parseFloat(amount),
        transactionReference: generateReference(),
        optFieldOutput1: null,
        optFieldOutput2: null,
        cardId: generateContractId()
      }
    };
  },

  // ==================== 4.6 - CASH OUT ====================
  
  // 4.6.1 - Cash OUT Simulation
  async cashOutSimulation(phoneNumber, amount) {
    await mockDelay();
    
    console.log('💸 CIH API: Cash OUT Simulation', { phoneNumber, amount });
    
    return {
      result: {
        Fees: "0.0",
        token: generateToken(),
        amountToCollect: parseFloat(amount),
        cashOut_Max: 5000,
        optFieldOutput1: null,
        optFieldOutput2: null,
        cardId: generateContractId(),
        transactionId: Date.now().toString(),
        feeDetail: "[{Nature:\"COM\",InvariantFee:0.000,VariantFee:0.0000000}]"
      }
    };
  },

  // 4.6.2 - Cash OUT OTP
  async cashOutOTP(phoneNumber) {
    await mockDelay();
    
    console.log('📱 CIH API: Cash OUT OTP', { phoneNumber });
    
    return {
      result: [
        {
          codeOtp: "123456"
        }
      ]
    };
  },

  // 4.6.3 - Cash OUT Confirmation
  async cashOutConfirmation(token, phoneNumber, otp, amount) {
    await mockDelay();
    
    console.log('✅ CIH API: Cash OUT Confirmation', { token, amount });
    
    if (otp !== "123456") {
      return {
        error: "Invalid OTP",
        status: 400
      };
    }
    
    return {
      result: {
        Fees: "0.0",
        feeDetails: null,
        token: token,
        amount: parseFloat(amount),
        transactionReference: generateReference(),
        optFieldOutput1: null,
        optFieldOutput2: null,
        cardId: generateContractId()
      }
    };
  },

  // ==================== 4.7 - WALLET TO WALLET ====================
  
  // 4.7.1 - Wallet to Wallet Simulation
  async walletToWalletSimulation(contractId, amount, destinationPhone, clientNote) {
    await mockDelay();
    
    console.log('💱 CIH API: Wallet to Wallet Simulation', { amount, destinationPhone });
    
    const fee = parseFloat(amount) * 0.01; // 1% fee
    
    return {
      result: {
        amount: amount,
        Fees: fee.toFixed(2),
        beneficiaryFirstName: "Destination",
        beneficiaryLastName: "User",
        beneficiaryRIB: null,
        clientNote: clientNote || "",
        contractId: null,
        currency: null,
        date: null,
        dateToCompare: "0001-01-01T00:00:00Z",
        frais: [
          {
            currency: "MAD",
            fullName: "",
            name: "COM",
            referenceId: generateReference(),
            value: fee
          }
        ],
        numTel: null,
        operation: null,
        referenceId: generateReference(),
        sign: null,
        srcDestNumber: null,
        status: null,
        totalAmount: (parseFloat(amount) + fee).toFixed(2),
        totalFrai: fee.toFixed(2),
        type: "TT",
        isCanceled: false,
        isTierCashIn: false
      }
    };
  },

  // 4.7.2 - Wallet to Wallet OTP
  async walletToWalletOTP(phoneNumber) {
    await mockDelay();
    
    console.log('📱 CIH API: Wallet to Wallet OTP', { phoneNumber });
    
    return {
      result: [
        {
          codeOtp: "123456"
        }
      ]
    };
  },

  // 4.7.3 - Wallet to Wallet Confirmation
  async walletToWalletConfirmation(contractId, otp, referenceId, destinationPhone) {
    await mockDelay();
    
    console.log('✅ CIH API: Wallet to Wallet Confirmation', { referenceId });
    
    if (otp !== "123456") {
      return {
        error: "Invalid OTP",
        status: 400
      };
    }
    
    return {
      result: {
        item1: {
          creditAmounts: null,
          debitAmounts: null,
          depot: null,
          retrait: null,
          value: "-500.00"
        },
        item2: "000",
        item3: "Successful"
      }
    };
  },

  // ==================== 4.10 - WALLET TO MERCHANT ====================
  
  // 4.10.1 - Wallet to Merchant Simulation
  async walletToMerchantSimulation(clientContractId, amount, merchantPhoneNumber) {
    await mockDelay();
    
    console.log('🏪 CIH API: Wallet to Merchant Simulation', { amount, merchantPhoneNumber });
    
    return {
      result: {
        amount: amount,
        beneficiaryFirstName: "Pharmacie",
        beneficiaryLastName: "Al Andalous",
        beneficiaryRIB: null,
        clientNote: "Paiement pharmacie",
        contractId: null,
        currency: null,
        date: null,
        dateToCompare: "0001-01-01T00:00:00Z",
        frais: [],
        numTel: null,
        operation: null,
        referenceId: generateReference(),
        sign: null,
        srcDestNumber: null,
        status: null,
        totalAmount: amount,
        totalFrai: "0",
        type: "TM",
        isCanceled: false,
        isTierCashIn: false,
        feeDetails: null,
        token: null,
        optFieldOutput1: null,
        optFieldOutput2: null,
        cardId: null,
        isSwitch: false
      }
    };
  },

  // 4.10.2 - Wallet to Merchant OTP
  async walletToMerchantOTP(phoneNumber) {
    await mockDelay();
    
    console.log('📱 CIH API: Wallet to Merchant OTP', { phoneNumber });
    
    return {
      result: [
        {
          codeOtp: "123456"
        }
      ]
    };
  },

  // 4.10.3 - Wallet to Merchant Confirmation
  async walletToMerchantConfirmation(clientContractId, otp, referenceId, destinationPhone, qrCode) {
    await mockDelay();
    
    console.log('✅ CIH API: Wallet to Merchant Confirmation', { referenceId });
    
    if (otp !== "123456") {
      return {
        error: "Invalid OTP",
        status: 400
      };
    }
    
    return {
      result: {
        item1: {
          creditAmounts: null,
          debitAmounts: null,
          depot: null,
          retrait: null,
          value: "-500.00",
          transactionId: null,
          cardId: null,
          optFieldOutput2: null,
          optFieldOutput1: null,
          transactionReference: null,
          amount: null,
          token: null,
          fee: null,
          feeDetails: null
        },
        item2: "000",
        item3: "Successful"
      }
    };
  },

  // ==================== 4.13 - DYNAMIC QR CODE ====================
  
  async generateDynamicQRCode(phoneNumber, contractId, amount) {
    await mockDelay();
    
    console.log('📱 CIH API: Generate Dynamic QR Code', { phoneNumber, amount });
    
    // Generate a mock QR code base64 string (small placeholder)
    const mockQRBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    
    return {
      result: {
        phoneNumber: phoneNumber,
        reference: "",
        token: generateReference(),
        base64Content: mockQRBase64,
        binaryContent: "000201010212269300325bb66a92d69c0ea742dd4f754590fa0a020110501006"
      }
    };
  }
};

// Export helper for testing
export const mockHelpers = {
  generateReference,
  generateContractId,
  generateToken,
  MOCK_OTP: "123456"
};