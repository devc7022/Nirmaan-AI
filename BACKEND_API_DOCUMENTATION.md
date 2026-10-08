# Nirmaan AI - Complete Backend API Documentation

This document contains full, production-level reference documentation for the **Nirmaan AI** Spring Boot backend. It is designed specifically for client and mobile app developers (React Native, Flutter, Swift, Kotlin, etc.) to integrate seamlessly.

---

## Table of Contents

1. [Architecture & Server Setup](#1-architecture--server-setup)
2. [Monorepo & Mobile App Folder Structure](#2-monorepo--mobile-app-folder-structure)
3. [Network & Connection Configuration for Mobile Apps](#3-network--connection-configuration-for-mobile-apps)
4. [Authentication & Security Flow](#4-authentication--security-flow)
5. [Standard Responses & Error Handling](#5-standard-responses--error-handling)
6. [Pagination & Filtering Specifications](#6-pagination--filtering-specifications)
7. [API Endpoints Reference](#7-api-endpoints-reference)
   - [Authentication APIs](#71-authentication-apis)
   - [Construction Sites APIs](#72-construction-sites-apis)
   - [Workers APIs](#73-workers-apis)
   - [Attendance APIs](#74-attendance-apis)
   - [AI-Powered Attendance API](#75-ai-powered-attendance-api)
   - [Dashboard & Analytics API](#76-dashboard--analytics-api)
   - [Contractor Queries & Leads APIs](#77-contractor-queries--leads-apis)
   - [System & Health Checks](#78-system--health-checks)
8. [Mobile Client Integration Best Practices](#8-mobile-client-integration-best-practices)

---

## 1. Architecture & Server Setup

- **Framework**: Spring Boot 3.5.x / Java 21
- **Database**: PostgreSQL
- **Default Port**: `8080`
- **Default Base URL (Local)**: `http://localhost:8080`
- **Interactive Swagger Documentation**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI 3.0 Specification**: `http://localhost:8080/v3/api-docs`

---

## 2. Monorepo & Mobile App Folder Structure

### Can you add a folder for your app here?
**Yes, absolutely!** This repository is organized as a clean multi-project monorepo. You can create a folder at the project root:

```text
Nirmaan-AI/
├── backend/                  # Spring Boot 3.5 Java Backend
├── frontend/                 # React / Next.js Web Application
├── mobile/  (or app/)        # Your new Mobile App (React Native / Expo / Flutter)
├── .gitignore
├── Dockerfile
└── BACKEND_API_DOCUMENTATION.md
```

> **Recommendation**: Name the directory **`mobile/`** or **`app/`**.
>
> If you are using **React Native / Expo**:
> ```bash
> npx create-expo-app@latest mobile
> ```
> If using **Flutter**:
> ```bash
> flutter create mobile
> ```

---

## 3. Network & Connection Configuration for Mobile Apps

When testing a mobile application against your local Spring Boot backend running on port `8080`, standard `localhost` does not point to your host computer:

| Environment | Base URL to Use |
| :--- | :--- |
| **Web Browser / Desktop** | `http://localhost:8080` |
| **Android Emulator** | `http://10.0.2.2:8080` *(10.0.2.2 aliases 127.0.0.1 on the host machine)* |
| **iOS Simulator** | `http://localhost:8080` or `http://127.0.0.1:8080` |
| **Physical Device (WiFi)** | `http://<YOUR_COMPUTER_LOCAL_IP>:8080` *(e.g. `http://192.168.1.15:8080`)* |
| **Deployed Production Server** | `https://your-api-domain.com` |

> [!NOTE]
> On physical Android or iOS devices, ensure both the mobile phone and your laptop are on the same Wi-Fi network, and Windows Firewall permits inbound connections on port 8080.

---

## 4. Authentication & Security Flow

The backend uses **Stateless JWT (JSON Web Token)** authentication.

### Token Specifications
- **Access Token**:
  - Expiry: **15 minutes** (`PT15M`)
  - Included in requests as: `Authorization: Bearer <accessToken>`
  - Payload claims: `sub` (User ID UUID), `email`, `roles` (`ROLE_CONTRACTOR`, `ROLE_SUPERVISOR`, `ROLE_ADMIN`).
- **Refresh Token**:
  - Expiry: **30 days** (`P30D`)
  - Format: Secure random string (`<UUID>.<UUID>`)
  - Storage: Single-use rotation; each time `/api/public/auth/refresh` is invoked, the current refresh token is revoked and a new access & refresh token pair is issued.

### Password Security Rule
- Minimum password length: **12 characters**
- Maximum password length: **72 characters** (BCrypt limit)

### Access Levels
- **Public Endpoints** (No token needed):
  - `/api/public/**` (Login, Register, Refresh)
  - `/api/contractor-queries` & `/api/public/contractor-queries`
  - `/swagger-ui/**`, `/v3/api-docs/**`, `/actuator/health`
- **Private Endpoints** (Bearer token required):
  - `/api/private/**`

---

## 5. Standard Responses & Error Handling

### Standard Error Response Body (`ApiError`)
When any request fails (e.g. validation error, not found, conflict), the API returns a structured JSON object:

```json
{
  "timestamp": "2026-09-17T04:45:00.123456Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/private/workers",
  "fieldErrors": {
    "name": "must not be blank",
    "hourlyRate": "must be greater than 0"
  }
}
```

### Common HTTP Status Codes
- `200 OK`: Successful read or update.
- `201 Created`: Resource successfully created.
- `204 No Content`: Successful deletion (empty body).
- `400 Bad Request`: Validation error or invalid payload format.
- `401 Unauthorized`: Token missing, expired, or invalid credentials.
- `403 Forbidden`: Authenticated user does not possess required roles.
- `404 Not Found`: Resource ID does not exist.
- `409 Conflict`: Resource already exists (e.g., duplicate email or duplicate attendance on same date).
- `500 Internal Server Error`: Unexpected server issue or AI completions failure.

---

## 6. Pagination & Filtering Specifications

All list endpoints (`GET /api/private/workers`, `GET /api/private/construction-sites`, `GET /api/private/attendance`) support Spring Data pagination:

### Query Parameters
- `page`: Page index, **0-based** (e.g., `0` is page 1, `1` is page 2). Default: `0`.
- `size`: Items per page. Default: `20`.
- `sort`: Field and direction, e.g. `createdAt,desc` or `name,asc`.

### Paginated JSON Structure
```json
{
  "content": [ /* list of item objects */ ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20,
    "sort": { "sorted": true, "unsorted": false, "empty": false },
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "totalElements": 48,
  "totalPages": 3,
  "last": false,
  "size": 20,
  "number": 0,
  "numberOfElements": 20,
  "first": true,
  "empty": false
}
```

---

## 7. API Endpoints Reference

### 7.1 Authentication APIs

Base path: `/api/public/auth`

#### 1. Register Contractor
Creates a new contractor account with default role `ROLE_CONTRACTOR`.
- **Method**: `POST`
- **URL**: `/api/public/auth/register`
- **Auth Required**: No

**Request Body**:
```json
{
  "fullName": "Aarav Sharma",
  "email": "aarav.contractor@example.com",
  "password": "Password12345!" 
}
```
*(Note: Password must be between 12 and 72 characters)*

**Response (201 Created)**:
```json
{
  "message": "User created successfully"
}
```

---

#### 2. Login
Authenticates credentials and returns JWT tokens.
- **Method**: `POST`
- **URL**: `/api/public/auth/login`
- **Auth Required**: No

**Request Body**:
```json
{
  "email": "aarav.contractor@example.com",
  "password": "Password12345!"
}
```

**Response (200 OK)**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "c92a9386-8d62-43e8-8b9e-64d55734bc1e.41ef6129-9e8a-4d78-b118-e8cb9e68c91a",
  "tokenType": "Bearer",
  "accessTokenExpiresAt": "2026-09-17T05:00:00Z",
  "roles": [
    "ROLE_CONTRACTOR"
  ]
}
```

---

#### 3. Refresh Access Token
Rotates the refresh token and returns a fresh access token.
- **Method**: `POST`
- **URL**: `/api/public/auth/refresh`
- **Auth Required**: No

**Request Body**:
```json
{
  "refreshToken": "c92a9386-8d62-43e8-8b9e-64d55734bc1e.41ef6129-9e8a-4d78-b118-e8cb9e68c91a"
}
```

**Response (200 OK)**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsIn...",
  "refreshToken": "new-refresh-token-uuid.uuid",
  "tokenType": "Bearer",
  "accessTokenExpiresAt": "2026-09-17T05:15:00Z",
  "roles": [
    "ROLE_CONTRACTOR"
  ]
}
```

---

### 7.2 Construction Sites APIs

Base path: `/api/private/construction-sites`  
*Header Required*: `Authorization: Bearer <accessToken>`

#### Allowed Status Values:
- `PLANNED`
- `ACTIVE`
- `COMPLETED`
- `ON_HOLD`

---

#### 1. Get Paginated Sites
- **Method**: `GET`
- **URL**: `/api/private/construction-sites`
- **Query Params**:
  - `name` (optional, string): Filter by site name (case-insensitive, partial match)
  - `status` (optional, string): `PLANNED`, `ACTIVE`, `COMPLETED`, `ON_HOLD`
  - `page` (optional, int, default `0`)
  - `size` (optional, int, default `20`)
  - `sort` (optional, e.g. `name,asc` or `createdAt,desc`)

**Response (200 OK)**:
```json
{
  "content": [
    {
      "id": "7fa8b9c0-1234-4567-89ab-cdef01234567",
      "name": "Green Valley Towers",
      "address": "Sector 62, Noida, UP",
      "clientName": "DLF Builders",
      "status": "ACTIVE",
      "workers": [
        {
          "id": "e2f1a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b",
          "name": "Ramesh Kumar",
          "phone": "+919876543210"
        }
      ],
      "createdAt": "2026-08-01T10:00:00Z",
      "updatedAt": "2026-09-10T12:30:00Z",
      "createdBy": "aarav.contractor@example.com",
      "updatedBy": "aarav.contractor@example.com"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "size": 20,
  "number": 0,
  "first": true,
  "last": true
}
```

---

#### 2. Get Site By ID
- **Method**: `GET`
- **URL**: `/api/private/construction-sites/{id}`
- **Path Variable**: `id` (UUID)

**Response (200 OK)**: Single site object matching the structure above.

---

#### 3. Create Construction Site
- **Method**: `POST`
- **URL**: `/api/private/construction-sites`

**Request Body**:
```json
{
  "name": "Skyline Heights Project",
  "address": "Plot 42, Knowledge Park III, Greater Noida",
  "clientName": "Apex Infra Ltd",
  "status": "ACTIVE",
  "workerIds": [
    "e2f1a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b"
  ]
}
```

**Response (201 Created)**: Created site object with generated UUID and audit timestamps.

---

#### 4. Update Construction Site
- **Method**: `PUT`
- **URL**: `/api/private/construction-sites/{id}`
- **Path Variable**: `id` (UUID)

**Request Body**:
```json
{
  "name": "Skyline Heights Project - Phase 2",
  "address": "Plot 42, Knowledge Park III, Greater Noida",
  "clientName": "Apex Infra Ltd",
  "status": "COMPLETED",
  "workerIds": []
}
```

**Response (200 OK)**: Updated site object.

---

#### 5. Delete Construction Site
- **Method**: `DELETE`
- **URL**: `/api/private/construction-sites/{id}`
- **Path Variable**: `id` (UUID)
- **Response (204 No Content)**: Empty response body.

---

### 7.3 Workers APIs

Base path: `/api/private/workers`  
*Header Required*: `Authorization: Bearer <accessToken>`

#### Allowed Status Values:
- `ACTIVE`
- `INACTIVE`
- `ON_LEAVE`

---

#### 1. Get Paginated Workers
- **Method**: `GET`
- **URL**: `/api/private/workers`
- **Query Params**:
  - `name` (optional, string): Case-insensitive partial search
  - `skill` (optional, string): Case-insensitive partial skill search (e.g. `Masonry`, `Plumbing`)
  - `status` (optional, string): `ACTIVE`, `INACTIVE`, `ON_LEAVE`
  - `page` (optional, int, default `0`)
  - `size` (optional, int, default `20`)
  - `sort` (optional, e.g. `name,asc` or `createdAt,desc`)

**Response (200 OK)**:
```json
{
  "content": [
    {
      "id": "e2f1a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b",
      "name": "Ramesh Kumar",
      "email": "ramesh.kumar@example.com",
      "phone": "+919876543210",
      "status": "ACTIVE",
      "hourlyRate": 350.00,
      "skills": [
        "Plumbing",
        "Pipefitting"
      ],
      "siteId": "7fa8b9c0-1234-4567-89ab-cdef01234567",
      "siteName": "Green Valley Towers",
      "createdAt": "2026-08-01T10:15:00Z",
      "updatedAt": "2026-09-02T11:00:00Z",
      "createdBy": "aarav.contractor@example.com",
      "updatedBy": "aarav.contractor@example.com"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "size": 20,
  "number": 0
}
```

---

#### 2. Get Worker By ID
- **Method**: `GET`
- **URL**: `/api/private/workers/{id}`
- **Path Variable**: `id` (UUID)

**Response (200 OK)**: Single worker object matching schema above.

---

#### 3. Create Worker
- **Method**: `POST`
- **URL**: `/api/private/workers`

**Request Body**:
```json
{
  "name": "Suresh Patel",
  "email": "suresh.patel@example.com",
  "phone": "+919811223344",
  "status": "ACTIVE",
  "hourlyRate": 400.00,
  "skills": [
    "Carpentry",
    "Roofing"
  ],
  "siteId": "7fa8b9c0-1234-4567-89ab-cdef01234567"
}
```
*(Note: `email` is optional, but if provided, must be unique across workers. `siteId` is optional).*

**Response (201 Created)**: Created worker object.

---

#### 4. Update Worker
- **Method**: `PUT`
- **URL**: `/api/private/workers/{id}`
- **Path Variable**: `id` (UUID)

**Request Body**: Same schema as Create Worker.  
**Response (200 OK)**: Updated worker object.

---

#### 5. Delete Worker
- **Method**: `DELETE`
- **URL**: `/api/private/workers/{id}`
- **Path Variable**: `id` (UUID)  
- **Response (204 No Content)**: Empty response body.

---

### 7.4 Attendance APIs

Base path: `/api/private/attendance`  
*Header Required*: `Authorization: Bearer <accessToken>`

#### 1. Get Paginated Attendance
- **Method**: `GET`
- **URL**: `/api/private/attendance`
- **Query Params**:
  - `workerId` (optional, UUID)
  - `siteId` (optional, UUID)
  - `attendanceDate` (optional, format `YYYY-MM-DD`, e.g. `2026-09-17`)
  - `present` (optional, boolean: `true` / `false`)
  - `page` (optional, default `0`)
  - `size` (optional, default `20`)
  - `sort` (optional, default `attendanceDate,desc`)

**Response (200 OK)**:
```json
{
  "content": [
    {
      "id": "98765432-abcd-ef01-2345-6789abcdef01",
      "workerId": "e2f1a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b",
      "workerName": "Ramesh Kumar",
      "siteId": "7fa8b9c0-1234-4567-89ab-cdef01234567",
      "siteName": "Green Valley Towers",
      "attendanceDate": "2026-09-17",
      "hoursWorked": 8.0,
      "present": true,
      "remarks": "Completed 4th floor plumbing inspection",
      "createdAt": "2026-09-17T09:00:00Z",
      "updatedAt": "2026-09-17T09:00:00Z"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "size": 20,
  "number": 0
}
```

---

#### 2. Get Attendance By ID
- **Method**: `GET`
- **URL**: `/api/private/attendance/{id}`
- **Path Variable**: `id` (UUID)

**Response (200 OK)**: Single attendance object.

---

#### 3. Log / Create Attendance Record
- **Method**: `POST`
- **URL**: `/api/private/attendance`

**Request Body**:
```json
{
  "workerId": "e2f1a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b",
  "siteId": "7fa8b9c0-1234-4567-89ab-cdef01234567",
  "attendanceDate": "2026-09-17",
  "hoursWorked": 8.5,
  "present": true,
  "remarks": "Overtime worked on pillar casting"
}
```
*Constraints*:
- `hoursWorked`: Between `0.0` and `24.0`
- `remarks`: Max 500 characters
- Duplicate check: Worker + Site + AttendanceDate must be unique (otherwise `409 Conflict`).

**Response (201 Created)**: Created attendance object.

---

#### 4. Update Attendance Record
- **Method**: `PUT`
- **URL**: `/api/private/attendance/{id}`
- **Path Variable**: `id` (UUID)

**Request Body**: Same schema as Create Attendance.  
**Response (200 OK)**: Updated attendance object.

---

#### 5. Soft Delete Attendance Record
- **Method**: `DELETE`
- **URL**: `/api/private/attendance/{id}`
- **Path Variable**: `id` (UUID)  
- **Response (204 No Content)**: Empty response body.

---

### 7.5 AI-Powered Attendance API

Nirmaan includes an AI parsing service (powered by Gemini via OpenAI-compatible endpoints) that converts natural speech or casual text input directly into verified database attendance entries!

- **Method**: `POST`
- **URL**: `/api/private/attendance/ai`
- **Header Required**: `Authorization: Bearer <accessToken>`

**Request Body**:
```json
{
  "text": "Ramesh worked 8.5 hours today at Green Valley Towers doing electrical fitting"
}
```

**What the backend does internally**:
1. Analyzes the text statement with AI.
2. Extracts worker name, site name, date (resolves 'today', 'yesterday', or specific dates), hours, present flag, and remarks.
3. Performs fuzzy database resolution to identify `workerId` and `siteId`.
4. Saves and returns the created attendance record.

**Response (201 Created)**:
```json
{
  "id": "98765432-abcd-ef01-2345-6789abcdef01",
  "workerId": "e2f1a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b",
  "workerName": "Ramesh Kumar",
  "siteId": "7fa8b9c0-1234-4567-89ab-cdef01234567",
  "siteName": "Green Valley Towers",
  "attendanceDate": "2026-09-17",
  "hoursWorked": 8.5,
  "present": true,
  "remarks": "electrical fitting",
  "createdAt": "2026-09-17T10:15:00Z",
  "updatedAt": "2026-09-17T10:15:00Z"
}
```

**Error Scenarios**:
- `400 Bad Request`: Cannot resolve worker or site name from text, or multiple matching workers exist.
- `409 Conflict`: Attendance already logged for this worker on this date.
- `500 Internal Server Error`: LLM service unreachable.

---

### 7.6 Dashboard & Analytics API

Returns consolidated KPIs, site metrics, costs, and recent records in a single fast call. Ideal for your mobile app's Home / Dashboard screen!

- **Method**: `GET`
- **URL**: `/api/private/dashboard`
- **Header Required**: `Authorization: Bearer <accessToken>`

**Response (200 OK)**:
```json
{
  "workerStatistics": {
    "totalWorkers": 42,
    "activeWorkers": 38,
    "inactiveWorkers": 4
  },
  "attendanceStatistics": {
    "presentToday": 35,
    "absentToday": 7,
    "attendancePercentage": 83.33
  },
  "siteStatistics": {
    "totalSites": 6,
    "activeSites": 4,
    "completedSites": 2
  },
  "labourStatistics": {
    "todayLabourCost": 98000.00,
    "weeklyLabourCost": 645000.00,
    "monthlyLabourCost": 2580000.00,
    "averageHoursWorkedToday": 7.8
  },
  "recentAttendance": [
    {
      "workerName": "Ramesh Kumar",
      "siteName": "Green Valley Towers",
      "date": "2026-09-17",
      "hoursWorked": 8.0,
      "present": true
    }
  ],
  "topSites": [
    {
      "siteName": "Green Valley Towers",
      "presentWorkerCount": 18
    },
    {
      "siteName": "Skyline Heights",
      "presentWorkerCount": 12
    }
  ],
  "skillDistribution": {
    "Masonry": 15,
    "Plumbing": 8,
    "Electrical": 7,
    "Carpentry": 6,
    "Welding": 4
  }
}
```

---

### 7.7 Contractor Queries & Leads APIs

Enables prospective contractors to submit manpower requirements (e.g., from an onboarding landing screen or app inquiry form). Automatically sends an email notification via Spring Mail.

#### 1. Submit Query / Requirement (Public)
- **Method**: `POST`
- **URL**: `/api/contractor-queries` or `/api/public/contractor-queries`
- **Auth Required**: No

**Request Body**:
```json
{
  "contractorName": "Vikas Singhal",
  "companyName": "Singhal Construction Corp",
  "mobileNumber": "+919876543299",
  "email": "vikas@singhalconstruction.in",
  "projectName": "Metro Phase 4 Extension",
  "projectLocation": "New Delhi",
  "siteAddress": "Pillar 140 to 180, Outer Ring Road",
  "manpowerRequirements": [
    {
      "workerType": "Steel Fixer",
      "quantity": 10
    },
    {
      "workerType": "Shuttering Carpenter",
      "quantity": 8
    }
  ],
  "workStartDate": "2026-10-01",
  "expectedDuration": "3 months",
  "workingDays": 90,
  "workDescription": "Viaduct superstructure reinforcement casting",
  "specialInstructions": "Night shift work permits required"
}
```

**Response (201 Created)**:
```json
{
  "id": "11223344-5566-7788-99aa-bbccddeeff00",
  "contractorName": "Vikas Singhal",
  "companyName": "Singhal Construction Corp",
  "mobileNumber": "+919876543299",
  "email": "vikas@singhalconstruction.in",
  "projectName": "Metro Phase 4 Extension",
  "projectLocation": "New Delhi",
  "siteAddress": "Pillar 140 to 180, Outer Ring Road",
  "manpowerRequirements": [
    { "workerType": "Steel Fixer", "quantity": 10 },
    { "workerType": "Shuttering Carpenter", "quantity": 8 }
  ],
  "workStartDate": "2026-10-01",
  "expectedDuration": "3 months",
  "workingDays": 90,
  "workDescription": "Viaduct superstructure reinforcement casting",
  "specialInstructions": "Night shift work permits required",
  "status": "SUBMITTED",
  "createdAt": "2026-09-17T10:18:00Z",
  "emailSent": true,
  "message": "Contractor requirement submitted successfully"
}
```

#### 2. Get All Submitted Queries (Private / Admin)
- **Method**: `GET`
- **URL**: `/api/private/contractor-queries`
- **Header Required**: `Authorization: Bearer <accessToken>`
- **Response (200 OK)**: Array of query objects.

#### 3. Get Query By ID (Private / Admin)
- **Method**: `GET`
- **URL**: `/api/private/contractor-queries/{id}`
- **Header Required**: `Authorization: Bearer <accessToken>`
- **Response (200 OK)**: Single query object.

---

### 7.8 System & Health Checks

- **Health Check**:
  - `GET /actuator/health`
  - Returns `{"status":"UP"}`
- **Swagger UI**:
  - `GET /swagger-ui.html`
- **OpenAPI Schema**:
  - `GET /v3/api-docs`

---

## 8. Mobile Client Integration Best Practices

When building your mobile app (React Native, Flutter, Swift, or Kotlin), adhere to these battle-tested patterns:

### 1. Token Persistence
- Store the `accessToken` in memory or in secure encrypted storage.
- Store the `refreshToken` in OS-level secure storage:
  - **React Native**: `expo-secure-store` or `react-native-keychain`
  - **Flutter**: `flutter_secure_storage`
  - **Android Native**: `EncryptedSharedPreferences`
  - **iOS Native**: Keychain Services

### 2. Automatic Token Refresh (Axios Interceptor Example)
```typescript
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080', // Replace with your IP/emulator address
});

// Attach Access Token to every outgoing request
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept 401 Unauthorized to automatically refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post('http://10.0.2.2:8080/api/public/auth/refresh', {
          refreshToken,
        });

        await SecureStore.setItemAsync('accessToken', data.accessToken);
        await SecureStore.setItemAsync('refreshToken', data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Token expired or invalid: logout user and redirect to login screen
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Voice / Natural Language AI Attendance UI
In your mobile app, you can add a **microphone button** using the device's Speech-to-Text library (e.g. `expo-speech-recognition` or `@react-native-voice/voice`). Once the contractor speaks (e.g., *"Suresh worked 8 hours today at Sector 62"*), send that transcript directly to:
```http
POST /api/private/attendance/ai
Content-Type: application/json

{
  "text": "Suresh worked 8 hours today at Sector 62"
}
```
The server will handle entity resolution and record creation in one step.
