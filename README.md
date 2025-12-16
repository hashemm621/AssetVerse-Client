# AssetVerse

AssetVerse is a full‑stack **Asset Management System** designed for organizations to manage company assets, employees, and subscription‑based packages efficiently. The system supports HR and Employee roles with secure authentication, asset assignment, request workflows, and Stripe‑powered payments.

---

## 🚀 Features

### 🔐 Authentication & Roles

* Firebase Authentication with JWT verification
* Role‑based access control (HR & Employee)
* Secure API protection using middleware

### 📦 Package & Subscription Management

* Default **Free Package** (Employee limit: 5)
* Paid packages with employee limits
* Stripe Checkout integration
* Duplicate payment prevention using MongoDB unique index
* Package downgrade support (auto deactivates extra employees)

### 💳 Payment System

* Stripe payment session creation
* Unique `trackingId` for every transaction
* Payment history per HR
* MongoDB unique index to prevent duplicate payments

### 🏢 Asset Management (HR)

* Add, update, delete company assets
* Assign assets to employees
* Track available & assigned quantities
* Returnable / Non‑returnable asset handling

### 👥 Employee Management

* Employee affiliation with HR/company
* Auto employee limit enforcement based on package
* Employee activation / deactivation

### 📝 Asset Request Workflow

* Employees can request assets
* HR can approve or reject requests
* Auto asset assignment on approval
* Prevent duplicate or invalid requests

### 📊 Dashboard & History

* Asset history
* Payment history
* Assigned asset tracking
* Team & company overview

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* TanStack Query
* Tailwind CSS
* Framer Motion
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Native Driver)
* Firebase Admin SDK
* Stripe API

---

## 🗂️ Database Collections

* `users`
* `assets`
* `assignedAssets`
* `employeeAffiliations`
* `assetsRequest`
* `packages`
* `payments`

---

## 🔑 Environment Variables

Create a `.env` file in the server root:

```env
PORT=3000
URI=your_mongodb_connection_string
STRIPE_SECRET=your_stripe_secret_key
CLIENT_DOMAIN=http://localhost:5173
ASSETVERSE_SERVICE_KEY=./firebase-service-key.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/hashemm621/AssetVerse-Client

```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Server

```bash
npm run dev
```

Server will start on:

```
http://localhost:3000
```

---

## 🔐 Payment Duplicate Prevention Logic

* Each Stripe checkout generates a unique `trackingId`
* `payments` collection has a **unique index** on `trackingId`
* Backend checks existing payment before insert
* Prevents duplicate API calls or page refresh issues

```js
await paymentsCollection.createIndex(
  { trackingId: 1 },
  { unique: true }
);
```

---

## 📌 API Highlights

### Create Stripe Checkout Session

`POST /create-checkout-session`

### Save Payment

`POST /payments`

### Get Payment History

`GET /payments/history`

### Downgrade to Free Package

`POST /downgrade-to-free`

---

## 🔒 Security Best Practices

* Token verification using Firebase Admin
* Protected routes with middleware
* Server‑side validation for sensitive actions
* No trust on client‑side data

---

## 📈 Future Improvements

* Stripe Webhook integration
* Admin analytics dashboard
* Email notifications
* Role‑based permission expansion

---

## 👨‍💻 Author

**AssetVerse**
Developed as a professional full‑stack project demonstrating real‑world asset management, payment handling, and scalable backend architecture.

---

## ⭐ Support

If you like this project, give it a ⭐ and feel free to contribute!
