"use client"; // Ensure this component can use client-side features

import React from 'react';
import NavBar from '../components/NavBar'; // Adjust the path as needed

function DocsPage() {
  return (
    <>
      {/* Navbar */}
      <nav>
        <NavBar />
      </nav>

      {/* Introduction Section */}
      <section className="w-full min-h-screen bg-gradient-to-b from-black to-gray-800 text-white p-10">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center">Welcome to the Rule Engine Documentation</h1>
          <p className="text-lg mb-8 text-center">
            Our Rule Engine utilizes Abstract Syntax Tree (AST) for efficient rule evaluation and visualization.
            Below are the key functionalities we offer.
          </p>

          {/* AST Explanation Section */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold mb-4 text-center">What is AST?</h2>
            <p className="text-lg mb-4">
              An Abstract Syntax Tree (AST) is a tree representation of the abstract syntactic structure of source code.
              Each node of the tree denotes a construct occurring in the source code. The AST abstracts the structure
              of the code, making it easier to analyze and manipulate.
            </p>
            <p className="text-lg mb-4">
              <strong>Why is AST Used?</strong> ASTs are commonly used in compilers and interpreters, allowing for
              efficient parsing, analyzing, and transforming source code. They provide a way to understand the
              underlying structure of code, enabling various optimizations and analyses.
            </p>
            <p className="text-lg mb-4">
              <strong>How Can Users Benefit from AST?</strong> In our Rule Engine, ASTs allow users to define complex
              rules in a structured way. Users can combine simple rules into more complex conditions, visualize these
              rules for better understanding, and efficiently evaluate them against user data.
            </p>
          </div>

          <h2 className="text-4xl font-bold mb-4 text-center">Key Functionalities</h2>
          <div className="flex flex-col sm:flex-row justify-around text-left mt-6">
            <div className="bg-black p-6 rounded-md shadow-lg w-[80vw] max-w-sm mx-2 mb-4">
              <h3 className="text-2xl font-bold mb-2">Set and Evaluate Rules</h3>
              <p className="text-lg">Input custom rules and receive instant evaluation with high precision.</p>
            </div>
            <div className="bg-black p-6 rounded-md shadow-lg w-[80vw] max-w-sm mx-2 mb-4">
              <h3 className="text-2xl font-bold mb-2">Visualize Rules</h3>
              <p className="text-lg">Visualize complex rules with our intuitive syntax tree displays.</p>
            </div>
            <div className="bg-black p-6 rounded-md shadow-lg w-[80vw] max-w-sm mx-2 mb-4">
              <h3 className="text-2xl font-bold mb-2">Combine Rules</h3>
              <p className="text-lg">Consolidate multiple rules with ease, enhancing system compatibility.</p>
            </div>
          </div>

          {/* Instructions and Examples Section */}
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-4">Instructions and Examples</h2>
            <h3 className="text-xl font-bold mb-2">Input Guidelines:</h3>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">Use capital letters for keywords: <strong>AND</strong>, <strong>OR</strong></li>
              <li className="mb-2">Use parentheses <strong>()</strong> to group expressions</li>
              <li className="mb-2">No need to add quotes around strings, e.g., <strong>department == Sales</strong></li>
              <li className="mb-2">Ensure valid JSON structure for input data.</li>
            </ul>

            <h3 className="text-xl font-bold mb-2">Examples:</h3>

            {/* Basic Example 1 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold">1. Rule: <code>age {`>`} 30</code></h4>
              <p className="mb-2">User Data:</p>
              <pre className="bg-white text-black border border-gray-300 p-4 rounded mb-4">
                <code>
                  {`
// Sample User Data
{
  "users": [
    { "age": 32, "department": "Sales", "salary": 60000, "experience": 6 },
    { "age": 28, "department": "HR", "salary": 45000, "experience": 4 }
  ]
}
                  `}
                </code>
              </pre>
            </div>

            {/* Basic Example 2 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold">2. Rule: <code>department == Sales</code></h4>
              <p className="mb-2">User Data:</p>
              <pre className="bg-white text-black border border-gray-300 p-4 rounded mb-4">
                <code>
                  {`
// Sample User Data
{
  "users": [
    { "age": 35, "department": "Sales", "salary": 55000, "experience": 5 },
    { "age": 40, "department": "Marketing", "salary": 50000, "experience": 7 }
  ]
}
                  `}
                </code>
              </pre>
            </div>

            {/* Example 3 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold">3. Rule: <code>((age {`>`} 30 AND department == Sales) OR (age {`<`} 25 AND department == Marketing)) AND (salary {`>`} 50000 OR experience {`>`} 5)</code></h4>
              <p className="mb-2">User Data:</p>
              <pre className="bg-white text-black border border-gray-300 p-4 rounded mb-4">
                <code>
                  {`
// Sample User Data
{
  "users": [
    { "age": 32, "department": "Sales", "salary": 60000, "experience": 6 },
    { "age": 22, "department": "Marketing", "salary": 30000, "experience": 3 }
  ]
}
                  `}
                </code>
              </pre>
            </div>

            {/* Example 4 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold">4. Rule: <code>((age {`>`} 30 AND department == Marketing)) AND (salary {`>`} 20000 OR experience {`>`} 5)</code></h4>
              <p className="mb-2">User Data:</p>
              <pre className="bg-white text-black border border-gray-300 p-4 rounded mb-4">
                <code>
                  {`
// Sample User Data
{
  "users": [
    { "age": 35, "department": "Marketing", "salary": 25000, "experience": 5 },
    { "age": 29, "department": "Sales", "salary": 15000, "experience": 2 }
  ]
}
                  `}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-black text-white text-center">
        <p>© 2024 Rule Engine. All rights reserved.</p>
      </footer>
    </>
  );
}

export default DocsPage;
