import { NextResponse } from 'next/server';
import { createRule } from '../../../../utils/astUtils';

export async function POST(req: Request) {
  const { ruleString } = await req.json();

  if (!ruleString) {
    return NextResponse.json({ message: 'Rule string is required' }, { status: 400 });
  }

  try {
    const ast = createRule(ruleString);
    return NextResponse.json({ ast }, { status: 200 });
  } catch (error) {
    // check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  
  }
}
