// model
import { NextResponse } from 'next/server';
import { EncryptDecryptRequest } from '@/dto/request/encrypt-decrypt';
import decryptMessage from '@/service/encrypt-decrypt/decrypt'

export async function POST(req: Request) {
  const requestBody = await req.json();
  const response = await decryptMessage(requestBody as EncryptDecryptRequest);
  return NextResponse.json(response);
}