import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function PageWrapper({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/">
          <PageWrapper><Home /></PageWrapper>
        </Route>
        <Route path="/projects">
          <PageWrapper><Projects /></PageWrapper>
        </Route>
        <Route path="/projects/:slug">
          <PageWrapper><ProjectDetail /></PageWrapper>
        </Route>
        <Route path="/about">
          <PageWrapper><About /></PageWrapper>
        </Route>
        <Route path="/contact">
          <PageWrapper><Contact /></PageWrapper>
        </Route>
        <Route>
          <PageWrapper><NotFound /></PageWrapper>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="relative min-h-screen">
          <ParticleBackground />
          <Navbar />
          <main className="relative z-10">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
