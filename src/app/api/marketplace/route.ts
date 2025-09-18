import { NextRequest, NextResponse } from 'next/server';

const marketplaceData = {
  companies: [
    {
      id: 1,
      name: "Global Steel Corp",
      rating: 4.8,
      location: "Shanghai, China",
      sector: "Manufacturing",
      products: ["Steel Coils", "Steel Bars", "Steel Sheets"],
      logo: "/demo/company1.png",
      description: "Leading steel manufacturer with 20+ years experience",
      verified: true,
      distance: 10
    },
    {
      id: 2,
      name: "Pacific Trading Ltd",
      rating: 4.5,
      location: "Singapore",
      sector: "Trading",
      products: ["Electronics", "Automotive Parts", "Machinery"],
      logo: "/demo/company2.png",
      description: "Trusted trading partner for Southeast Asia",
      verified: true,
      distance: 25
    },
    {
      id: 3,
      name: "AgriTech Solutions",
      rating: 4.9,
      location: "Bangkok, Thailand",
      sector: "Agriculture",
      products: ["Rice", "Coffee", "Spices", "Agricultural Equipment"],
      logo: "/demo/company3.png",
      description: "Premium agricultural products and technology",
      verified: true,
      distance: 15
    },
    {
      id: 4,
      name: "Construction Materials Inc",
      rating: 4.2,
      location: "Ho Chi Minh City, Vietnam",
      sector: "Construction",
      products: ["Cement", "Concrete", "Construction Steel"],
      logo: "/demo/company4.png",
      description: "Quality construction materials supplier",
      verified: false,
      distance: 5
    }
  ],
  featuredProducts: [
    {
      id: 1,
      name: "Premium Steel Coils",
      company: "Global Steel Corp",
      price: "$500/ton",
      moq: "100 tons",
      image: "/demo/product1.jpg",
      hsCode: "7208.10.00"
    },
    {
      id: 2,
      name: "Jasmine Rice Grade A",
      company: "AgriTech Solutions",
      price: "$800/ton",
      moq: "50 tons",
      image: "/demo/product2.jpg",
      hsCode: "1006.30.00"
    }
  ],
  latestNeeds: [
    {
      id: 1,
      type: "buy",
      title: "Looking for High-Grade Steel Coils",
      company: "Construction Materials Inc",
      quantity: "500 tons",
      location: "Vietnam",
      postedDate: "2 hours ago",
      status: "Open"
    },
    {
      id: 2,
      type: "sell",
      title: "Premium Coffee Beans Available",
      company: "AgriTech Solutions",
      quantity: "200 tons",
      location: "Thailand",
      postedDate: "5 hours ago",
      status: "Open"
    },
    {
      id: 3,
      type: "outsource",
      title: "Manufacturing Partnership Needed",
      company: "Pacific Trading Ltd",
      quantity: "Long-term contract",
      location: "Singapore",
      postedDate: "1 day ago",
      status: "Open"
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const sector = searchParams.get('sector');
    const rating = searchParams.get('rating');

    let filteredCompanies = marketplaceData.companies;

    if (search) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.products.some(product =>
          product.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (sector) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.sector.toLowerCase() === sector.toLowerCase()
      );
    }

    if (rating) {
      const minRating = parseFloat(rating);
      filteredCompanies = filteredCompanies.filter(company =>
        company.rating >= minRating
      );
    }

    return NextResponse.json({
      ...marketplaceData,
      companies: filteredCompanies
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}