import { SiGithub, SiLinkedin } from "react-icons/si";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 mt-24" data-testid="footer">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-bold gradient-text">Sai Gowtham</span>
            <p className="text-sm text-muted-foreground">
              .NET Full Stack Developer building reliable, scalable systems.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
              data-testid="link-github"
            >
              <SiGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/gowtham8900/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
              data-testid="link-linkedin"
            >
              <SiLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:saigowtham9954@gmail.com"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
              data-testid="link-email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Sai Gowtham Padarthi. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/40">
            Built with React + Vite + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
