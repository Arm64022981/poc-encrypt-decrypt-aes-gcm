// controller
'use server';
import {EncryptDecryptRequest} from '@/dto/request/encrypt-decrypt'
import {EncryptDecryptModel} from '@/dto/response/encrypt-decrypt'
// import {cipherText} from '@/service/encrypt-decrypt/enctypt'
import crypto from 'crypto'
const AES_KEY = 'hzZ6rE1kGiJWQwCO';
export default async function decryptMessage(param: EncryptDecryptRequest): Promise<EncryptDecryptModel>{
    try {
      const data = Buffer.from(param.plaintext, 'base64');
      const iv = data.slice(0, 16);
      const tag = data.slice(data.length - 16);
      const encrypted = data.slice(16, data.length - 16);
      const decipher = crypto.createDecipheriv('aes-128-gcm',AES_KEY, iv);
      decipher.setAuthTag(tag); 
      const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf-8');
      return ({
        plaintext: decrypted   });  
    }  catch (error) {
      console.error('Error fetching:', error);      
    return ({ 
      plaintext: '' });  
  }}
