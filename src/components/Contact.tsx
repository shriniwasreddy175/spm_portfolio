"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Mail, Phone, MapPin, Github, Linkedin, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    try {
      // 1. Send auto-reply to user (silent, no UI message)
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_AutoReply,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 2. Send message to you (ContactUs template)
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ContactUs,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setLoading(false);
      formRef.current?.reset();
      setTimeout(() => setStatus(null), 4000);
    } catch (error) {
      console.error("❌ EmailJS error:", error);
      setStatus("error");
      setLoading(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "shriniwasreddy175@gmail.com",
      href: "mailto:shriniwasreddy175@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7578840845",
      href: "tel:+917578840845",
    },
    { icon: MapPin, label: "Location", value: "Pune, India", href: null },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/shriniwasreddy175",
      username: "@shriniwasreddy175",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shriniwasreddy175506592321",
      username: "/in/shriniwasreddy175506592321",
    },
  ];

  return (
    <section 
      id="contact" 
      className="relative py-20 px-4 overflow-hidden"
      onMouseMove={(e) => {
        const { innerWidth, innerHeight } = window;
        setMousePos({
          x: (e.clientX - innerWidth / 2) / 50,
          y: (e.clientY - innerHeight / 2) / 50,
        });
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          animate={{ x: mousePos.x * 0.7, y: mousePos.y * 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm always interested in new opportunities and collaborations.
            Whether you have a project in mind or just want to chat, feel free
            to reach out!
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            animate={{ x: mousePos.x * 0.7, y: mousePos.y * 0.7 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">
                  Send me a message
                </h3>
                <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Let's work together"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      className="min-h-32 resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  {status === "success" && (
                    <p className="text-green-600 font-medium">
                      ✅ Message sent successfully!
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-600 font-medium">
                      ❌ Failed to send message. Try again later.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
            animate={{ x: mousePos.x, y: mousePos.y }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const content = (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:shadow-md transition-transform"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{info.label}</p>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </motion.div>
                  );

                  return info.href ? (
                    <a key={index} href={info.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:scale-[1.02] hover:shadow-md transition-transform group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{social.label}</p>
                        <p className="text-muted-foreground">
                          {social.username}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}