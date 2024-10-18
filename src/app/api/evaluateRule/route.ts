import { NextResponse } from 'next/server';
import { evaluateRule } from '../../../../utils/astUtils';

export async function POST(req: Request) {
  const { ast, userData } = await req.json();

  if (!ast || !userData) {
    return NextResponse.json({ message: 'AST and user data are required' }, { status: 400 });
  }

  try {
    const result = evaluateRule(ast, userData);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    //  to check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
  }

