"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX - innerWidth / 2) / 50,
        y: (e.clientY - innerHeight / 2) / 50,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo with Parallax */}
        <motion.div
          className="flex items-center gap-2 font-bold text-xl cursor-pointer transition duration-300 hover:text-primary hover:shadow-lg hover:scale-105 px-3 py-2 rounded-lg"
          onClick={() => scrollToSection("home")}
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <motion.img
            src="/SM_logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full border-2 border-primary object-cover transition-colors duration-300 hover:border-secondary shadow-[0_0_20px_rgba(59,130,246,1)]"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => window.open("https://spm175-portfolio.vercel.app/SM_logo.png", "_blank")}
          />
          Shriniwas Mare
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`text-sm font-medium transition-colors relative ${
                activeSection === item.id
                  ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-primary"
                  layoutId="underline"
                />
              )}
            </motion.button>
          ))}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Resume Button */}
          <Button asChild className="ml-4">
            <motion.a
              href="/assets/ShriniwasMareResume115.pdf"
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
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
      <Menu className="h-6 w-6" />
      <span className="sr-only">Open menu</span>
    </Button>
  </SheetTrigger>

  {/* Keep SheetContent wrapper (we'll render transparent background + animated drawer inside) */}
  <SheetContent side="right" className="p-0 border-0 bg-transparent">
    {/* Overlay (clicking it closes the sheet) */}
    <SheetClose asChild>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />
    </SheetClose>

    {/* Drawer Panel (animated slide-in) */}
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed top-0 right-0 h-full w-80 z-50 p-6
                 bg-white dark:bg-neutral-900 text-black dark:text-white
                 shadow-2xl border-l border-primary/20 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <span className="font-bold text-xl text-black dark:text-white">Menu</span>
        <SheetClose asChild>
          <Button variant="ghost" size="icon">
            <X className="h-6 w-6 text-black dark:text-white hover:text-primary" />
            <span className="sr-only">Close menu</span>
          </Button>
        </SheetClose>
      </div>

      {/* Nav Items */}
      <motion.div
        className="flex flex-col gap-6"
        variants={{
          show: { transition: { staggerChildren: 0.08 } },
          hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
        }}
        initial="hidden"
        animate="show"
      >
        {navItems.map((item) => (
          // Wrap each item with SheetClose so tapping it closes the drawer
          <SheetClose asChild key={item.id}>
            <motion.button
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-lg font-medium text-left text-black dark:text-white hover:text-primary transition-colors"
            >
              {item.label}
            </motion.button>
          </SheetClose>
        ))}
      </motion.div>

      {/* Resume */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-black dark:text-white">Theme</span>
          <ThemeToggle />
        </div>
        <Button
    asChild
    className="w-full bg-primary hover:bg-primary/90 text-black dark:text-white shadow-md hover:shadow-xl transition-all">
          <motion.a
            href="/assets/ShriniwasMareResume115.pdf"
            whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(59,130,246,0.25)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-block text-center w-full font-semibold tracking-wide"
          >
            Resume
          </motion.a>
        </Button>
      </div>
    </motion.aside>
  </SheetContent>
</Sheet>

      </div>
    </nav>
  );
}