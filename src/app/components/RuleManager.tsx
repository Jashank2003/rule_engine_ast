
"use client";
import { useState } from 'react';
import VisualRule from './VisualRule'; 

const RuleManager = () => {
  const [ruleString, setRuleString] = useState(''); // store the rule string
  const [userDataInput, setUserDataInput] = useState(''); // store raw input as string
  const [userData, setUserData] = useState<Record<string, any>>({});

  const [evaluationResult, setEvaluationResult] = useState<string | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  
  const [currentRule, setCurrentRule] = useState<string | null>(null); 
  const [ast, setAst] = useState(null); // State to store the generated AST

  const [showVisualization, setShowVisualization] = useState(false);

  const handleSetRule = async () => {
    if (ruleString) {
      setCurrentRule(ruleString); 
      setRuleString(''); 

     
      try {
        const astResponse = await fetch('/api/createRule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ruleString }), 
        });

        if (!astResponse.ok) {
          throw new Error('Failed to create AST from rule');
        }

        const astData = await astResponse.json();
        setAst(astData.ast); // Store the AST
      } catch (error) {
        console.error('Error creating AST:', error);
      }
    }
  };

  const handleEvaluate = async () => {
    try {
      const parsedUserData = JSON.parse(userDataInput); 
      
      // Check if parsedUserData is an object and has necessary fields
      if (typeof parsedUserData !== 'object' || parsedUserData === null) {
        throw new Error('Please enter valid JSON.');
      }

      setUserData(parsedUserData);
      setJsonError(null); 

    //   console.log("Current rule checking: ", currentRule); 
    //   console.log("User data: ", parsedUserData); 

     // Evalutaion
      const evaluationResponse = await fetch('/api/evaluateRule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ast, userData: parsedUserData }),
      });

      if (!evaluationResponse.ok) {
        throw new Error('Failed to evaluate rules');
      }

      const data = await evaluationResponse.json();
      console.log("Evaluation result: ", data);
      setEvaluationResult(data.result);
    } catch (error) {
      if (error instanceof Error) {
        setJsonError(error.message); // Set  error message directly
      } else {
        setJsonError('An unknown error occurred'); // Set a generic error message
      }
    }
  };

  const handleVisualizeRule = () => {
    if (ast) {
      setShowVisualization(true); 
    }
  };

  const handleCloseVisualization = () => {
    setShowVisualization(false); 
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[98vw] max-w-2xl">  
      <div className="mb-4">
        <label className="block text-gray-300 mb-2" htmlFor="ruleString">Enter a Rule</label>
        <input
          type="text"
          id="ruleString"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          placeholder="e.g., age > 30 AND department == 'Sales'"
          className="w-full text-black border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </div>

      <div className="mb-6 text-center">
        <button
          onClick={handleSetRule}
          className="bg-black border border-black hover:bg-transparent hover:border-white text-white font-bold py-2 px-4 rounded-md transition duration-150"
        >
          Set Rule
        </button>
        <button
          onClick={handleVisualizeRule}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ml-2"
          disabled={!ast}
        >
          Visualize Rule
        </button>
      </div>

      {currentRule && (
        <div className="bg-gray-700 p-4 rounded-md text-white mb-6">
          <h3 className="text-lg font-bold">Current Rule:</h3>
          <p>{currentRule}</p>
          <p className="text-sm text-gray-400">Checking user data against this rule</p>
        </div>
      )}

      <h2 className="text-xl font-bold text-white mb-4">User Data</h2>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2" htmlFor="userData">Enter User Data as JSON</label>
        <textarea
          id="userData"
          className="w-full text-black p-2 h-32 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder='{"age": 35, "income": 60000}'
          value={userDataInput}
          onChange={(e) => setUserDataInput(e.target.value)}
        />
        {jsonError && <div className="text-red-500 mt-2">{jsonError}</div>}
      </div>

      <div className="text-center mb-6">
        <button
          onClick={handleEvaluate}
          className="bg-black border border-black hover:bg-transparent hover:border-white text-white font-bold py-2 px-4 rounded-md transition duration-150"
        >
          Evaluate Rule
        </button>
      </div>

      {evaluationResult !== null && (
        <div className="p-4 rounded-md text-center">
          <h3 className="text-lg font-bold text-white">Evaluation Result:</h3>
          <span className={evaluationResult ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
            {evaluationResult.toString()}
          </span>
        </div>
      )}

      {/* Visualization Compo... */}
      {showVisualization && ast && (
        <VisualRule ast={ast} onClose={handleCloseVisualization} />
      )}
    </div>
  );
};

export default RuleManager;
