import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OOS Copilot System',
  description: 'AI-driven Out-of-Stock Copilot for Retail Inventory Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-gray-50 min-h-screen text-gray-900'}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <header className="bg-white shadow p-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-blue-900">🍾 OOS Copilot</h1>
              <span className="text-xs text-gray-500">AI-driven Retail Inventory Management</span>
            </header>
            <main className="flex-1 flex flex-col">{children}</main>
            <footer className="bg-white border-t p-2 text-center text-xs text-gray-400">&copy; {new Date().getFullYear()} OOS Copilot. All rights reserved.</footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
