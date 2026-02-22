import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "py-5 bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold tracking-tight gradient-text" data-testid="link-logo">
          Sai Gowtham
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                location === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
              {location === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, hsl(190, 95%, 50%), hsl(270, 80%, 60%))",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/resume"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-white/10 text-muted-foreground transition-all hover:text-foreground hover:border-white/20"
            data-testid="link-resume"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="button-mobile-menu"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    location === link.href
                      ? "text-foreground bg-white/5"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/resume"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-mobile-resume"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
