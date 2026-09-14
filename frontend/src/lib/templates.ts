export function getStarterContent(template: string, name: string) {
  if (template === "landing") {
    return [
      {
        id: "block-hero",
        type: "hero",
        title: name,
        subtitle: "The modern platform designed to showcase your highest ambition.",
        ctaText: "Get Started Now",
        ctaUrl: "#contact",
        badge: "✨ Announcing Studio 2.0",
        imageUrl:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "block-features",
        type: "features",
        title: "Engineered for Focus & Velocity",
        subtitle: "Every module is designed to eliminate friction between your ideas and your audience.",
        items: [
          {
            title: "Lightning Fast Engine",
            description: "Built on server-authoritative Next.js architecture with zero latency.",
            icon: "Zap",
          },
          {
            title: "Responsive Canvas",
            description: "Seamless preview across desktop, tablet, and mobile viewport frames.",
            icon: "Smartphone",
          },
          {
            title: "Single-Click Publishing",
            description: "Turn draft work into instantaneous public digital publications.",
            icon: "Globe",
          },
        ],
      },
      {
        id: "block-cta",
        type: "cta",
        title: "Ready to launch your vision?",
        subtitle: "Join hundreds of creators managing their work with Studio.",
        buttonText: "Publish Today",
        buttonUrl: "#",
      },
    ];
  }

  if (template === "brief") {
    return [
      {
        id: "block-hero",
        type: "hero",
        title: name,
        subtitle: "Comprehensive project brief and strategic roadmap.",
        ctaText: "Review Deliverables",
        ctaUrl: "#deliverables",
        badge: "Strategic Brief",
        imageUrl: "",
      },
      {
        id: "block-text",
        type: "text",
        title: "Executive Summary",
        content:
          "This project establishes the definitive direction, technical requirements, and milestone objectives for the upcoming product cycle. All work adheres to the principles of clarity, performance, and server-authoritative integrity.",
      },
      {
        id: "block-features",
        type: "features",
        title: "Core Deliverables",
        subtitle: "Measurable project milestones",
        items: [
          {
            title: "Phase 1: Architecture & Data Model",
            description: "PostgreSQL schema, authentication cookies, and secure API boundaries.",
            icon: "Database",
          },
          {
            title: "Phase 2: Interactive Workspace",
            description: "Live block canvas with multi-device responsive simulation.",
            icon: "Layout",
          },
          {
            title: "Phase 3: Public Distribution",
            description: "Global edge CDN routing and dynamic OpenGraph SEO metadata.",
            icon: "Share2",
          },
        ],
      },
    ];
  }

  if (template === "blank") {
    return [
      {
        id: "block-hero",
        type: "hero",
        title: name,
        subtitle: "Add your thoughts, narrative, or media.",
      },
    ];
  }

  // Default: Digital Portfolio & Showcase
  return [
    {
      id: "block-hero",
      type: "hero",
      title: name,
      subtitle: "A curated visual anthology of design, engineering, and digital art.",
      ctaText: "Explore Projects",
      ctaUrl: "#gallery",
      badge: "Selected Works",
      imageUrl:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "block-text",
      type: "text",
      title: "About the Practice",
      content:
        "We believe in work that combines typographic discipline, tactile minimalism, and technological precision. Every piece is an exploration of form, light, and functional clarity.",
    },
    {
      id: "block-gallery",
      type: "gallery",
      title: "Featured Works",
      subtitle: "Recent commissions and studio explorations",
      items: [
        {
          title: "Monolithic Forms",
          category: "Spatial Design",
          imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Atmospheric Optics",
          category: "Art Direction",
          imageUrl:
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        },
        {
          title: "Kinetic Typographies",
          category: "Interactive",
          imageUrl:
            "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      id: "block-cta",
      type: "cta",
      title: "Commission an Atelier Production",
      subtitle: "Let's collaborate on your next landmark project.",
      buttonText: "Initiate Dialogue",
      buttonUrl: "mailto:studio@example.com",
    },
  ];
}
