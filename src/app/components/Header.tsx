// src/components/Header.tsx
"use client"; // ทำให้เป็น Client Component

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // นำเข้า usePathname
import styles from '../../styles/header.module.css';
import Image from 'next/image';
import ImageLogo from '@/public/images/Logo.png';
const Header = () => {
    const pathname = usePathname(); // ใช้ usePathname เพื่อเช็ค URL ปัจจุบัน

    return (
        <header className="sticky top-0 w-full z-50 bg-white shadow-md transition duration-300 ease-in-out">
             <div className="container mx-auto flex justify-between items-center px-4 md:px-10 lg:px-20 py-3 md:py-2 lg:py-3">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <Image
                        src={ImageLogo}
                        alt=""
                        width={30}
                        height={30}
                    />
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/co-pay-back-office" className={styles.navLink1}>
                            CoPayBackOffice
                        </Link>
                        <Link href="/co-pay-back-office/transaction" className={`${styles.navLink} ${pathname === '/co-pay-back-office/transaction' ? styles.active : ''}`}>
                            Transaction
                        </Link>
                        <Link href="/co-pay-back-office/account-management" className={`${styles.navLink} ${pathname === '/co-pay-back-office/account-management' ? styles.active : ''}`}>
                            Account Management
                        </Link>
                    </nav>
                </div>
                {/* User Section */}
                <div className="flex items-center space-x-4">
                <span className="text-gray-600 text-sm md:text-base lg:text-lg">admin</span>
                    <button className={styles.logoutButton}>
                     <i className="fa-solid fa-right-from-bracket" style={{ marginLeft: '5px', color: '#24B24C'}}></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
