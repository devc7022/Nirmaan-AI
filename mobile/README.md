# Nirmaan AI Mobile App (Expo / React Native)

This mobile app is built with **Expo (React Native) + TypeScript**, configured to connect directly to the **Nirmaan AI Spring Boot backend**.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd mobile
npm install
```

### 2. Start the Development Server
```bash
npm start
```
or:
```bash
npx expo start
```

This will print a **QR code** in your terminal:
- **Android**: Install **Expo Go** from Google Play Store, then scan the QR code.
- **iOS**: Install **Expo Go** from the App Store, open your camera app, and scan the QR code.
- **Web preview**: Press `w` in your terminal to view in browser.
- **Android Emulator**: Press `a` in your terminal (requires Android Studio emulator).
- **iOS Simulator**: Press `i` in your terminal (requires macOS + Xcode).

---

## 🌐 Connecting to the Backend

The API client configuration is located at `src/api/config.ts`:

- **Android Emulator**: Automatically routes to `http://10.0.2.2:8080` (reaches host computer `localhost:8080`).
- **iOS Simulator / Web**: Uses `http://localhost:8080`.
- **Physical Device (Expo Go on real phone)**:
  1. Find your computer's local Wi-Fi IP address (run `ipconfig` on Windows, look for IPv4 like `192.168.1.xxx`).
  2. Open `src/api/config.ts` and set `DEV_LAN_IP = '192.168.1.xxx'`.
  3. Ensure both your phone and computer are on the same Wi-Fi network.

---

## 📦 What's Included

* **`src/api/client.ts`**: Pre-configured Axios client with:
  * Automatic `Authorization: Bearer <accessToken>` header injection.
  * Encrypted secure token storage via `expo-secure-store`.
  * Automatic `401 Unauthorized` interceptor that rotates the refresh token using `/api/public/auth/refresh`.
* **`src/api/types.ts`**: TypeScript definitions matching all Spring Boot backend entities (`WorkerResponse`, `ConstructionSiteResponse`, `AttendanceResponseDto`, `DashboardResponseDto`, etc.).
* **`src/api/index.ts`**: Complete typed API service modules:
  * `authApi.login()`, `authApi.register()`, `authApi.logout()`
  * `sitesApi.getSites()`, `sitesApi.createSite()`
  * `workersApi.getWorkers()`, `workersApi.createWorker()`
  * `attendanceApi.getAttendance()`, `attendanceApi.createAttendance()`
  * `attendanceApi.processAiAttendance()` 🤖 *(voice / natural speech transcription)*
  * `dashboardApi.getDashboard()` 📊 *(real-time site and worker KPIs)*
  * `contractorQueriesApi.submitQuery()`

---

## 🤖 Voice AI Attendance Example

In any screen, you can connect natural language input (from text or speech-to-text) directly:

```typescript
import { attendanceApi } from '@/src/api';

const handleRecordAttendance = async (speechText: string) => {
  try {
    const record = await attendanceApi.processAiAttendance({
      text: "Ramesh worked 8 hours today at Green Valley Towers"
    });
    alert(`Success: Attendance logged for ${record.workerName}`);
  } catch (error) {
    alert("Could not process attendance statement");
  }
};
```
