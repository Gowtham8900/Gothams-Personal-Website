export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: "work" | "side" | "oss";
  tags: string[];
  description: string;
  problem: string;
  approach: string;
  architecture: string;
  results: string;
  lessons: string;
  metrics: { label: string; value: number; suffix: string }[];
  role: string;
  year: string;
}

export const projects: Project[] = [
  {
    slug: "property-booking-platform",
    title: "Property Booking & Leasing Platform",
    tagline: "Real-time property booking workflows with event-driven architecture",
    category: "work",
    tags: [".NET", "Azure", "Kafka", "REST API", "LaunchDarkly"],
    description: "Designed and built backend services for a real-time property booking and leasing platform, handling property availability, booking workflows, and lease execution at scale.",
    problem: "The existing booking system had fragmented services with no real-time synchronization, leading to double bookings, delayed lease processing, and poor user experience across multiple property listings.",
    approach: "Built RESTful APIs to handle property availability, booking workflows, and lease execution. Implemented a configurable rules engine to automate business workflows and enforce booking and leasing policies dynamically.",
    architecture: "Event-driven microservices using Apache Kafka for real-time updates and notifications across distributed services. Integrated third-party services for document generation and e-signatures. Feature flag-based deployments via LaunchDarkly for controlled rollouts.",
    results: "Reduced booking processing time by 75%. Achieved zero double-booking incidents post-launch. Enabled seamless lease execution with automated document generation and e-signatures.",
    lessons: "Feature flags are essential for safe rollouts in high-traffic systems. Event-driven architecture with Kafka enables excellent decoupling but requires careful consumer group management.",
    metrics: [
      { label: "Processing Speed", value: 75, suffix: "% faster" },
      { label: "Uptime", value: 99.9, suffix: "%" },
      { label: "Services", value: 12, suffix: "+" },
    ],
    role: "Software Engineer II",
    year: "2025",
  },
  {
    slug: "rules-engine-fees",
    title: "Application Rules Engine & Fees",
    tagline: "Configurable business rules engine for dynamic fee calculation",
    category: "work",
    tags: [".NET Core", "React", "TypeScript", "Azure Functions", "SQL Server"],
    description: "Built a flexible rules engine that enables non-technical stakeholders to define and modify complex fee structures without code deployments.",
    problem: "Fee calculations were hardcoded across 30+ endpoints. Every pricing change required a development sprint, QA cycle, and deployment — typically a 2-week turnaround.",
    approach: "Created a DSL-based rules engine with a React admin UI. Rules are versioned, auditable, and hot-swappable. Used the Strategy pattern with a chain of responsibility for rule evaluation.",
    architecture: "Rules stored in SQL Server with change-feed triggers. Azure Functions evaluate rules at runtime. React admin panel with drag-and-drop rule builder and live preview.",
    results: "Pricing changes went from 2-week sprints to 15-minute configurations. Reduced fee-related bugs by 85%. Enabled 40+ unique fee structures without any code changes.",
    lessons: "Investing in a good admin UI pays for itself tenfold. Non-technical users caught edge cases our QA team missed because they understood the business rules deeply.",
    metrics: [
      { label: "Deploy Time", value: 15, suffix: " min" },
      { label: "Bug Reduction", value: 85, suffix: "%" },
      { label: "Fee Structures", value: 40, suffix: "+" },
    ],
    role: "Full Stack .NET Developer",
    year: "2024",
  },
  {
    slug: "enterprise-spa-platform",
    title: "Enterprise SPA Platform",
    tagline: "Single page applications with Angular and .NET Core Web API",
    category: "work",
    tags: ["Angular", "C#.NET", "ASP.NET Core", "SQL Server", "OAuth/OKTA"],
    description: "Designed and implemented enterprise-grade SPA applications using Angular with .NET Core Web API backend, integrating Kafka messaging and OAuth authentication.",
    problem: "Legacy web applications suffered from poor performance, inconsistent UI patterns, and fragmented authentication across multiple services, leading to maintenance overhead and security concerns.",
    approach: "Implemented Kafka for publish-subscribe messaging for alerting and reporting operational metrics. Created Web API Services for integration with external systems. Utilized .NET Core EF for efficient data access.",
    architecture: "Angular SPA frontend with Bootstrap for responsive UI. ASP.NET Core Web API backend with Entity Framework. Kafka messaging for event-driven alerts. OAuth with OKTA for secure authentication. SQL Server with optimized stored procedures.",
    results: "Reduced page load times by 60%. Achieved HIPAA compliance for data security. Streamlined authentication across all services with single sign-on.",
    lessons: "TypeScript in Angular development significantly improves code robustness through compile-time error detection. Investing in proper database schema design and indexing pays dividends in query performance.",
    metrics: [
      { label: "Load Time", value: 60, suffix: "% faster" },
      { label: "API Endpoints", value: 50, suffix: "+" },
      { label: "Compliance", value: 100, suffix: "%" },
    ],
    role: "Full Stack .NET Developer",
    year: "2024",
  },
  {
    slug: "openradius-ai",
    title: "OpenRadius.ai",
    tagline: "AI-powered radius search and geospatial intelligence platform",
    category: "side",
    tags: ["Next.js", "React", "TypeScript", "OpenAI", "PostGIS", "Mapbox"],
    description: "A SaaS platform that combines AI-driven insights with geospatial queries, enabling businesses to discover opportunities within custom geographic boundaries.",
    problem: "Small businesses lack affordable tools for geospatial market analysis. Enterprise GIS solutions start at $50K/year and require specialized training.",
    approach: "Built a natural language interface for geospatial queries. Users describe what they're looking for in plain English, and the AI translates it into optimized PostGIS queries with visual results on an interactive map.",
    architecture: "Next.js frontend with Mapbox GL. PostGIS backend with pre-computed spatial indices. OpenAI for NLP-to-SQL translation. Edge functions for low-latency query routing.",
    results: "500+ beta users in first month. Average query response time under 800ms. Featured in 3 tech newsletters.",
    lessons: "Natural language to SQL is powerful but needs guardrails. We added a query preview step after users accidentally ran expensive full-table scans through ambiguous prompts.",
    metrics: [
      { label: "Beta Users", value: 500, suffix: "+" },
      { label: "Query Speed", value: 800, suffix: "ms" },
      { label: "Data Points", value: 2, suffix: "M+" },
    ],
    role: "Creator & Full-Stack",
    year: "2024",
  },
  {
    slug: "observability-otel-dashboards",
    title: "Observability + OTel Dashboards",
    tagline: "End-to-end distributed tracing and monitoring platform",
    category: "work",
    tags: ["OpenTelemetry", ".NET", "Grafana", "Prometheus", "React"],
    description: "Implemented comprehensive observability across 25+ microservices using OpenTelemetry, with custom Grafana dashboards for real-time system health monitoring.",
    problem: "Debugging production issues across 25 microservices was like finding a needle in a haystack. Mean time to resolution (MTTR) averaged 4+ hours. No correlation between logs, traces, and metrics.",
    approach: "Rolled out OpenTelemetry SDK across all services with auto-instrumentation. Built custom exporters for monitoring integration. Created service-specific and system-wide Grafana dashboards with alerting.",
    architecture: "OTel Collector as a central hub. Traces to Jaeger, metrics to Prometheus, logs to Loki. Grafana for unified visualization. Custom React dashboard for business KPIs correlated with system metrics.",
    results: "MTTR dropped from 4 hours to 25 minutes. Proactive alerting catches 80% of issues before user impact. Full request tracing across all 25 services.",
    lessons: "Instrumentation coverage matters more than depth. Getting basic traces everywhere is more valuable than detailed traces in a few services. Start wide, then go deep where it matters.",
    metrics: [
      { label: "MTTR Reduction", value: 90, suffix: "%" },
      { label: "Services Traced", value: 25, suffix: "" },
      { label: "Proactive Catches", value: 80, suffix: "%" },
    ],
    role: "Platform Engineer",
    year: "2024",
  },
  {
    slug: "cloud-deployment-pipeline",
    title: "CI/CD & Cloud Deployment Pipeline",
    tagline: "Automated build, test, and deployment infrastructure",
    category: "work",
    tags: ["Azure DevOps", "Docker", "Jenkins", "PowerShell", ".NET"],
    description: "Architected and implemented end-to-end CI/CD pipelines using Azure DevOps and Jenkins, containerizing applications with Docker for consistent deployments across environments.",
    problem: "Manual deployments were error-prone, taking 2+ hours per release. Environment inconsistencies caused frequent production issues. No standardized deployment process across teams.",
    approach: "Automated project builds and deployments using Azure DevOps pipelines. Created customized Docker images for specific application requirements. Configured IAM roles and policies for minimal access security.",
    architecture: "Jenkins for continuous integration with Azure DevOps for release management. Docker containers for Linux-based application deployment. PowerShell scripts for environment configuration. Bitbucket for branching and version control strategies.",
    results: "Reduced deployment time from 2 hours to 15 minutes. Eliminated environment-related production incidents. Enabled continuous delivery across QA, staging, and production environments.",
    lessons: "Containerization with Docker dramatically improved deployment consistency. Investing in IAM policies and minimal access from day one prevents security debt from accumulating.",
    metrics: [
      { label: "Deploy Time", value: 15, suffix: " min" },
      { label: "Environments", value: 5, suffix: "" },
      { label: "Uptime", value: 99.5, suffix: "%" },
    ],
    role: ".NET Developer",
    year: "2021",
  },
];

export interface TimelineItem {
  year: string;
  title: string;
  company?: string;
  description: string;
  type: "work" | "milestone";
}

export const timeline: TimelineItem[] = [
  {
    year: "2025",
    title: "Software Engineer II",
    company: "American Homes for Rent (AMH)",
    description: "Designing backend services for real-time property booking and leasing platform using .NET, Kafka, and Azure.",
    type: "work",
  },
  {
    year: "2024",
    title: "Launched OpenRadius.ai",
    description: "Built and shipped an AI-powered geospatial intelligence platform as a side project.",
    type: "milestone",
  },
  {
    year: "2023",
    title: "Full Stack .NET Developer",
    company: "Country Financial",
    description: "Built enterprise SPA applications with Angular and .NET Core, implemented Kafka messaging systems, and ensured HIPAA compliance.",
    type: "work",
  },
  {
    year: "2022",
    title: "Master's Degree Completed",
    description: "Completed Master's in Data Science – Computational Data Science from Bradley University, USA.",
    type: "milestone",
  },
  {
    year: "2020",
    title: ".NET Developer",
    company: "GQBAY Software Pvt. Ltd.",
    description: "Full-stack development with React, Angular, and .NET. Built APIs, automated deployments with Docker and Jenkins.",
    type: "work",
  },
  {
    year: "2020",
    title: "Started Professional Career",
    description: "Graduated with Bachelor's in Electronics & Communication Engineering from KL University, India and began career in software development.",
    type: "milestone",
  },
];

export const skills = [
  { category: "Backend", items: ["C# / .NET Core", "ASP.NET MVC", "Web API", "Entity Framework", "GraphQL", "Go"] },
  { category: "Frontend", items: ["React", "Angular", "TypeScript", "JavaScript", "HTML5/CSS3", "Bootstrap"] },
  { category: "Cloud & DevOps", items: ["Azure", "Azure Functions", "Docker", "Jenkins", "Azure DevOps", "CI/CD"] },
  { category: "Data", items: ["SQL Server", "PostgreSQL", "Oracle", "MongoDB", "Elasticsearch", "Cosmos DB"] },
  { category: "Messaging & Integration", items: ["Kafka", "RabbitMQ", "Azure Service Bus", "REST/SOAP", "WCF", "Microservices"] },
  { category: "Observability", items: ["Grafana", "Prometheus", "New Relic", "Splunk", "ELK Stack", "Application Insights"] },
];

export const techStack = [
  "React", ".NET", "Azure", "TypeScript", "Angular", "C#",
  "SQL Server", "Docker", "Kafka", "Grafana", "Entity Framework", "Jenkins",
];

export const stats = [
  { label: "Years Experience", value: 4, suffix: "+" },
  { label: "Projects Delivered", value: 20, suffix: "+" },
  { label: "Services Architected", value: 25, suffix: "+" },
  { label: "Technologies", value: 30, suffix: "+" },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
