import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiBookOpen, FiPlus } from 'react-icons/fi';

const Landing = () => {
  useEffect(() => {
    document.title = "OOP with C++ Labs | Master Object-Oriented Programming";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-400 rounded-full"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gray-900/90 backdrop-blur-lg border-b border-gray-700/50 p-4 sticky top-0 z-50"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center group">
              <div className="p-2 mr-3 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300 shadow-lg">
                <FiCode className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200 tracking-tight">
                OOP C++ Labs
              </h1>
            </Link>
          </motion.div>

          <div className="flex space-x-4">
            <motion.div 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link
                to="/labs"
                className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700/90 text-gray-100 hover:text-white transition-all duration-300 border border-gray-700 hover:border-gray-600 flex items-center gap-2 text-sm font-medium"
              >
                <FiBookOpen className="text-blue-400" />
                View Labs
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link
                to="/add"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 text-sm font-medium"
              >
                <FiPlus className="text-white" />
                Add New Lab
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="container mx-auto py-32 px-4 text-center relative z-10"
>
  <motion.div
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
      Object-Oriented Programming
      <br />
      <span className="text-4xl md:text-5xl">with C++</span>
    </h1>

    <motion.p 
      className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      Master encapsulation, inheritance, and polymorphism through interactive labs. 
      Write, compile, and debug C++ code directly in your browser.
    </motion.p>

    {/* Buttons Container */}
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      {/* Top Row Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
        <motion.div 
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            to="/labs" 
            className="px-8 py-4 min-w-[14rem] rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-lg font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiCpu /> Explore Labs
          </Link>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            to="/compile"
            className="px-8 py-4 min-w-[14rem] rounded-xl bg-transparent border-2 border-cyan-400 hover:bg-cyan-900/30 text-white text-lg font-semibold shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiCode /> Go to Compiler
          </Link>
        </motion.div>
      </div>

      {/* Full-width Learn Button Below */}
      <motion.div
  className="w-full sm:w-[29rem]"
  whileHover={{ y: -5 }}
  whileTap={{ scale: 0.95 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
>
  <Link
    to="/learn"
    className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-lg font-semibold shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
  >
    <FiBookOpen /> Start Learning OOP Concepts
  </Link>
</motion.div>
    </div>
  </motion.div>
</motion.section>



      {/* Features Section */}
      <motion.section 
        className="py-24 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-blue-900/50 backdrop-blur-sm p-8 rounded-xl border border-blue-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-4 text-cyan-400">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-blue-100">{feature.title}</h3>
                <p className="text-blue-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* C++ Code Example Section */}
      <motion.section 
        className="py-20 bg-blue-900/30 backdrop-blur-sm relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gray-800/80 border border-blue-700/50 rounded-xl overflow-hidden"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center bg-gray-900/80 px-4 py-2 border-b border-blue-800/50">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-sm text-gray-400">main.cpp</div>
            </div>
            <pre className="p-6 overflow-x-auto text-green-400 font-mono text-sm md:text-base">
              {`#include <iostream>
using namespace std;

class Shape {
protected:
  double width, height;
public:
  void setDimensions(double w, double h) {
    width = w;
    height = h;
  }
  virtual double area() = 0; // Pure virtual function
};

class Rectangle : public Shape {
public:
  double area() override {
    return width * height;
  }
};

class Triangle : public Shape {
public:
  double area() override {
    return 0.5 * width * height;
  }
};

int main() {
  Rectangle rect;
  Triangle tri;
  
  rect.setDimensions(5, 7);
  tri.setDimensions(5, 7);
  
  cout << "Rectangle area: " << rect.area() << endl;
  cout << "Triangle area: " << tri.area() << endl;
  
  return 0;
}`}
            </pre>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-blue-900/80 backdrop-blur-md py-12 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.p 
            className="text-blue-200"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} OOP with C++ Lab Repository | Master Polymorphism, Encapsulation, and Inheritance
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
};

const features = [
  {
    icon: <FiCpu />,
    title: "Interactive Compiler",
    description: "Write, compile, and execute C++ code directly in your browser with real-time output."
  },
  {
    icon: <FiCode />,
    title: "OOP Concepts",
    description: "Learn classes, objects, inheritance, polymorphism through practical examples."
  },
  {
    icon: <FiBookOpen />,
    title: "Comprehensive Labs",
    description: "From basic syntax to advanced design patterns, structured learning path."
  }
];

export default Landing;