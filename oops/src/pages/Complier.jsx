// src/pages/Compiler.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiArrowLeft, FiPlay, FiAlertCircle,FiHome,FiGitlab,FiBook } from 'react-icons/fi';

export default function CompilerPage() {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
  cout << "Hello, OOP World!" << endl;
  return 0;
}`);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  


  const compileCode = async () => {
    setIsLoading(true);
    setError('');
    setOutput('');
  
    const encodedCode = btoa(code); // Base64 encode the code
  
    try {
      // Step 1: Submit code to the Judge0 API to get a submission token
      const submissionRes = await fetch(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'x-rapidapi-key': '269deccffcmshb8bcfc66a0fca92p1546fajsn1593f894014a',
          },
          body: JSON.stringify({
            source_code: encodedCode,
            language_id: 54, // 54 is the language ID for C++
            stdin: '',
          }),
        }
      );
  
      const submissionData = await submissionRes.json();
  
      // Check if token is missing
      if (!submissionData.token) {
        throw new Error(`Submission failed. No token received.\nResponse: ${JSON.stringify(submissionData)}`);
      }
  
      const token = submissionData.token;
  
      // Step 2: Get the result of the code execution using the token
      let result = null;
      for (let i = 0; i < 10; i++) {
        const resultRes = await fetch(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
              'x-rapidapi-key': '269deccffcmshb8bcfc66a0fca92p1546fajsn1593f894014a',
            },
          }
        );
  
        result = await resultRes.json();
  
        // If execution is still in progress, wait and check again
        if (result.status.id <= 2) {
          await new Promise(res => setTimeout(res, 1000)); // Wait for 1 second
        } else {
          break;
        }
      }
  
      // Decode the result
      const outputText =
        atob(result.stdout || '') ||
        atob(result.stderr || '') ||
        atob(result.compile_output || '');
  
      // Handle errors or display output
      if (result.stderr || result.compile_output) {
        setError(outputText || 'Compilation Error.');
      } else {
        setOutput(outputText || 'No output.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
    

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
                C++ Compiler
              </h1>
            </Link>
          </motion.div>

          <div className="flex space-x-4">
             <motion.div 
                        whileHover={{ y: -2 }}
                        className="flex gap-4"
                      >
                        <Link
                          to="/"
                          className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700/90 text-gray-100 transition-all duration-300 border border-gray-700 flex items-center gap-2 text-sm"
                        >
                             <FiHome className="text-blue-400" />
                          Home
                        </Link>
                        
                      </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Code Editor */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-blue-700/50">
            <div className="flex items-center bg-gray-900/80 px-4 py-3 border-b border-blue-800/50">
              <div className="flex space-x-2 mr-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-gray-400">main.cpp</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 bg-transparent p-6 text-green-300 font-mono text-sm focus:outline-none resize-none"
              spellCheck="false"
            />
          </div>

          {/* Output Panel */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-blue-700/50">
            <div className="flex items-center justify-between bg-gray-900/80 px-4 py-3 border-b border-blue-800/50">
              <div className="flex items-center">
                <div className="flex space-x-2 mr-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                </div>
                <span className="text-sm text-gray-400">Output</span>
              </div>
              <motion.button
                onClick={compileCode}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-sm font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiPlay className="text-lg" />
                )}
                {isLoading ? 'Compiling...' : 'Run Code'}
              </motion.button>
            </div>
            
            <AnimatePresence>
              {error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 text-red-400 bg-red-900/20 rounded-b-xl"
                >
                  <div className="flex items-center gap-3">
                    <FiAlertCircle className="text-xl" />
                    <pre className="font-mono text-sm whitespace-pre-wrap">{error}</pre>
                  </div>
                </motion.div>
              ) : (
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 text-gray-300 font-mono text-sm whitespace-pre-wrap h-96 overflow-y-auto"
                >
                  {isLoading ? 'Compiling...' : output || 'Click "Run Code" to see the output here'}
                </motion.pre>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-blue-300/70 text-sm">
            Note: This is a simulated compiler for demonstration purposes. 
            Actual compilation requires server-side processing.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}