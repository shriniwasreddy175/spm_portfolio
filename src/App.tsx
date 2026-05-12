import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navigation />
      
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