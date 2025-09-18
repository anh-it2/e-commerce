import { NextRequest, NextResponse } from 'next/server';

let products = [
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
];

export async function POST(request: NextRequest) {
  try {
    const newProduct = await request.json();
    const product = {
      ...newProduct,
      id: Date.now(),
      views: 0
    };
    products.push(product);
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedProduct = await request.json();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    products[index] = { ...products[index], ...updatedProduct };
    return NextResponse.json({ success: true, product: products[index] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');
    products = products.filter(p => p.id !== id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}