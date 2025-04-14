import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiCode, FiX, FiBook } from 'react-icons/fi';

const AddLab = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    problemStatement: '',
    expectedOutput: '',
    tags: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error: ${response.status} - ${text}`);
      }

      const data = await response.json();
      navigate('/labs');
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit lab exercise');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
      {/* Animated Particles Background */}
      <div className="fixed inset-0 overflow-hidden opacity-20 z-0">
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
            <a href="/" className="flex items-center group">
              <div className="p-2 mr-3 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300 shadow-lg">
                <FiCode className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200 tracking-tight">
                Add New Lab
              </h1>
            </a>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto py-12 px-4 relative z-10"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-700/50 space-y-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
                  <FiBook className="text-xl text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
                  Create New Lab Exercise
                </h2>
              </div>

              {error && (
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="p-4 bg-red-500/20 text-red-300 rounded-lg flex items-center gap-2 border border-red-500/30"
                >
                  <FiX className="flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="space-y-5">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-100">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                    placeholder="Enter lab title"
                    required
                  />
                </div>

                {/* Problem Statement */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-100">Problem Statement</label>
                  <textarea
                    value={formData.problemStatement}
                    onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[120px] placeholder:text-gray-400"
                    placeholder="Describe the programming problem..."
                    required
                  />
                </div>

                {/* Code Editor */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-100">Code Template</label>
                  <textarea
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono min-h-[200px] placeholder:text-gray-400"
                    placeholder="#include <iostream>\nusing namespace std;\n\n// Your code here..."
                    required
                  />
                </div>

                {/* Expected Output */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-100">Expected Output</label>
                  <textarea
                    value={formData.expectedOutput}
                    onChange={(e) => setFormData({ ...formData, expectedOutput: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[100px] font-mono placeholder:text-gray-400"
                    placeholder="Expected program output..."
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-100">Tags</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                    placeholder="e.g., polymorphism, inheritance, classes"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg hover:shadow-blue-500/20"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    <>
                      <FiPlus className="text-lg" />
                      Create Lab Exercise
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddLab;