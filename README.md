
# 🚀 Object-Oriented Programming C++ Lab Platform

![React](https://img.shields.io/badge/React-19.0.0-%2361DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.0-%646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1.0-%23000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.13.2-%2347A248?logo=mongodb&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.6.5-%23000000?logo=framer&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)

A **modern, interactive learning environment** for mastering Object-Oriented Programming in C++ with real-time code execution, comprehensive lab exercises, and beautiful UI animations.

[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=white)](https://object-oriented-programming-cpp-lab.onrender.com)
[![Frontend on Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://oop-cpp-lab.vercel.app)

---

## 🌟 Key Features

### 🧑‍💻 Interactive Learning Experience

| Feature | Description | Technology |
|---------|-------------|------------|
| **🔥 Real-time C++ Compiler** | Write, compile, and debug C++ code directly in your browser using Judge0 API | Judge0 CE API |
| **📚 Interactive Lab System** | Structured programming exercises with code examples and expected outputs | React + MongoDB |
| **🎨 Beautiful Animations** | Smooth transitions and particle effects for enhanced user experience | Framer Motion |
| **🔐 Admin Panel** | PIN-protected content management system for instructors | Express.js |
| **📱 Responsive Design** | Works seamlessly on desktop, tablet, and mobile devices | Tailwind CSS |

### 📖 Comprehensive Learning Modules

```cpp
class LearningPath {
    private:
        vector<string> fundamentals = {
            "Procedural Programming & C Fundamentals",
            "Data Types, Operators, and Expressions",
            "Pointers and Memory Management",
            "Control Flow and Functions"
        };
        
        vector<string> oopConcepts = {
            "Classes & Objects",
            "Encapsulation & Data Hiding",
            "Inheritance & Polymorphism",
            "Operator Overloading",
            "Templates & Generic Programming",
            "STL Components & Containers",
            "Design Patterns"
        };
        
    public:
        void displayPath() {
            cout << "🎯 Complete OOP C++ Learning Journey" << endl;
            for(auto& topic : fundamentals) {
                cout << "📘 " << topic << endl;
            }
            for(auto& topic : oopConcepts) {
                cout << "� " << topic << endl;
            }
        }
};
```

### 🎮 Advanced Features

- **🚀 Real-time Code Execution** - Judge0 API integration for instant C++ compilation
- **📝 Code Snippet Library** - 50+ ready-to-use OOP examples and patterns
- **📊 Progress Tracking** - Local storage-based learning progress
- **🔐 Admin Panel** - PIN-protected content management (Default: `1234`)
- **🎨 Smooth Animations** - Framer Motion powered UI transitions
- **📱 Mobile Responsive** - Works perfectly on all device sizes
- **🌙 Modern UI** - Gradient backgrounds with particle animations
- **⚡ Fast Loading** - Optimized with Vite build system

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                    │
├─────────────────────────────────────────────────────────────────┤
│  🎨 UI Components    │  📱 Pages       │  🎬 Animations       │
│  - Navigation        │  - Landing      │  - Framer Motion     │
│  - Lab Cards         │  - Labs         │  - Particles         │
│  - Code Editor       │  - Compiler     │  - Page Transitions  │
│  - Admin Panel       │  - Learn        │  - Hover Effects     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (Express.js)                        │
├─────────────────────────────────────────────────────────────────┤
│  🔧 API Endpoints    │  📊 Database    │  🛡️ Security        │
│  - Assignments CRUD  │  - MongoDB      │  - CORS             │
│  - History Tracking  │  - Mongoose     │  - Helmet           │
│  - File Upload       │  - Schemas      │  - Rate Limiting    │
│  - Validation        │  - Aggregation  │  - Input Validation │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   External Services                             │
├─────────────────────────────────────────────────────────────────┤
│  ⚡ Judge0 API       │  ☁️ MongoDB Atlas │  🚀 Deployment     │
│  - C++ Compilation   │  - Cloud Database │  - Render.com      │
│  - Code Execution    │  - Auto-scaling   │  - Vercel (Frontend│
│  - Error Handling    │  - Backups        │  - CI/CD Pipeline  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Installation & Setup

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

```bash
# Check Node.js version (Required: 18.0.0 or higher)
node --version

# Check npm version
npm --version

# Check Git
git --version
```

**Required:**
- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Git** for version control
- **MongoDB Atlas** account (free tier available)

**Optional:**
- **VS Code** with recommended extensions
- **Postman** for API testing

---

### 🚀 Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Object-Oriented-Programming-C-Lab.git
cd Object-Oriented-Programming-C-Lab
```

#### 2. Frontend Setup (React + Vite)

```bash
# Navigate to frontend directory
cd oops

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### 3. Backend Setup (Express.js)

```bash
# Navigate to server directory (from project root)
cd server

# Install dependencies
npm install

# Create environment variables file
touch .env
```

**Configure `.env` file:**
```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/oop-cpp-labs?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# Security
ADMIN_PIN=1234
JWT_SECRET=your-jwt-secret-key

# API Keys
JUDGE0_API_KEY=your-rapidapi-key
```

#### 4. Start the Backend Server

```bash
# Start server in development mode
npm run dev

# OR start in production mode
npm start
```

The backend API will be available at `http://localhost:5000`

---

### 📱 Environment Variables Explained

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ | N/A |
| `PORT` | Server port number | ❌ | 5000 |
| `NODE_ENV` | Environment mode | ❌ | development |
| `ADMIN_PIN` | Admin panel access PIN | ❌ | 1234 |
| `JWT_SECRET` | JWT signing secret | ❌ | random |
| `JUDGE0_API_KEY` | RapidAPI key for Judge0 | ❌ | N/A |

---

### 🔧 Development Scripts

**Frontend (oops/):**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend (server/):**
```bash
npm start            # Start production server
npm run dev          # Start with nodemon (auto-restart)
npm test             # Run tests
npm run seed         # Seed database with sample data
```

---

## � Tech Stack & Dependencies

### Frontend Stack

| Technology | Purpose | Version | Why We Use It |
|------------|---------|---------|---------------|
| **React** | UI Framework | 19.0.0 | Component-based architecture, virtual DOM |
| **Vite** | Build Tool | 6.2.0 | Fast development server, optimized builds |
| **Framer Motion** | Animations | 12.6.5 | Smooth animations and transitions |
| **React Router** | Routing | 7.5.0 | Client-side navigation |
| **React Icons** | Icon Library | 5.5.0 | Consistent iconography |
| **Tailwind CSS** | Styling | Latest | Utility-first CSS framework |

### Backend Stack

| Technology | Purpose | Version | Why We Use It |
|------------|---------|---------|---------------|
| **Express.js** | Web Framework | 5.1.0 | Fast, minimalist web framework |
| **MongoDB** | Database | 8.13.2 | NoSQL document database |
| **Mongoose** | ODM | 8.13.2 | MongoDB object modeling |
| **Winston** | Logging | 3.17.0 | Structured logging |
| **Helmet** | Security | 8.1.0 | Security headers |
| **CORS** | Cross-Origin | 2.8.5 | Enable cross-origin requests |
| **Express Rate Limit** | Rate Limiting | 7.5.0 | Prevent abuse |
| **Multer** | File Upload | 1.4.5 | Handle multipart/form-data |

### External Services

| Service | Purpose | Integration |
|---------|---------|-------------|
| **Judge0 CE API** | Code Compilation | RapidAPI |
| **MongoDB Atlas** | Cloud Database | Mongoose |
| **Render.com** | Backend Hosting | Direct deployment |
| **Vercel** | Frontend Hosting | Git integration |

---

## 📂 Project Structure

```
Object-Oriented-Programming-C-Lab/
├── 📁 oops/                           # Frontend Application
│   ├── 📁 public/                     # Static assets
│   │   ├── 🖼️ oops.png               # App icon
│   │   └── 🖼️ vite.svg               # Vite logo
│   ├── 📁 src/                        # Source code
│   │   ├── 📁 assets/                 # Images, fonts
│   │   │   └── 🖼️ react.svg         # React logo
│   │   ├── 📁 components/             # Reusable components
│   │   │   ├── 🔧 Header.jsx         # Navigation header
│   │   │   ├── 🔧 Footer.jsx         # Site footer
│   │   │   └── 🔧 LoadingSpinner.jsx # Loading animations
│   │   ├── 📁 pages/                  # Route components
│   │   │   ├── 🏠 Landing.jsx         # Home page
│   │   │   ├── 📚 Lab.jsx             # Lab assignments list
│   │   │   ├── 🧪 Labs.jsx            # Individual lab view
│   │   │   ├── ➕ AddLab.jsx          # Add new lab
│   │   │   ├── 💻 Complier.jsx        # Code compiler
│   │   │   └── 📖 Learn.jsx           # Learning resources
│   │   ├── 📄 App.jsx                 # Main app component
│   │   ├── 📄 main.jsx                # Entry point
│   │   ├── 🎨 App.css                 # Component styles
│   │   └── 🎨 index.css               # Global styles
│   ├── 📄 package.json                # Dependencies
│   ├── 📄 vite.config.js              # Vite configuration
│   ├── 📄 eslint.config.js            # ESLint rules
│   └── 📄 vercel.json                 # Vercel deployment
│
├── 📁 server/                         # Backend Application
│   ├── 📁 models/                     # Database schemas
│   │   └── 📄 History.js              # Code execution history
│   ├── 📄 server.js                   # Express server
│   ├── 📄 package.json                # Dependencies
│   ├── 📄 swagger.json                # API documentation
│   ├── 📄 combined.log                # Application logs
│   └── 📄 error.log                   # Error logs
│
└── 📄 README.md                       # This file
```

---

## 🎯 Features Breakdown

### 🏠 Landing Page
- **Hero Section** with animated background particles
- **Feature Cards** showcasing platform capabilities
- **Call-to-Action** buttons for quick navigation
- **Responsive Design** for all screen sizes

### 📚 Lab System
- **Dynamic Lab Cards** with custom icons
- **Modal Views** for detailed lab instructions
- **Code Examples** with syntax highlighting
- **Copy-to-Clipboard** functionality
- **Admin Panel** for content management

### 💻 Compiler
- **Real-time C++ Compilation** using Judge0 API
- **Code Editor** with syntax highlighting
- **Error Handling** with detailed messages
- **Output Display** with formatted results
- **Loading States** with smooth animations

### � Learning Resources
- **Video Tutorials** embedded YouTube content
- **Code Snippets** with downloadable examples
- **External Links** to additional resources
- **Progress Tracking** for completed topics

---

## 🚀 Deployment Guide

### 🌐 Render.com Deployment (Backend)

**Step 1: Prepare Your Repository**
```bash
# Ensure your server code is in the server/ directory
# Commit and push all changes
git add .
git commit -m "Prepare for deployment"
git push origin main
```

**Step 2: Create Render Service**
1. Visit [Render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `oop-cpp-lab-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

**Step 3: Set Environment Variables**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oop-labs
PORT=10000
NODE_ENV=production
ADMIN_PIN=1234
```

**Step 4: Deploy**
- Click "Create Web Service"
- Wait for deployment (usually 5-10 minutes)
- Your API will be available at `https://your-app.onrender.com`

---

### 🚀 Vercel Deployment (Frontend)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy from Frontend Directory**
```bash
# Navigate to frontend
cd oops

# Deploy to Vercel
vercel --prod
```

**Step 3: Configure Environment Variables**
```env
VITE_API_URL=https://your-backend.onrender.com
VITE_JUDGE0_API_KEY=your-rapidapi-key
```

**Alternative: GitHub Integration**
1. Visit [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `oops`
4. Deploy automatically

---

### 🐳 Docker Deployment

**Frontend Dockerfile:**
```dockerfile
# oops/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Backend Dockerfile:**
```dockerfile
# server/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  frontend:
    build: ./oops
    ports:
      - "3000:80"
  
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - ADMIN_PIN=${ADMIN_PIN}
    depends_on:
      - mongodb
  
  mongodb:
    image: mongo:7.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

---

## 📸 Screenshots & Demo

| Feature | Screenshot |
|---------|------------|
| **🏠 Landing Page** | ![Landing](https://via.placeholder.com/800x400/0f172a/64748b?text=Modern+Landing+Page) |
| **📚 Lab Interface** | ![Labs](https://via.placeholder.com/800x400/1e293b/64748b?text=Interactive+Lab+Cards) |
| **💻 Code Compiler** | ![Compiler](https://via.placeholder.com/800x400/374151/64748b?text=Real-time+C%2B%2B+Compiler) |
| **📖 Learning Resources** | ![Learn](https://via.placeholder.com/800x400/475569/64748b?text=Comprehensive+Learning) |
| **🔐 Admin Panel** | ![Admin](https://via.placeholder.com/800x400/581c87/64748b?text=Content+Management) |

### 🎥 Live Demo

**🌐 Live Application**: [https://oop-cpp-lab.vercel.app](https://oop-cpp-lab.vercel.app)

**🔧 API Endpoints**: [https://object-oriented-programming-cpp-lab.onrender.com](https://object-oriented-programming-cpp-lab.onrender.com)

### 🧪 Test the Features

1. **Visit the Platform** - Navigate to the live demo
2. **Browse Labs** - Explore available C++ assignments
3. **Try the Compiler** - Write and execute C++ code
4. **Access Learning Resources** - Check out video tutorials and code examples
5. **Admin Panel** - Use PIN `1234` to access content management

---

## 🛠️ API Documentation

### 📊 Core Endpoints

**Base URL**: `https://object-oriented-programming-cpp-lab.onrender.com/api`

#### Assignments API

```javascript
// GET /api/assignments - Fetch all assignments
GET /api/assignments
Response: {
  "success": true,
  "data": [
    {
      "_id": "648b8c2d4f5e6a001234567",
      "title": "Classes and Objects",
      "icon": "FiCode",
      "problems": [
        {
          "question": "Create a simple class with constructor",
          "code": "#include <iostream>\nusing namespace std;\n\nclass Student {\npublic:\n    string name;\n    int age;\n    \n    Student(string n, int a) {\n        name = n;\n        age = a;\n    }\n};\n\nint main() {\n    Student s1(\"Alice\", 20);\n    cout << \"Name: \" << s1.name << endl;\n    return 0;\n}",
          "output": "Name: Alice"
        }
      ],
      "createdAt": "2024-06-15T10:30:00.000Z"
    }
  ]
}

// POST /api/assignments - Create new assignment
POST /api/assignments
Body: {
  "title": "Assignment Title",
  "icon": "FiCode",
  "problems": [
    {
      "question": "Problem description",
      "code": "C++ code here",
      "output": "Expected output"
    }
  ]
}

// DELETE /api/assignments/:id - Delete assignment
DELETE /api/assignments/648b8c2d4f5e6a001234567
Response: {
  "success": true,
  "message": "Assignment deleted successfully"
}
```

#### History API

```javascript
// GET /api/history - Fetch code execution history
GET /api/history
Response: {
  "success": true,
  "data": [
    {
      "_id": "648b8c2d4f5e6a001234568",
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello World!\" << endl;\n    return 0;\n}",
      "output": ["Hello World!"],
      "errors": [],
      "language": "cpp",
      "timestamp": "2024-06-15T10:30:00.000Z"
    }
  ]
}

// POST /api/history - Save code execution
POST /api/history
Body: {
  "code": "C++ code",
  "output": ["Program output"],
  "errors": ["Error messages if any"],
  "language": "cpp"
}
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🚀 Quick Start for Contributors

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/Object-Oriented-Programming-C-Lab.git
   cd Object-Oriented-Programming-C-Lab
   ```

2. **Set Up Development Environment**
   ```bash
   # Install frontend dependencies
   cd oops && npm install
   
   # Install backend dependencies
   cd ../server && npm install
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with your configurations
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-new-feature
   ```

4. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

5. **Test Your Changes**
   ```bash
   # Test frontend
   cd oops && npm run lint && npm run build
   
   # Test backend
   cd server && npm test
   ```

6. **Submit a Pull Request**
   ```bash
   git add .
   git commit -m "Add amazing new feature"
   git push origin feature/amazing-new-feature
   ```

### 🎯 Contribution Guidelines

**Code Style:**
- Use ESLint configuration provided
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic

**Commit Messages:**
- Use conventional commits format
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting changes

**What We Need:**
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage
- 🌐 Translations

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Anish

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## � Contact & Support

### 👨‍💻 Author

**Anish**
- 📧 Email: [anishseth0510@gmail.com](mailto:anishseth0510@gmail.com)
- 🐙 GitHub: [@anishseth](https://github.com/anishseth)
- 💼 LinkedIn: [Connect with me](https://linkedin.com/in/anishseth)

### 🆘 Get Help

- **🐛 Bug Reports**: [Create an Issue](https://github.com/anishseth/Object-Oriented-Programming-C-Lab/issues)
- **💡 Feature Requests**: [Start a Discussion](https://github.com/anishseth/Object-Oriented-Programming-C-Lab/discussions)
- **❓ Questions**: [Ask on Stack Overflow](https://stackoverflow.com/questions/tagged/oop-cpp-lab)

---

## 🙏 Acknowledgments

### 🎯 Special Thanks

- **[Judge0 API](https://judge0.com)** - For providing excellent code execution services
- **[React Team](https://reactjs.org)** - For the amazing UI library
- **[Framer Motion](https://www.framer.com/motion/)** - For beautiful animations
- **[Tailwind CSS](https://tailwindcss.com)** - For utility-first styling
- **[MongoDB](https://www.mongodb.com)** - For flexible database solutions
- **[Render.com](https://render.com)** - For seamless deployment
- **[Vercel](https://vercel.com)** - For frontend hosting

### 🌟 Inspiration

This project was inspired by the need for interactive, modern learning platforms that make programming education more engaging and accessible.

---

## 🎉 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=anishseth/Object-Oriented-Programming-C-Lab&type=Date)](https://star-history.com/#anishseth/Object-Oriented-Programming-C-Lab&Date)

---

<div align="center">

**Made with ❤️ and lots of ☕ by Anish**

[![GitHub followers](https://img.shields.io/github/followers/anishseth?style=social)](https://github.com/anishseth)
[![GitHub stars](https://img.shields.io/github/stars/anishseth/Object-Oriented-Programming-C-Lab?style=social)](https://github.com/anishseth/Object-Oriented-Programming-C-Lab)

**[⭐ Star this repository](https://github.com/anishseth/Object-Oriented-Programming-C-Lab) if you found it helpful!**

</div>
