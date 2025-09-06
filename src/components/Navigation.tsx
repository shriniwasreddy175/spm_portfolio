"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (let item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="flex items-center gap-2 font-bold text-xl cursor-pointer transition duration-300 hover:text-primary hover:shadow-lg hover:scale-105 px-3 py-2 rounded-lg"
          onClick={() => scrollToSection("home")}
        >
        <img
          src="/Profile_photo.jpg"
          alt="Logo"
          className="w-13 h-13 rounded-full border-2 border-primary object-cover transition-colors duration-300 hover:border-secondary shadow-[0_0_20px_rgba(59,130,246,1)]"
        />
        Shriniwas Mare
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </motion.button>
          ))}

          {/* Resume Button */}
          <Button asChild className="ml-4">
            <motion.a
              href="/assets/spm175-resume.pdf"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-block"
            >
              Resume
            </motion.a>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-80 bg-background/90 backdrop-blur-md p-6 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-xl">Menu</span>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </SheetClose>
            </div>

            {/* Nav Items */}
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-lg font-medium text-left text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Resume */}
            <div className="mt-8">
              <Button asChild className="w-full">
                <motion.a
                  href="/assets/spm175-resume.pdf"
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-block text-center w-full"
                >
                  Resume
                </motion.a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
