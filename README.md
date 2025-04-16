
# 🚀 OOP with C++ Lab Platform

![React](https://img.shields.io/badge/React-18.2.0-%2361DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.5-%646CFF?logo=vite)
![Express](https://img.shields.io/badge/Express-4.18.2-%23000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-%2347A248?logo=mongodb)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.0-%23000000)

A modern learning environment for mastering Object-Oriented Programming in C++ with interactive labs, real-time code execution, and comprehensive curriculum.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/yourusername/oop-cpp-labs)  
[![Deploy on Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

![Landing Page Demo](https://via.placeholder.com/1920x800/0f172a/64748b?text=OOP+C%2B%2B+Learning+Platform)

---

## 🌟 Features

### 🧑💻 Interactive Learning Experience

| Feature               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| **Browser Compiler**  | Write, compile, and debug C++ directly in the browser                       |
| **OOP Visualization** | Interactive diagrams for inheritance and polymorphism                       |
| **Lab System**        | Structured programming exercises with auto-grading                          |

### 📚 Comprehensive Curriculum

```cpp
class Curriculum {
public:
  vector<string> topics = {
    "Classes & Objects",
    "Encapsulation",
    "Inheritance",
    "Polymorphism",
    "Operator Overloading",
    "Templates",
    "STL Components",
    "Design Patterns"
  };
  
  void display() {
    for(auto& topic : topics) {
      cout << "📘 " << topic << endl;
    }
  }
};
```

---

### 🎮 Hands-On Features

- Real-time Code Execution with WebAssembly integration  
- Code Snippet Library with 50+ examples  
- Progress Tracking with local storage  
- Admin Panel for content management (PIN protected)  
- Animated UI with Framer Motion  

---

## 🛠️ Installation

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Git

### Frontend Setup

```bash
git clone https://github.com/yourusername/oop-cpp-labs.git
cd oop-cpp-labs/client
npm install
npm run dev
```

### Backend Setup

```bash
cd oop-cpp-labs/server
npm install

# Create .env file
echo "MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/oop-labs?retryWrites=true&w=majority
PORT=5000
ADMIN_PIN=1234" > .env

npm start
```

---

## 🖥️ Tech Stack

### Frontend

| Technology       | Purpose      | Version |
|------------------|--------------|---------|
| React            | UI Framework | 18.2    |
| Vite             | Build Tool   | 4.4     |
| Framer Motion    | Animations   | 10.16   |
| react-icons      | Icons        | 4.11    |
| Tailwind CSS     | Styling      | 3.3     |

### Backend

| Technology | Purpose                   | Version |
|------------|---------------------------|---------|
| Express    | Server Framework          | 4.18    |
| MongoDB    | Database                  | 7.0     |
| Mongoose   | ODM                       | 7.5     |
| CORS       | Cross-Origin Support      | 2.8     |

---

## 📂 Project Structure

```
oop-cpp-labs/
├── client/                 # Frontend (Vite + React)
│   ├── src/
│   │   ├── pages/         # Route components
│   │   ├── components/    # Reusable UI components
│   │   └── assets/        # Static files
│   └── vite.config.js     # Vite configuration
│
├── server/                # Backend (Express)
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   └── server.js          # Server entry point
│
└── README.md              # You are here 📍
```

---

## 🌐 Deployment

### Render.com (Recommended)

1. Create a new Web Service  
2. Connect your GitHub repository  
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas URI  
   - `PORT`: 10000  
   - `ADMIN_PIN`: Your 4-digit PIN  
4. Deploy!

### Heroku

```bash
# Create new app
heroku create oop-cpp-labs

# Set config vars
heroku config:set MONGODB_URI=<your_uri> ADMIN_PIN=1234

# Deploy
git push heroku main
```

---

## 📸 Screenshots

| Feature        | Preview          |
|----------------|------------------|
| Lab Interface  | _Lab Preview_    |
| Code Editor    | _Editor Preview_ |
| Admin Panel    | _Admin Preview_  |

_Replace the above with actual screenshots._

---

## 🤝 Contributing

1. Fork the project  
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to the branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 💬 Contact

Anish  - anishseth0510@gmail.com

---

## 🙏 Acknowledgments

- [React Icons](https://react-icons.github.io/react-icons)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Render](https://render.com)

---

**Made with ❤️ and ☕ by Anish**  
[Contribute](https://github.com/yourusername/oop-cpp-labs/issues)
