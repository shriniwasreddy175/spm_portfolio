"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { ImageWithFallbackfun } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <section
      className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden"
      onMouseMove={(e) => {
        const { innerWidth, innerHeight } = window;
        setMousePos({
          x: (e.clientX - innerWidth / 2) / 50,
          y: (e.clientY - innerHeight / 2) / 50,
        });
      }}
    >
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/20 pointer-events-none animate-pulse"
      />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            {/* Heading */}
            <motion.h1
              animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Hi, I'm <span className="text-primary">Shriniwas</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.h2
              animate={{ x: mousePos.x * 0.4, y: mousePos.y * 0.4 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="text-2xl lg:text-3xl text-muted-foreground"
            >
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2000,
                  "Web Developer",
                  2000,
                  "Mobile Developer",
                  2000,
                  "IoT Enthusiast",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              I build web, mobile, and IoT projects with thoughtful design and
              clean code, creating digital experiences that make a difference.
              Passionate about learning new technologies and delivering impactful
              solutions.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            animate={{ x: mousePos.x * 0.6, y: mousePos.y * 0.6 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="group hover:scale-105 transition-transform duration-300"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
              <ArrowDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1 group-hover:text-primary" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            animate={{ x: mousePos.x * 0.7, y: mousePos.y * 0.7 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="flex gap-4"
          >
            <a
              href="https://github.com/shriniwasreddy175"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/20 hover:scale-110 transition-all duration-300"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>

            <a
              href="https://www.linkedin.com/in/shriniwasreddy175506592321"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/20 hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </a>

            <a href="mailto:shriniwasreddy175@gmail.com">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/20 hover:scale-110 transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side - Profile Image with parallax */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Glow */}
            <motion.div
              animate={{ x: mousePos.x * 2, y: mousePos.y * 2 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-3xl"
            />
            {/* Image */}
            <motion.div
              animate={{ x: mousePos.x, y: mousePos.y }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="relative"
            >
              <ImageWithFallbackfun
                src="/assets/SPM_PP.jpg"
                alt="Shriniwas Mare - Professional headshot"
                className="relative w-80 h-80 rounded-full object-cover border-4 border-background shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
