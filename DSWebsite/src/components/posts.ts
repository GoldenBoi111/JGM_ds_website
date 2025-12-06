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
    content: `In this project, we embarked on a comprehensive data analysis initiative focused on various public datasets released by the Peruvian government. Our primary objective was to uncover meaningful insights into public spending, service efficiency, and socio-economic trends across different regions of Peru.

Utilizing a combination of Python libraries such as Pandas, Matplotlib, and Seaborn, we processed and cleaned large volumes of data related to national budgets, healthcare services, and educational metrics. The analysis involved statistical modeling and data visualization techniques to identify patterns and correlations that were not immediately apparent.

The findings from this analysis have been instrumental in providing a clearer picture of the challenges and opportunities within the public sector. This post will walk you through our methodology, the key discoveries we made, and the potential implications for policy-making and citizen engagement in Peru.`,
    category: "Data Science",
  },
  {
    slug: "website-design",
    title: "Website Design and Implementation",
    description:
      "The journey of designing and implementing this very website, from concept to deployment.",
    date: "October 2025",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: `The creation of the JGM Innovation website was a journey from a simple concept to a fully functional, dynamic web application. This article provides a behind-the-scenes look at the entire process, from initial wireframing and design mockups to the final implementation and deployment.

We chose a modern tech stack centered around React and TypeScript to ensure a robust and scalable front-end architecture. For styling, we leveraged Tailwind CSS for its utility-first approach, allowing for rapid and consistent UI development. The site also incorporates interactive elements and animations powered by Framer Motion to create an engaging user experience.

Join us as we explore the design principles that guided our decisions, the technical challenges we overcame, and the lessons we learned while bringing this website to life.`,
    category: "Web Development",
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
];
