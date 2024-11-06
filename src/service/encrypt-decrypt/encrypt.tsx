// controller
'use server';
import {EncryptDecryptRequest} from '@/dto/request/encrypt-decrypt'
import {EncryptDecryptModel} from '@/dto/response/encrypt-decrypt'
import crypto from 'crypto'

// const AES_KEY = 'hzZ6rE1kGiJWQwCO';

export default async function encryptMessage(param: EncryptDecryptRequest): Promise<EncryptDecryptModel> {  
  try {      
    const iv = crypto.randomBytes(16);      
    const cipherText = crypto.createCipheriv('aes-128-gcm',param.AES_KEY, iv);      
    const encrypted = Buffer.concat([cipherText.update(param.plaintext, 'utf8'), cipherText.final()]);      
    const tag = cipherText.getAuthTag();      
    const combined = Buffer.concat([iv, encrypted, tag]).toString('base64');      
    return ({
      plaintext: combined   });  
  } catch (error) {      
    console.error('Error fetching:', error);      
    return ({ 
      plaintext: '' });  
  }}