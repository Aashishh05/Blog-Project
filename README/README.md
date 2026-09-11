# Blog Application - MERN Stack

A full-featured blog platform built with the MERN stack (MongoDB, Express.js, React, Node.js), featuring user authentication, blog management, categories, comments, likes, and an admin dashboard.

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool & dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Formik + Yup** - Form handling & validation
- **Framer Motion** - Animations
- **React Markdown** - Markdown rendering
- **React Hot Toast** - Notifications
- **Lucide React / React Icons** - Icon libraries
- **React Loading Skeleton** - Loading states
- **React Infinite Scroll Component** - Infinite scrolling
- **JWT Decode** - Token decoding
- **Date-fns** - Date formatting

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database & ODM
- **JSON Web Token (JWT)** - Authentication
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Image hosting
- **Multer** - File uploads
- **Nodemailer** - Email service (OTP for password reset)
- **Express Validator** - Input validation
- **Cookie Parser** - Cookie handling
- **Dotenv** - Environment variables
- **Nodemon** - Dev server auto-reload

## Features

### Authentication
- User signup & login
- Forgot password with OTP via email
- Password reset
- JWT-based session with HTTP-only cookies
- Role-based access control (User / Admin)

### Blog Management
- Create, read, update, delete blogs
- Rich markdown content support
- Image uploads via Cloudinary
- Category-based blog filtering
- Infinite scroll for blog listing

### User Features
- User profile with profile image
- Like / unlike blogs
- View liked blogs
- Comment on blogs

### Admin Dashboard
- Manage all blogs
- Manage categories
- Admin-only routes & controls

## Project Structure

```
Blog/
├── Backend/
│   ├── config/          # DB, Cloudinary, Nodemailer config
│   ├── controllers/     # Auth, Blog, Category, Comment controllers
│   ├── middleware/       # Auth & upload middleware
│   ├── models/          # User, Blog, Category, Comment, Like models
│   ├── routes/          # API route definitions
│   ├── uploads/         # Local file uploads
│   ├── utils/           # Utility functions
│   ├── server.js        # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── Components/  # Navbar, Sidebar, Footer, Layouts
│   │   ├── Pages/       # Home, Blog, Auth, Admin pages
│   │   ├── redux/       # Redux store & slices
│   │   ├── Localstorage/ # Local storage helpers
│   │   └── assets/      # Static assets
│   ├── vite.config.js
│   └── package.json
│
└── README/
    └── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)
- Cloudinary account (for image uploads)
- SMTP credentials (for password reset emails)

### Backend Setup
```bash
cd Backend
npm install
# Create .env file with required environment variables
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables (Backend `.env`)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

## API Routes

| Route | Description |
|-------|-------------|
| `/api/auth/*` | Signup, Login, Forgot/Reset Password, Profile |
| `/api/blogs/*` | CRUD operations for blogs |
| `/api/categories/*` | Category management |
| `/api/comments/*` | Comment on blogs |
| `/api/likes/*` | Like/Unlike blogs |

## License

ISC
