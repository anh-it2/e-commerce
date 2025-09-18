import { NextRequest, NextResponse } from 'next/server';

const financeData = {
  services: [
    {
      id: 1,
      name: "Trade Financing",
      description: "Working capital support for international trade transactions",
      provider: "Demo Bank",
      rate: "5.5% APR",
      maxAmount: "$1,000,000",
      processingTime: "3-5 business days",
      requirements: ["Valid trade contract", "Financial statements", "Collateral assessment"],
      status: "available",
      category: "financing"
    },
    {
      id: 2,
      name: "Letter of Credit",
      description: "Secure payment guarantee for international transactions",
      provider: "Global Trade Bank",
      rate: "1.2% fee",
      maxAmount: "$5,000,000",
      processingTime: "1-2 business days",
      requirements: ["Trade agreement", "Shipping documents", "Invoice"],
      status: "available",
      category: "guarantee"
    },
    {
      id: 3,
      name: "E-Signature Service",
      description: "Digital contract signing and authentication platform",
      provider: "DocuSign Partner",
      rate: "$15 per document",
      maxAmount: "Unlimited",
      processingTime: "Instant",
      requirements: ["Valid identification", "Email verification"],
      status: "available",
      category: "digital"
    },
    {
      id: 4,
      name: "Bank Guarantee",
      description: "Financial guarantee for contract performance",
      provider: "International Bank",
      rate: "2.5% - 3.5%",
      maxAmount: "$2,000,000",
      processingTime: "5-7 business days",
      requirements: ["Credit assessment", "Project details", "Collateral"],
      status: "available",
      category: "guarantee"
    },
    {
      id: 5,
      name: "Trade Insurance",
      description: "Protection against trade risks and non-payment",
      provider: "Trade Insurance Corp",
      rate: "0.5% - 2% of value",
      maxAmount: "$10,000,000",
      processingTime: "2-3 business days",
      requirements: ["Trade details", "Partner information", "Risk assessment"],
      status: "available",
      category: "insurance"
    }
  ]
};

export async function GET() {
  return NextResponse.json(financeData);
}