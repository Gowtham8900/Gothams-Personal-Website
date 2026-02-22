import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="text-7xl sm:text-8xl font-bold gradient-text mb-4" data-testid="text-404">
          404
        </div>
        <h1 className="text-xl font-semibold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm text-white transition-all hover:shadow-[0_0_30px_rgba(0,210,255,0.3)]"
          style={{ background: "linear-gradient(135deg, hsl(190, 95%, 45%), hsl(220, 90%, 50%))" }}
          data-testid="button-go-home"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
