# 🔐 Password Reset Flow - MERN Stack

This is a full-featured **Password Reset Flow** project built using the **MERN stack** (MongoDB, Express, React, Node.js). It includes secure user authentication, "Forgot Password", and "Reset Password" functionality with email integration via **NodeMailer**.

---

## 📌 Features

- 🔐 User registration and login
- 📧 Forgot password with email OTP/token link
- 🔁 Secure password reset form with validation
- 🔒 Passwords hashed using **bcrypt**
- 📬 Email service using **NodeMailer**
- 💾 MongoDB for user storage
- 🧪 Token expiration and error handling
- 🛡️ Environment variables for sensitive data

---

## 🛠️ Tech Stack

| Layer    | Technology                |
|----------|---------------------------|
| Frontend | React, Axios, Bootstrap   |
| Backend  | Node.js, Express.js       |
| Database | MongoDB (Mongoose ODM)    |
| Email    | NodeMailer                |
| Auth     | JSON Web Tokens (JWT)     |

---

## 📁 Project Structure

/client → React frontend (user UI)
/server → Node + Express backend
│ ├── routes/ → Auth API routes
│ ├── controllers/→ Logic for each route
│ ├── models/ → Mongoose schemas
│ └── utils/ → Email sender, token logic

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` folder with the following:

MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PASS_MAIL=your_email_address
PASS_KEY=your_email_app_password

---

## 🚀 How to Run the App

### 1. Clone the Repo
```bash
git clone https://github.com/peramvenkatesh45/Password_Reset.git
cd Password_Reset

### 2.Setup Backend
cd server
npm install
npm run dev

### 3.Setup Frontend
cd client
npm install
npm start

