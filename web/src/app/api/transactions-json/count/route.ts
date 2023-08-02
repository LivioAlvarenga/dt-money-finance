import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET(req: NextRequest) {
  // Caminho para o arquivo db.json
  const filePath = path.join(process.cwd(), 'db.json')

  // Ler o conteúdo do arquivo db.json
  const fileContents = fs.readFileSync(filePath, 'utf8')

  // Parse o conteúdo do arquivo para um objeto JavaScript
  const db = JSON.parse(fileContents)

  // Obter as transações do objeto db
  const transactions = db.transactions

  // Calcular o total de transações
  const totalTransactions = transactions.length

  return NextResponse.json({ totalTransactions })
}
