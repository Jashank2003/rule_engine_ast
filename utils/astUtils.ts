
type NodeType = 'operator' | 'operand';

// interface for an AST Node
interface ASTNode {
  type: NodeType;
  left?: ASTNode | null;
  right?: ASTNode | null;
  value?: string | number | null;
}

// Class for AST Node Implementation
class ASTNodeImpl implements ASTNode {
  type: NodeType;
  left: ASTNode | null;
  right: ASTNode | null;
  value: string | number | null;

  constructor(type: NodeType, left: ASTNode | null = null, right: ASTNode | null = null, value: string | number | null = null) {
    this.type = type;
    this.left = left;
    this.right = right;
    this.value = value;
  }
}

// Function to create an AST from a rule string
export function createRule(ruleString: string): ASTNode {
  const tokens = tokenize(ruleString);
  const ast = parseTokens(tokens);
  return ast;
}

// Tokenize the rule string
function tokenize(input: string): string[] {
  // Replace parentheses and logical operators with space for splitting
  return input
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .split(/\s+/)
    .filter(token => token.length > 0);
}

// Parse tokens into an AST
function parseTokens(tokens: string[]): ASTNode {
  const tokenStack: string[] = [];
  const outputQueue: ASTNode[] = [];

  const precedence: Record<string, number> = {
    'OR': 1,
    'AND': 2,
    '>': 3,
    '<': 3,
    '==': 3,
  };

  const applyOperator = (operator: string) => {
    const right = outputQueue.pop();
    const left = outputQueue.pop();
    const operatorNode = new ASTNodeImpl('operator', left, right, operator);
    outputQueue.push(operatorNode);
  };

  for (const token of tokens) {
    if (token === '(') {
      tokenStack.push(token);
    } else if (token === ')') {
      while (tokenStack.length && tokenStack[tokenStack.length - 1] !== '(') {
        applyOperator(tokenStack.pop()!);
      }
      tokenStack.pop(); 
    } else if (token in precedence) {
      while (tokenStack.length && precedence[tokenStack[tokenStack.length - 1]] >= precedence[token]) {
        applyOperator(tokenStack.pop()!);
      }
      tokenStack.push(token);
    } else {
     
      const node = new ASTNodeImpl('operand', null, null, token);
      outputQueue.push(node);
    }
  }

  while (tokenStack.length) {
    applyOperator(tokenStack.pop()!);
  }

  return outputQueue[0]; // final AST
}

// Function to evaluate an AST against user data
export function evaluateRule(ast: ASTNode, userData: Record<string, any>): boolean | number | string {
    // if its  operand
    if (ast.type === 'operand') {
      
        if (typeof ast.value === 'string' && !isNaN(Number(ast.value))) {
            return Number(ast.value); 
        }

      
        if (typeof ast.value === 'string') {
            const trimmedValue = ast.value.replace(/^'|'$/g, ''); 
            const valueFromUserData = userData[trimmedValue];

            if (valueFromUserData !== undefined) {
                return valueFromUserData; 
            }

            
            return trimmedValue;
        }

        // If value is not a string or number, handle it accordingly
        throw new Error(`Invalid operand value: ${ast.value}`);
    }

    // if its  operator
    if (ast.type === 'operator') {
        const leftValue = evaluateRule(ast.left as ASTNode, userData);  
        const rightValue = evaluateRule(ast.right as ASTNode, userData);        
        
        //  logical operators (AND, OR)
        if (ast.value === 'AND') {
            return Boolean(leftValue) && Boolean(rightValue);
        } else if (ast.value === 'OR') {
            return Boolean(leftValue) || Boolean(rightValue);
        } else {
            // Handle relational operators (> , < , ==)
            if (typeof leftValue === 'string' && typeof rightValue === 'string') {
                return leftValue === rightValue; // String comparison
            }

            // Check if leftValue and rightValue can be compared
            const leftNum = typeof leftValue === 'number' ? leftValue : parseFloat(leftValue as string);
            const rightNum = typeof rightValue === 'number' ? rightValue : parseFloat(rightValue as string);

            if (isNaN(leftNum) || isNaN(rightNum)) {
                throw new Error(`Invalid comparison between ${leftValue} and ${rightValue}`);
            }

            switch (ast.value) {
                case '>':
                    return leftNum > rightNum;
                case '<':
                    return leftNum < rightNum;
                case '==':
                    return leftNum === rightNum;
                default:
                    throw new Error(`Unknown operator: ${ast.value}`);
            }
        }
    }

    throw new Error('Invalid AST structure');
}












// Function to combine multiple rules into a single AST
export function combineRule(ruleStrings: string[], operator: 'AND' | 'OR' = 'AND'): ASTNode {
    if (ruleStrings.length === 0) {
      throw new Error('No rules provided for combination');
    }
  
    const asts = ruleStrings.map(ruleString => createRule(ruleString)); // Create ASTs for each rule
  
    // Start with the first AST
    let combinedAST = asts[0];
  
    for (let i = 1; i < asts.length; i++) {
      const newOperator = new ASTNodeImpl('operator', combinedAST, asts[i], operator);
      combinedAST = newOperator; // Combine with the next AST
    }
  
    return combinedAST; // Return the combined AST
}
