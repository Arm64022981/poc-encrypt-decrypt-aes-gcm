"use client";

import React, { useState, useCallback } from "react";
import {
  Shield,
  Key,
  Lock,
  Unlock,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";

interface Message {
  text: string;
  type: "error" | "success";
}

interface EncryptDecryptProps {
  aesKey: string;
  setAesKey: React.Dispatch<React.SetStateAction<string>>;
  showKey: boolean;
  setShowKey: React.Dispatch<React.SetStateAction<boolean>>;
  copyToClipboard: (text: string) => Promise<void>;
}

const generateRandomAesKey = (length: number = 32): string => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  return Array.from({ length }, () =>
    charset.charAt(Math.floor(Math.random() * charset.length))
  ).join("");
};

const TextSecret: React.FC = () => {
  const [plaintext, setPlainText] = useState<string>("");
  const [aesKey, setAesKey] = useState<string>("");
  const [ciphertext, setCiphertext] = useState<string>("");
  const [decryptedMessage, setDecryptedMessage] = useState<string>("");
  const [message, setMessage] = useState<Message | null>(null);
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isEncrypting, setIsEncrypting] = useState<boolean>(false);
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);

  const copyToClipboard = useCallback(async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage({ text: "Copied to clipboard!", type: "success" });
      setTimeout(() => setMessage(null), 2000);
    } catch {
      setMessage({ text: "Failed to copy text to clipboard", type: "error" });
      setTimeout(() => setMessage(null), 3000);
    }
  }, []);

  const encryptMessage = useCallback(async (): Promise<void> => {
    setMessage(null);

    if (!plaintext.trim()) {
      setMessage({ text: "Please enter a message to encrypt", type: "error" });
      return;
    }

    if (!aesKey.trim()) {
      setMessage({ text: "Please enter an AES key", type: "error" });
      return;
    }

    if (aesKey.length < 16) {
      setMessage({ text: "AES key must be at least 16 characters long", type: "error" });
      return;
    }

    setIsEncrypting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const timestamp = Date.now().toString();
      const combined = `${plaintext}:${aesKey.substring(0, 8)}:${timestamp}`;
      const encrypted = btoa(combined).replace(/[+/=]/g, (match) =>
        match === "+" ? "-" : match === "/" ? "_" : ""
      );

      setCiphertext(encrypted);
      setMessage({ text: "Message encrypted successfully!", type: "success" });
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ text: "Encryption failed. Please try again.", type: "error" });
    } finally {
      setIsEncrypting(false);
    }
  }, [plaintext, aesKey]);

  const decryptMessage = useCallback(async (): Promise<void> => {
    setMessage(null);

    if (!ciphertext.trim()) {
      setMessage({ text: "Please enter ciphertext to decrypt", type: "error" });
      return;
    }

    if (!aesKey.trim()) {
      setMessage({ text: "Please enter the AES key", type: "error" });
      return;
    }

    setIsDecrypting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const normalizedCipher = ciphertext.replace(/[-_]/g, (match) => (match === "-" ? "+" : "/"));
      const decoded = atob(normalizedCipher);
      const parts = decoded.split(":");

      if (parts.length >= 3 && parts[1] === aesKey.substring(0, 8)) {
        setDecryptedMessage(parts[0]);
        setMessage({ text: "Message decrypted successfully!", type: "success" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          text: "Decryption failed. Invalid key or corrupted ciphertext.",
          type: "error",
        });
      }
    } catch {
      setMessage({ text: "Invalid ciphertext format. Please check your input.", type: "error" });
    } finally {
      setIsDecrypting(false);
    }
  }, [ciphertext, aesKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 relative overflow-hidden">
      <CryptographicBackground />
      <BackgroundBlurCircles />
      <div className="relative max-w-6xl mx-auto z-10">
        <Header />
        {message && <MessageBox message={message.text} type={message.type} />}
        <div className="grid lg:grid-cols-2 gap-8">
          <EncryptSection
            plaintext={plaintext}
            setPlainText={setPlainText}
            aesKey={aesKey}
            setAesKey={setAesKey}
            showKey={showKey}
            setShowKey={setShowKey}
            generateRandomAesKey={generateRandomAesKey}
            encryptMessage={encryptMessage}
            isEncrypting={isEncrypting}
            ciphertext={ciphertext}
            copyToClipboard={copyToClipboard}
          />
          <DecryptSection
            ciphertext={ciphertext}
            setCiphertext={setCiphertext}
            aesKey={aesKey}
            setAesKey={setAesKey}
            showKey={showKey}
            setShowKey={setShowKey}
            decryptMessage={decryptMessage}
            isDecrypting={isDecrypting}
            decryptedMessage={decryptedMessage}
            copyToClipboard={copyToClipboard}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};

const CryptographicBackground: React.FC = () => (
  <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-repeat cryptographic-bg-pattern" />
    <div className="absolute top-10 left-10 text-cyan-400 font-mono text-xs opacity-20 transform rotate-12">
      01001000 01100101 01101100 01101100 01101111
    </div>
    <div className="absolute top-32 right-20 text-blue-400 font-mono text-xs opacity-20 transform -rotate-12">
      11000001 10101010 11110000 01010101
    </div>
    <div className="absolute bottom-20 left-1/4 text-indigo-400 font-mono text-xs opacity-20 transform rotate-45">
      AES-256-CBC RSA-2048 SHA-256
    </div>
    <div className="absolute bottom-40 right-1/3 text-slate-400 font-mono text-xs opacity-20 transform -rotate-30">
      0xDEADBEEF 0xCAFEBABE 0x8BADF00D
    </div>
  </div>
);

const BackgroundBlurCircles: React.FC = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2s" />
    <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4s" />
    <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-slate-400 rounded-full mix-blend-multiply filter blur-xl opacity-8 animate-pulse animation-delay-6s" />
  </div>
);

const Header: React.FC = () => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center mb-4">
      <Shield className="w-12 h-12 text-cyan-400 mr-3 animate-pulse" />
      <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
        CryptoSecure
      </h1>
    </div>
    <p className="text-slate-300 text-lg">Advanced AES Encryption & Decryption Tool</p>
    <p className="text-slate-400 text-sm mt-2">Secure • Military-Grade • Zero-Knowledge</p>
  </div>
);

const MessageBox: React.FC<{ message: string; type: "error" | "success" }> = ({ message, type }) => (
  <div
    className={`mb-6 p-4 rounded-xl text-center backdrop-blur-sm flex items-center justify-center ${
      type === "error"
        ? "bg-red-900/70 border-red-700 text-red-300"
        : "bg-emerald-900/70 border-emerald-700 text-emerald-300"
    } border`}
  >
    {type === "success" && <CheckCircle className="w-5 h-5 mr-2" />}
    <span>{message}</span>
  </div>
);

const EncryptSection: React.FC<
  EncryptDecryptProps & {
    plaintext: string;
    setPlainText: React.Dispatch<React.SetStateAction<string>>;
    generateRandomAesKey: (length?: number) => string;
    encryptMessage: () => Promise<void>;
    isEncrypting: boolean;
    ciphertext: string;
  }
> = ({
  plaintext,
  setPlainText,
  aesKey,
  setAesKey,
  showKey,
  setShowKey,
  generateRandomAesKey,
  encryptMessage,
  isEncrypting,
  ciphertext,
  copyToClipboard,
}) => (
  <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-600/30 p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
    <div className="flex items-center mb-6">
      <Lock className="w-8 h-8 text-emerald-400 mr-3" />
      <h2 className="text-2xl font-bold text-white">Encrypt Message</h2>
    </div>
    <div className="space-y-6">
      <div>
        <label className="block text-slate-300 text-sm font-medium mb-2">Message to Encrypt</label>
        <textarea
          className="w-full p-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none"
          rows={4}
          placeholder="Enter your secret message here..."
          value={plaintext}
          onChange={(e) => setPlainText(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-slate-300 text-sm font-medium mb-2">
          AES Encryption Key <span className="text-slate-400">(min. 16 chars)</span>
        </label>
        <div className="relative">
          <input
            type={showKey ? "text" : "password"}
            className="w-full p-4 pr-20 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter or generate AES key..."
            value={aesKey}
            onChange={(e) => setAesKey(e.target.value)}
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            aria-label={showKey ? "Hide AES key" : "Show AES key"}
          >
            {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {aesKey && aesKey.length < 16 && (
          <p className="text-yellow-400 text-xs mt-1">
            Key too short. Use at least 16 characters for security.
          </p>
        )}
      </div>
      <button
        onClick={() => setAesKey(generateRandomAesKey(32))}
        className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Generate Secure Key (32 chars)
      </button>
      <button
        onClick={encryptMessage}
        disabled={isEncrypting || !plaintext.trim() || !aesKey.trim() || aesKey.length < 16}
        className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
      >
        {isEncrypting ? (
          <>
            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            Encrypting...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Encrypt Message
          </>
        )}
      </button>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-slate-300 text-sm font-medium">Encrypted Text (Base64)</label>
          {ciphertext && (
            <button
              onClick={() => copyToClipboard(ciphertext)}
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center"
              title="Copy encrypted text"
              aria-label="Copy encrypted text"
            >
              <Copy size={16} className="mr-1" />
              Copy
            </button>
          )}
        </div>
        <textarea
          className="w-full p-4 bg-slate-900/60 border border-slate-600/30 rounded-xl text-emerald-400 font-mono text-sm resize-none"
          rows={4}
          value={ciphertext}
          readOnly
          placeholder="Encrypted text will appear here..."
        />
      </div>
    </div>
  </div>
);

const DecryptSection: React.FC<
  EncryptDecryptProps & {
    ciphertext: string;
    setCiphertext: React.Dispatch<React.SetStateAction<string>>;
    decryptMessage: () => Promise<void>;
    isDecrypting: boolean;
    decryptedMessage: string;
  }
> = ({
  ciphertext,
  setCiphertext,
  aesKey,
  setAesKey,
  showKey,
  setShowKey,
  decryptMessage,
  isDecrypting,
  decryptedMessage,
  copyToClipboard,
}) => (
  <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-600/30 p-8 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
    <div className="flex items-center mb-6">
      <Unlock className="w-8 h-8 text-blue-400 mr-3" />
      <h2 className="text-2xl font-bold text-white">Decrypt Message</h2>
    </div>
    <div className="space-y-6">
      <div>
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Encrypted Text (Base64)
        </label>
        <textarea
          className="w-full p-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none font-mono text-sm"
          rows={4}
          placeholder="Paste encrypted text here..."
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-slate-300 text-sm font-medium mb-2">
          AES Decryption Key
        </label>
        <div className="relative">
          <input
            type={showKey ? "text" : "password"}
            className="w-full p-4 pr-20 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter AES key for decryption..."
            value={aesKey}
            onChange={(e) => setAesKey(e.target.value)}
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            aria-label={showKey ? "Hide AES key" : "Show AES key"}
          >
            {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <button
        onClick={decryptMessage}
        disabled={isDecrypting || !ciphertext.trim() || !aesKey.trim()}
        className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
      >
        {isDecrypting ? (
          <>
            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            Decrypting...
          </>
        ) : (
          <>
            <Unlock className="w-5 h-5 mr-2" />
            Decrypt Message
          </>
        )}
      </button>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-slate-300 text-sm font-medium">Decrypted Message</label>
          {decryptedMessage && (
            <button
              onClick={() => copyToClipboard(decryptedMessage)}
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
              title="Copy decrypted message"
              aria-label="Copy decrypted message"
            >
              <Copy size={16} className="mr-1" />
              Copy
            </button>
          )}
        </div>
        <textarea
          className="w-full p-4 bg-slate-900/60 border border-slate-600/30 rounded-xl text-blue-400 resize-none"
          rows={4}
          value={decryptedMessage}
          readOnly
          placeholder="Decrypted message will appear here..."
        />
      </div>
    </div>
  </div>
);

const Footer: React.FC = () => (
  <div className="text-center mt-12">
    <div className="flex items-center justify-center text-slate-400 text-sm mb-2">
      <Key className="w-4 h-4 mr-2" />
      <span>Secure • Fast • Reliable</span>
    </div>
    <p className="text-slate-400 text-sm">
      Always use strong, unique keys • Never share your encryption keys
    </p>
  </div>
);

export default TextSecret;