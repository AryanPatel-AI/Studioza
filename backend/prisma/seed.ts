import { PrismaClient } from "@prisma/client";
import {
  PROJECTS,
  STORIES,
  SERVICES,
  TESTIMONIALS,
  INITIAL_INQUIRIES,
  INITIAL_BOOKINGS,
} from "../../frontend/src/lib/data/studioData";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Studioza Database...");

  // 1. Create or upsert Admin User
  const admin = await prisma.user.upsert({
    where: { email: "aryan@studioza.atelier" },
    update: {},
    create: {
      name: "Aryan Patel",
      email: "aryan@studioza.atelier",
      role: "ADMIN",
      avatarUrl: "/images/aryan-patel-pillared-court.jpg",
    },
  });

  // 2. Categories
  const categories = ["weddings", "portraits", "fashion", "commercial"];
  const categoryMap: Record<string, string> = {};

  for (const cat of categories) {
    const c = await prisma.category.upsert({
      where: { slug: cat },
      update: {},
      create: {
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        slug: cat,
        description: `Fine art photographic monographs within ${cat}.`,
      },
    });
    categoryMap[cat] = c.id;
  }

  // 3. Projects & Project Images
  for (const p of PROJECTS) {
    const project = await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        subtitle: p.subtitle,
        description: p.subtitle,
        story: p.story,
        location: p.location,
        year: p.year,
        client: p.client || "Studio Monograph",
        status: "PUBLISHED",
        coverImage: p.coverImage,
        categoryId: categoryMap[p.category] || null,
        ownerId: admin.id,
        credits: JSON.stringify(p.credits),
      },
    });

    for (let i = 0; i < p.gallery.length; i++) {
      const img = p.gallery[i];
      await prisma.projectImage.create({
        data: {
          projectId: project.id,
          url: img.url,
          caption: img.caption,
          alt: img.alt,
          order: i,
          isCover: i === 0,
        },
      });
    }
  }

  // 4. Stories & Story Images
  for (const s of STORIES) {
    await prisma.story.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        title: s.title,
        slug: s.slug,
        subtitle: s.subtitle,
        excerpt: s.excerpt,
        content: s.editorialText1 + "\n\n" + s.editorialText2 + "\n\n" + s.editorialConclusion,
        quote: s.quote,
        coverImage: s.coverImage,
        readTime: s.readTime,
        status: "PUBLISHED",
        authorId: admin.id,
      },
    });
  }

  // 5. Services
  for (const serv of SERVICES) {
    await prisma.service.upsert({
      where: { slug: serv.slug },
      update: {},
      create: {
        name: serv.name,
        slug: serv.slug,
        description: serv.tagline,
        philosophy: serv.philosophy,
        price: parseFloat(serv.startingPrice.replace(/[^0-9]/g, "")) || 5000,
        deliverables: JSON.stringify(serv.included),
        process: JSON.stringify(serv.process),
        faq: JSON.stringify(serv.faqs),
        isActive: true,
      },
    });
  }

  // 6. Testimonials
  for (const t of TESTIMONIALS) {
    await prisma.testimonial.create({
      data: {
        clientName: t.clientName,
        clientRole: t.clientRole,
        quote: t.quote,
        eventOrProject: t.eventOrProject,
        location: t.location,
        rating: 5,
        featured: true,
      },
    });
  }

  // 7. Inquiries
  for (const inq of INITIAL_INQUIRIES) {
    await prisma.inquiry.create({
      data: {
        name: inq.name,
        email: inq.email,
        phone: inq.phone,
        service: inq.service,
        date: inq.date,
        location: inq.location,
        budget: inq.budget,
        message: inq.message,
        status: inq.status,
      },
    });
  }

  // 8. Bookings
  for (const b of INITIAL_BOOKINGS) {
    await prisma.booking.create({
      data: {
        clientName: b.clientName,
        clientEmail: b.clientEmail,
        clientPhone: b.clientPhone,
        service: b.service,
        date: b.date,
        location: b.location,
        details: b.details,
        status: b.status,
      },
    });
  }

  console.log("Seeding successfully completed!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
