"use client";
import React, { useState, useRef, useEffect } from 'react';
import RuleManager from './components/RuleManager';

function Page() {
  const [showDocs, setShowDocs] = useState(false); 
  const docsRef = useRef<HTMLDivElement>(null); 

  const toggleDocs = () => {
    setShowDocs(!showDocs); // Toggle documentation visibility
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (docsRef.current && !docsRef.current.contains(event.target as Node)) {
      setShowDocs(false); // Close documentation
    }
  };

  useEffect(() => {
    if (showDocs) {
      document.addEventListener('mousedown', handleClickOutside); 
    } else {
      document.removeEventListener('mousedown', handleClickOutside); 
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); 
    };
  }, [showDocs]);

  return (
    <>
      <h1 className="text-5xl font-bold text-center mt-2 mx-2">Rule With AST</h1>
      <button 
        onClick={toggleDocs} 
        className="absolute top-5 left-5 text-gray-700 font-semibold underline p-2 rounded"
      >
        {showDocs ? 'Hide Docs' : 'Show Docs'}
      </button>
      <div className="flex justify-center mt-10">
        <RuleManager />
      </div>
      {/* Overlay Documentation */}
      {showDocs && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-black bg-opacity-50">
          <div 
            ref={docsRef} // Attach ref to the documentation container
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-lg overflow-auto h-3/4"
          >
            <h2 className="text-2xl font-bold mb-4">Documentation</h2>
            <p className="mb-4">To create rules, follow these guidelines:</p>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">Use capital letters for keywords: <strong>AND</strong>, <strong>OR</strong></li>
              <li className="mb-2">Use parentheses <strong>()</strong> to group expressions</li>
              <li className="mb-2">No need to add quotes around strings, e.g., <strong>department == Sales</strong></li>
              <li className="mb-2">Ensure valid JSON structure for input data.</li>
            </ul>
            <h3 className="text-xl font-bold mb-2">Examples:</h3>
            <pre className="bg-white text-black border border-gray-300 text-wrap p-4 rounded mb-4">
              <code>
                {`
1. age > 30
2. age > 30 AND department == Sales
3. (age > 25 OR age < 40) AND department == Sales
4. ((age < 40 AND department == Sales) OR (age > 30 AND department == HR))
                `}
              </code>
            </pre>
            <h3 className="text-xl font-bold mb-2">Sample User Data:</h3>
            <pre className="bg-white text-black border border-gray-300 p-4 rounded mb-4">
              <code>
                {`
{
  "users": [
    { "age": 32, "department": "Sales" },
    { "age": 28, "department": "HR" },
    { "age": 45, "department": "Sales" },
    { "age": 37, "department": "IT" }
  ]
}
                `}
              </code>
            </pre>
            <p className="mb-4">Once the rule is set, you can visualize the tree structure of your rule!</p>
            <button 
              onClick={toggleDocs} 
              className="mt-2 bg-red-600 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
