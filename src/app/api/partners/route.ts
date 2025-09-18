import { NextRequest, NextResponse } from 'next/server';

const partnersData = {
  partners: [
    {
      id: 1,
      name: "Global Steel Manufacturing",
      sector: "Manufacturing",
      location: "Shanghai, China",
      distance: 15,
      rating: 4.8,
      mainProducts: ["Steel Coils", "Steel Bars", "Steel Sheets"],
      verified: true,
      employees: "500-1000",
      establishedYear: 2005,
      annualRevenue: "$50M - $100M"
    },
    {
      id: 2,
      name: "AgriTech Solutions Co",
      sector: "Agriculture",
      location: "Bangkok, Thailand",
      distance: 25,
      rating: 4.9,
      mainProducts: ["Jasmine Rice", "Coffee Beans", "Spices"],
      verified: true,
      employees: "100-500",
      establishedYear: 2010,
      annualRevenue: "$10M - $50M"
    },
    {
      id: 3,
      name: "Pacific Electronics Trading",
      sector: "Electronics",
      location: "Singapore",
      distance: 50,
      rating: 4.5,
      mainProducts: ["Electronic Components", "Semiconductors", "Circuit Boards"],
      verified: false,
      employees: "50-100",
      establishedYear: 2015,
      annualRevenue: "$5M - $10M"
    },
    {
      id: 4,
      name: "Construction Materials Ltd",
      sector: "Construction",
      location: "Ho Chi Minh City, Vietnam",
      distance: 5,
      rating: 4.2,
      mainProducts: ["Cement", "Concrete", "Construction Steel"],
      verified: true,
      employees: "200-500",
      establishedYear: 2008,
      annualRevenue: "$20M - $50M"
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry');
    const maxDistance = searchParams.get('distance');
    const minRating = searchParams.get('rating');

    let filteredPartners = partnersData.partners;

    if (industry) {
      filteredPartners = filteredPartners.filter(partner =>
        partner.sector.toLowerCase() === industry.toLowerCase()
      );
    }

    if (maxDistance) {
      const distance = parseInt(maxDistance);
      filteredPartners = filteredPartners.filter(partner =>
        partner.distance <= distance
      );
    }

    if (minRating) {
      const rating = parseFloat(minRating);
      filteredPartners = filteredPartners.filter(partner =>
        partner.rating >= rating
      );
    }

    return NextResponse.json({ partners: filteredPartners });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}