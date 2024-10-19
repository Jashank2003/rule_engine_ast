import React, { useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';

// Define the type for AST nodes
type ASTNode = {
  type: 'operator' | 'operand'; 
  left?: ASTNode | null; 
  right?: ASTNode | null; 
  value: string; 
};

// Define the type for tree nodes used in react-d3-tree
type TreeNode = {
  name: string; 
  children: TreeNode[]; 
};

interface VisualRuleProps {
  ast: ASTNode | null; // Pass the AST as a prop
  onClose: () => void; // Close handler
}

const VisualRule: React.FC<VisualRuleProps> = ({ ast, onClose }) => {
  const visualRuleRef = useRef<HTMLDivElement>(null); // Ref to track the VisualRule element

  // Function to handle click outside
  const handleClickOutside = (event: MouseEvent) => {
    if (visualRuleRef.current && !visualRuleRef.current.contains(event.target as Node)) {
      onClose(); 
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); 
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); 
    };
  }, []);

  if (!ast) return null; 

  // Convert AST to a format compatible with react-d3-tree
  const convertASTToTree = (node: ASTNode): TreeNode => {
    const { value, left, right } = node;

   
    const treeNode: TreeNode = {
      name: `${value}`, 
      children: [], 
    };

    // Recursively add children if they exist
    if (left) {
      treeNode.children.push(convertASTToTree(left)); 
    }
    if (right) {
      treeNode.children.push(convertASTToTree(right)); 
    }

    return treeNode; // Return the constructed tree node
  };

 
  
  const treeData = convertASTToTree(ast); // Convert the AST to a tree structure

  return (
    <div 
      ref={visualRuleRef} // Attach ref to the VisualRule container
      className="absolute top-2 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10" 
      style={{ width: '90vw', maxWidth: '500px', height: '90vh', maxHeight: '98vh' }}
    >
      <button onClick={onClose} className="mb-2 bg-red-600 text-white p-1 rounded text-sm">Close</button>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '10px', 
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)', 
        height: '80vh',
        overflow: 'auto' 
      }}>
        <div style={{ marginBottom: '10px', fontSize: '12px', color: '#555' }}>
          <strong>Instructions:</strong><br />
          - Drag the tree to navigate.<br />
          - Scroll to zoom in/out.<br />
          - Click on nodes for more details.
        </div>
        <Tree 
          data={treeData} 
          translate={{ x: 200, y: 40 }} 
          orientation="vertical" 
          nodeSize={{ x: 150, y: 100 }} 
 // Using 'as any' to bypass type checking; 
        />
      </div>
    </div>
  );
};

export default VisualRule;


// styles={{
//   nodes: {
//     node: {
//       circle: {
//         fill: '#FFC107', 
//         stroke: '#FFA000', 
//         strokeWidth: 2,
//       },
//       name: {
//         fill: '#000', 
//         fontSize: '12px', 
//         fontWeight: 'bold', 
//       },
//       attributes: {
//         fill: '#555', 
//         fontSize: '10px',
//       },
//     },
//   },
// } as any}