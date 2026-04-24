"use client";

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-24 border-t border-secondary/50 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 font-mono uppercase tracking-widest">
      <div className="flex gap-6 mb-4 md:mb-0">
        <p>ID: lyapuri_30012004</p>
        <p>Email: lp8271@srmist.edu.in</p>
        <p>Roll: RA2311026010449</p>
      </div>
      <div>
        &copy; {new Date().getFullYear()} Lya Puri
      </div>
    </footer>
  );
}
