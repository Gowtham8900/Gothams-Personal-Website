import { motion, useReducedMotion } from "framer-motion";
import { techStack } from "@/lib/data";

const glowColors = [
  "rgba(0, 210, 255, 0.3)",
  "rgba(168, 85, 247, 0.3)",
  "rgba(0, 200, 150, 0.3)",
  "rgba(59, 130, 246, 0.3)",
  "rgba(236, 72, 153, 0.3)",
  "rgba(0, 210, 255, 0.3)",
  "rgba(168, 85, 247, 0.3)",
  "rgba(0, 200, 150, 0.3)",
  "rgba(59, 130, 246, 0.3)",
  "rgba(236, 72, 153, 0.3)",
  "rgba(0, 210, 255, 0.3)",
  "rgba(168, 85, 247, 0.3)",
];

export default function TechOrbit() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto" data-testid="tech-orbit">
      {techStack.map((tech, i) => (
        <motion.span
          key={tech}
          className="px-4 py-2 text-sm font-mono rounded-md glass-card gradient-border text-muted-foreground cursor-default"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: i * 0.08,
            duration: 0.4,
          }}
          whileHover={prefersReducedMotion ? {} : {
            scale: 1.1,
            color: "hsl(190, 95%, 60%)",
            boxShadow: `0 0 20px ${glowColors[i % glowColors.length]}`,
          }}
          style={prefersReducedMotion ? {} : {
            animation: `float ${5 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
          }}
          data-testid={`badge-tech-${tech.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
        >
          {tech}
        </motion.span>
      ))}
    </div>
  );
}
