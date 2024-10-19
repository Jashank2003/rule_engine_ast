"use client";
import React, { useState } from 'react';
import VisualRule from '../components/VisualRule'; // Reuse the VisualRule component for AST visualization
import Navbar from '../components/NavBar';

const CombineRule: React.FC = () => {
  const [ruleStrings, setRuleStrings] = useState<string[]>(['']);
  const [operator, setOperator] = useState<'AND' | 'OR'>('AND');
  const [combinedAST, setCombinedAST] = useState<any>(null);
  const [showVisualization, setShowVisualization] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userDataInput, setUserDataInput] = useState<string>(''); // User input for data
  const [evaluationResult, setEvaluationResult] = useState<string | null>(null); // State for evaluation result
  const [jsonError, setJsonError] = useState<string | null>(null); // State for JSON error handling

  const handleRuleChange = (index: number, value: string) => {
    const updatedRules = [...ruleStrings];
    updatedRules[index] = value;
    setRuleStrings(updatedRules);
  };

  const addRuleInput = () => {
    setRuleStrings([...ruleStrings, '']);
  };

  const removeRuleInput = (index: number) => {
    const updatedRules = ruleStrings.filter((_, i) => i !== index);
    setRuleStrings(updatedRules);
  };

  const combineRules = async () => {
    setError(null);
    try {
      const response = await fetch('/api/combineRule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruleStrings, operator }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to combine rules');
      }

      const { ast } = await response.json();
      setCombinedAST(ast);
      setShowVisualization(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEvaluate = async () => {
    setEvaluationResult(null); // Reset previous result
    setJsonError(null); // Reset previous JSON error
    try {
      const parsedUserData = JSON.parse(userDataInput); // Parse the user data input

      const evaluationResponse = await fetch('/api/evaluateRule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ast: combinedAST, userData: parsedUserData }), 
      });

      if (!evaluationResponse.ok) {
        throw new Error('Failed to evaluate rules');
      }

      const data = await evaluationResponse.json();
      console.log("Evaluation result: ", data);
      setEvaluationResult(data.result ? 'true' : 'false'); // Set the evaluation result as 'true' or 'false'
    } catch (error) {
      if (error instanceof Error) {
        setJsonError(error.message); // Set the error message directly
      } else {
        setJsonError('An unknown error occurred'); // Set a generic error message
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className=" mt-7 container w-[80vw] mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
          Combine Rules

        </h2>

        {ruleStrings.map((rule, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              type="text"
              value={rule}
              onChange={(e) => handleRuleChange(index, e.target.value)}
              className="border p-2 w-full bg-gray-800 text-white rounded"
              placeholder={`Enter Rule ${index + 1}`}
            />
            {ruleStrings.length > 1 && (
              <button
                onClick={() => removeRuleInput(index)}
                className="ml-2 bg-red-600 text-white p-2 rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button onClick={addRuleInput} className="bg-green-600 text-white p-2 rounded mb-4">
          Add Another Rule
        </button>

        <div className="mb-4">
          <label className="font-bold mr-2">Combine Operator:</label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value as 'AND' | 'OR')}
            className="border p-2 bg-gray-800 text-white rounded"
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>

        <button onClick={combineRules} className="bg-blue-600 text-white p-2 rounded mb-4">
          Combine Rules
        </button>
        {combinedAST && ( // Only show the button if combinedAST is available
            <button
              onClick={() => setShowVisualization(true)}
              className="bg-yellow-500 font-semibold  text-white p-2 rounded ml-4"
            >
              Visualize Rule
            </button>
          )}

        {error && <p className="text-red-600 mt-4">{error}</p>}

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">User Data for Evaluation:</h3>
          <textarea
            rows={4}
            value={userDataInput} // Controlled input for user data
            onChange={(e) => setUserDataInput(e.target.value)}
            className="border p-2 w-full bg-gray-800 text-white rounded"
            placeholder='Enter user data in JSON format (e.g., {"age": 30, "department": "Sales"})'
          />
        </div>

        <button onClick={handleEvaluate} className="bg-yellow-600 text-white p-2 rounded mb-4">
          Evaluate Rules
        </button>

        {jsonError && <p className="text-red-600 mt-4">{jsonError}</p>}
        
        {evaluationResult !== null && (
          <p className={`mt-4 ${evaluationResult === 'true' ? 'text-green-600' : 'text-red-600'}`}>
            Evaluation Result: {evaluationResult}
          </p>
        )}

        {showVisualization && combinedAST && (
          <div className="mt-8">
            <button
              onClick={() => setShowVisualization(false)}
              className="bg-red-600 text-white p-2 rounded mb-4"
            >
              Close Visualization
            </button>
            <VisualRule ast={combinedAST} onClose={() => setShowVisualization(false)} />
          </div>
        )}
      </div>
    </>
  );
};

export default CombineRule;
