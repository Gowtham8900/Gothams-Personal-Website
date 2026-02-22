import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/resume", (_req, res) => {
    const resumeDocx = path.resolve("attached_assets/Gowtham_NET_Resume_1771800589677.docx");
    const resumePdf = path.resolve("attached_assets/resume.pdf");
    if (fs.existsSync(resumePdf)) {
      res.download(resumePdf, "Sai_Gowtham_Padarthi_Resume.pdf");
    } else if (fs.existsSync(resumeDocx)) {
      res.download(resumeDocx, "Sai_Gowtham_Padarthi_Resume.docx");
    } else {
      res.status(404).json({ message: "Resume not available yet. Please check back later." });
    }
  });

  return httpServer;
}
