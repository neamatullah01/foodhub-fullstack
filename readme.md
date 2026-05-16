# FoodHub 🍔 — Multi-Vendor Food Delivery Platform

> Connecting customers with local food providers through a seamless ordering experience, complete with role-based dashboards for Customers, Providers, and Administrators.

---

## 🚩 Problem Statement

Local food providers lack a centralized platform to reach customers digitally. Customers have no unified way to browse multiple vendors, compare meals, and place orders — while admins have no tools to oversee and manage the ecosystem. FoodHub fills that gap.

---

## 💡 Solution Overview

FoodHub is a full-stack multi-vendor food delivery platform where:

- **Customers** browse, filter, order, and review meals from multiple providers
- **Providers** manage their menus, track incoming orders, and update statuses in real time
- **Admins** oversee all users, orders, and platform-wide categories from a central dashboard

---

## 🛠️ Tech Stack

| Layer        | Technology                                     |
| ------------ | ---------------------------------------------- |
| Frontend     | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend      | Node.js, Express.js, TypeScript                |
| Database     | PostgreSQL + Prisma ORM                        |
| Auth         | Better Auth (cross-domain cookies, RBAC)       |
| UI Utilities | Lucide React (icons), Sonner (toasts)          |

---

## ✨ Key Features

### 🌍 Public
- Browse all available meals and providers
- Filter by cuisine, dietary preferences, and price
- View detailed provider profiles and their menus

### 👤 Customer
- Secure registration and login
- Dynamic shopping cart
- Place orders with delivery address (Cash on Delivery supported)
- Track active order status in real time
- Leave reviews and ratings after ordering
- Manage personal profile

### 🏪 Provider
- Secure provider registration and login
- Add, edit, and remove menu items
- View and manage incoming orders in real time
- Update order statuses: `Pending` → `Processing` → `Delivered`
- Personalized provider dashboard

### 🛡️ Admin
- View and manage all customers and providers
- Suspend or activate user accounts
- Global order overview across all vendors
- Manage platform-wide food categories

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- PostgreSQL installed and running

### 1. Clone the Repository
```bash
git clone https://github.com/neamatullah01/foodhub-fullstack.git
cd foodhub-fullstack
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory — see [Environment Variables](#-environment-variables) below.

```bash
# Generate Prisma client and push schema
npx prisma generate
npx prisma db push

# Start the dev server
npm run dev
```

The API will be running at `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory — see [Environment Variables](#-environment-variables) below.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Environment Variables

### Backend — `backend/.env`
```env
# Database
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/foodhub?schema=public"

# Server
PORT=5000

# Better Auth
BETTER_AUTH_URL="http://localhost:5000"
BETTER_AUTH_SECRET="generate-a-random-secret-key-here"
```

### Frontend — `frontend/.env.local`
```env
# Backend API URL
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

---

## 📡 API & Architecture

FoodHub follows a monorepo-style structure with separate `frontend/` and `backend/` directories.

The backend exposes a RESTful API built with Express.js, secured via Better Auth with role-based access control. The frontend consumes this API through Next.js server and client components using the App Router.

### Role-Based Access

| Role     | Capabilities                                         |
| -------- | ---------------------------------------------------- |
| Customer | Browse, cart, order, review                          |
| Provider | Menu management, order tracking, status updates      |
| Admin    | User management, global order view, category control |

---

## 🌐 Live Demo & Credentials

**Live URL:** [foodhub-delivery.vercel.app](https://foodhub-delivery.vercel.app)

| Role     | Email                | Password     |
| -------- | -------------------- | ------------ |
| Admin    | admin@gmail.com      | admin1234    |
| Provider | provider@gmail.com   | provider1234 |
| Customer | *(register on site)* | —            |

> **Tip:** To test the full customer ordering flow, register a new account directly on the live site.
