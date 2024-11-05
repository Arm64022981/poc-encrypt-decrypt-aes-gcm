'use server';
import {EncryptDecryptRequest} from '@/dto/request/encrypt-decrypt'
import {EncryptDecryptModel} from '@/dto/response/encrypt-decrypt'
import crypto from 'crypto';

export default function decryptMessage(param: EncryptDecryptRequest, res: EncryptDecryptModel) {
 

  try {
      const data = Buffer.from(param, 'base64');
      const plaintext = data.slice(0, 12);
      const tag = data.slice(data.length - 16);
      const encrypted = data.slice(12, data.length - 16);

      const decipher = crypto.createDecipheriv('aes-128-gcm', Buffer.from(key), plaintext);
      decipher.setAuthTag(tag);

      const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
      res.status(200).json({ plaintext: decrypted.toString('utf8') });
    } catch (error) {
      res.status(500).json({ error: 'Decryption failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
