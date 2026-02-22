import { Link } from "wouter";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles, Zap, Code2, Globe } from "lucide-react";
import SectionWrapper, { itemVariants } from "@/components/SectionWrapper";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import TechOrbit from "@/components/TechOrbit";
import { projects, stats, timeline } from "@/lib/data";
import { useEffect, useState } from "react";

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const roles = [".NET Full Stack Developer", "Cloud Architect", "Systems Builder", "Problem Solver"];

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
        } else {
          setDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, deleting ? 30 : 70);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <span className="inline-block">
      {roles[roleIndex].substring(0, charIndex)}
      <span className="inline-block w-[2px] h-5 bg-[hsl(190,95%,55%)] ml-0.5 animate-pulse align-middle" />
    </span>
  );
}

const statIcons = [Zap, Code2, Globe, Sparkles];

function MouseGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });
  const opacity = useTransform(springX, (v) => v === 0 ? 0 : 0.15);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-[1] rounded-full"
      style={{
        x: useTransform(springX, (v) => v - 200),
        y: useTransform(springY, (v) => v - 200),
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(0, 210, 255, 0.08) 0%, transparent 70%)",
        opacity,
      }}
    />
  );
}

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const recentTimeline = timeline.slice(0, 3);

  return (
    <div className="relative">
      <MouseGlow />

      <section className="min-h-screen flex items-center justify-center px-6 pt-20" data-testid="section-hero">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={heroItem} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono tracking-wider uppercase text-muted-foreground glass-card rounded-full animated-gradient-border">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
            data-testid="text-hero-name"
          >
            Hi, I'm{" "}
            <span className="gradient-text neon-text">Sai Gowtham</span>
          </motion.h1>

          <motion.div
            variants={heroItem}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 font-mono h-8"
            data-testid="text-hero-tagline"
          >
            <TypingText />
          </motion.div>

          <motion.p
            variants={heroItem}
            className="text-base text-muted-foreground/70 max-w-xl mx-auto mb-10"
          >
            4+ years designing, developing, and deploying enterprise applications with .NET, React, and Azure.
            Passionate about microservices, event-driven architecture, and shipping software that matters.
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              href="/projects"
              data-testid="button-view-projects"
            >
              <motion.span
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, hsl(190, 95%, 45%), hsl(220, 90%, 50%))",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0, 210, 255, 0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <Link
              href="/contact"
              data-testid="button-contact"
            >
              <motion.span
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm border border-white/10 text-muted-foreground"
                whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.25)", color: "rgba(240,240,240,1)" }}
                whileTap={{ scale: 0.97 }}
              >
                Get in Touch
              </motion.span>
            </Link>
          </motion.div>

          <motion.div variants={heroItem}>
            <TechOrbit />
          </motion.div>
        </motion.div>
      </section>

      <SectionWrapper className="py-24 px-6" id="stats">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = statIcons[i % statIcons.length];
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0, 210, 255, 0.1)" }}
                  className="text-center p-6 glass-card rounded-md animated-gradient-border group cursor-default"
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon className="w-5 h-5 mx-auto mb-3 text-muted-foreground/50 group-hover:text-[hsl(190,95%,55%)] transition-colors" />
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-24 px-6" id="featured-projects">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A selection of recent work spanning enterprise applications, distributed systems, and developer tools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <motion.div key={project.slug} variants={itemVariants}>
                <Link href={`/projects/${project.slug}`}>
                  <TiltCard className="p-6 h-full cursor-pointer group">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-sm bg-white/5 text-muted-foreground">
                        {project.category}
                      </span>
                      <span className="text-xs text-muted-foreground/50">{project.year}</span>
                    </div>
                    <h3
                      className="text-lg font-semibold mb-2 group-hover:text-[hsl(190,95%,55%)] transition-colors"
                      data-testid={`text-project-title-${project.slug}`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[11px] font-mono rounded-sm bg-white/5 text-muted-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-[hsl(190,95%,55%)] opacity-0 group-hover:opacity-100 transition-opacity">
                      View Case Study <ExternalLink className="w-3 h-3" />
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              data-testid="link-all-projects"
            >
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-24 px-6" id="timeline-preview">
        <div className="max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Recent <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(190,95%,50%/0.3)] via-[hsl(270,80%,60%/0.3)] to-transparent" />

            {recentTimeline.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`relative flex items-start gap-6 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1.5 mt-2 bg-[hsl(190,95%,50%)] shadow-[0_0_10px_rgba(0,210,255,0.5)]" />

                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-xs font-mono text-[hsl(190,95%,55%)] mb-1 block">{item.year}</span>
                  <h3 className="text-base font-semibold mb-1">{item.title}</h3>
                  {item.company && (
                    <p className="text-sm text-muted-foreground/70 mb-1">{item.company}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              data-testid="link-full-story"
            >
              Read my full story <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div variants={itemVariants} className="glass-card rounded-md p-10 md:p-16 animated-gradient-border">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Let's <span className="gradient-text">Build</span> Together
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Have an interesting project or opportunity? I'm always open to discussing new ideas and collaborations.
            </p>
            <Link
              href="/contact"
              data-testid="button-cta-contact"
            >
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-3 rounded-md font-medium text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, hsl(190, 95%, 45%), hsl(220, 90%, 50%))",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(0, 210, 255, 0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
