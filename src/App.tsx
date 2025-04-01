import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Brain, BookOpen, GraduationCap, Code, Cpu, BookMarked, Archive, PenTool as Tool, AlertTriangle } from 'lucide-react';

interface QAItem {
  question: string;
  answer: string;
  code?: string;
  icon: React.ReactNode;
  image?: string;
}

interface QuizQuestion {
  question: string;
  answer: boolean;
}

function App() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: boolean | null}>({});
  const [showResults, setShowResults] = useState(false);

  const qaItems: QAItem[] = [
    {
      question: "What does calling conventions entail?",
      answer: "Think of calling conventions like a rulebook for how functions talk to each other. They tell us where to put the information a function needs (like its inputs), where to expect the results, and how to clean up afterward. It's like having a standard way of passing notes in class - everyone needs to follow the same rules for it to work!",
      icon: <BookMarked className="w-6 h-6 text-purple-500" />,
      image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=400"
    },
    {
      question: "How do we get the CPU back to the correct state?",
      answer: "Imagine you're reading a book and use a bookmark before taking a break. The CPU does something similar! When a function is called, it saves its 'bookmark' (return address) on the stack. When the function is done, it looks at this bookmark to know exactly where to continue from. It's that simple!",
      icon: <Cpu className="w-6 h-6 text-blue-500" />,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400"
    },
    {
      question: "How are local variables restored?",
      answer: "Think of local variables like items on your desk. Before starting a new task (function), you store your current items (variables) in a drawer (the stack). The CPU keeps track of where everything is using a special pointer (like a map of your drawer). When you're done, everything goes back to exactly where it was!",
      icon: <Archive className="w-6 h-6 text-green-500" />,
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=400"
    },
    {
      question: "How do we pass parameters?",
      answer: "In modern 64-bit programs, it's like having six special delivery slots (registers) for quick access. The first six pieces of information go into these slots. If you need to pass more, the extra items go into a storage area (the stack). It's like having a few items in your hands and putting the rest in your backpack!",
      icon: <Code className="w-6 h-6 text-pink-500" />
    },
    {
      question: "How is the stack frame cleaned up?",
      answer: "Cleaning up the stack frame is like cleaning up after playing with building blocks. You need to put everything back exactly as you found it. The CPU has a checklist: 1) Put back any saved registers, 2) Reset the stack pointer to remove local variables, 3) Return to where you came from. Simple and organized!",
      icon: <Tool className="w-6 h-6 text-orange-500" />
    },
    {
      question: "What changes between 32-bit and 64-bit programs?",
      answer: "The main difference is like upgrading from a small toolbox to a big one! 64-bit programs have more registers (special storage spaces) to work with, can handle bigger numbers, and can use more memory. They also have a more efficient way of passing information between functions. Think of it as an upgrade that makes everything faster and bigger!",
      icon: <GraduationCap className="w-6 h-6 text-indigo-500" />
    },
    {
      question: "Why do we need different calling conventions?",
      answer: "Different calling conventions are like having different rules for different games. Some rules work better for certain situations - like how basketball and soccer have different rules for handling the ball. Some conventions focus on speed, others on compatibility with older programs, and some are designed for specific programming languages!",
      icon: <BookOpen className="w-6 h-6 text-yellow-500" />
    },
    {
      question: "What happens if calling conventions are not followed?",
      answer: "Not following calling conventions is like trying to play chess with checkers rules - it just won't work! The program will get confused about where to find its information, might use wrong values, or could crash entirely. It's crucial to follow the rules so everything works smoothly!",
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      code: `; Simple function to add two numbers
section .text
global add_numbers    ; Make our function visible to other files

add_numbers:
    ; Step 1: Save our current position (like using a bookmark)
    push rbp          ; Save old bookmark
    mov rbp, rsp      ; Create new bookmark

    ; Step 2: Get our numbers from registers
    ; First number is already in rdi
    ; Second number is already in rsi
    
    ; Step 3: Add the numbers
    mov rax, rdi      ; Put first number in result box
    add rax, rsi      ; Add second number to it

    ; Step 4: Clean up and return
    pop rbp           ; Remove our bookmark
    ret               ; Go back to where we came from

; Example of calling our function:
; mov rdi, 5    ; First number (5)
; mov rsi, 3    ; Second number (3)
; call add_numbers  ; Result (8) will be in rax`
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      question: "In modern programs, the first few parameters are passed using special storage slots (registers) instead of memory.",
      answer: true
    },
    {
      question: "When a function finishes, it needs a special register to find its way back to where it was called from.",
      answer: false
    },
    {
      question: "Local variables are stored in a special area called the stack frame during function execution.",
      answer: true
    },
    {
      question: "In the most common convention (cdecl), the function that was called is responsible for cleaning up its parameters.",
      answer: false
    },
    {
      question: "64-bit programs can use more storage spaces (registers) for passing parameters than 32-bit programs.",
      answer: true
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const handleQuizAnswer = (index: number, answer: boolean) => {
    setQuizAnswers(prev => ({...prev, [index]: answer}));
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) correct++;
    });
    return (correct / quizQuestions.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Cpu className="w-20 h-20 mx-auto text-purple-600" />
            </motion.div>
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            >
              <div className="w-24 h-24 rounded-full bg-purple-200 filter blur-xl" />
            </motion.div>
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-transparent bg-clip-text"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Understanding Calling Conventions
          </motion.h1>
          <motion.p 
            className="text-xl text-purple-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Dive into the magical world of function calls and stack management
          </motion.p>
        </div>

        {/* Q&A Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-purple-700" />
            <h2 className="text-2xl font-semibold text-purple-700">Learn</h2>
          </div>
          <div className="space-y-4">
            {qaItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white backdrop-blur-lg bg-opacity-90 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-purple-50 transition-colors duration-300"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="font-medium text-gray-800">{item.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openQuestion === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-purple-600" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openQuestion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 py-4 bg-purple-50 text-gray-700"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {item.image && (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="md:w-1/3"
                          >
                            <img 
                              src={item.image} 
                              alt="Concept visualization" 
                              className="rounded-lg shadow-md w-full h-48 object-cover"
                            />
                          </motion.div>
                        )}
                        <div className={`${item.image ? 'md:w-2/3' : 'w-full'}`}>
                          <p className="mb-4">{item.answer}</p>
                          {item.code && (
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
                            >
                              <pre className="font-mono text-sm">
                                <code>{item.code}</code>
                              </pre>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quiz Section */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white backdrop-blur-lg bg-opacity-90 rounded-lg shadow-lg p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Brain className="text-purple-700 w-8 h-8" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-purple-700">Test Your Knowledge</h2>
          </div>
          <div className="space-y-6">
            {quizQuestions.map((q, i) => (
              <motion.div 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.8 }}
                className="border-b border-purple-100 pb-4 last:border-0"
              >
                <p className="mb-3 text-gray-800">{q.question}</p>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                      quizAnswers[i] === true
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    }`}
                    onClick={() => handleQuizAnswer(i, true)}
                  >
                    True
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                      quizAnswers[i] === false
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    }`}
                    onClick={() => handleQuizAnswer(i, false)}
                  >
                    False
                  </motion.button>
                </div>
              </motion.div>
            ))}
            <div className="text-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                onClick={() => setShowResults(true)}
              >
                Check Results
              </motion.button>
              <AnimatePresence>
                {showResults && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="mt-4"
                  >
                    <motion.p 
                      className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0, 1, 1]
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      Your Score: {calculateScore()}%
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;