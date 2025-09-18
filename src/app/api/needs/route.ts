import { NextRequest, NextResponse } from 'next/server';

const businessNeeds = [
  {
    id: 1,
    type: "buy",
    product: "Steel Coil",
    hsCode: "7208.10.00",
    quantity: 500,
    unit: "tons",
    moq: 100,
    price: 450,
    currency: "USD",
    expiry: "2025-12-31",
    visibility: "public",
    description: "Looking for high-grade steel coils for construction project",
    location: "Ho Chi Minh City, Vietnam",
    company: "Demo Company Ltd",
    status: "Open",
    createdAt: "2025-01-15",
    suggestedPartners: ["Global Steel Corp", "Steel Manufacturing Inc"]
  },
  {
    id: 2,
    type: "sell",
    product: "Jasmine Rice",
    hsCode: "1006.30.00",
    quantity: 1000,
    unit: "tons",
    moq: 50,
    price: 800,
    currency: "USD",
    expiry: "2025-06-30",
    visibility: "public",
    description: "Premium quality jasmine rice, Grade A",
    location: "Bangkok, Thailand",
    company: "AgriTech Solutions",
    status: "Open",
    createdAt: "2025-01-14",
    suggestedPartners: ["Food Trading Corp", "Asia Grain Importers"]
  }
];

export async function GET() {
  return NextResponse.json({ needs: businessNeeds });
}

export async function POST(request: NextRequest) {
  try {
    const needData = await request.json();

    const newNeed = {
      ...needData,
      id: Date.now(),
      status: "Open",
      createdAt: new Date().toISOString().split('T')[0],
      company: "Demo Company Ltd", // In real app, get from auth
      suggestedPartners: generateSuggestedPartners(needData.product)
    };

    businessNeeds.push(newNeed);

    return NextResponse.json({
      success: true,
      need: newNeed,
      message: "Business need posted successfully"
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create business need' },
      { status: 500 }
    );
  }
}

function generateSuggestedPartners(product: string): string[] {
  const suggestions: { [key: string]: string[] } = {
    'steel': ['Global Steel Corp', 'Steel Manufacturing Inc', 'Asia Steel Trading'],
    'rice': ['AgriTech Solutions', 'Food Trading Corp', 'Asia Grain Importers'],
    'coffee': ['Premium Coffee Co', 'Global Commodities', 'Tropical Exports'],
    'electronics': ['Tech Components Ltd', 'Electronic Trading Hub', 'Digital Solutions Inc']
  };

  const productLower = product.toLowerCase();
  for (const [key, partners] of Object.entries(suggestions)) {
    if (productLower.includes(key)) {
      return partners;
    }
  }

  return ['General Trading Corp', 'International Commerce Ltd', 'Global Partners Inc'];
}