# FoodHub 🍔

A comprehensive multi-vendor food delivery platform connecting customers with local food providers. FoodHub offers a seamless experience for browsing meals, placing orders, and managing menus, complete with dedicated role-based dashboards for Customers, Providers, and Administrators.

**Live Demo:** [https://foodhub-delivery.vercel.app](https://foodhub-delivery.vercel.app)

---

## 🚀 Demo Credentials

To explore the role-based dashboards on the live site, you can use the following test accounts:

- **Admin Account**
  - Email: `admin@gmail.com`
  - Password: `admin1234`
- **Provider Account**
  - Email: `provider@gmail.com`
  - Password: `provider1234`
- **Customer Account**
  - Feel free to register a new customer account directly on the site to test the ordering flow!

---

## ✨ Features

### 🌍 Public Features

- Browse all available meals and providers.
- Filter meals by cuisine, dietary preferences, and price.
- View detailed provider profiles and their specific menus.

### 👤 Customer Features

- Secure registration and login.
- Add meals to a dynamic shopping cart.
- Place orders with a specified delivery address (Cash on Delivery supported).
- Track the status of active orders.
- Leave reviews and ratings on meals after ordering.
- Manage personal profile information.

### 🏪 Provider Features

- Secure registration and login as a food provider.
- Manage Menu: Add, edit, and remove meal items.
- View real-time incoming orders.
- Update order statuses (e.g., Pending, Processing, Delivered).
- Access a personalized provider dashboard.

### 🛡️ Admin Features

- View and manage all platform users (both customers and providers).
- Control user account status (suspend or activate accounts).
- Global view of all orders placed on the platform.
- Manage global food categories.

---

## 🛠️ Tech Stack

**Frontend:**

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (Icons)
- Sonner (Toasts)

**Backend:**

- Node.js
- Express.js
- TypeScript

**Database & Authentication:**

- PostgreSQL
- Prisma ORM
- Better Auth (Handling secure, cross-domain cookies and role-based access)

---

## 💻 Local Setup & Installation

Follow these steps to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) installed (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) installed and running

### 1. Clone the repository

```bash
git clone [https://github.com/neamatullah01/foodhub-fullstack.git](https://github.com/neamatullah01/foodhub-fullstack.git)
cd your-repo-name
```

### 2. Backend Setup

Open a terminal and navigate to your backend folder.

```bash
cd backend

# Install dependencies
npm install

# Create a .env file
touch .env
```

Add the following to your backend/.env file:

```bash
# Database connection string
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/foodhub?schema=public"

# Port for the Express server
PORT=5000

# Better Auth Configuration
BETTER_AUTH_URL="http://localhost:5000"
BETTER_AUTH_SECRET="generate-a-random-secret-key-here"
```

Run database migrations and start the server:

```bash
# Generate Prisma Client and push the schema to your database
npx prisma generate
npx prisma db push

# Start the Express server
npm run dev
```

### 3. Frontend Setup

Open a new terminal window and navigate to your frontend folder.

```bash
cd frontend

# Install dependencies
npm install

# Create a .env.local file
touch .env.local
```

Add the following to your frontend/.env.local file:

```bash
# URL of your locally running backend API
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

Start the frontend application:

```bash
# Start the Next.js development server
npm run dev
```

Open http://localhost:3000 in your browser to see the application!
