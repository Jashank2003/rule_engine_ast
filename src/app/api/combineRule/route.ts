import { NextResponse } from 'next/server';
import { combineRule } from '../../../../utils/astUtils';

export async function POST(req: Request) {
  const { ruleString } = await req.json();

  if (!ruleString || !Array.isArray(ruleString)) {
    return NextResponse.json({ message: 'Rules array is required' }, { status: 400 });
  }

  try {
    const combinedAST = combineRule(ruleString);
    return NextResponse.json({ ast: combinedAST }, { status: 200 });
  } catch (error) {
    //  to check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
