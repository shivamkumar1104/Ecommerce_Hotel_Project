# 🏨 Equalirio — Eco Luxury Hotel & Sanctuary Spa

> A full-stack luxury hotel management and booking platform built for production freelancing deployment.

![Equalirio Hotel](https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- 🏠 **Suite Showcase** with filtering, availability check, and real-time pricing
- 📅 **Multi-Step Booking Flow** (4-step: Suite → Add-ons → Guest Info → Confirmation)
- 🔐 **Authentication** — Email/password + Google OAuth + JWT
- 👤 **Role-Based Access** — Guest and Admin roles
- ⭐ **Reviews System** with verified stays and rating aggregation
- 🍽 **Dining Reservations** with time-slot capacity management
- 🌍 **Multi-language** support (Google Translate integration)
- 💱 **Multi-currency** display
- 📱 **Fully Responsive** — mobile-first design

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS 3, Lucide React |
| **Backend** | Node.js (ES Modules), Express 5, Mongoose 9 |
| **Database** | MongoDB Atlas |
| **Auth** | JWT, bcrypt, Google OAuth 2.0 |
| **Security** | Helmet, CORS whitelist, Rate Limiting |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)
- Google Cloud Console project (for OAuth)

### 1. Clone & Install

```bash
# Clone the repo
git clone <your-repo-url>
cd hotel

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment Variables

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB URL, JWT secret, Google Client ID
```

```bash
# Frontend
cd frontend
cp .env.example .env
# Edit .env with your API URL and Google Client ID
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

### 4. Start Development Servers

```bash
# Terminal 1 — Backend (port 5000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/google` | Public |
| GET | `/api/auth/me` | Protected |
| PUT | `/api/auth/profile` | Protected |

### Suites
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/suites` | Public |
| GET | `/api/suites/:id` | Public |
| GET | `/api/suites/:id/availability` | Public |
| POST | `/api/suites` | Admin |
| PUT | `/api/suites/:id` | Admin |
| DELETE | `/api/suites/:id` | Admin |

### Bookings
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/bookings` | Protected |
| GET | `/api/bookings/my` | Protected |
| GET | `/api/bookings/:id` | Protected (owner/admin) |
| PATCH | `/api/bookings/:id/cancel` | Protected (owner/admin) |
| GET | `/api/bookings` | Admin |
| PATCH | `/api/bookings/:id/status` | Admin |

### Reviews
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/reviews` | Public |
| GET | `/api/reviews/suite/:suiteId` | Public |
| POST | `/api/reviews` | Protected |
| PUT | `/api/reviews/:id` | Protected (owner) |
| DELETE | `/api/reviews/:id` | Protected (owner/admin) |
| POST | `/api/reviews/:id/respond` | Admin |

### Dining
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/dining` | Public |
| GET | `/api/dining/my` | Protected |
| PATCH | `/api/dining/:id/cancel` | Protected |
| GET | `/api/dining` | Admin |
| PATCH | `/api/dining/:id/status` | Admin |

---

## 🆓 Free Hosting Deployment

| Service | Purpose | Cost |
|---|---|---|
| **Vercel** | Frontend | Free |
| **Render.com** | Backend | Free |
| **MongoDB Atlas** | Database | Free (512MB) |
| **Cloudinary** | Images | Free |
| **Resend** | Email | Free (100/day) |

**Total: $0/month**

---

## 📁 Project Structure

```
hotel/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # Express routes
│   │   ├── middlewares/   # Auth, rate limiting, validation
│   │   ├── utils/         # Helpers (token, response, bookingId)
│   │   └── scripts/       # seed.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/    # UI components
    │   ├── services/      # API service layer (api.js)
    │   └── data/          # Fallback static data
    ├── .env.example
    └── package.json
```

---

## 🔒 Security Features

- JWT with no hardcoded fallback secrets
- CORS strict whitelist
- Rate limiting (auth: 10/15min, API: 100/min, booking: 20/hr)
- Helmet security headers
- Request body size limit (10kb)
- bcrypt password hashing (rounds: 12)
- Role-based access control

---

*Built with ❤️ for freelancing — production-ready Equalirio Hotel Platform*
