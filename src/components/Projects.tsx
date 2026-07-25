"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallbackfun } from "./figma/ImageWithFallback";
import { ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Projects() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const projects = [
    // {
    //   title: "Smart Xerox Centers (Upcoming)",
    //   description:
    //     "A system that manages end-to-end print job queue with user/admin dashboards, cost calculation, UPI/QR payments, and live leaderboards.",
    //   image: "/assets/Smart_Xerox_Centers.jpg",
    //   technologies: ["Flutter", "Dart", "Java", "Spring Boot", "Payments", "UPI"],
    //   liveUrl: "https://xerox-centers.onrender.com",
    //   githubUrl: "https://github.com/shriniwasreddy175/Smart_Xerox_Centers",
    // },
    {
      title: "EcoScan (Ongoing)",
      description:
        "Sustainability analysis platform that scans products, estimates carbon footprint, provides eco-friendly recommendations, and gamifies sustainable decision-making.",
      image: "/assets/EcoScan.png",
      technologies: ["React", "Java", "Spring Boot", "JWT", "LLMs", "RESTful APIs"],
      liveUrl: "https://ecoscan-nn41.onrender.com",
      githubUrl: "https://github.com/shriniwasreddy175/ecoscan",
    },
    {
      title: "Smart MedCare (Final Year Project)",
      description:
        "IoT based Health Monitoring system tracking vitals (BP, heart-rate, SpO₂) and hormones, with real-time alerts and rural-friendly design.",
      image: "/assets/Smart_MedCare.jpg",
      technologies: ["IoT", "ESP32", "Sensors", "JavaScript", "Python", "Flask"],
      liveUrl: "https://medcare-frontend-2z67.onrender.com",
      githubUrl: "https://github.com/shriniwasreddy175/MedCare_Project",
    },
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio website showcasing projects, technical skills and experience with a modern UI and interactive design.",
      image: "/assets/SHRINIWAS MARE.png",
      technologies: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Vercel"],
      liveUrl: "https://spm175-portfolio.vercel.app",
      githubUrl: "https://github.com/shriniwasreddy175/spm_portfolio",
    },
    {
      title: "Local Chat App (Micro Project)",
      description:
        "Encrypted chat with integrity verification. Includes UI, key handling, and example attacks/defenses write-up.",
      image: "/assets/Local_Chat_App.jpg",
      technologies: ["Security", "Java", "Android", "AES", "Encryption", "Spring Boot"],
      liveUrl: "https://chatapp-nn41.onrender.com/",
      githubUrl: "https://github.com/shriniwasreddy175/Local_Chat_App",
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section 
      id="projects" 
      className="py-20 px-4 relative"
      onMouseMove={(e) => {
        const { innerWidth, innerHeight } = window;
        setMousePos({
          x: (e.clientX - innerWidth / 2) / 50,
          y: (e.clientY - innerHeight / 2) / 50,
        });
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          animate={{ x: mousePos.x * 0.7, y: mousePos.y * 0.7}}
        >
          <h2 className="text-4xl font-bold mb-2">Projects</h2>
          <p className="text-lg text-muted-foreground">Selected Work</p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
          animate={{ x: mousePos.x, y: mousePos.y }}
        >
          <AnimatePresence>
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                layout
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="overflow-hidden shadow-md transition-all duration-300 group">
                  {/* Project Image */}
                  <motion.div
                    className="relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <ImageWithFallbackfun
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.div>

                  {/* Card Header */}
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <div className="flex gap-2">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View live project</span>
                          </Button>
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Github className="h-4 w-4" />
                            <span className="sr-only">View source code</span>
                          </Button>
                        </motion.a>
                      </div>
                    </CardTitle>
                  </CardHeader>

                  {/* Card Content */}
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="relative w-32 justify-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={showAll ? "less" : "all"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  {showAll ? "View Less" : "View All"}
                </motion.span>
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}