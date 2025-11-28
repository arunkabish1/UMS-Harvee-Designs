# Full-Stack User Management System (MERN)

A complete User Management System built using **MongoDB, Express.js, React.js, and Node.js**, as part of Harvee Designs Full-Stack Developer Assignment.

## 🚀 Features
- User Registration (with Cloudinary image upload)
- User Login (Email/Phone + Password)
- JWT-based Authentication (Access Token + Refresh Token)
- Admin Panel (React Dashboard)
- User CRUD (Admin only)
- Search, Filter, Pagination
- Role-based Access Control (RBAC)
- Backend + Frontend Validation
- Secure Password Hashing (bcrypt)
- CORS + Helmet Security
- Fully documented REST APIs
- Postman Collection included

---

# 🛠️ Technology Stack
- **Frontend**: React + Vite + Axios
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (Access & Refresh Tokens)
- **Image Storage**: Cloudinary
- **Validation**: Joi + Custom Checks

---

# 📁 Project Structure

```
backend/
  src/
    controllers/
    middleware/
    routes/
    models/
    config/
    validators/
  server.js

frontend/
  src/
    pages/
    assets/
    components/
    context/
    api/
    hooks/
```

---

# 🔧 Installation (Backend)

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Create .env
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_EXPIRY=7d

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

### 3. Start backend
```bash
npm run dev
```

---

# 🔧 Installation (Frontend)

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Create .env
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start frontend
```bash
npm run dev
```

---

# 👨‍💼 Admin Login

After registration, set a user as admin manually in MongoDB:

```json
{
  "role": "admin"
}
```

Then login with email/phone + password.

---

# 🔥 API Endpoints

### Auth
| Method | Route | Description |
|--------|--------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

### Users (Admin Only)
| Method | Route | Description |
|--------|--------|-------------|
| GET | /api/users | List all users |
| GET | /api/users/:id | Get user details |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |

---

# 🧪 Postman Collection
Import the file:
```
postman_collection.json
```

Includes:
- Register
- Login
- Refresh token
- List users
- Get user
- Edit user
- Delete user

---

# 📐 ER Diagram

```
User {
  _id: ObjectId
  name: String
  email: String
  phone: String
  password: String (hashed)
  profile_image: String
  address: String
  state: String
  city: String
  country: String
  pincode: String
  role: user | admin
  refreshTokens: Array
  createdAt: Date
  updatedAt: Date
}
```

---

# 🧱 Architecture Diagram

```
React (Vite)
   ↓ Axios
Express.js API
   ↓
MongoDB (User Data)
   ↓
Cloudinary (Profile Images)
JWT Auth (Access + Refresh Tokens)
```

---

# 📝 Approach & Challenges Faced

### **Approach**
- Designed backend first: DB schema → validation → controllers → routes.
- Implemented secure authentication with JWT access + refresh tokens.
- Integrated Cloudinary for scalable image uploads.
- Built an admin-only dashboard using React, Axios, and protected routes.
- Added search, filters, pagination, and CRUD UI.
- Ensured clean folder structure, reusable components, and maintainable code.

### **Challenges**
- Handling image uploads through Multer + Cloudinary.
- Syncing login flow between backend validation and frontend state.
- Correctly implementing protected/admin-only routes.
- Debugging async MongoDB issues during development.
- Managing roles and permissions safely.

---

# 📦 Deliverables Included
✔ Source Code (GitHub)  
✔ Postman Collection  
✔ ER Diagram  
✔ Architecture Diagram  
✔ README  
✔ Admin Panel UI  

---

# 📄 License
MIT License

