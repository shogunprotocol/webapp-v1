import { NextResponse } from 'next/server';

const TABLE = 'ai_movements_314159_899';
const ENDPOINT = 'https://testnets.tableland.network/api/v1/query';

export async function GET() {
  try {
    const params = new URLSearchParams({
      statement: `SELECT * FROM ${TABLE} ORDER BY id DESC LIMIT 50`,
      format: 'objects',
    });

    const url = `${ENDPOINT}?${params.toString()}`;
    const response = await fetch(url, { next: { revalidate: 0 } }); // disables Next cache

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `Tableland ${response.status}`, details: err },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'Network error', details: (e as Error).message },
      { status: 500 }
    );
  }
}
