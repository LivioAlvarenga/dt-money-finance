import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return NextResponse.json({ transaction: 'Transaction GET' })
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ transaction: 'Transaction POST' })
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({ transaction: 'Transaction PUT' })
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ transaction: 'Transaction DELETE' })
}

export async function PATCH(req: NextRequest) {
  return NextResponse.json({ transaction: 'Transaction PATCH' })
}
