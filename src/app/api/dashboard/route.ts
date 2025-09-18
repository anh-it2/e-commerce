import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock dashboard data
    const dashboardData = {
      connections: 5,
      activeNeeds: 2,
      trustScore: 80,
      storeStatus: "incomplete",
      upcomingEvents: [
        "Meeting with Company A - Tomorrow 2:00 PM",
        "Call with Bank B - Friday 10:00 AM",
        "Product demo - Next Monday 3:00 PM"
      ],
      financialOffers: [
        {
          id: 1,
          title: "Trade Financing",
          description: "Get up to $500K for your next shipment",
          rate: "5.5% APR",
          provider: "Demo Bank"
        },
        {
          id: 2,
          title: "Letter of Credit",
          description: "Secure international transactions",
          rate: "1.2% fee",
          provider: "Global Trade Bank"
        }
      ]
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}