

 *Student Management System*


# 🎓 Student Management System

A full-stack web application to manage students, courses, and enrollments, built using **Next.js**, **NestJS**, and **PostgreSQL**.

---

## 🚀 Tech Stack

**Frontend:**  
- ⚛️ Next.js 15 (App Router)
- 🎨 Tailwind CSS + Custom Styling
- 🔥 React Hot Toast for Notifications

**Backend:**  
- 🚀 NestJS (Node.js Framework)
- 🛢 PostgreSQL (via TypeORM)
- 🔗 RESTful API

---

## 📂 Folder Structure

```

Student\_Management/
├── backend/     # NestJS + PostgreSQL API
└── frontend/    # Next.js client UI

````

---

## 📦 Features

✅ Student CRUD (Add, Edit, Delete, View)  
✅ Course Management  
✅ Enrollments (Many-to-Many)  
✅ Search & Filter  
✅ Dark Mode Toggle 🌙  
✅ Toast Notifications  
✅ Stylish UI with Background Image  
✅ CSV Export (enrollments)  
✅ Clean Responsive Design

---

## 🖥️ Local Development

### 🛠 Prerequisites

- Node.js ≥ 18
- PostgreSQL ≥ 12
- Git

---

### ⚙️ Backend Setup

```bash
cd backend
npm install
````

📄 Create `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_pg_username
DB_PASSWORD=your_pg_password
DB_DATABASE=student_management
```

✅ Make sure the database `student_management` exists:

```sql
CREATE DATABASE student_management;
```

▶️ Start backend server:

```bash
npm run start:dev
```

Server runs at: `http://localhost:3000`

---

### 🎨 Frontend Setup

```bash
cd ../frontend
npm install
```

▶️ Start development server:

```bash
npm run dev
```

App runs at: `http://localhost:3001` (or next available port)

---


## ✍️ Author

**Devaki Wale**
Frontend & Full-Stack Developer Intern
[GitHub](https://github.com/DevakiWale)


