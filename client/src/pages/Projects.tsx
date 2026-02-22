import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionWrapper, { itemVariants } from "@/components/SectionWrapper";
import TiltCard from "@/components/TiltCard";
import { projects } from "@/lib/data";

const filters = [
  { label: "All", value: "all" },
  { label: "Work", value: "work" },
  { label: "Side Projects", value: "side" },
  { label: "OSS", value: "oss" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionWrapper>
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-projects-title">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From enterprise-scale distributed systems to weekend side projects. 
              Each one taught me something new.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeFilter === filter.value
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`button-filter-${filter.value}`}
              >
                {activeFilter === filter.value && (
                  <motion.div
                    layoutId="filter-bg"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-md"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </SectionWrapper>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
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
                      data-testid={`text-project-${project.slug}`}
                    >
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[11px] font-mono rounded-sm bg-white/5 text-muted-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-0.5 text-[11px] font-mono rounded-sm bg-white/5 text-muted-foreground/50">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-medium text-[hsl(190,95%,55%)] opacity-0 group-hover:opacity-100 transition-opacity">
                      View Case Study <ExternalLink className="w-3 h-3" />
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
