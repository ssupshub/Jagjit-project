# 📚 Learning Tracker App with MongoDB Atlas

A full-stack web app to track learning subjects and topics, using:

* 🌐 Frontend: HTML, CSS, JavaScript (Vanilla)
* 🧠 Backend: Node.js + Express
* ☁️ Database: MongoDB Atlas

---

## 🚀 Features

* User login/logout UI (no real auth logic — simple UI separation)
* Add learning subjects
* Add chapters/topics under each subject
* Mark topics complete
* Data persisted in MongoDB Atlas (no localStorage)

---

## 🗂️ Project Structure

```
project-root/
├── backend/
│   ├── .env                # MongoDB connection config
│   ├── server.js           # Express server
│   └── ...                 # Models, routes (in single file)
├── frontend/
│   ├── index.html          # Main HTML interface
│   ├── script.js           # Frontend logic (CRUD + UI)
│   └── styles.css          # App styling
```

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure MongoDB Atlas

Create a file `.env` in the `backend/` folder:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/learningTracker?retryWrites=true&w=majority
```

### 4. Start the Backend Server

```bash
node server.js
```

> Should see: `MongoDB connected` and `Server listening on http://localhost:4000`

### 5. Serve the Frontend

From the **project root**, run:

```bash
npx http-server frontend
```

> Then open: [http://localhost:8080](http://localhost:8080)

---

## 🧪 Demo Usage

* Register with any username & password
* Login to access the main app
* Add subjects and topics
* Click topics to toggle completion

---

## 📦 Dependencies

* express
* mongoose
* dotenv
* cors
* http-server (for serving frontend locally)

---

## 🙌 Credits

Made with ❤️ using Node.js, MongoDB Atlas, and a simple static frontend.

---
