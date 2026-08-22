"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Experience() {
  const [showAll, setShowAll] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      title: "B.Tech in Electronics and Telecommunication Engineering",
      company: "Pimpri Chinchwad College of Engineering (PCCOE)",
      location: "Pune, India",
      period: "2026 - Present",
      description:
        "Currently pursuing B.Tech in Electronics and Telecommunication Engineering, building a strong foundation in electronics, communication systems, software development, and emerging technologies.",
      achievements: [
        "Expanding knowledge in electronics, telecommunication, embedded systems, and computer engineering.",
        "Applying programming and software development skills to engineering projects and practical applications.",
        "Exploring emerging technologies through academic projects, hands-on learning, and technical activities.",
      ],
      technologies: ["C/C++", "ESP32", "Arduino", "IoT", "Embedded Systems", "Electronics", "Communication Systems"],
    },
    {
      title: "Internship - Full Stack Developer",
      company: "ETHDC Technologies Pvt. Ltd. (ETHDC)",
      location: "Pune, India",
      period: "Dec 2025 - June 2026",
      description:
        "Gained hands-on experience in enterprise application development, working on ERP modules, backend systems, and database-driven web applications.",
      achievements: [
        "Developed and enhanced ERP features using JSP, Spring Boot, and PostgreSQL.",
        "Designed and integrated REST APIs for efficient data communication between systems.",
        "Participated in requirement analysis, debugging, testing, and deployment activities."
      ],
      technologies: ["JSP", "Servlet", "Java", "Spring Boot", "PostgreSQL", "REST APIs", "Git", "JavaScript"],
    },
    {
      title: "Diploma in Computer Engineering",
      company: "Government Polytechnic Pune (GPP)",
      location: "Pune, India",
      period: "2023 - 2026",
      description:
        "Completed Diploma in Computer Engineering, building hands-on skills in web development, mobile apps, and IoT systems.",
      achievements: [
        "Completed multiple full-stack projects including Smart MedCare and EcoScan.",
        "Gained expertise in React, Node.js, Python, Java, SpringBoot, and IoT with ESP32.",
        "Participated in workshops and practical labs for hardware and software integration.",
      ],
      technologies: ["React", "Next.js", "Node.js", "Python", "Java", "DSA", "SpringBoot", "PostgreSQL", "MongoDB", "ESP32", "IoT"],
    },
    {
      title: "Higher Secondary Education (HSC)",
      company: "Rajarshi Shahu Mahavidyalaya Latur (RSML)",
      location: "Latur, India",
      period: "2020 - 2022",
      description:
        "Completed Higher Secondary Certificate (HSC) in the Science stream with focus on Physics, Chemistry, and Biology.",
      achievements: [
        "Gained strong foundation in core sciences: Physics, Chemistry, and Biology.",
        "Participated in academic events and group study activities.",
        "Built discipline and analytical problem-solving approach.",
      ],
      technologies: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Sanskrit", "Crop production"],
    },
  ];

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 1);

  // Dynamically adjust timeline line height to last card
  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".timeline-card");
      if (cards.length > 0) {
        const lastCard = cards[cards.length - 1] as HTMLElement;
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const lastCardBottom = lastCard.getBoundingClientRect().bottom;
        setLineHeight(lastCardBottom - containerTop - 40);
      }
    }
  }, [displayedExperiences, showAll]);

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
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">Experience & Education</h2>
          <p className="text-lg text-muted-foreground">
            My learning journey, projects, and hands-on experiences as a fresher.
          </p>
        </motion.div>

        <div className="relative" ref={containerRef}>
          {/* Dynamic timeline line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: lineHeight }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute left-8 top-0 w-0.5 bg-border hidden md:block"
          />

          <motion.div 
            className="space-y-8"
            animate={{ x: mousePos.x, y: mousePos.y }}
          >
            <AnimatePresence>
              {displayedExperiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.2,
                  }}
                  className="relative md:ml-16 timeline-card"
                >
                  {/* Animated Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: index * 0.2 + 0.2,
                    }}
                    className="absolute -left-20 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"
                  />

                  <motion.div whileHover={{ y: -6, scale: 1.01 }}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div>
                            <CardTitle className="text-xl mb-2">
                              {exp.title}
                            </CardTitle>
                            <div className="space-y-1 text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {exp.company}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span className="text-sm">{exp.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span className="text-sm">{exp.period}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>

                        <div>
                          <h4 className="font-medium mb-2">Key Achievements:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {exp.achievements.map((achievement, achIndex) => (
                              <motion.li
                                key={achIndex}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: achIndex * 0.1 }}
                              >
                                {achievement}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">
                            Technologies Used:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <motion.div
                                key={techIndex}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* View All / View Less Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="default"
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