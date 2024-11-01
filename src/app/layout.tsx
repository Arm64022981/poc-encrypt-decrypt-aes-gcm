// app/layout.tsx
"use client"; // เพิ่มบรรทัดนี้เพื่อทำให้เป็น Client Component
import '../styles/globals.css';
import Header from './components/Header';
import { usePathname } from 'next/navigation';
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <html lang="en">
            <body>
                {/* Render Header only if not on login page */}
                {pathname !== '/encrypt-decrypt' && <Header />}
                <main>{children}</main>
            </body>
        </html>
    );
}

