import { NextRequest, NextResponse } from 'next/server';

interface RegisterRequest {
  companyCode: string;
  phoneNumber: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();
    const { companyCode, phoneNumber } = body;

    // Simulate OTP sending
    return NextResponse.json({
      success: true,
      message: 'OTP sent to your phone number',
      otpId: `otp_${Date.now()}`,
      // In demo, OTP is always 123456
      demoOTP: '123456'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}