import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";

export default function App() {
  const [showLaunchIntro, setShowLaunchIntro] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowLaunchIntro(false);
      return;
    }
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {!showLaunchIntro && <Navigation />}

      {showLaunchIntro && !prefersReducedMotion && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background/90 backdrop-blur-3xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.65, duration: 0.75, ease: "easeInOut" }}
          onAnimationComplete={() => setShowLaunchIntro(false)}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-secondary/25"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5 text-center px-6">
            <motion.div
              className="h-20 w-20 rounded-full border border-primary/30 bg-background/80 shadow-[0_0_60px_rgba(59,130,246,0.4)]"
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
            >
              <motion.img
                src="/SM_logo.png"
                alt="Shriniwas Mare"
                className="h-full w-full rounded-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
            </motion.div>

            <motion.h1
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Shriniwas Mare
            </motion.h1>

            <motion.p
              className="text-sm uppercase tracking-[0.35em] text-muted-foreground"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.35 }}
            >
              Portfolio
            </motion.p>
          </div>
        </motion.div>
      )}
      
      <main>
        <div id="home">
          <Hero />
        </div>
        
        <div id="about">
          <About />
        </div>
        
        <div id="projects">
          <Projects />
        </div>
        
        <div id="experience">
          <Experience />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
      </main>
      
      <footer className="bg-muted/30 py-8 px-4 text-center transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <p className="text-muted-foreground">
            © 2025 Shriniwas Mare. All rights reserved. Built with React and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}