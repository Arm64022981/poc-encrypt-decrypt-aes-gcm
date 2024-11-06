"use client";
import React, { useState } from 'react';
import styles from '@/styles/encrypt-decrypt.module.css'; 

export default function TextSecret() {
  const [plaintext, setPlainText] = useState('');
  const [AES_KEY, setAES_KEY] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [nonce, setNonce] = useState('');
  const [tag, setTag] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Function to generate a random AES_KEY
  const generateRandomAES_KEY = (length: number): string => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let AES_KEY = '';
    for (let i = 0; i < length; i++) {
      AES_KEY += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return AES_KEY;
  };

  const encryptMessage = async () => {
    try {
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({plaintext, AES_KEY }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Encryption failed');
      
      setCiphertext(data.plaintext);
      setNonce(data.nonce);
      setTag(data.tag);
    } catch (err: any) {
      setError(err.plaintext);
    }
  };

  const decryptMessage = async () => {
    setError('');
    try {
      const response = await fetch('/api/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plaintext:ciphertext, AES_KEY:AES_KEY }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Decryption failed');
      
      setMessage(data.plaintext);
    } catch (err: any) {
      setError(err.plaintext);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container1}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h2 className={styles.h2}>Encrypt</h2>
            <label className={styles.label}>Message:</label>
            <input
              type="text"
              className={styles.input}
              value={plaintext}
              onChange={e => setPlainText(e.target.value)}
            />

            <label className={styles.label}>AES_KEY:</label>
            <input
              type="text"
              className={styles.input}
              value={AES_KEY}
              onChange={e => setAES_KEY(e.target.value)}
            />
            <button className={styles.buttonWithBorder} onClick={() => setAES_KEY(generateRandomAES_KEY(16))}>
              Generate Random AES_KEY
            </button>

            <button className={styles.button} onClick={encryptMessage}>Encrypt</button>

            <label className={styles.label}>Ciphertext (Base64):</label>
            <textarea className={styles.textarea} 
            value={ciphertext} 
            readOnly />
          </div>

          <div className={styles.section}>
            <h2 className={styles.h2}>Decrypt</h2>
            <label className={styles.label}>CipherText (nonce-ciphertext-tag):</label>
            <input
              type="text"
              className={styles.input}
              // value={ciphertext}
              onChange={e => setCiphertext(e.target.value)}
            />

            <label className={styles.label}>AES_KEY:</label>
            <input
              type="text"
              className={styles.input}
              value={AES_KEY}
              onChange={e => setAES_KEY(e.target.value)}
            />

            <button className={styles.button} onClick={decryptMessage}>Decrypt</button>

            <label className={styles.label}>Plain Text:</label>
            <textarea className={styles.textarea} 
            value={message} 
            readOnly />
          </div>
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
