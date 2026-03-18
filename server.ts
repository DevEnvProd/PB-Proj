import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const articles = [
  {
    id: 1,
    slug: "art-of-war-modern-business",
    title: "The Art of War in Modern Business Strategy",
    excerpt: "How Sun Tzu's ancient wisdom applies to today's competitive corporate landscape.",
    content: "# The Art of War in Modern Business\n\nSun Tzu's *The Art of War* is more than just a military treatise; it's a masterclass in strategic thinking. In today's hyper-competitive business world, his principles are more relevant than ever.\n\n## Know Your Enemy, Know Yourself\n\n> 'If you know the enemy and know yourself, you need not fear the result of a hundred battles.'\n\nIn business, this translates to deep market research and honest internal audits. Understanding your competitor's strengths and your own weaknesses is the first step to victory.\n\n### Key Takeaways\n- Strategy over strength\n- Adaptability is crucial\n- Information is the ultimate currency",
    category: "Strategic Thinking",
    author: {
      name: "Alexander Vance",
      role: "Chief Strategist",
      avatar: "https://picsum.photos/seed/alex/100/100"
    },
    readTime: "8 min",
    difficulty: "Intermediate",
    publishedAt: "2024-03-10",
    image: "https://picsum.photos/seed/strategy1/1200/600"
  },
  {
    id: 2,
    slug: "game-theory-poker-decisions",
    title: "Game Theory: From the Poker Table to the Boardroom",
    excerpt: "Applying Nash Equilibrium and expected value to high-stakes decision making.",
    content: "Full content here...",
    category: "Game Theory",
    author: {
      name: "Elena Rossi",
      role: "Game Theorist",
      avatar: "https://picsum.photos/seed/elena/100/100"
    },
    readTime: "12 min",
    difficulty: "Advanced",
    publishedAt: "2024-03-12",
    image: "https://picsum.photos/seed/poker/1200/600"
  },
  {
    id: 3,
    slug: "ooda-loop-fast-decisions",
    title: "Mastering the OODA Loop for Rapid Response",
    excerpt: "How fighter pilot John Boyd's framework can help you outpace the competition.",
    content: "Full content here...",
    category: "Decision Frameworks",
    author: {
      name: "Marcus Thorne",
      role: "Risk Analyst",
      avatar: "https://picsum.photos/seed/marcus/100/100"
    },
    readTime: "6 min",
    difficulty: "Beginner",
    publishedAt: "2024-03-14",
    image: "https://picsum.photos/seed/pilot/1200/600"
  }
];

const frameworks = [
  {
    slug: "ooda-loop",
    name: "OODA Loop",
    description: "Observe, Orient, Decide, Act. A four-step cycle for rapid decision making.",
    originator: "John Boyd",
    difficulty: "Beginner",
    category: "Business"
  },
  {
    slug: "pareto-principle",
    name: "Pareto Principle",
    description: "The 80/20 rule: 80% of consequences come from 20% of causes.",
    originator: "Vilfredo Pareto",
    difficulty: "Beginner",
    category: "Life"
  },
  {
    slug: "cynefin-framework",
    name: "Cynefin Framework",
    description: "A conceptual framework used to aid decision-making by categorizing contexts.",
    originator: "Dave Snowden",
    difficulty: "Advanced",
    category: "Business"
  }
];

const caseStudies = [
  {
    slug: "netflix-pivot",
    title: "The Netflix Pivot: From DVDs to Streaming",
    industry: "Media & Tech",
    challenge: "Disrupting their own profitable business model before competitors did.",
    framework: "Blue Ocean Strategy",
    outcome: "Dominance of the global streaming market.",
    image: "https://picsum.photos/seed/netflix/800/400"
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/articles", (req, res) => {
    res.json(articles);
  });

  app.get("/api/articles/featured", (req, res) => {
    res.json(articles[0]);
  });

  app.get("/api/articles/:slug", (req, res) => {
    const article = articles.find(a => a.slug === req.params.slug);
    if (article) res.json(article);
    else res.status(404).json({ error: "Article not found" });
  });

  app.get("/api/frameworks", (req, res) => {
    res.json(frameworks);
  });

  app.get("/api/case-studies", (req, res) => {
    res.json(caseStudies);
  });

  app.post("/api/newsletter", (req, res) => {
    const { email } = req.body;
    console.log(`Newsletter subscription: ${email}`);
    res.json({ success: true, message: "Subscribed successfully" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
