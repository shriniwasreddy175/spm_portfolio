"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import {
  Menu,
  X,
  Home,
  User,
  FolderKanban,
  Briefcase,
  Mail,
  FileDown,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);

  // Track the dark class on <html> so the Sheet portal (which renders outside
  // the theme tree) always gets the correct solid background.
  useEffect(() => {
    const html = document.documentElement;
    const update = () => setIsDark(html.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "home",       label: "Home",       icon: Home },
    { id: "about",      label: "About",      icon: User },
    { id: "projects",   label: "Projects",   icon: FolderKanban },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "contact",    label: "Contact",    icon: Mail },
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

  /* ── animation variants ── */
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 32 },
    show:   { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
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
              View Resume
            </motion.a>
          </Button>
        </div>

        {/* ── Mobile Navigation ── */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            style={{ backgroundColor: isDark ? "#0a0a0a" : "#ffffff" }}
            className="w-[300px] p-0 border-0 overflow-hidden flex flex-col"
          >
            {/* Decorative gradient blob */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full
                         bg-primary/8 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-10 -left-16 w-48 h-48 rounded-full
                         bg-primary/5 blur-2xl"
            />

            {/* ── Header / Profile card ── */}
            <div className="relative px-6 pt-6 pb-5 border-b border-border/60">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  Navigation
                </span>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-muted"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>

              {/* Mini profile */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/SM_logo.png"
                    alt="Shriniwas Mare"
                    className="w-12 h-12 rounded-full border-2 border-primary/40 object-cover shadow-md"
                  />
                  {/* online dot */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground leading-tight">Shriniwas Mare</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Full-Stack Developer</p>
                </div>
              </div>
            </div>

            {/* ── Nav Items ── */}
            <motion.nav
              className="flex-1 px-3 py-4 space-y-1 overflow-y-auto"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              aria-label="Mobile navigation"
            >
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.div key={item.id} variants={itemVariants}>
                    <SheetClose asChild>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl
                                    text-sm font-medium transition-all duration-200
                                    ${isActive
                                      ? "bg-primary text-primary-foreground shadow-sm"
                                      : "text-foreground hover:bg-muted"
                                    }`}
                      >
                        {/* index number */}
                        <span
                          className={`text-[10px] font-bold w-5 text-center tabular-nums
                                      ${isActive ? "text-primary-foreground/60" : "text-muted-foreground"}`}
                        >
                          0{index + 1}
                        </span>

                        {/* icon */}
                        <span
                          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors
                                      ${isActive
                                        ? "bg-primary-foreground/10"
                                        : "bg-muted group-hover:bg-background"
                                      }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>

                        {/* label */}
                        <span className="flex-1 text-left">{item.label}</span>

                        {/* chevron */}
                        <ChevronRight
                          className={`h-3.5 w-3.5 transition-transform duration-200
                                      ${isActive ? "opacity-60" : "opacity-0 group-hover:opacity-40 group-hover:translate-x-0.5"}`}
                        />
                      </button>
                    </SheetClose>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* ── Footer ── */}
            <div className="px-4 py-4 border-t border-border/60 space-y-3">
              {/* Theme row */}
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-medium text-muted-foreground">Appearance</span>
                <ThemeToggle />
              </div>

              {/* Resume button */}
              <a
                href="/assets/ShriniwasMareResume115.pdf"
                download
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl
                           bg-primary text-primary-foreground text-sm font-semibold
                           shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150"
              >
                <FileDown className="h-4 w-4" />
                View Resume
              </a>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </nav>
  );
}
