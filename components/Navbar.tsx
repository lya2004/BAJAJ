"use client";
import Link from "next/link";
import { Network } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full py-6 flex items-center justify-between border-b border-secondary/50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
          <Network className="w-4 h-4 text-white" />
        </div>
        <div className="font-bold tracking-tight text-lg">
          SRM <span className="font-light text-gray-400">Analyzer</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="https://github.com/lya2004/BAJAJ.git" target="_blank" className="text-gray-500 hover:text-primary transition-colors">
          GitHub
        </Link>
        <Link href="#analyzer" className="neo-button-primary px-4 py-2">
          Try It
        </Link>
      </div>
    </header>
  );
}
