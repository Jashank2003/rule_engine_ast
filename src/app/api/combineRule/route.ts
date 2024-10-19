// app/api/combineRule/route.ts
import { NextResponse } from 'next/server';
import { combineRule } from '../../../../utils/astUtils';

export async function POST(req: Request) {
  const { ruleStrings, operator } = await req.json();

  // Validate input
  if (!ruleStrings || !Array.isArray(ruleStrings)) {
    return NextResponse.json({ message: 'Rules array is required' }, { status: 400 });
  }

  try {
    // Call the combineRule function with provided rule strings and operator (optional)
    const combinedAST = combineRule(ruleStrings, operator);
    
    // Return the combined AST
    return NextResponse.json({ ast: combinedAST }, { status: 200 });
  } catch (error) {
    // Handle the error
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
