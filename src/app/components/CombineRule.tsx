// components/CombineRule.tsx
import React, { useState } from 'react';
import VisualRule from './VisualRule'; // Reuse the VisualRule component for AST visualization

const CombineRule: React.FC = () => {
  const [ruleStrings, setRuleStrings] = useState<string[]>(['']);
  const [operator, setOperator] = useState<'AND' | 'OR'>('AND');
  const [combinedAST, setCombinedAST] = useState(null);
  const [showVisualization, setShowVisualization] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Combine Rules</h2>

      {ruleStrings.map((rule, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={rule}
            onChange={(e) => handleRuleChange(index, e.target.value)}
            className="border p-2 w-full"
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
        <select value={operator} onChange={(e) => setOperator(e.target.value as 'AND' | 'OR')}>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      <button onClick={combineRules} className="bg-blue-600 text-white p-2 rounded">
        Combine Rules
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

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
  );
};

export default CombineRule;
