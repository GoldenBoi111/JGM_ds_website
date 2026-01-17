import * as React from "react";
import {
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeIcon from "@mui/icons-material/Code";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  content: React.ReactNode;
  category: string;
  author?: string;
  readTime?: string;
  tags?: string[];
}

const BlogPostCard: React.FC<{ post: BlogPost; onClick: () => void }> = ({
  post,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -8 }}
      className="cursor-pointer"
      onClick={onClick}>
      <Card className="h-full bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
        <div className="relative">
          <CardMedia
            component="img"
            height="200"
            image={post.image}
            alt={post.title}
            className="object-cover"
          />
          <div className="absolute top-4 right-4">
            <Chip
              label={post.category}
              size="small"
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
            />
          </div>
        </div>
        <CardContent className="p-6">
          <Typography
            variant="h6"
            component="h3"
            className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {post.description}
          </Typography>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
            <span>{post.date}</span>
            {post.readTime && <span>{post.readTime} read</span>}
          </div>

          {post.tags && (
            <div className="mt-3 flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  variant="outlined"
                  className="text-xs"
                />
              ))}
            </div>
          )}
        </CardContent>
        <CardActions className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Avatar sx={{ width: 32, height: 32, fontSize: "0.75rem" }}>
              {post.author?.charAt(0) || "A"}
            </Avatar>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {post.author || "Author"}
            </span>
          </div>
          <Button
            size="small"
            className="ml-auto text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}>
            Read More
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

const BlogPostDetail: React.FC<{ post: BlogPost; onBack: () => void }> = ({
  post,
  onBack,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto">
      <Button
        onClick={onBack}
        className="mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
        ← Back to Posts
      </Button>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="relative h-64 md:h-80">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white w-full">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Chip
                label={post.category}
                size="small"
                className="bg-white/20 backdrop-blur-sm text-white"
              />
              {post.tags &&
                post.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    className="bg-white/10 backdrop-blur-sm text-white border-white/30"
                  />
                ))}
            </div>
            <Typography
              variant="h4"
              component="h1"
              className="text-2xl md:text-3xl font-bold mb-2">
              {post.title}
            </Typography>
            <div className="flex items-center text-gray-200">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime} read</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <PersonIcon fontSize="small" className="mr-1" />
                <span>{post.author || "Anonymous"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">{post.content}</div>
      </div>
    </motion.div>
  );
};

interface PostsProps {
  selectedPost?: BlogPost;
  onPostSelect?: (post: BlogPost) => void;
  onBackToList?: () => void;
}

const Posts: React.FC<PostsProps> = ({
  selectedPost,
  onPostSelect,
  onBackToList,
}) => {
  const [selectedPostState, setSelectedPostState] =
    React.useState<BlogPost | null>(null);
  const [filter, setFilter] = React.useState<string>("all");

  React.useEffect(() => {
    if (selectedPost) {
      setSelectedPostState(selectedPost);
    }
  }, [selectedPost]);

  const handlePostClick = (post: BlogPost) => {
    if (onPostSelect) {
      onPostSelect(post);
    } else {
      setSelectedPostState(post);
    }
  };

  const handleBack = () => {
    if (onBackToList) {
      onBackToList();
    } else {
      setSelectedPostState(null);
    }
  };

  // Get unique categories for filtering
  const categories = [
    "all",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  // Filter posts based on selected category
  const filteredPosts =
    filter === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === filter);

  if (selectedPostState) {
    return <BlogPostDetail post={selectedPostState} onBack={handleBack} />;
  }

  return (
    <Container maxWidth="lg" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="text-center mb-12">
          <Typography
            variant="h2"
            component="h1"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Insights & Articles
          </Typography>
          <Typography
            variant="h5"
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Explore our latest thoughts on data science, AI, and web development
          </Typography>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "contained" : "outlined"}
                onClick={() => setFilter(category)}
                className="capitalize">
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.slug}>
              <BlogPostCard post={post} onClick={() => handlePostClick(post)} />
            </div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
};

export const blogPosts: BlogPost[] = [
  {
    slug: "data-analysis-peru",
    title: "Data Analysis on Peru Government Datasets",
    description:
      "An in-depth look at the data analysis performed on various datasets from the Peruvian government.",
    date: "September 2025",
    image:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: "Jane Smith",
    readTime: "8 min",
    tags: ["Data Science", "Government", "Analysis", "Peru"],
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/*<div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <BarChartIcon className="mr-2" /> Key Insights
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>87% data coverage achieved in the analysis</li>
            <li>92% accuracy rate in predictive models</li>
            <li>24% improvement in data processing efficiency</li>
          </ul>
        </div>*/}

        <div className="viz-row items-center gap-6 mb-6">
          <img
            src="https://al7dbmmmfb128wqh.public.blob.vercel-storage.com/Graph1.png"
            style={{ width: "70%", padding: "20px" }}
            alt="Correlation Heatmap"
            className="rounded-lg shadow"
          />
          <div>
            <strong>Visualization 1: Cross-Domain Correlation Heatmap</strong>{" "}
            <br />
            This chart helps us understand how different factors are connected
            to each other. Each square shows whether two things tend to increase
            together, move in opposite directions, or have little connection at
            all. Strong colors mean a stronger relationship, while lighter
            colors mean a weaker one. This visualization is useful for spotting
            patterns, such as which factors often go hand-in-hand and which ones
            may work against each other. It helps explain that education
            outcomes are influenced by multiple connected factors, not just one
            single issue.
          </div>
        </div>

        <div className="viz-row reverse items-center gap-6 mb-6">
          <img
            src="https://al7dbmmmfb128wqh.public.blob.vercel-storage.com/Graph2.png"
            style={{ width: "70%", padding: "20px" }}
            alt="Regional Overview Dashboard"
            className="rounded-lg shadow"
          />
          <div>
            <strong>Visualization 2: Regional Overview Dashboard</strong> <br />
            This dashboard gives a quick overall picture of how regions compare
            across several important areas. One chart shows which regions have
            the highest number of applicants, helping us see where participation
            is most concentrated. Another chart shows the overall balance
            between female and male participation. A third chart shows how
            education access scores are spread across regions, making it easy to
            see whether most regions are similar or very different from each
            other. The final chart shows how many regions fall into high-risk,
            medium-risk, or low-risk categories, helping decision-makers quickly
            understand where attention is most urgently needed.
          </div>
        </div>

        <div className="viz-row items-center gap-6 mb-6">
          <object
            data="https://al7dbmmmfb128wqh.public.blob.vercel-storage.com/Graph17.html"
            style={{ width: "70%", padding: "20px" }}
            className="rounded-lg shadow"
            type="text/html"
            title="Interactive Geographic Map"
          />
          <div>
            <strong>Visualization 3 — Geographic Distribution Map</strong>{" "}
            <br />
            This interactive map visualizes regional education indicators
            spatially using latitude and longitude. Bubble size represents
            overall scale (e.g., total applicants), while bubble color
            represents performance (e.g., education access score). The map makes
            it easier to spot geographic clustering—such as coastal vs. inland
            patterns or regional concentration—and helps validate whether
            high-performing or high-risk regions are geographically grouped.
            Because it is interactive, stakeholders can hover over a region to
            view key metrics and compare regions without needing to scan tables.
          </div>
        </div>

        <div className="viz-row reverse items-center gap-6 mb-6">
          <img
            src="https://al7dbmmmfb128wqh.public.blob.vercel-storage.com/Graph3.png"
            style={{ width: "70%", padding: "20px" }}
            alt="Key Feature Relationships (Scatter Analysis)"
            className="rounded-lg shadow"
          />
          <div>
            <strong>
              Visualization 4: Key Feature Relationships (Scatter Analysis)
            </strong>{" "}
            <br />
            These scatter plots focus on a few meaningful feature pairs to
            illustrate real-world relationships in the data. Each point
            represents a region, and the red dashed line shows the overall
            trend. The correlation value (r) provides a quick measure of how
            strong the relationship is. This helps separate "interesting but
            weak" relationships from strong drivers worth investigating. In
            practice, these charts are a sanity check for what the heatmap
            suggests and often reveal whether one dominant region or outlier is
            pulling the trend line.
          </div>
        </div>
      </div>
    ),
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
    author: "Alex Johnson",
    readTime: "6 min",
    tags: ["AI", "Chatbot", "Automation", "NLP"],
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Featured Insight:</strong> Our AI chatbot reduced chart
            generation time by 75% compared to manual creation.
          </p>
        </div>

        <Typography variant="body1">
          This post offers a technical deep-dive into one of our most exciting
          projects: an AI-powered chatbot capable of generating data
          visualizations from natural language queries. Imagine asking a
          chatbot, "Show me the sales trend for the last quarter," and instantly
          receiving a corresponding chart.
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Architecture Overview</h4>
            <List dense>
              <ListItem>
                <ListItemText primary="NLP Model for query understanding" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Data Processing Backend" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Visualization Engine" />
              </ListItem>
            </List>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Key Benefits</h4>
            <List dense>
              <ListItem>
                <ListItemText primary="Reduced manual effort" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Faster insights" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Democratized data access" />
              </ListItem>
            </List>
          </div>
        </div>

        <Typography variant="body1">
          We'll explore the architecture behind this system, which combines a
          Natural Language Processing (NLP) model to interpret user requests
          with a data processing backend that interfaces with various data
          sources. The front-end component then dynamically renders the
          appropriate charts using a library like D3.js or Chart.js.
        </Typography>

        <Typography variant="body1">
          This article will cover the core components, the machine learning
          models involved, and the integration process required to create a
          seamless and intuitive data exploration tool.
        </Typography>
      </div>
    ),
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
    author: "Maria Rodriguez",
    readTime: "7 min",
    tags: ["Education", "Social Impact", "Data Science"],
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex-1 min-w-[200px]">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              15%
            </div>
            <div className="text-sm text-red-800 dark:text-red-200">
              Dropout Rate
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex-1 min-w-[200px]">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              85%
            </div>
            <div className="text-sm text-green-800 dark:text-green-200">
              Retention Rate
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex-1 min-w-[200px]">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              40%
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-200">
              Improvement
            </div>
          </div>
        </div>

        <Typography variant="body1">
          School dropout rates represent a significant challenge for educational
          systems worldwide. In this analysis, we take a data-driven approach to
          understand the multifaceted issue of student attrition. By examining a
          wide range of factors—including socioeconomic status, academic
          performance, and school resources—we aim to identify the key
          predictors of dropout.
        </Typography>

        <Accordion className="my-4">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="bg-gray-50 dark:bg-gray-900 rounded-lg">
            <Typography className="font-semibold">Key Risk Factors</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: "background.paper", color: "error.main" }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Socioeconomic Status"
                  secondary="Family income and educational background significantly impact retention"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: "background.paper", color: "info.main" }}>
                    <BarChartIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Academic Performance"
                  secondary="Early indicators of struggle can predict dropout risk"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: "background.paper", color: "success.main" }}>
                    <CodeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="School Resources"
                  secondary="Access to support services affects student outcomes"
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Typography variant="body1">
          Using statistical models and machine learning algorithms, we analyzed
          longitudinal student data to uncover patterns and risk factors. Our
          goal is to move beyond correlation and identify causal links that can
          inform effective, targeted intervention strategies.
        </Typography>

        <Typography variant="body1">
          This post will detail our analytical process, present our findings on
          the most significant contributing factors, and discuss potential
          data-informed policies that could help improve student retention and
          success.
        </Typography>
      </div>
    ),
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
    author: "David Chen",
    readTime: "5 min",
    tags: ["Education", "Metrics", "Quality", "Social Impact"],
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <Typography variant="body1">
          What does "education quality" truly mean, and how can we measure it
          effectively? This question is at the heart of improving educational
          outcomes. This article explores the various dimensions of education
          quality and the data we can use to assess them.
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-lg mb-3 text-center">
              Traditional Metrics
            </h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Standardized test scores</li>
              <li>Graduation rates</li>
              <li>Teacher qualifications</li>
              <li>Classroom size</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-lg mb-3 text-center">
              Holistic Metrics
            </h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Student engagement levels</li>
              <li>Teacher effectiveness</li>
              <li>Curriculum relevance</li>
              <li>Learning environment</li>
            </ul>
          </div>
        </div>

        <Typography variant="body1">
          We move beyond traditional metrics like standardized test scores to
          consider a more holistic view that includes student engagement,
          teacher effectiveness, curriculum relevance, and the learning
          environment. We'll discuss different methodologies for collecting and
          analyzing data on these fronts, from student surveys to classroom
          observation data.
        </Typography>

        <Typography variant="body1">
          Our exploration aims to provide a framework for a more nuanced and
          comprehensive understanding of education quality, enabling educators
          and policymakers to make more informed decisions.
        </Typography>
      </div>
    ),
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
    author: "Sarah Williams",
    readTime: "4 min",
    tags: ["Social Impact", "Child Welfare", "Policy"],
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <Typography variant="body1">
          The Child Development Index (CDI) is a crucial tool for tracking and
          understanding the well-being of children across different populations.
          It provides a composite measure that reflects key aspects of a child's
          life, offering a powerful lens through which to view societal
          progress.
        </Typography>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 my-6">
          <h4 className="font-bold text-lg mb-4 text-center">
            Core Components of the CDI
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                Health
              </div>
              <p className="text-sm mt-2">Under-five mortality rates</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Education
              </div>
              <p className="text-sm mt-2">Enrollment and completion rates</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                Nutrition
              </div>
              <p className="text-sm mt-2">Malnutrition statistics</p>
            </div>
          </div>
        </div>

        <Typography variant="body1">
          In this post, we break down the three core components of the CDI:
          health, education, and nutrition. We'll explain how each component is
          measured—from under-five mortality rates to school enrollment and
          malnutrition statistics—and how they are combined to form a single,
          comprehensive index.
        </Typography>

        <Typography variant="body1">
          Understanding the CDI is essential for anyone interested in child
          welfare, international development, and public policy. Join us as we
          explain what this important metric tells us about the state of
          childhood around the world.
        </Typography>
      </div>
    ),
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
    author: "Michael Brown",
    readTime: "10 min",
    tags: ["Web Development", "Design", "React", "TypeScript"],
    content: (
      <article className="max-w-3xl mx-auto">
        <section className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-lg">
          <Typography
            variant="h4"
            component="h2"
            className="text-xl font-bold mb-3 flex items-center">
            <CodeIcon className="mr-2 text-blue-500" /> From Concept to
            Wireframes
          </Typography>
          <br></br>
          <Typography variant="body1" className="mb-4">
            Every strong website begins with clarity. We started with wireframes
            and design mockups to map out layout, user flow, and content
            structure. This phase helped transform abstract ideas into something
            tangible before any development began.
          </Typography>
          <Typography variant="body1">
            From day one, the goal was simple: build a site that feels modern,
            intuitive, and ready to grow with the brand.
          </Typography>
          <br></br>
          <Typography
            variant="h4"
            component="h2"
            className="text-xl font-bold mb-3 flex items-center">
            <CodeIcon className="mr-2 text-blue-500" /> Tech Stack Selection
          </Typography>
          <br></br>
          <Typography variant="body1" className="mb-4">
            The front end was built using <strong>React</strong> and
            <strong> TypeScript</strong> to create a scalable, maintainable
            architecture. This stack gave us confidence to move fast without
            sacrificing long-term stability.
          </Typography>
          <Typography variant="body1">
            Styling was handled with <strong>Tailwind CSS</strong>, while
            <strong> Framer Motion</strong> added subtle, purposeful animations
            that improve the overall user experience without overwhelming it.
          </Typography>
          <br></br>
          <Typography
            variant="h4"
            component="h2"
            className="text-xl font-bold mb-3 flex items-center">
            <CodeIcon className="mr-2 text-blue-500" /> Design Principles
          </Typography>
          <br></br>
          <ul className="pl-5 mb-4 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Accessibility for all users</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Fast load times and optimized performance</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Scalable architecture for future growth</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Secure development and data protection best practices</span>
            </li>
          </ul>
          <Typography variant="body1">
            These principles guided every design and development decision,
            especially when trade-offs were necessary.
          </Typography>
          <br></br>
          <Typography
            variant="h4"
            component="h2"
            className="text-xl font-bold mb-3 flex items-center">
            <CodeIcon className="mr-2 text-blue-500" /> Technical Challenges
          </Typography>
          <br></br>
          <Typography variant="body1" className="mb-4">
            Building a real-world production site comes with challenges. We
            addressed responsive layouts across devices, optimized complex
            animations, integrated third-party APIs, and ensured consistent
            behavior across browsers.
          </Typography>
          <Typography variant="body1">
            Each obstacle was an opportunity to refine the codebase and improve
            the final experience.
          </Typography>
          <br></br>
          <Typography
            variant="h4"
            component="h2"
            className="text-xl font-bold mb-3 flex items-center">
            <CodeIcon className="mr-2 text-blue-500" /> Development Process
          </Typography>
          <br></br>
          <Typography variant="body1" className="mb-4">
            The project followed an agile workflow, allowing features to be
            built, tested, and refined in short cycles. This made it easier to
            adapt and improve continuously.
          </Typography>
          <Typography variant="body1">
            One key lesson stood out: great web development is less about tools
            and more about understanding users and building experiences that
            genuinely help them.
          </Typography>
          <br></br>
          <Typography
            variant="h4"
            component="h2"
            className="text-xl font-bold mb-3 flex items-center">
            <CodeIcon className="mr-2 text-blue-500" /> Future Plans
          </Typography>
          <br></br>
          <ul className="pl-5 mb-4 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">→</span>
              <span>Advanced analytics and user behavior tracking</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">→</span>
              <span>Improved accessibility features</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">→</span>
              <span>Further performance optimizations</span>
            </li>
          </ul>
          <Typography variant="body1">
            These enhancements will help us better understand our audience and
            continue refining the experience.
          </Typography>
          <br></br>
          <Typography
            variant="h4"
            component="h2"
            className="text-xl font-bold mb-3 flex items-center">
            <CodeIcon className="mr-2 text-blue-500" /> Final Thoughts
          </Typography>
          <br></br>
          <Typography variant="body1" className="mb-4">
            Building the JGM Innovation website was both challenging and deeply
            rewarding. Seeing everything come together made every design tweak
            and late-night bug fix worthwhile.
          </Typography>
          <Typography variant="body1">
            With modern technology, thoughtful design, and an iterative mindset,
            we've built a website that truly reflects our vision—and one that's
            ready for what comes next.
          </Typography>
        </section>
      </article>
    ),
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
    author: "Tech Team",
    readTime: "9 min",
    tags: ["Web Development", "Performance", "Optimization", "Security"],
    content: (
      <article className="max-w-3xl mx-auto">
        <header className="mb-10 p-6 bg-white dark:bg-gray-900 rounded-xl">
          <Typography
            variant="h2"
            component="h2"
            className="text-2xl font-bold mb-3">
            Pushing the JGM Innovation Website Further
          </Typography>
          <Typography variant="body1" className="opacity-85">
            After shipping the initial version, we kept going. This update
            focuses on performance, advanced features, and the engineering
            decisions that made the platform faster, more secure, and easier to
            evolve.
          </Typography>
        </header>

        <section className="mb-12 p-6 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <Typography
            variant="h4"
            component="h3"
            className="text-xl font-bold mb-3 flex items-center">
            <BarChartIcon className="mr-2 text-green-500" /> Performance,
            Refined
          </Typography>
          <Typography variant="body1" className="mb-4">
            Performance became a deliberate design constraint. We introduced
            code splitting with React's lazy loading to reduce initial bundle
            size and improve time-to-interactive.
          </Typography>
          <Typography variant="body1">
            A custom <strong>LazyImage</strong> component ensures images load
            only when they enter the viewport—saving bandwidth and keeping the
            experience smooth across devices.
          </Typography>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700">
            <Typography
              variant="h4"
              component="h3"
              className="text-xl font-bold mb-3 flex items-center">
              <CodeIcon className="mr-2 text-blue-500" /> Features That Stay Out
              of the Way
            </Typography>
            <Typography variant="body1">
              We added Progressive Web App features to make the site feel
              reliable and app-like without adding complexity.
            </Typography>
            <Typography variant="body1">
              Offline support, push notifications, and home-screen installation
              work quietly in the background—ready when users need them.
            </Typography>
          </div>

          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700">
            <Typography
              variant="h4"
              component="h3"
              className="text-xl font-bold mb-3 flex items-center">
              <CodeIcon className="mr-2 text-blue-500" /> Accessibility Isn't
              Optional
            </Typography>
            <Typography variant="body1">
              Semantic HTML, ARIA attributes, keyboard navigation, and screen
              reader support were built in from the start—not patched on later.
            </Typography>
            <Typography variant="body1">
              The result is a site that's more inclusive, more usable, and more
              resilient.
            </Typography>
          </div>
        </section>

        <section className="mb-12 p-8 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <Typography
            variant="h4"
            component="h3"
            className="text-xl font-bold mb-3 flex items-center">
            <BarChartIcon className="mr-2 text-green-500" /> Learning From Real
            Usage
          </Typography>
          <Typography variant="body1">
            We integrated analytics across the platform to understand how people
            actually use it. User journeys, engagement patterns, performance
            metrics, and error tracking help us iterate with confidence.
          </Typography>
          <Typography variant="body1">
            These insights keep decisions grounded in real behavior instead of
            assumptions.
          </Typography>
        </section>

        <section className="mb-12 p-6 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <Typography
            variant="h4"
            component="h3"
            className="text-xl font-bold mb-3 flex items-center">
            <CodeIcon className="mr-2 text-blue-500" /> Security, by Default
          </Typography>
          <Typography variant="body1">
            Security is woven into the architecture. A strict Content Security
            Policy helps prevent XSS attacks, while authenticated APIs, input
            validation, and encrypted communication protect user data.
          </Typography>
          <Typography variant="body1">
            Secure session management ensures the platform remains trustworthy
            at scale.
          </Typography>
        </section>

        <section className="mb-16 p-6 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <Typography
            variant="h4"
            component="h3"
            className="text-xl font-bold mb-3 flex items-center">
            <BarChartIcon className="mr-2 text-green-500" /> Where We're Headed
            Next
          </Typography>
          <Typography variant="body1">
            We're exploring AI-driven personalization, intelligent search, and
            richer interactive features like real-time collaboration and
            customizable dashboards.
          </Typography>
          <Typography variant="body1">
            The goal is simple: build a platform that adapts to users instead of
            forcing users to adapt to it.
          </Typography>
        </section>

        <footer className="opacity-80 text-sm p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          The JGM Innovation website continues to evolve through thoughtful
          iteration. Performance, security, and user experience guide every
          decision—keeping the platform fast, flexible, and future-ready.
        </footer>
      </article>
    ),
    category: "Web Development",
  },
];

export default Posts;
