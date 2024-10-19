"use client";
import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import Navbar from '../components/NavBar';

type ASTNode = {
  type: 'operator' | 'operand';
  left?: ASTNode | null;
  right?: ASTNode | null;
  value: string;
};

type TreeNode = {
  name: string;
  children: TreeNode[];
};

const VisualizeRule: React.FC = () => {
  const [ruleInput, setRuleInput] = useState<string>(''); // User input for rule
  const [currentAST, setCurrentAST] = useState<ASTNode | null>(null); // State for the current AST
  const [error, setError] = useState<string | null>(null); // State for errors
  const [visualizeTree, setVisualizeTree] = useState<boolean>(false); // State to show tree visualization

  const handleSetRule = async () => {
    setError(null);
    try {
      const response = await fetch('/api/createRule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruleString: ruleInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to set rule');
      }

      const { ast } = await response.json();
      setCurrentAST(ast);
      setVisualizeTree(true); // Show the tree after setting the rule
    } catch (err: any) {
      setError(err.message);
    }
  };

  const convertASTToTree = (node: ASTNode): TreeNode => {
    const { value, left, right } = node;

    const treeNode: TreeNode = {
      name: `${value}`,
      children: [],
    };

    if (left) {
      treeNode.children.push(convertASTToTree(left));
    }
    if (right) {
      treeNode.children.push(convertASTToTree(right));
    }

    return treeNode;
  };

  const treeData = currentAST ? convertASTToTree(currentAST) : null;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 w-[90vw] bg-gradient-to-b from-black to-gray-950 text-white rounded-lg shadow-lg h-screen">
        <h2 className="text-2xl font-bold mb-4">Set Rule and Visualize AST</h2>

        <div className="mb-4">
          <textarea
            rows={3}
            value={ruleInput}
            onChange={(e) => setRuleInput(e.target.value)}
            className="border p-2 w-full bg-gray-800 text-white rounded"
            placeholder="Enter your rule (e.g., age > 30 AND department == Sales)"
          />
        </div>

        <button 
          onClick={handleSetRule} 
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ml-2"
        >
          Set Rule And Visualize
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {visualizeTree && currentAST && treeData && (
          <div className="mt-8">
            <div 
              className="bg-white text-black rounded-lg p-4"
              style={{ width: '90%', margin: '0 auto', height: '80vh', overflow: 'hidden' }}
            >
              <div className="mb-2 text-sm text-gray-600">
                <strong className='font-bold text-black'>Instructions:</strong><br />
                - Drag to navigate the tree.<br />
                - Scroll to zoom in/out.<br />
                - Click on nodes to see more details.<br />
                - Nodes represent operators and operands.
              </div>
              <Tree
                data={treeData}
                translate={{ x: 270, y: 40 }}
                orientation="vertical"
                nodeSize={{ x: 150, y: 100 }}
                
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VisualizeRule;