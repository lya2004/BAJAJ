"use client";
import { motion } from "framer-motion";
import { Network, RefreshCw, Trophy } from "lucide-react";
import type { SummaryData } from "@/lib/types";

export default function SummaryCards({ summary }: { summary: SummaryData }) {
  const cards = [
    {
      title: "Total Trees",
      value: summary.total_trees,
      icon: Network,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20"
    },
    {
      title: "Total Cycles",
      value: summary.total_cycles,
      icon: RefreshCw,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20"
    },
    {
      title: "Largest Root",
      value: summary.largest_tree_root || "None",
      icon: Trophy,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className={`p-5 rounded-xl border ${card.border} bg-surface flex flex-col gap-2 relative overflow-hidden group`}
        >
          <div className={`absolute -right-4 -bottom-4 w-16 h-16 rounded-full blur-2xl transition-opacity opacity-50 group-hover:opacity-100 ${card.bg}`} />
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium z-10">
            <card.icon size={16} className={card.color} />
            {card.title}
          </div>
          <div className="text-2xl font-bold text-white z-10">{card.value}</div>
        </motion.div>
      ))}
    </div>
  );
}
