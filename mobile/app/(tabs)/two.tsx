import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { attendanceApi, AttendanceResponseDto } from '@/src/api';

export default function AttendanceScreen() {
  const [statement, setStatement] = useState('Ramesh worked 8 hours today at Site A');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AttendanceResponseDto | null>(null);

  const handleProcessAi = async () => {
    if (!statement.trim()) {
      Alert.alert('Empty Input', 'Please enter or speak an attendance statement.');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const response = await attendanceApi.processAiAttendance({ text: statement.trim() });
      setResult(response);
      Alert.alert('Success', `Recorded attendance for ${response.workerName}!`);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Could not parse attendance statement. Ensure backend is running.';
      Alert.alert('Error Processing', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🤖 AI Natural Speech Attendance</Text>
      <Text style={styles.subtitle}>
        Speak or type casual attendance. The AI extracts worker name, site, date, and hours
        automatically.
      </Text>

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>Natural Language Statement:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Suresh worked 9 hours today at Skyline Heights"
          placeholderTextColor="#64748b"
          value={statement}
          onChangeText={setStatement}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleProcessAi}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>✨ Process with Nirmaan AI</Text>
          )}
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultHeader}>✅ Record Created</Text>
          <Text style={styles.resultLine}>Worker: <Text style={styles.bold}>{result.workerName}</Text></Text>
          <Text style={styles.resultLine}>Site: <Text style={styles.bold}>{result.siteName}</Text></Text>
          <Text style={styles.resultLine}>Date: <Text style={styles.bold}>{result.attendanceDate}</Text></Text>
          <Text style={styles.resultLine}>Hours: <Text style={styles.bold}>{result.hoursWorked} hrs</Text></Text>
          {result.remarks ? (
            <Text style={styles.resultLine}>Remarks: <Text style={styles.bold}>{result.remarks}</Text></Text>
          ) : null}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f97316',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.7,
    marginVertical: 10,
    textAlign: 'center',
    lineHeight: 18,
  },
  inputCard: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginVertical: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 8,
    padding: 12,
    color: '#e2e8f0',
    backgroundColor: '#0f172a',
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 70,
    marginBottom: 14,
  },
  submitButton: {
    backgroundColor: '#ea580c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  resultCard: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
  },
  resultHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: '#22c55e',
    marginBottom: 8,
  },
  resultLine: {
    fontSize: 14,
    marginVertical: 2,
  },
  bold: {
    fontWeight: '700',
  },
});

