"use client";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 border-b border-secondary/30">
      <div className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-3 mb-10">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 font-bold">Sub-3 Second Engine</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8 text-primary">
            Decode.<br/>
            Detect.<br/>
            <span className="text-gray-300">Visualize.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mb-12 leading-relaxed font-light">
            A brutalist, beautifully engineered engine for the SRM Full Stack Challenge. 
            Instantly map dependencies and identify cyclic structures with mathematical precision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#analyzer" className="neo-button-primary px-8 py-4 text-base">
              Try Analyzer
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/docs" className="neo-button-secondary px-8 py-4 text-base">
              <Terminal className="w-4 h-4 text-gray-400" />
              View API Docs
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Minimalist Grid Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:flex items-center justify-center opacity-30 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400" className="stroke-gray-300" style={{ strokeWidth: 1 }}>
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} strokeDasharray="4 4" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="400" strokeDasharray="4 4" />
            ))}
            {/* Architectural Nodes */}
            <circle cx="120" cy="120" r="4" className="fill-accent stroke-none" />
            <circle cx="280" cy="200" r="4" className="fill-primary stroke-none" />
            <circle cx="160" cy="320" r="4" className="fill-primary stroke-none" />
            
            {/* Architectural Connections */}
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
              d="M 120 120 L 280 200 L 160 320 Z" 
              fill="transparent" 
              className="stroke-accent"
              style={{ strokeWidth: 2 }}
            />
          </motion.g>
        </svg>
      </div>
    </section>
  );
}
