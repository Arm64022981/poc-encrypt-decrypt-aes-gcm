// model
import { NextResponse } from 'next/server';
import { EncryptDecryptRequest } from '@/dto/request/encrypt-decrypt';
import encryptMessage from '@/service/encrypt-decrypt/encrypt'

export async function POST(req: Request) {
  const requestBody = await req.json();
  const response = await encryptMessage(requestBody as EncryptDecryptRequest);
  return NextResponse.json(response);
}