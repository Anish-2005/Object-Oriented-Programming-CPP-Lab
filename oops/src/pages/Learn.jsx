// src/pages/Syllabus.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBook, FiYoutube, FiDownloadCloud, FiCode, FiArrowLeft, FiExternalLink, FiHome,FiGitlab } from 'react-icons/fi';

  

const syllabusSections = [
    {
      title: "Procedural Programming & C Fundamentals",
      topics: [
        "Data Types, Operators, and Expressions",
        "Variable Scope and Lifetime",
        "Pointers and Arrays",
        "Control Flow Structures",
        "Function Implementation and Program Structure",
        "C Standard Library (string.h, math.h, stdlib.h)",
        "Command Line Arguments",
        "Preprocessor Directives (#include, #define)",
        "C-style Input/Output (printf/scanf)",
        "Memory Management (malloc/calloc/free)"
      ],
      resources: [
        {
          type: "video",
          title: "C Programming Complete Guide",
          url: "https://www.youtube.com/embed/KJgsSFOSQv0"
        },
        {
          type: "code",
          content: `#include <stdio.h>
  #include <stdlib.h>
  
  int main(int argc, char *argv[]) {
      printf("Command line arguments:\\n");
      for(int i = 0; i < argc; i++) {
          printf("Arg %d: %s\\n", i, argv[i]);
      }
      
      int *arr = malloc(5 * sizeof(int));
      for(int i = 0; i < 5; i++) {
          arr[i] = i * 2;
      }
      free(arr);
      return 0;
  }`
        },
        {
          type: "link",
          title: "C Standard Library Reference",
          url: "https://en.cppreference.com/w/c/header"
        }
      ]
    },
    {
      title: "C vs C++ Key Differences",
      topics: [
        "Single-line Comments (//)",
        "Function Overloading and Namespaces",
        "Reference Variables vs Pointers",
        "const vs #define Constants",
        "new/delete Operators vs malloc/free",
        "Type-safe I/O (cin/cout vs printf/scanf)",
        "Inline Functions vs Macros",
        "Default Function Arguments",
        "Stricter Type Checking",
        "bool Data Type Support"
      ],
      resources: [
        {
          type: "comparison",
          content: {
            "Memory Allocation": ["malloc(sizeof(int))", "new int"],
            "Constants": ["#define MAX 100", "const int MAX = 100"],
            "Function Calls": ["No overloading", "Overloading supported"],
            "Error Handling": ["errno", "try/catch exceptions"]
          }
        },
        {
          type: "video",
          title: "C vs C++ Fundamental Differences",
          url: "https://www.youtube.com/embed/BqPzttZBa6I?si=HnsL9Z8VIjkoLn8A"
        }
      ]
    },
    {
      title: "OOP Fundamentals & C++ Extensions",
      topics: [
        "Classes and Objects",
        "Access Specifiers (public/private/protected)",
        "Constructors and Destructors",
        "this Pointer and Scope Resolution Operator",
        "Friend Classes and Functions",
        "Exception Handling (try/catch/throw)",
        "Operator Overloading",
        "Static Class Members",
        "Function Overriding and Virtual Functions",
        "Abstract Classes and Pure Virtual Functions"
      ],
      resources: [
        {
          type: "code",
          content: `class BankAccount {
  private:
      double balance;
  public:
      BankAccount(double initial) : balance(initial) {}
      void deposit(double amount) { balance += amount; }
      void withdraw(double amount) {
          if(amount > balance) throw "Insufficient funds";
          balance -= amount;
      }
      friend class BankManager;
  };`
        },
        {
          type: "video",
          title: "C++ OOP Complete Course",
          url: "https://www.youtube.com/embed/pTB0EiLXUC8"
        }
      ]
    },
    {
      title: "Advanced OOP Concepts",
      topics: [
        "Inheritance Types (Single/Multiple/Hierarchical)",
        "Polymorphism and Virtual Function Table",
        "Dynamic Casting and Type Identification",
        "Template Functions and Classes",
        "STL Containers (vector, map, list)",
        "File I/O Streams (fstream, iomanip)",
        "Move Semantics (rvalue references)",
        "Lambda Expressions",
        "Smart Pointers (unique_ptr, shared_ptr)"
      ],
      resources: [
        {
          type: "code",
          content: `template <typename T>
  class Stack {
      vector<T> elements;
  public:
      void push(const T& item) { elements.push_back(item); }
      T pop() {
          if(elements.empty()) throw "Stack underflow";
          T last = elements.back();
          elements.pop_back();
          return last;
      }
  };`
        },
        {
          type: "link",
          title: "C++ STL Reference Guide",
          url: "https://en.cppreference.com/w/cpp/container"
        }
      ]
    },
    {
      title: "Object-Oriented Design & UML",
      topics: [
        "UML Diagram Types (Class, Sequence, Activity)",
        "Use Case Diagrams for Requirements",
        "Class Relationships (Association, Inheritance)",
        "Design Patterns (Factory, Singleton, Observer)",
        "Code Generation from UML",
        "Dependency Inversion Principle",
        "SOLID Design Principles",
        "Model-View-Controller Architecture"
      ],
      resources: [
        {
          type: "image",
          title: "UML Class Diagram Example",
          url: "https://cdn-proxy.slickplan.com/wp-content/uploads/2023/10/10_uml.png"
        },
        {
          type: "link",
          title: "Online UML Tool",
          url: "https://app.diagrams.net/"
        }
      ]
    }
  ];
  
  const textbooks = [
    {
      title: "The C++ Programming Language (4th Ed)",
      author: "Bjarne Stroustrup",
      link: "https://drive.google.com/uc?export=download&id=17nAprXG1TofZb37RrFppOXOfySBpJmmX"
    },
    {
      title: "C++ and OOP Paradigm (2nd Ed)",
      author: "Debasish Jana",
      link: "https://amzn.to/3xlpEnM"
    }
  ];
  
  const references = [
    {
      title: "Programming: Principles and Practice Using C++",
      author: "Bjarne Stroustrup",
      link: "https://drive.google.com/uc?export=download&id=1He5ddS3EQ_tEZUgrlIXWLLYue1t4N4mb"
    },
    {
      title: "The Design and Evolution of C++",
      author: "Bjarne Stroustrup",
      link: "https://drive.google.com/uc?export=download&id=1GqTjbNNHdnwJoWHFAgWnW1OGE5gVzboc"
    },
    {
      title: "C++ Core Guidelines",
      author: "ISO C++ Foundation",
      link: "https://drive.google.com/uc?export=download&id=1Aw61yw0ApSmF2bTRjtQupT8KivVVQETPs"
    }
  ];

export default function SyllabusPage() {
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
        transition={{ duration: 0.6 }}
        className="bg-gray-900/90 backdrop-blur-lg border-b border-gray-700/50 p-4 sticky top-0 z-50"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-4"
          >
            <Link to="/" className="flex items-center group">
              <div className="p-2 mr-3 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300 shadow-lg">
                <FiCode className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
                 OOP Syllabus
              </h1>
            </Link>
          </motion.div>

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
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto py-20 px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 text-center"
    >
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
        Object Oriented Programming Detailed Syllabus
        </h1>

        <p className="text-blue-300 text-lg max-w-3xl mx-auto">
        Comprehensive guide to Object-Oriented Programming with C++ covering fundamental concepts, advanced features, and software design principles.
        </p>
    </motion.div>

        {/* Syllabus Sections */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {syllabusSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-blue-900/50 backdrop-blur-sm rounded-xl border border-blue-700/50 p-6"
            >
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">{section.title}</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-200">Key Topics:</h3>
                <ul className="list-disc list-inside space-y-2 text-blue-300">
                  {section.topics.map((topic, i) => (
                    <li key={i} className="hover:text-cyan-400 transition-colors">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                {section.resources.map((resource, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-xl p-4">
                    {resource.type === 'video' && (
                      <div className="aspect-video bg-black rounded-xl overflow-hidden">
                        <iframe
                          src={resource.url}
                          title={resource.title}
                          className="w-full h-full"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                    
                    {resource.type === 'code' && (
                      <div className="bg-gray-900/80 rounded-xl overflow-hidden">
                        <div className="flex items-center bg-gray-800 px-4 py-2">
                          <FiCode className="text-blue-400 mr-2" />
                          <span className="text-sm text-gray-400">Code Example</span>
                        </div>
                        <pre className="p-4 text-sm text-green-300 font-mono overflow-x-auto">
                          {resource.content}
                        </pre>
                      </div>
                    )}

                    {resource.type === 'comparison' && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-blue-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-cyan-400">C Feature</th>
                              <th className="px-4 py-2 text-cyan-400">C++ Equivalent</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(resource.content).map(([key, values], idx) => (
                              <tr key={idx} className="border-t border-blue-800/50">
                                <td className="px-4 py-2">{values[0]}</td>
                                <td className="px-4 py-2">{values[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                     {resource.type === 'link' && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 flex items-center gap-2 text-blue-300 hover:text-cyan-400 transition-colors"
                >
                  <FiExternalLink />
                  {resource.title}
                </a>
              )}

              {resource.type === 'image' && (
                <div className="bg-gray-900/80 rounded-xl overflow-hidden">
                  <img 
                    src={resource.url} 
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3 text-sm text-blue-300">
                    {resource.title}
                  </div>
                </div>
              )}
                    
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Textbooks Section */}
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="bg-blue-900/30 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">
              <FiBook className="inline mr-2" />
              Prescribed Textbooks
            </h3>
            {textbooks.map((book, index) => (
              <a
                key={index}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 mb-4 rounded-lg bg-gray-800 hover:bg-gray-700/90 transition-colors"
              >
                <h4 className="text-lg font-semibold text-blue-200">{book.title}</h4>
                <p className="text-blue-300">{book.author}</p>
              </a>
            ))}
          </div>

          <div className="bg-purple-900/30 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-purple-400">
              <FiExternalLink className="inline mr-2" />
              Reference Materials
            </h3>
            {references.map((ref, index) => (
              <a
                key={index}
                href={ref.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 mb-4 rounded-lg bg-gray-800 hover:bg-gray-700/90 transition-colors"
              >
                <h4 className="text-lg font-semibold text-purple-200">{ref.title}</h4>
                <p className="text-purple-300">{ref.author}</p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          className="mt-12 bg-blue-900/50 rounded-xl p-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-cyan-400">
            <FiDownloadCloud className="inline-block mr-2" />
            Course Resources
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <a href="https://mywbut.com/syllabus/paper/298/dept/2/?mode=SM" className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700/90 transition-colors text-blue-200 flex items-center gap-2">
              <FiDownloadCloud />
              Lecture Notes (PDF)
            </a>
            <Link
            to="/labs"
            className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700/90 transition-colors text-blue-200 flex items-center gap-2"
            >
            <FiCode />
            Lab Exercises
            </Link>
            <a href="https://en.cppreference.com/w/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700/90 transition-colors text-blue-200 flex items-center gap-2">
              <FiExternalLink />
              C++ Reference
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="bg-blue-900/80 backdrop-blur-md py-12 mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-200">
            © {new Date().getFullYear()} PCC-CSBS402 Course Materials | MIT License
          </p>
        </div>
      </motion.footer>
    </div>
  );
}