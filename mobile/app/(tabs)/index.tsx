import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { API_BASE_URL } from '@/src/api/config';
import axios from 'axios';

export default function HomeScreen() {
  const [backendHealth, setBackendHealth] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    setBackendHealth('checking');
    try {
      // Check actuator health first, fallback to OpenAPI docs
      const res = await axios.get(`${API_BASE_URL}/actuator/health`, { timeout: 3000 }).catch(() => null);
      if (res && (res.status === 200 || res.data?.status === 'UP')) {
        setBackendHealth('online');
        return;
      }

      const docsRes = await axios.get(`${API_BASE_URL}/v3/api-docs`, { timeout: 3000 });
      if (docsRes.status === 200) {
        setBackendHealth('online');
      } else {
        setBackendHealth('offline');
      }
    } catch {
      setBackendHealth('offline');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.brandTitle}>🏗️ Nirmaan AI</Text>
      <Text style={styles.subtitle}>Smart Construction & Labour Management</Text>

      {/* Backend Connection Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Backend Server Status</Text>
        <Text style={styles.urlText}>{API_BASE_URL}</Text>

        <View style={styles.statusRow}>
          {backendHealth === 'checking' && (
            <>
              <ActivityIndicator size="small" color="#2563eb" />
              <Text style={styles.statusChecking}> Checking connection...</Text>
            </>
          )}
          {backendHealth === 'online' && (
            <Text style={styles.statusOnline}>● Connected to Spring Boot</Text>
          )}
          {backendHealth === 'offline' && (
            <Text style={styles.statusOffline}>○ Backend Offline or Unreachable</Text>
          )}
        </View>

        <TouchableOpacity style={styles.retryButton} onPress={checkHealth}>
          <Text style={styles.retryButtonText}>Refresh Connection</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Access Tiles */}
      <View style={styles.grid}>
        <View style={styles.tile}>
          <Text style={styles.tileIcon}>👷</Text>
          <Text style={styles.tileTitle}>Workers</Text>
          <Text style={styles.tileDesc}>Directory & Skills</Text>
        </View>

        <View style={styles.tile}>
          <Text style={styles.tileIcon}>🏢</Text>
          <Text style={styles.tileTitle}>Sites</Text>
          <Text style={styles.tileDesc}>Active Projects</Text>
        </View>

        <View style={styles.tile}>
          <Text style={styles.tileIcon}>📅</Text>
          <Text style={styles.tileTitle}>Attendance</Text>
          <Text style={styles.tileDesc}>Daily Roster & Logs</Text>
        </View>

        <View style={styles.tile}>
          <Text style={styles.tileIcon}>🤖</Text>
          <Text style={styles.tileTitle}>AI Voice Log</Text>
          <Text style={styles.tileDesc}>Natural Speech Parser</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 10,
    color: '#f97316',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  urlText: {
    fontSize: 12,
    fontFamily: 'monospace',
    opacity: 0.6,
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusChecking: {
    fontSize: 14,
    color: '#38bdf8',
  },
  statusOnline: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '600',
  },
  statusOffline: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#ea580c',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  tile: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  tileIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  tileTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  tileDesc: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
    textAlign: 'center',
  },
});

