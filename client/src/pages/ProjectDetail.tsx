import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionWrapper, { itemVariants } from "@/components/SectionWrapper";
import CountUp from "@/components/CountUp";
import { projects } from "@/lib/data";

function MetricBar({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return (
    <div className="glass-card rounded-md p-5 text-center gradient-border">
      <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
        <CountUp end={value} suffix={suffix} />
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function DiagramNode({ label, x, y, delay }: { label: string; x: number; y: number; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <rect
        x={x - 50}
        y={y - 16}
        width={100}
        height={32}
        rx={6}
        fill="rgba(15, 20, 35, 0.8)"
        stroke="rgba(0, 210, 255, 0.3)"
        strokeWidth={1}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill="rgba(200, 220, 240, 0.8)"
        fontSize={10}
        fontFamily="monospace"
      >
        {label}
      </text>
    </motion.g>
  );
}

function DiagramLine({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(0, 210, 255, 0.2)"
      strokeWidth={1}
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
    />
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-[hsl(190,95%,55%)] hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { title: "The Problem", content: project.problem },
    { title: "Approach", content: project.approach },
    { title: "Architecture", content: project.architecture },
    { title: "Results", content: project.results },
    { title: "Lessons Learned", content: project.lessons },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionWrapper>
          <motion.div variants={itemVariants}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              data-testid="link-back-projects"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm bg-white/5 text-muted-foreground">
                {project.category}
              </span>
              <span className="text-sm text-muted-foreground/50">{project.year}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3" data-testid="text-project-detail-title">
              {project.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">{project.tagline}</p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <div>
                <span className="text-muted-foreground/50 block text-xs uppercase tracking-wider mb-1">Role</span>
                {project.role}
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <span className="text-muted-foreground/50 block text-xs uppercase tracking-wider mb-1">Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[11px] font-mono rounded-sm bg-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {project.metrics.map((metric) => (
              <MetricBar key={metric.label} {...metric} />
            ))}
          </motion.div>
        </SectionWrapper>

        {sections.map((section, i) => (
          <SectionWrapper key={section.title} className="mb-12">
            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <span className="text-xs font-mono text-[hsl(190,95%,55%)] opacity-60">0{i + 1}</span>
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed pl-8">{section.content}</p>
            </motion.div>
          </SectionWrapper>
        ))}

        <SectionWrapper className="mb-16">
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="text-xs font-mono text-[hsl(190,95%,55%)] opacity-60">06</span>
              System Overview
            </h2>
            <div className="glass-card rounded-md p-6 gradient-border">
              <svg viewBox="0 0 400 180" className="w-full" preserveAspectRatio="xMidYMid meet">
                <DiagramLine x1={100} y1={40} x2={200} y2={40} delay={0.2} />
                <DiagramLine x1={200} y1={40} x2={300} y2={40} delay={0.4} />
                <DiagramLine x1={200} y1={40} x2={200} y2={100} delay={0.6} />
                <DiagramLine x1={100} y1={140} x2={200} y2={140} delay={0.8} />
                <DiagramLine x1={200} y1={100} x2={200} y2={140} delay={0.7} />
                <DiagramLine x1={200} y1={140} x2={300} y2={140} delay={0.9} />

                <DiagramNode label="Input" x={100} y={40} delay={0.1} />
                <DiagramNode label="Service" x={200} y={40} delay={0.3} />
                <DiagramNode label="Output" x={300} y={40} delay={0.5} />
                <DiagramNode label="Processor" x={200} y={100} delay={0.6} />
                <DiagramNode label="Queue" x={100} y={140} delay={0.7} />
                <DiagramNode label="Storage" x={300} y={140} delay={0.9} />
              </svg>
            </div>
          </motion.div>
        </SectionWrapper>

        <div className="flex items-center justify-between pt-8 border-t border-white/5">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-prev-project"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{prevProject.title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-next-project"
            >
              <span className="hidden sm:inline">{nextProject.title}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
