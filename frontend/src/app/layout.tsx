import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorkFlowAI | Enterprise Procurement",
  description: "AI-powered enterprise procurement copilot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body className={`${inter.className} bg-[#FAFAFA] text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900 min-h-screen flex flex-col`}>
        <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-xs">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-extrabold tracking-tight text-xl text-gray-900">
              WorkFlowAI<span className="text-blue-600">.</span>
            </Link>
            <div className="flex space-x-8">
              <Link href="/prompts" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">Prompts</Link>
              <Link href="/assistant" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">Assistant</Link>
              <Link href="/evaluation" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">Evaluation</Link>
              <Link href="/insights" className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">Insights</Link>
            </div>
          </div>
        </nav>
        <main className="flex-grow pt-24 pb-12 max-w-6xl mx-auto px-6 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
