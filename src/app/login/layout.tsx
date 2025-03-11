import { satoshi } from '@/styles/fonts';
import React from 'react'

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) { 
    return (
      <html lang="en">
        <body className={satoshi.className}>
            {children}
        </body>
      </html>
    );
  }
