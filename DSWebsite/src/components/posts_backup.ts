export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  content: string; // This could be markdown or JSX
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "data-analysis-peru",
    title: "Data Analysis on Peru Government Datasets",
    description:
      "An in-depth look at the data analysis performed on various datasets from the Peruvian government.",
    date: "September 2025",
    image:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `
    <div class="viz-row">
    <img src="/src/assets/Graph1.png" style="width:70%; padding:20px;" alt="Correlation Heatmap">
    <div> <strong>Visualization 1: Cross-Domain Correlation Heatmap</strong> <br>
This chart helps us understand how different factors are connected to each other. Each square 
shows whether two things tend to increase together, move in opposite directions, or have little 
connection at all. Strong colors mean a stronger relationship, while lighter colors mean a weaker 
one. This visualization is useful for spotting patterns, such as which factors often go 
hand-in-hand and which ones may work against each other. It helps explain that education 
outcomes are influenced by multiple connected factors, not just one single issue. 
</div>
</div>
<br>
<div class="viz-row reverse">
<img src="/src/assets/Graph2.png" style="width:70%; padding:20px;" alt="Regional Overview Dashboard">
<div> <strong>Visualization 2: Regional Overview Dashboard</strong> <br>This dashboard gives a quick overall picture of how regions compare across several important 
areas. One chart shows which regions have the highest number of applicants, helping us see 
where participation is most concentrated. Another chart shows the overall balance between 
female and male participation. A third chart shows how education access scores are spread 
across regions, making it easy to see whether most regions are similar or very different from each 
other. The final chart shows how many regions fall into high-risk, medium-risk, or low-risk 
categories, helping decision-makers quickly understand where attention is most urgently needed. 
</div>
</div>
<br>
<div class="viz-row">
<embed src="/src/assets/Graph17.html" style="width:70%; padding:20px;" alt="Interactive Geographic Map">
<div> <strong>Visualization 3 — Geographic Distribution Map</strong> <br>
This interactive map visualizes 
regional education indicators spatially using latitude and longitude. Bubble size represents 
overall scale (e.g., total applicants), while bubble color represents performance (e.g., education 
access score). The map makes it easier to spot geographic clustering—such as coastal vs. inland 
patterns or regional concentration—and helps validate whether high-performing or high-risk 
regions are geographically grouped. Because it is interactive, stakeholders can hover over a 
region to view key metrics and compare regions without needing to scan tables.  
</div>
</div>
<br>
<div class="viz-row reverse">
<img src="/src/assets/Graph3.png" style="width:70%; padding:20px;" alt="Key Feature Relationships (Scatter Analysis)">
<div> <strong>Visualization 4: Key Feature Relationships (Scatter Analysis)</strong> <br>
These scatter plots focus on a few meaningful feature pairs to illustrate real-world relationships in the data. Each point represents a 
region, and the red dashed line shows the overall trend. The correlation value (r) provides a quick 
measure of how strong the relationship is. This helps separate “interesting but weak” 
relationships from strong drivers worth investigating. In practice, these charts are a sanity check 
for what the heatmap suggests and often reveal whether one dominant region or outlier is pulling 
the trend line.
</div>
</div>

    `,
    category: "Data Science",
  },
  {
    slug: "ai-chatbot-integration",
    title: "AI Chatbot Integration for Automated Chart Generation",
    description:
      "Exploring the integration of an AI-powered chatbot capable of generating charts from user queries.",
    date: "November 2025",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `This post offers a technical deep-dive into one of our most exciting projects: an AI-powered chatbot capable of generating data visualizations from natural language queries. Imagine asking a chatbot, "Show me the sales trend for the last quarter," and instantly receiving a corresponding chart.

We'll explore the architecture behind this system, which combines a Natural Language Processing (NLP) model to interpret user requests with a data processing backend that interfaces with various data sources. The front-end component then dynamically renders the appropriate charts using a library like D3.js or Chart.js.

This article will cover the core components, the machine learning models involved, and the integration process required to create a seamless and intuitive data exploration tool.`,
    category: "AI",
  },
  {
    slug: "school-dropout-rates",
    title: "Analyzing School Dropout Rates",
    description:
      "A deep dive into the factors contributing to school dropout rates and potential data-driven solutions.",
    date: "December 2025",
    image:
      "https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0=",
    content: `School dropout rates represent a significant challenge for educational systems worldwide. In this analysis, we take a data-driven approach to understand the multifaceted issue of student attrition. By examining a wide range of factors—including socioeconomic status, academic performance, and school resources—we aim to identify the key predictors of dropout.

Using statistical models and machine learning algorithms, we analyzed longitudinal student data to uncover patterns and risk factors. Our goal is to move beyond correlation and identify causal links that can inform effective, targeted intervention strategies.

This post will detail our analytical process, present our findings on the most significant contributing factors, and discuss potential data-informed policies that could help improve student retention and success.`,
    category: "Data Science",
  },
  {
    slug: "education-quality",
    title: "Measuring Education Quality",
    description:
      "How can we quantify and measure the quality of education? This post explores various metrics and data points.",
    date: "January 2026",
    image:
      "https://images.pexels.com/photos/8422129/pexels-photo-8422129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `What does "education quality" truly mean, and how can we measure it effectively? This question is at the heart of improving educational outcomes. This article explores the various dimensions of education quality and the data we can use to assess them.

We move beyond traditional metrics like standardized test scores to consider a more holistic view that includes student engagement, teacher effectiveness, curriculum relevance, and the learning environment. We'll discuss different methodologies for collecting and analyzing data on these fronts, from student surveys to classroom observation data.

Our exploration aims to provide a framework for a more nuanced and comprehensive understanding of education quality, enabling educators and policymakers to make more informed decisions.`,
    category: "Social Impact",
  },
  {
    slug: "child-development-index",
    title: "The Child Development Index Explained",
    description:
      "An overview of the Child Development Index and its importance in tracking the well-being of children.",
    date: "February 2026",
    image:
      "https://images.pexels.com/photos/4145146/pexels-photo-4145146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `The Child Development Index (CDI) is a crucial tool for tracking and understanding the well-being of children across different populations. It provides a composite measure that reflects key aspects of a child's life, offering a powerful lens through which to view societal progress.

In this post, we break down the three core components of the CDI: health, education, and nutrition. We'll explain how each component is measured—from under-five mortality rates to school enrollment and malnutrition statistics—and how they are combined to form a single, comprehensive index.

Understanding the CDI is essential for anyone interested in child welfare, international development, and public policy. Join us as we explain what this important metric tells us about the state of childhood around the world.`,
    category: "Social Impact",
  },
  {
    slug: "website-design-and-implementation",
    title: "Website Design and Implementation",
    description:
      "The journey from concept to a fully functional, dynamic web application.",
    date: "October 2025",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `<article style="max-width:900px;margin:0 auto;padding:48px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;line-height:1.7;">

  <section style="border:1px solid;border-radius:16px;padding:32px;margin-bottom:32px;box-shadow:0 10px 30px rgba(0,0,0,0.35);">
    <h2 style="font-size:28px;margin-bottom:12px;">
      From Concept to Wireframes
    </h2>
    <p style="margin-bottom:16px;font-size:16px;">
      Every strong website begins with clarity. We started with wireframes and design mockups to map out layout,
      user flow, and content structure. This phase helped transform abstract ideas into something tangible
      before any development began.
    </p>
    <p style="font-size:16px;">
      From day one, the goal was simple: build a site that feels modern, intuitive, and ready to grow with the brand.
    </p>
  </section>

  <section style="border:1px solid;border-radius:16px;padding:32px;margin-bottom:32px;box-shadow:0 10px 30px rgba(0,0,0,0.35);">
    <h2 style="font-size:28px;margin-bottom:12px;">
      Choosing a Modern Web Development Tech Stack
    </h2>
    <p style="margin-bottom:16px;font-size:16px;">
      The front end was built using <strong>React</strong> and
      <strong>TypeScript</strong> to create a scalable, maintainable architecture.
      This stack gave us confidence to move fast without sacrificing long-term stability.
    </p>
    <p style="font-size:16px;">
      Styling was handled with <strong>Tailwind CSS</strong>, while
      <strong>Framer Motion</strong> added subtle, purposeful animations that improve
      the overall user experience without overwhelming it.
    </p>
  </section>

  <section style="border:1px solid;border-radius:16px;padding:32px;margin-bottom:32px;box-shadow:0 10px 30px rgba(0,0,0,0.35);">
    <h2 style="font-size:28px;margin-bottom:12px;">
      Design Principles That Shaped the Website
    </h2>
    <ul style="padding-left:20px;margin-bottom:16px;">
      <li style="margin-bottom:8px;">Accessibility for all users</li>
      <li style="margin-bottom:8px;">Fast load times and optimized performance</li>
      <li style="margin-bottom:8px;">Scalable architecture for future growth</li>
      <li style="margin-bottom:8px;">Secure development and data protection best practices</li>
    </ul>
    <p style="font-size:16px;">
      These principles guided every design and development decision, especially when trade-offs were necessary.
    </p>
  </section>

  <section style="border:1px solid;border-radius:16px;padding:32px;margin-bottom:32px;box-shadow:0 10px 30px rgba(0,0,0,0.35);">
    <h2 style="font-size:28px;margin-bottom:12px;">
      Technical Challenges and Problem Solving
    </h2>
    <p style="margin-bottom:16px;font-size:16px;">
      Building a real-world production site comes with challenges. We addressed responsive layouts across devices,
      optimized complex animations, integrated third-party APIs, and ensured consistent behavior across browsers.
    </p>
    <p style="font-size:16px;">
      Each obstacle was an opportunity to refine the codebase and improve the final experience.
    </p>
  </section>

  <section style="border:1px solid;border-radius:16px;padding:32px;margin-bottom:32px;box-shadow:0 10px 30px rgba(0,0,0,0.35);">
    <h2 style="font-size:28px;margin-bottom:12px;">
      An Agile and Iterative Development Process
    </h2>
    <p style="margin-bottom:16px;font-size:16px;">
      The project followed an agile workflow, allowing features to be built, tested, and refined in short cycles.
      This made it easier to adapt and improve continuously.
    </p>
    <p style="font-size:16px;">
      One key lesson stood out: great web development is less about tools and more about understanding users
      and building experiences that genuinely help them.
    </p>
  </section>

  <section style="border:1px solid;border-radius:16px;padding:32px;margin-bottom:32px;box-shadow:0 10px 30px rgba(0,0,0,0.35);">
    <h2 style="font-size:28px;margin-bottom:12px;">
      What’s Next for the JGM Innovation Website
    </h2>
    <ul style="padding-left:20px;margin-bottom:16px;">
      <li style="margin-bottom:8px;">Advanced analytics and user behavior tracking</li>
      <li style="margin-bottom:8px;">Improved accessibility features</li>
      <li style="margin-bottom:8px;">Further performance optimizations</li>
    </ul>
    <p style="font-size:16px;">
      These enhancements will help us better understand our audience and continue refining the experience.
    </p>
  </section>

  <section style="border:1px solid;border-radius:16px;padding:32px;box-shadow:0 10px 30px rgba(0,0,0,0.35);">
    <h2 style="font-size:28px;margin-bottom:12px;">
      Final Thoughts
    </h2>
    <p style="margin-bottom:16px;font-size:16px;">
      Building the JGM Innovation website was both challenging and deeply rewarding. Seeing everything come together
      made every design tweak and late-night bug fix worthwhile.
    </p>
    <p style="font-size:16px;">
      With modern technology, thoughtful design, and an iterative mindset, we’ve built a website that truly reflects
      our vision—and one that’s ready for what comes next.
    </p>
  </section>

</article>

`,
    category: "Web Development",
  },
  {
    slug: "advanced-features-and-optimizations",
    title: "Advanced Features and Optimizations",
    description:
      "Deep dive into the advanced features and performance optimizations implemented in the JGM Innovation website.",
    date: "November 2025",
    image:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `<article style="
  max-width:880px;
  margin:0 auto;
  padding:72px 24px;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;
  line-height:1.75;
  letter-spacing:-0.01em;
">

  <!-- HERO -->
  <header style="margin-bottom:80px;">
    <h2 style="
      font-size:40px;
      line-height:1.15;
      margin-bottom:20px;
      max-width:780px;
    ">
      Pushing the JGM Innovation Website Further
    </h2>
    <p style="
      font-size:20px;
      max-width:720px;
      opacity:0.85;
    ">
      After shipping the initial version, we kept going. This update focuses on performance,
      advanced features, and the engineering decisions that made the platform faster,
      more secure, and easier to evolve.
    </p>
  </header>

  <!-- SECTION -->
  <section style="margin-bottom:72px;">
    <h3 style="font-size:26px;margin-bottom:14px;">
      Performance, Refined
    </h3>
    <p style="font-size:16px;margin-bottom:18px;max-width:720px;">
      Performance became a deliberate design constraint. We introduced code splitting with
      React’s lazy loading to reduce initial bundle size and improve time-to-interactive.
    </p>
    <p style="font-size:16px;max-width:720px;">
      A custom <strong>LazyImage</strong> component ensures images load only when they enter
      the viewport—saving bandwidth and keeping the experience smooth across devices.
    </p>
  </section>

  <!-- SPLIT SECTION -->
  <section style="
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:48px;
    margin-bottom:72px;
  ">
    <div>
      <h3 style="font-size:26px;margin-bottom:14px;">
        Features That Stay Out of the Way
      </h3>
      <p style="font-size:16px;margin-bottom:16px;">
        We added Progressive Web App features to make the site feel reliable and app-like
        without adding complexity.
      </p>
      <p style="font-size:16px;">
        Offline support, push notifications, and home-screen installation work quietly in
        the background—ready when users need them.
      </p>
    </div>

    <div>
      <h3 style="font-size:26px;margin-bottom:14px;">
        Accessibility Isn’t Optional
      </h3>
      <p style="font-size:16px;margin-bottom:16px;">
        Semantic HTML, ARIA attributes, keyboard navigation, and screen reader support
        were built in from the start—not patched on later.
      </p>
      <p style="font-size:16px;">
        The result is a site that’s more inclusive, more usable, and more resilient.
      </p>
    </div>
  </section>

  <!-- FULL WIDTH CALL OUT -->
  <section style="
    margin-bottom:72px;
    padding:40px;
    border-radius:20px;
    backdrop-filter:blur(6px);
  ">
    <h3 style="font-size:26px;margin-bottom:14px;">
      Learning From Real Usage
    </h3>
    <p style="font-size:16px;margin-bottom:16px;max-width:760px;">
      We integrated analytics across the platform to understand how people actually use it.
      User journeys, engagement patterns, performance metrics, and error tracking help us
      iterate with confidence.
    </p>
    <p style="font-size:16px;max-width:760px;">
      These insights keep decisions grounded in real behavior instead of assumptions.
    </p>
  </section>

  <!-- SECURITY -->
  <section style="margin-bottom:72px;">
    <h3 style="font-size:26px;margin-bottom:14px;">
      Security, by Default
    </h3>
    <p style="font-size:16px;margin-bottom:16px;max-width:720px;">
      Security is woven into the architecture. A strict Content Security Policy helps prevent
      XSS attacks, while authenticated APIs, input validation, and encrypted communication
      protect user data.
    </p>
    <p style="font-size:16px;max-width:720px;">
      Secure session management ensures the platform remains trustworthy at scale.
    </p>
  </section>

  <!-- ROADMAP -->
  <section style="margin-bottom:88px;">
    <h3 style="font-size:26px;margin-bottom:14px;">
      Where We’re Headed Next
    </h3>
    <p style="font-size:16px;margin-bottom:16px;max-width:720px;">
      We’re exploring AI-driven personalization, intelligent search, and richer interactive
      features like real-time collaboration and customizable dashboards.
    </p>
    <p style="font-size:16px;max-width:720px;">
      The goal is simple: build a platform that adapts to users instead of forcing users
      to adapt to it.
    </p>
  </section>

  <!-- CLOSE -->
  <footer style="
    font-size:15px;
    max-width:720px;
    opacity:0.8;
  ">
    The JGM Innovation website continues to evolve through thoughtful iteration.
    Performance, security, and user experience guide every decision—keeping the platform
    fast, flexible, and future-ready.
  </footer>

</article>
`,
    category: "Web Development",
  },
];
