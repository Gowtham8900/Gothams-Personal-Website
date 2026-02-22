import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionWrapper, { itemVariants } from "@/components/SectionWrapper";
import { skills, timeline } from "@/lib/data";

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionWrapper>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-about-title">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Engineer, builder, and systems thinker.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card rounded-md p-8 md:p-10 gradient-border mb-16">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm Sai Gowtham Padarthi, a .NET Full Stack Developer with 4+ years of experience across all phases of the software development lifecycle.
                I specialize in designing, developing, and deploying applications using C#, ASP.NET Core, React, Angular, and Microsoft Azure.
              </p>
              <p>
                My journey has taken me through building real-time property booking platforms at American Homes for Rent,
                enterprise SPA applications at Country Financial, and full-stack solutions at GQBAY Software.
                I thrive on architecting event-driven systems with Kafka and RabbitMQ, and building configurable business logic
                that empowers non-technical stakeholders.
              </p>
              <p>
                I hold a Master's in Data Science from Bradley University and a Bachelor's in Electronics & Communication Engineering from KL University.
                Outside of work, I build side projects like OpenRadius.ai — an AI-powered geospatial intelligence platform.
              </p>
              <p>
                I believe great software is invisible — it just works.
                The best systems I've built are the ones nobody thinks about because they simply do their job, reliably, at scale.
              </p>
            </div>
          </motion.div>
        </SectionWrapper>

        <SectionWrapper className="mb-16" id="skills">
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Skills & <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Tools and technologies I work with regularly.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((group) => (
              <motion.div
                key={group.category}
                variants={itemVariants}
                className="glass-card rounded-md p-6 gradient-border"
              >
                <h3 className="text-sm font-semibold mb-4 text-[hsl(190,95%,55%)]">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      className="px-3 py-1.5 text-xs font-mono rounded-sm bg-white/5 text-muted-foreground"
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(220,230,240,1)" }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper className="mb-16" id="timeline">
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Career <span className="gradient-text">Timeline</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(190,95%,50%/0.3)] via-[hsl(270,80%,60%/0.3)] to-transparent" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative ml-12 mb-10 last:mb-0"
              >
                <div
                  className={`absolute -left-[2.25rem] w-3 h-3 rounded-full mt-1.5 ${
                    item.type === "milestone"
                      ? "bg-[hsl(270,80%,60%)] shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      : "bg-[hsl(190,95%,50%)] shadow-[0_0_10px_rgba(0,210,255,0.5)]"
                  }`}
                />

                <div className="glass-card rounded-md p-5 gradient-border">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-[hsl(190,95%,55%)]">{item.year}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-sm ${
                        item.type === "milestone"
                          ? "bg-[hsl(270,80%,60%/0.15)] text-[hsl(270,80%,70%)]"
                          : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold mb-1">{item.title}</h3>
                  {item.company && (
                    <p className="text-sm text-muted-foreground/70 mb-1">{item.company}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="now">
          <motion.div variants={itemVariants} className="glass-card rounded-md p-8 md:p-10 gradient-border">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              What I'm Doing <span className="gradient-text">Now</span>
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Currently working as a Software Engineer II at American Homes for Rent, building real-time property
                booking and leasing systems with .NET, Kafka, and Azure.
              </p>
              <p>
                On the side, I'm building OpenRadius.ai and exploring AI-powered developer tools.
                I'm passionate about distributed systems, observability, and crafting great developer experiences.
              </p>
              <p>
                Always open to interesting conversations about systems design, side projects, and the craft
                of software engineering.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm text-white transition-all hover:shadow-[0_0_30px_rgba(0,210,255,0.3)]"
                style={{
                  background: "linear-gradient(135deg, hsl(190, 95%, 45%), hsl(220, 90%, 50%))",
                }}
                data-testid="button-contact-about"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </SectionWrapper>
      </div>
    </div>
  );
}
