import { NextRequest, NextResponse } from 'next/server';

interface VerifyOTPRequest {
  otpId: string;
  otp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyOTPRequest = await request.json();
    const { otp } = body;

    // Demo OTP is always 123456
    if (otp === '123456') {
      return NextResponse.json({
        success: true,
        message: 'OTP verified successfully'
      });
    }

    return NextResponse.json(
      { error: 'Invalid OTP' },
      { status: 400 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}