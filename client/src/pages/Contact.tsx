import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import SectionWrapper, { itemVariants } from "@/components/SectionWrapper";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:saigowtham9954@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionWrapper>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-contact-title">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Have a project idea, opportunity, or just want to chat? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            <motion.div variants={itemVariants} className="md:col-span-3">
              {submitted ? (
                <div className="glass-card rounded-md p-10 gradient-border text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(190,95%,45%), hsl(220,90%,50%))" }}>
                    <Send className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email Client Opened</h3>
                  <p className="text-muted-foreground">
                    Your default email client should have opened with the message pre-filled.
                    If it didn't, feel free to email me directly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                    className="mt-6 text-sm text-[hsl(190,95%,55%)] hover:underline"
                    data-testid="button-send-another"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card rounded-md p-8 gradient-border space-y-6" data-testid="form-contact">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }); }}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={!!errors.name}
                      className={`w-full px-4 py-3 rounded-md bg-white/5 border text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-[hsl(190,95%,50%)] focus:ring-2 focus:ring-[hsl(190,95%,50%/0.3)] ${errors.name ? "border-red-500/50" : "border-white/10"}`}
                      placeholder="Your name"
                      data-testid="input-name"
                    />
                    {errors.name && <p id="name-error" role="alert" className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: undefined }); }}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={!!errors.email}
                      className={`w-full px-4 py-3 rounded-md bg-white/5 border text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-[hsl(190,95%,50%)] focus:ring-2 focus:ring-[hsl(190,95%,50%/0.3)] ${errors.email ? "border-red-500/50" : "border-white/10"}`}
                      placeholder="you@example.com"
                      data-testid="input-email"
                    />
                    {errors.email && <p id="email-error" role="alert" className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => { setForm({ ...form, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: undefined }); }}
                      rows={5}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      aria-invalid={!!errors.message}
                      className={`w-full px-4 py-3 rounded-md bg-white/5 border text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors resize-none focus:border-[hsl(190,95%,50%)] focus:ring-2 focus:ring-[hsl(190,95%,50%/0.3)] ${errors.message ? "border-red-500/50" : "border-white/10"}`}
                      placeholder="Tell me about your project or opportunity..."
                      data-testid="input-message"
                    />
                    {errors.message && <p id="message-error" role="alert" className="text-xs text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium text-sm text-white"
                    style={{ background: "linear-gradient(135deg, hsl(190, 95%, 45%), hsl(220, 90%, 50%))" }}
                    whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(0, 210, 255, 0.3)" }}
                    whileTap={{ scale: 0.99 }}
                    data-testid="button-submit"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
              <div className="glass-card rounded-md p-6 gradient-border">
                <h3 className="text-sm font-semibold mb-4 text-[hsl(190,95%,55%)]">Contact Info</h3>
                <div className="space-y-4">
                  <a href="mailto:saigowtham9954@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="w-4 h-4 text-muted-foreground/60" />
                    saigowtham9954@gmail.com
                  </a>
                  <a href="tel:+13099899954" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="w-4 h-4 text-muted-foreground/60" />
                    (309) 989-9954
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground/60" />
                    <span className="text-sm text-muted-foreground">United States</span>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-md p-6 gradient-border">
                <h3 className="text-sm font-semibold mb-4 text-[hsl(190,95%,55%)]">Social</h3>
                <div className="space-y-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="link-social-github"
                  >
                    <SiGithub className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gowtham8900/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="link-social-linkedin"
                  >
                    <SiLinkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="glass-card rounded-md p-6 gradient-border">
                <h3 className="text-sm font-semibold mb-2 text-[hsl(190,95%,55%)]">Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  I typically respond within 24-48 hours. For urgent inquiries, reach out via LinkedIn.
                </p>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
