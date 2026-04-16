# Habit Tracker - Full Stack MERN Application

A clean, modern habit tracking app with user authentication. Built to demonstrate full-stack development skills with the MERN stack.

![App Screenshot](screenshots/dashboard.png)

## ✨ Features

- User registration and login (JWT authentication)
- Full CRUD operations for habits
- Protected routes (only authenticated users can access habits)
- Responsive design with Bootstrap
- Real-time habit status updates (complete / undo)

## 🛠️ Tech Stack

**Frontend:** React.js, React Router, Bootstrap, Context API  
**Backend:** Node.js, Express.js  
**Database:** MongoDB with Mongoose  
**Authentication:** JWT + bcryptjs

## 🚀 Live Demo
[View Live Demo](your-vercel-link-here)   ← We'll add this after deployment

## 📸 Screenshots

![Login Page](screenshots/login.png)
![Dashboard](screenshots/dashboard.png)
![Add Habit](screenshots/add-habit.png)

## 🏃 How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev

### Frontend
```bash
cd frontend
npm install
npm run dev

📌 Key Learnings / Challenges Overcome

Implemented secure JWT authentication with protected routes
Connected React frontend with Node.js backend using proper API calls
Managed global state with React Context for authentication
Handled async operations, error states, and loading indicators