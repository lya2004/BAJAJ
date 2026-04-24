"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle2, AlertTriangle, Network, Activity, AlertCircle, ChevronDown, ChevronRight, Code2 } from "lucide-react";
import type { ApiResponse } from "@/lib/types";
import TreeVisualizer from "./TreeVisualizer";

export default function Results({ data }: { data: ApiResponse }) {
  const [copied, setCopied] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div variants={item} className="neo-container p-5 flex items-center justify-between group">
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Trees</p>
            <p className="text-4xl font-extrabold text-primary">{data.summary.total_trees}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform border border-secondary">
            <Network className="text-primary w-5 h-5" />
          </div>
        </motion.div>

        <motion.div variants={item} className="neo-container p-5 flex items-center justify-between group">
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Cycles Detected</p>
            <p className="text-4xl font-extrabold text-primary">{data.summary.total_cycles}</p>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-secondary ${data.summary.total_cycles > 0 ? 'bg-warning/10' : 'bg-success/10'}`}>
            <Activity className={`w-5 h-5 ${data.summary.total_cycles > 0 ? 'text-warning' : 'text-success'}`} />
          </div>
        </motion.div>

        {data.summary.largest_tree_root && (
          <motion.div variants={item} className="neo-container p-5 col-span-2 sm:col-span-1 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Deepest Root</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-extrabold text-primary">{data.summary.largest_tree_root}</p>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-accent/10 text-accent border border-accent/20">Winner</span>
              </div>
            </div>
          </motion.div>
        )}

        {(data.invalid_entries.length > 0 || data.duplicate_edges.length > 0) && (
          <motion.div variants={item} className="neo-container p-5 col-span-2 sm:col-span-1 flex items-center justify-between bg-danger/5 border-danger/20">
            <div>
              <p className="text-danger text-xs font-bold uppercase tracking-wider mb-1">Issues Found</p>
              <p className="text-3xl font-extrabold text-danger">{data.invalid_entries.length + data.duplicate_edges.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center">
              <AlertCircle className="text-danger w-5 h-5" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Warnings & Issues */}
      <AnimatePresence>
        {(data.duplicate_edges.length > 0 || data.invalid_entries.length > 0) && (
          <motion.div variants={item} className="flex flex-col gap-3">
            {data.duplicate_edges.length > 0 && (
              <div className="neo-container bg-warning/5 border-warning/20 p-4 flex items-start gap-3">
                <AlertTriangle className="text-warning w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-warning mb-1">Duplicate Edges Skipped</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.duplicate_edges.map((edge, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-white border border-warning/20 text-warning text-xs font-mono">{edge}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {data.invalid_entries.length > 0 && (
              <div className="neo-container bg-danger/5 border-danger/20 p-4 flex items-start gap-3">
                <AlertCircle className="text-danger w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-danger mb-1">Invalid Entries Skipped</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.invalid_entries.map((entry, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-white border border-danger/20 text-danger text-xs font-mono">{entry}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Hierarchy Explorer */}
      <motion.div variants={item} className="neo-container overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-secondary bg-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <Network className="w-4 h-4 text-primary" />
            Hierarchy Visualizer
          </h3>
          <span className="text-xs font-bold text-gray-500">{data.hierarchies.length} structures</span>
        </div>
        <div className="p-5 bg-white">
          {data.hierarchies.length > 0 ? (
            <div className="flex flex-col gap-6">
              {data.hierarchies.map((group, idx) => (
                <TreeVisualizer key={idx} group={group} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 font-medium text-sm">
              No valid hierarchies found in the input.
            </div>
          )}
        </div>
      </motion.div>

      {/* Expandable Raw JSON */}
      <motion.div variants={item} className="neo-container overflow-hidden">
        <button 
          onClick={() => setShowRaw(!showRaw)}
          className="w-full px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-sm font-bold text-primary"
        >
          <span className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-gray-400" />
            Raw JSON Response
          </span>
          {showRaw ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
        </button>
        
        <AnimatePresence>
          {showRaw && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden border-t border-secondary"
            >
              <div className="relative bg-primary">
                <button
                  onClick={copyJson}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="p-6 text-xs text-gray-300 font-mono overflow-auto max-h-[400px]">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </motion.div>
  );
}
