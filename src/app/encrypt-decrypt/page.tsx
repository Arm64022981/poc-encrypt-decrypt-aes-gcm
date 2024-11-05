// view
"use client";
import React, { useState } from 'react';
import styles from '@/styles/encrypt-decrypt.module.css'; // นำเข้าไฟล์ CSS ที่สร้างขึ้น

const EncryptDecrypt: React.FC = () => {
  const [encryptMsg, setEncryptMsg] = useState('');
  const [encryptKey, setEncryptKey] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [decryptCipherText, setDecryptCipherText] = useState('');
  const [decryptKey, setDecryptKey] = useState('');
  const [plainText, setPlainText] = useState('');

  // ฟังก์ชันสร้างคีย์แบบสุ่ม
  const generateRandomKey = (length: number): string => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
      key += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return key;
  };

  const encryptMessage = async () => {
    if (!encryptMsg || !encryptKey) {
      alert("กรุณาใส่ข้อความและคีย์ในการเข้ารหัส");
      return;
    }

    const encodedMsg = btoa(encryptMsg); // เข้ารหัสข้อความด้วย Base64
    setCipherText(encodedMsg); // แสดง ciphertext
  };

  const decryptMessage = async () => {
    if (!decryptCipherText || !decryptKey) {
      alert("กรุณาใส่ ciphertext และคีย์ในการถอดรหัส");
      return;
    }

    try {
      const decodedMsg = atob(decryptCipherText); // ถอดรหัสข้อความจาก Base64
      setPlainText(decodedMsg); // แสดง plaintext
    } catch (error) {
      alert("การถอดรหัสล้มเหลว: ข้อความ ciphertext อาจไม่ถูกต้อง");
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
              value={encryptMsg}
              onChange={e => setEncryptMsg(e.target.value)}
            />

            <label className={styles.label}>Key:</label>
            <input
              type="text"
              className={styles.input}
              value={encryptKey}
              onChange={e => setEncryptKey(e.target.value)}
            />
            <button className={styles.buttonWithBorder} onClick={() => setEncryptKey(generateRandomKey(16))}>
              Generate Random Key
            </button>

            <button className={styles.button} onClick={encryptMessage}>Encrypt</button>

            <label className={styles.label}>Ciphertext (Base64):</label>
            <textarea className={styles.textarea} value={cipherText} readOnly />
          </div>

          <div className={styles.section}>
            <h2 className={styles.h2}>Decrypt</h2>
            <label className={styles.label}>CipherText (nonce-ciphertext-tag):</label>
            <input
              type="text"
              className={styles.input}
              value={decryptCipherText}
              onChange={e => setDecryptCipherText(e.target.value)}
            />

            <label className={styles.label}>Key:</label>
            <input
              type="text"
              className={styles.input}
              value={decryptKey}
              onChange={e => setDecryptKey(e.target.value)}
            />

            <button className={styles.button} onClick={decryptMessage}>Decrypt</button>

            <label className={styles.label}>Plain Text:</label>
            <textarea className={styles.textarea} value={plainText} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptDecrypt;
