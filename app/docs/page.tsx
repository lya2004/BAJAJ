import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, Code2 } from "lucide-react";

export default function DocsPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid-pattern opacity-50" />
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[150px] pointer-events-none mix-blend-screen" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <div className="flex-grow max-w-4xl mx-auto px-6 py-24 w-full">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center gap-3">
              API Documentation
              <span className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-xs font-mono uppercase tracking-wider border border-secondary/20">
                v1.0
              </span>
            </h1>
            <p className="text-white/50 text-lg">
              Integrate the Graph Intelligence Engine directly into your applications.
            </p>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-white/5 bg-surface/80 flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-success/20 text-success text-xs font-bold font-mono">POST</span>
              <code className="text-white/80 font-mono text-sm">/api/bfhl</code>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Request Body
                </h3>
                <p className="text-white/40 text-sm mb-4">Send a JSON object with a <code className="text-primary font-mono bg-primary/10 px-1 rounded">data</code> array containing edge strings (e.g. "A-&gt;B").</p>
                <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5">
                  <pre className="text-sm text-white/80 font-mono">
{`{
  "data": [
    "A->B",
    "A->C",
    "B->D",
    "invalid",
    "B->D"
  ]
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Response Example
                </h3>
                <p className="text-white/40 text-sm mb-4">Returns parsed hierarchies, cycles, warnings, and summary statistics.</p>
                <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/5">
                  <pre className="text-sm text-white/80 font-mono overflow-auto max-h-[400px]">
{`{
  "user_id": "lyapuri_30012004",
  "email_id": "lp8271@srmist.edu.in",
  "college_roll_number": "RA2311026010449",
  "hierarchies": [
    {
      "root": "A",
      "tree": {
        "A": {
          "B": {
            "D": {}
          },
          "C": {}
        }
      },
      "has_cycle": false,
      "depth": 2
    }
  ],
  "invalid_entries": ["invalid"],
  "duplicate_edges": ["B->D"],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
