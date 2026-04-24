import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Analyzer from "@/components/Analyzer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-background selection:bg-accent/20">
      <div className="relative z-10 flex flex-col min-h-screen max-w-6xl mx-auto px-6">
        <Navbar />
        <div className="flex-grow">
          <Hero />
          <Analyzer />
        </div>
        <Footer />
      </div>
    </main>
  );
}
