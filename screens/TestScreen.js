// screens/TestScreen.js
import { useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../styles/theme';
import {
    runAllTests,
    testCihWalletCreation,
    testCompleteWorkflow,
    testSupabaseUserCreation
} from '../utils/apiTester';

const { colors } = theme;

export default function TestScreen() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState(null);
  const [testOutput, setTestOutput] = useState([]);

  const captureConsole = () => {
    const originalLog = console.log;
    const logs = [];
    
    console.log = (...args) => {
      logs.push(args.join(' '));
      originalLog(...args);
    };
    
    return {
      restore: () => {
        console.log = originalLog;
      },
      getLogs: () => logs
    };
  };

  const runTests = async () => {
    setTesting(true);
    setResults(null);
    setTestOutput([]);
    
    const capture = captureConsole();
    
    try {
      const testResults = await runAllTests();
      setResults(testResults);
      setTestOutput(capture.getLogs());
    } catch (error) {
      console.error('Test failed:', error);
      setTestOutput([...capture.getLogs(), `ERROR: ${error.message}`]);
    } finally {
      capture.restore();
      setTesting(false);
    }
  };

  const runSingleTest = async (testFunction, testName) => {
    setTesting(true);
    const capture = captureConsole();
    
    try {
      await testFunction();
      setTestOutput(capture.getLogs());
    } catch (error) {
      setTestOutput([...capture.getLogs(), `ERROR in ${testName}: ${error.message}`]);
    } finally {
      capture.restore();
      setTesting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🧪 API Test Suite</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Test Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Tests</Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => runSingleTest(testCihWalletCreation, 'CIH Wallet')}
            disabled={testing}
          >
            <Text style={styles.buttonText}>Test CIH Wallet Creation</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => runSingleTest(testSupabaseUserCreation, 'Supabase User')}
            disabled={testing}
          >
            <Text style={styles.buttonText}>Test User Creation</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => runSingleTest(testCompleteWorkflow, 'Complete Workflow')}
            disabled={testing}
          >
            <Text style={styles.buttonText}>Test Complete Workflow</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.buttonPrimary]}
            onPress={runTests}
            disabled={testing}
          >
            <Text style={[styles.buttonText, styles.buttonTextWhite]}>
              {testing ? 'Running Tests...' : 'Run All Tests'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Loading Indicator */}
        {testing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00A0DC" />
            <Text style={styles.loadingText}>Running tests...</Text>
          </View>
        )}

        {/* Results Summary */}
        {results && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Test Results</Text>
            <View style={styles.resultsCard}>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Total Tests:</Text>
                <Text style={styles.resultValue}>{results.total}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Passed:</Text>
                <Text style={[styles.resultValue, styles.textSuccess]}>{results.passed}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Failed:</Text>
                <Text style={[styles.resultValue, styles.textError]}>{results.failed}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Success Rate:</Text>
                <Text style={[styles.resultValue, styles.textPrimary]}>
                  {((results.passed/results.total)*100).toFixed(1)}%
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Console Output */}
        {testOutput.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Console Output</Text>
            <View style={styles.consoleOutput}>
              {testOutput.map((log, index) => (
                <Text key={index} style={styles.consoleText}>{log}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Test Details */}
        {results && results.results && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detailed Results</Text>
            {results.results.map((result, index) => (
              <View 
                key={index} 
                style={[
                  styles.testDetailCard,
                  result.status.includes('PASS') ? styles.cardSuccess : styles.cardError
                ]}
              >
                <Text style={styles.testStatus}>{result.status}</Text>
                <Text style={styles.testName}>{result.test}</Text>
                {result.details && (
                  <Text style={styles.testDetails}>
                    {JSON.stringify(result.details, null, 2)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.card,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  buttonTextWhite: {
    color: '#FFFFFF',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textLight,
  },
  resultsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultLabel: {
    fontSize: 16,
    color: colors.textLight,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  textSuccess: {
    color: '#4CAF50',
  },
  textError: {
    color: '#F44336',
  },
  textPrimary: {
    color: '#00A0DC',
  },
  consoleOutput: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    maxHeight: 400,
  },
  consoleText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#00FF00',
    marginBottom: 4,
  },
  testDetailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  cardSuccess: {
    borderLeftColor: '#4CAF50',
  },
  cardError: {
    borderLeftColor: '#F44336',
  },
  testStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  testDetails: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: colors.textLight,
    backgroundColor: colors.background,
    padding: 8,
    borderRadius: 4,
  },
});