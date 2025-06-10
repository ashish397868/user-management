# 🚀 Ultimate User Management System | MERN Stack 

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-00684A.svg)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-000000.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14+-339933.svg)](https://nodejs.org/)

## 🌟 Features

- 🔐 Secure Authentication System
  - 📧 Email & Password Login
  - 🔑 OAuth 2.0 with Google
  - 🔒 JWT Token Based Security
- 👥 User Role Management
  - 👨‍💼 Admin Dashboard
  - 👤 User Dashboard
  - 🔄 Role-based Access Control
- 💫 Modern UI/UX
  - 🎨 TailwindCSS Styling
  - 📱 Fully Responsive Design
  - 🌓 Clean & Modern Interface
- 🛠️ Advanced Features
  - 📨 Password Reset via Email
  - 🔔 Real-time Notifications
  - 🔍 User Search & Filtering
  - 📊 Admin Statistics

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ installed
- MongoDB installed and running
- Gmail account for email notifications

### Installation

1. Clone the repository
\`\`\`powershell
git clone https://github.com/ashish397868/user-management.git
cd user-management
\`\`\`

2. Install dependencies for both client and server
\`\`\`powershell
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
\`\`\`

3. Configure environment variables
Create a \`.env\` file in the server directory:
\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_email
EMAIL_PASSWORD=your_gmail_app_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
\`\`\`

4. Run the application
\`\`\`powershell
# Run server (from server directory)
npm run dev

# Run client (from client directory)
npm start
\`\`\`

## 🏗️ Tech Stack

- **Frontend**: 
  - ⚛️ React.js
  - 🎨 TailwindCSS
  - 📍 React Router DOM
  - 🔄 Context API
  - 📡 Axios

- **Backend**: 
  - 🟢 Node.js
  - 🚂 Express.js
  - 🍃 MongoDB
  - 🔐 JWT
  - 📧 Nodemailer

## 📱 API Endpoints

### 🔓 Auth Routes
- \`POST /signup\` - Register new user
- \`POST /login\` - User login
- \`POST /logout\` - User logout
- \`GET /auth/google\` - Google OAuth login

### 👤 User Routes
- \`GET /api/me\` - Get current user
- \`PUT /api/me\` - Update user profile
- \`POST /forgot-password\` - Request password reset
- \`POST /reset-password\` - Reset password

### 👨‍💼 Admin Routes
- \`GET /admin/dashboard\` - Admin dashboard stats
- \`GET /admin/users\` - List all users
- \`PUT /admin/users/:id\` - Update user
- \`DELETE /admin/users/:id\` - Delete user

## 🔒 Security Features

- ✅ Password Hashing with BCrypt
- ✅ JWT Token Authentication
- ✅ OAuth 2.0 Integration
- ✅ Role-based Access Control
- ✅ CORS Protection
- ✅ Rate Limiting
- ✅ Input Validation
- ✅ XSS Protection

## 🎯 Best Practices

- ✨ Clean Code Architecture
- 📁 Modular File Structure
- 🔄 Consistent Error Handling
- 📝 Comprehensive Documentation
- 🧪 Error Boundary Implementation
- 🚦 Loading States
- 📱 Mobile-First Design
- 🌐 SEO Friendly

## 📈 Future Enhancements

- [ ] 📱 Mobile App Version
- [ ] 🌙 Dark Mode Support
- [ ] 📊 Advanced Analytics
- [ ] 🔔 Push Notifications
- [ ] 🗣️ Multi-language Support
- [ ] 🔄 Real-time Updates
- [ ] 📸 Profile Picture Upload
- [ ] 📱 Two-Factor Authentication

## 🤝 Contributing

Contributions are always welcome! See \`contributing.md\` for ways to get started.

## 📝 License

This project is licensed under the MIT License - see the Apache 2.0 file for details.

## 🔗 Hashtags
#MERN #React #NodeJS #MongoDB #ExpressJS #WebDevelopment #JavaScript #TailwindCSS #Authentication #UserManagement #OpenSource #WebApp #FullStack #JWT #OAuth #GoogleAuth #ResponsiveDesign #CodeQuality #DeveloperTools #WebSecurity

## 🌟 Support the Project

If you find this project helpful, please give it a star ⭐️ and share it with your friends!

## 📞 Contact

For any queries or suggestions, feel free to reach out:

- 📧 Email: ashish397868@gmail.com
- 💻 GitHub: [ashish397868](https://github.com/ashish397868)

---

Made with ❤️ by Ashish
