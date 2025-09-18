import { NextRequest, NextResponse } from 'next/server';

let storeData = {
  companyName: "Demo Company Ltd",
  logo: "/demo/logo.png",
  description: "Leading manufacturer of high-quality steel products",
  address: "123 Industrial Street, Manufacturing District",
  phone: "+1-555-0123",
  email: "contact@democompany.com",
  website: "www.democompany.com",
  products: [
    {
      id: 1,
      name: "Steel Coil",
      sku: "SP001",
      moq: 100,
      price: 500,
      unit: "tons",
      description: "High-grade steel coils for construction",
      category: "Steel Products",
      views: 200,
      hsCode: "7208.10.00"
    },
    {
      id: 2,
      name: "Aluminum Sheets",
      sku: "AP002",
      moq: 50,
      price: 800,
      unit: "sheets",
      description: "Premium aluminum sheets for aerospace industry",
      category: "Aluminum Products",
      views: 150,
      hsCode: "7606.11.00"
    }
  ],
  policy: {
    payment: ["Letter of Credit", "Bank Transfer", "Trade Finance"],
    shipping: "Worldwide shipping available",
    warranty: "12 months warranty on all products",
    returns: "Returns accepted within 30 days"
  },
  statistics: {
    totalViews: 1250,
    monthlyViews: 247,
    topProducts: [
      { name: "Steel Coil", views: 200 },
      { name: "Aluminum Sheets", views: 150 }
    ],
    inquiries: 45
  }
};

export async function GET() {
  return NextResponse.json(storeData);
}

export async function PUT(request: NextRequest) {
  try {
    const updates = await request.json();
    storeData = { ...storeData, ...updates };
    return NextResponse.json({ success: true, data: storeData });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update store' },
      { status: 500 }
    );
  }
}