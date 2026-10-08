import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * Backend API Configuration for Mobile App.
 *
 * Automatically resolves host IP:
 * - On real physical devices running Expo Go, Constants.expoConfig?.hostUri provides the computer's LAN IP.
 * - Defaults to current local Wi-Fi IP (192.168.31.47).
 * - Fallback to 10.0.2.2 for standalone Android emulators if needed.
 */
const CURRENT_LAN_IP = '192.168.31.47';

export const getApiBaseUrl = (): string => {
  if (__DEV__) {
    // 1. Extract host IP dynamically from Expo's Metro bundler connection
    const expoHost = Constants.expoConfig?.hostUri?.split(':')[0];
    const host = (expoHost && expoHost !== 'localhost' && expoHost !== '127.0.0.1')
      ? expoHost
      : CURRENT_LAN_IP;

    if (Platform.OS === 'android') {
      return `http://${host}:8080`;
    }

    if (Platform.OS === 'ios') {
      return `http://${host}:8080`;
    }

    return 'http://localhost:8080';
  }

  // Production URL (e.g., deployed backend)
  return 'https://nirmaan-api.onrender.com';
};

export const API_BASE_URL = getApiBaseUrl();
