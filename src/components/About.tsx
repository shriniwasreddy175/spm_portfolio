"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code2, Palette, Smartphone, Database } from "lucide-react";
import { motion } from "framer-motion";

export function About() {
  const [showFull, setShowFull] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const highlights = [
    {
      icon: Code2,
      title: "Frontend Development",
      description:
        "Modern React, Next.js, and TypeScript applications with exceptional user experiences.",
    },
    {
      icon: Database,
      title: "Backend Development",
      description:
        "Scalable APIs and databases using Node.js, Python, and cloud technologies.",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "User-centered design principles with tools like Figma and Adobe Creative Suite.",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description:
        "Cross-platform for developing mobile apps using React Native and Flutter.",
    },
  ];

  const skills = [
    "Problem Solving",
    "Team Collaboration",
    "Project Management",
    "Critical Thinking",
    "Leadership",
    "Time Management",
    "Communication",
  ];

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Figma",
    "Tailwind CSS",
    "GraphQL",
  ];

  const bio = `Diploma student in Computer Engineering at Government Polytechnic Pune, building full-stack web, mobile, and IoT projects with a focus on usability and performance. 
  Passionately about creating scalable and user-friendly solutions, learning emerging technologies, and contributing to real-world projects that solve problems effectively.`;

  const truncatedBio = bio.split(" ").slice(0, 20).join(" ") + "...";

  return (
    <section 
      className="py-20 px-4 bg-muted/30 relative"
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
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <motion.p
            key={showFull ? "full" : "short"}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            {showFull ? bio : truncatedBio}{" "}
            <button
              onClick={() => setShowFull(!showFull)}
              className="text-primary font-semibold underline ml-2"
            >
              {showFull ? "View Less" : "Read More"}
            </button>
          </motion.p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          animate={{ x: mousePos.x * 0.7, y: mousePos.y * 0.7 }}
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills & Technologies */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
            animate={{ x: mousePos.x, y: mousePos.y }}
          >
            <h3 className="text-2xl font-semibold mb-6">Skills</h3>
            <motion.div
              className="flex flex-wrap gap-3 justify-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Badge variant="secondary" className="px-4 py-2">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
            animate={{ x: mousePos.x, y: mousePos.y }}
          >
            <h3 className="text-2xl font-semibold mb-6">
              Technologies I Work With
            </h3>
            <motion.div
              className="flex flex-wrap gap-3 justify-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Badge variant="secondary" className="px-4 py-2">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}