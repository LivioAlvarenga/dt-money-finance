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

  // Define a interface para o resumo
  interface Summary {
    income: number
    outcome: number
    total: number
  }

  // Calcular o resumo (income, outcome, total) das transações
  const summary = transactions.reduce(
    (acc: Summary, transaction: { type: string; price: number }) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    } as Summary,
  )

  return NextResponse.json(summary)
}
