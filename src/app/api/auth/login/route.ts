import { NextRequest, NextResponse } from 'next/server';

interface LoginRequest {
  companyCode: string;
  userID: string;
  password: string;
}

const demoAccounts = [
  {
    companyCode: 'DEMO123',
    userID: 'demo_user',
    password: 'demo123',
    role: 'user',
    needsOTP: false
  },
  {
    companyCode: 'BANK999',
    userID: 'demo_admin',
    password: 'admin999',
    role: 'admin',
    needsOTP: true
  }
];

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { companyCode, userID, password } = body;

    const account = demoAccounts.find(
      acc => acc.companyCode === companyCode &&
             acc.userID === userID &&
             acc.password === password
    );

    if (!account) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        companyCode: account.companyCode,
        userID: account.userID,
        role: account.role
      },
      needsOTP: account.needsOTP,
      token: `demo_token_${account.userID}`
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}