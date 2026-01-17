import * as React from "react";
import {
  CardContent,
  CardMedia,
  CardHeader,
  Typography,
  Paper,
  Divider,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Brain,
  Globe,
  BarChart3,
  Code,
  Zap,
  Shield,
  Lock,
  Users,
  Heart,
  BookOpen,
  Target,
  Lightbulb,
  Award,
  Clock,
} from "lucide-react";

// Enhanced components for blog posts
interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={className}>
    {children}
  </motion.div>
);

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  delay = 0,
}) => (
  <AnimatedCard delay={delay} className="h-full">
    <div className="h-full bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
          {icon}
        </div>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          className="text-lg font-semibold text-white">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="text-white">
          {description}
        </Typography>
      </CardContent>
    </div>
  </AnimatedCard>
);

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
}

const StatCard: React.FC<StatCardProps> = ({ value, label, icon, trend }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex justify-between items-start">
      <div>
        <Typography
          variant="h4"
          component="div"
          className="text-2xl font-bold text-white">
          {value}
        </Typography>
        <Typography
          variant="body2"
          className="text-white mt-1">
          {label}
        </Typography>
      </div>
      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {icon}
      </div>
    </div>
    {trend && (
      <div
        className={`flex items-center mt-2 ${
          trend === "up" ? "text-white" : "text-white"
        }`}>
        {trend === "up" ? (
          <TrendingUp size={16} />
        ) : (
          <TrendingUp size={16} className="rotate-180" />
        )}
        <span className="ml-1 text-sm font-medium">
          {trend === "up" ? "Increased" : "Decreased"}
        </span>
      </div>
    )}
  </motion.div>
);


export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  content: React.ReactNode; // Changed to ReactNode to support JSX
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
    content: (
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}>
              <Typography
                variant="h3"
                component="h1"
                className="text-3xl md:text-4xl font-bold text-white mb-4">
                Data Analysis on Peru Government Datasets
              </Typography>
              <div className="w-24 h-1 bg-gray-300 dark:bg-gray-600 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <AnimatedCard delay={0.1}>
              <div className="h-full bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <CardMedia
                  component="img"
                  height="200"
                  image="https://al7dbmmmfb128wqh.public.blob.vercel-storage.com/Graph1.png"
                  alt="Correlation Heatmap"
                  className="object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <BarChart3 className="text-white mr-2" size={24} />
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-xl font-bold text-white">
                      Cross-Domain Correlation Heatmap
                    </Typography>
                  </div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-white">
                    This chart helps us understand how different factors are
                    connected to each other. Each square shows whether two
                    things tend to increase together, move in opposite
                    directions, or have little connection at all. Strong colors
                    mean a stronger relationship, while lighter colors mean a
                    weaker one. This visualization is useful for spotting
                    patterns, such as which factors often go hand-in-hand and
                    which ones may work against each other. It helps explain
                    that education outcomes are influenced by multiple connected
                    factors, not just one single issue.
                  </Typography>
                </CardContent>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <div className="h-full bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <CardMedia
                  component="img"
                  height="200"
                  image="https://al7dbmmmfb128wqh.public.blob.vercel-storage.com/Graph2.png"
                  alt="Regional Overview Dashboard"
                  className="object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Globe className="text-white mr-2" size={24} />
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-xl font-bold text-white">
                      Regional Overview Dashboard
                    </Typography>
                  </div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-white">
                    This dashboard gives a quick overall picture of how regions
                    compare across several important areas. One chart shows
                    which regions have the highest number of applicants, helping
                    us see where participation is most concentrated. Another
                    chart shows the overall balance between female and male
                    participation. A third chart shows how education access
                    scores are spread across regions, making it easy to see
                    whether most regions are similar or very different from each
                    other. The final chart shows how many regions fall into
                    high-risk, medium-risk, or low-risk categories, helping
                    decision-makers quickly understand where attention is most
                    urgently needed.
                  </Typography>
                </CardContent>
              </div>
            </AnimatedCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <AnimatedCard delay={0.3}>
              <div className="h-full bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Globe className="text-white mr-2" size={24} />
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-xl font-bold text-white">
                      Geographic Distribution Map
                    </Typography>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src="https://al7dbmmmfb128wqh.public.blob.vercel-storage.com/Graph27.png"
                      className="w-full h-64"
                      alt="Interactive Geographic Map"
                    />
                  </div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="mt-4 text-white">
                    This interactive map visualizes regional education
                    indicators spatially using latitude and longitude. Bubble
                    size represents overall scale (e.g., total applicants),
                    while bubble color represents performance (e.g., education
                    access score). The map makes it easier to spot geographic
                    clustering—such as coastal vs. inland patterns or regional
                    concentration—and helps validate whether high-performing or
                    high-risk regions are geographically grouped. Because it is
                    interactive, stakeholders can hover over a region to view
                    key metrics and compare regions without needing to scan
                    tables.
                  </Typography>
                </CardContent>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <div className="h-full bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <CardMedia
                  component="img"
                  height="200"
                  image="https://al7dbmmmfb128wqh.public.blob.vercel-storage.com/Graph3.png"
                  alt="Key Feature Relationships (Scatter Analysis)"
                  className="object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="text-white mr-2" size={24} />
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-xl font-bold text-white">
                      Key Feature Relationships (Scatter Analysis)
                    </Typography>
                  </div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-white">
                    These scatter plots focus on a few meaningful feature pairs
                    to illustrate real-world relationships in the data. Each
                    point represents a region, and the red dashed line shows the
                    overall trend. The correlation value (r) provides a quick
                    measure of how strong the relationship is. This helps
                    separate "interesting but weak" relationships from strong
                    drivers worth investigating. In practice, these charts are a
                    sanity check for what the heatmap suggests and often reveal
                    whether one dominant region or outlier is pulling the trend
                    line.
                  </Typography>
                </CardContent>
              </div>
            </AnimatedCard>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="my-12">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
              <Typography
                variant="h5"
                component="h3"
                className="text-2xl font-bold text-white mb-6 text-center">
                Key Insights from the Analysis
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  value="87%"
                  label="Data Coverage"
                  icon={<Target className="text-white" />}
                  trend="up"
                />
                <StatCard
                  value="92%"
                  label="Accuracy Rate"
                  icon={<Award className="text-white" />}
                  trend="up"
                />
                <StatCard
                  value="24%"
                  label="Improvement"
                  icon={<TrendingUp className="text-white" />}
                  trend="up"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
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
    content: (
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}>
              <Typography
                variant="h3"
                component="h1"
                className="text-3xl md:text-4xl font-bold text-white mb-4">
                AI Chatbot Integration for Automated Chart Generation
              </Typography>
              <div className="w-24 h-1 bg-gray-300 dark:bg-gray-600 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <AnimatedCard delay={0.1}>
            <Paper
              elevation={0}
              className="p-8 my-6 bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                  <div className="p-5 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                    <Brain className="text-white" size={48} />
                  </div>
                </div>
                <div className="md:w-3/4 text-center md:text-left">
                  <Typography
                    variant="h4"
                    gutterBottom
                    className="text-2xl font-bold text-white">
                    AI-Powered Data Visualization
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-white">
                    This post offers a technical deep-dive into one of our most
                    exciting projects: an AI-powered chatbot capable of
                    generating data visualizations from natural language
                    queries. Imagine asking a chatbot, "Show me the sales trend
                    for the last quarter," and instantly receiving a
                    corresponding chart.
                  </Typography>
                </div>
              </div>

              <Divider className="my-6 bg-gray-300 dark:bg-gray-700" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <Code className="text-white mr-3" size={24} />
                    <Typography
                      variant="h6"
                      className="text-lg font-semibold text-white">
                      Architecture Overview
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    paragraph
                    className="text-white mb-4">
                    We'll explore the architecture behind this system, which
                    combines a Natural Language Processing (NLP) model to
                    interpret user requests with a data processing backend that
                    interfaces with various data sources. The front-end
                    component then dynamically renders the appropriate charts
                    using a library like D3.js or Chart.js.
                  </Typography>
                </div>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <Zap className="text-white mr-3" size={24} />
                    <Typography
                      variant="h6"
                      className="text-lg font-semibold text-white">
                      Key Features
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    paragraph
                    className="text-white">
                    This article will cover the core components, the machine
                    learning models involved, and the integration process
                    required to create a seamless and intuitive data exploration
                    tool.
                  </Typography>
                </div>
              </div>

              <div className="mt-10">
                <Typography
                  variant="h5"
                  className="text-xl font-bold text-white mb-6 text-center">
                  Technical Implementation
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard
                    title="NLP Processing"
                    description="Natural language interpretation for query understanding"
                    icon={<Brain className="text-white" size={24} />}
                    delay={0.2}
                  />
                  <FeatureCard
                    title="Data Integration"
                    description="Connects to multiple data sources seamlessly"
                    icon={<Globe className="text-white" size={24} />}
                    delay={0.3}
                  />
                  <FeatureCard
                    title="Dynamic Rendering"
                    description="Automatically generates appropriate visualizations"
                    icon={<BarChart3 className="text-white" size={24} />}
                    delay={0.4}
                  />
                </div>
              </div>
            </Paper>
          </AnimatedCard>
        </motion.div>
      </Container>
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
    content: (
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}>
              <Typography
                variant="h3"
                component="h1"
                className="text-3xl md:text-4xl font-bold text-white mb-4">
                Analyzing School Dropout Rates
              </Typography>
              <div className="w-24 h-1 bg-gray-300 dark:bg-gray-600 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <AnimatedCard delay={0.1}>
            <Paper
              elevation={0}
              className="p-8 my-6 bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                  <div className="p-5 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                    <BookOpen className="text-white" size={48} />
                  </div>
                </div>
                <div className="md:w-3/4 text-center md:text-left">
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    className="text-2xl font-bold text-white">
                    Understanding School Dropout Rates
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    className="text-white mb-4">
                    School dropout rates represent a significant challenge for
                    educational systems worldwide. In this analysis, we take a
                    data-driven approach to understand the multifaceted issue of
                    student attrition. By examining a wide range of
                    factors—including socioeconomic status, academic
                    performance, and school resources—we aim to identify the key
                    predictors of dropout.
                  </Typography>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <Target className="text-white mr-3" size={24} />
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-lg font-semibold text-white">
                      Our Analytical Approach
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    paragraph
                    className="text-white">
                    Using statistical models and machine learning algorithms, we
                    analyzed longitudinal student data to uncover patterns and
                    risk factors. Our goal is to move beyond correlation and
                    identify causal links that can inform effective, targeted
                    intervention strategies.
                  </Typography>
                </div>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <Lightbulb className="text-white mr-3" size={24} />
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-lg font-semibold text-white">
                      Key Findings & Policy Implications
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    paragraph
                    className="text-white">
                    This post will detail our analytical process, present our
                    findings on the most significant contributing factors, and
                    discuss potential data-informed policies that could help
                    improve student retention and success.
                  </Typography>
                </div>
              </div>

              <div className="mt-10">
                <Typography
                  variant="h5"
                  className="text-xl font-bold text-white mb-6 text-center">
                  Key Risk Factors
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard
                    title="Socioeconomic Status"
                    description="Family income and educational background significantly impact retention"
                    icon={<Users className="text-white" size={24} />}
                    delay={0.2}
                  />
                  <FeatureCard
                    title="Academic Performance"
                    description="Early indicators of struggle can predict dropout risk"
                    icon={<TrendingUp className="text-white" size={24} />}
                    delay={0.3}
                  />
                  <FeatureCard
                    title="School Resources"
                    description="Access to support services affects student outcomes"
                    icon={<Heart className="text-white" size={24} />}
                    delay={0.4}
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                <Typography
                  variant="h6"
                  className="text-lg font-bold text-white mb-4 text-center">
                  Impact Statistics
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    value="15%"
                    label="Dropout Rate"
                    icon={<Target className="text-white" />}
                    trend="down"
                  />
                  <StatCard
                    value="85%"
                    label="Retention Rate"
                    icon={<Award className="text-white" />}
                    trend="up"
                  />
                  <StatCard
                    value="40%"
                    label="Improvement"
                    icon={<TrendingUp className="text-white" />}
                    trend="up"
                  />
                </div>
              </motion.div>
            </Paper>
          </AnimatedCard>
        </motion.div>
      </Container>
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
    content: (
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}>
              <Typography
                variant="h3"
                component="h1"
                className="text-3xl md:text-4xl font-bold text-white mb-4">
                Measuring Education Quality
              </Typography>
              <div className="w-24 h-1 bg-gray-300 dark:bg-gray-600 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <AnimatedCard delay={0.1}>
            <Paper
              elevation={0}
              className="p-8 my-6 bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                align="center"
                className="text-2xl font-bold text-white">
                Measuring Education Quality
              </Typography>

              <Divider className="my-6 bg-gray-300 dark:bg-gray-700" />

              <Typography
                variant="body1"
                paragraph
                className="text-white mb-6 text-center">
                What does "education quality" truly mean, and how can we measure
                it effectively? This question is at the heart of improving
                educational outcomes. This article explores the various
                dimensions of education quality and the data we can use to
                assess them.
              </Typography>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="my-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Sparkles className="text-white mr-3" size={24} />
                  <Typography
                    variant="h6"
                    className="text-lg font-semibold text-white">
                    Beyond Traditional Metrics
                  </Typography>
                </div>
                <Typography
                  variant="body1"
                  paragraph
                  className="text-white">
                  We move beyond traditional metrics like standardized test
                  scores to consider a more holistic view that includes student
                  engagement, teacher effectiveness, curriculum relevance, and
                  the learning environment. We'll discuss different
                  methodologies for collecting and analyzing data on these
                  fronts, from student surveys to classroom observation data.
                </Typography>
              </motion.div>

              <div className="mt-10">
                <Typography
                  variant="h5"
                  className="text-xl font-bold text-white mb-6 text-center">
                  Key Dimensions of Education Quality
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FeatureCard
                    title="Student Engagement"
                    description="Active participation and interest in learning"
                    icon={<Heart className="text-white" size={24} />}
                    delay={0.2}
                  />
                  <FeatureCard
                    title="Teacher Effectiveness"
                    description="Quality of instruction and classroom management"
                    icon={<Users className="text-white" size={24} />}
                    delay={0.3}
                  />
                  <FeatureCard
                    title="Curriculum Relevance"
                    description="Alignment with real-world skills and knowledge"
                    icon={<BookOpen className="text-white" size={24} />}
                    delay={0.4}
                  />
                  <FeatureCard
                    title="Learning Environment"
                    description="Physical and emotional safety for learning"
                    icon={<Target className="text-white" size={24} />}
                    delay={0.5}
                  />
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  value="92%"
                  label="Student Satisfaction"
                  icon={<Heart className="text-white" />}
                  trend="up"
                />
                <StatCard
                  value="88%"
                  label="Teacher Effectiveness"
                  icon={<Users className="text-white" />}
                  trend="up"
                />
                <StatCard
                  value="76%"
                  label="Curriculum Alignment"
                  icon={<BookOpen className="text-white" />}
                  trend="up"
                />
              </div>

              <Typography
                variant="body1"
                paragraph
                className="text-white mt-8 text-center">
                Our exploration aims to provide a framework for a more nuanced
                and comprehensive understanding of education quality, enabling
                educators and policymakers to make more informed decisions.
              </Typography>
            </Paper>
          </AnimatedCard>
        </motion.div>
      </Container>
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
    content: (
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}>
              <Typography
                variant="h3"
                component="h1"
                className="text-3xl md:text-4xl font-bold text-white mb-4">
                Understanding the Child Development Index
              </Typography>
              <div className="w-24 h-1 bg-gray-300 dark:bg-gray-600 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <AnimatedCard delay={0.1}>
            <Paper
              elevation={0}
              className="p-8 my-6 bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                align="center"
                className="text-2xl font-bold text-white">
                Understanding the Child Development Index
              </Typography>

              <AnimatedCard delay={0.2}>
                <div className="my-6 bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <CardHeader
                    title="About the CDI"
                    subheader="A Comprehensive Measure of Child Well-being"
                    className="bg-gray-50 dark:bg-gray-800 rounded-t-lg border-b border-gray-200 dark:border-gray-700"
                  />
                  <CardContent className="p-6">
                    <Typography
                      variant="body1"
                      paragraph
                      className="text-white">
                      The Child Development Index (CDI) is a crucial tool for
                      tracking and understanding the well-being of children
                      across different populations. It provides a composite
                      measure that reflects key aspects of a child's life,
                      offering a powerful lens through which to view societal
                      progress.
                    </Typography>
                  </CardContent>
                </div>
              </AnimatedCard>

              <Divider className="my-6 bg-gray-300 dark:bg-gray-700" />

              <div className="mt-10">
                <Typography
                  variant="h5"
                  className="text-xl font-bold text-white mb-8 text-center">
                  Core Components of the CDI
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FeatureCard
                    title="Health Component"
                    description="Measured through indicators like under-five mortality rates"
                    icon={<Heart className="text-orange-600 dark:text-orange-400" size={24} />}
                    delay={0.3}
                  />
                  <FeatureCard
                    title="Education Component"
                    description="Assessed via school enrollment and completion rates"
                    icon={<BookOpen className="text-orange-600 dark:text-orange-400" size={24} />}
                    delay={0.4}
                  />
                  <FeatureCard
                    title="Nutrition Component"
                    description="Evaluated using malnutrition statistics"
                    icon={<Target className="text-orange-600 dark:text-orange-400" size={24} />}
                    delay={0.5}
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Lightbulb className="text-orange-600 dark:text-orange-400 mr-3" size={24} />
                  <Typography
                    variant="h6"
                    className="text-lg font-semibold text-white">
                    Why the CDI Matters
                  </Typography>
                </div>
                <Typography
                  variant="body1"
                  className="text-white">
                  Understanding the CDI is essential for anyone interested in
                  child welfare, international development, and public policy.
                  Join us as we explain what this important metric tells us
                  about the state of childhood around the world.
                </Typography>
              </motion.div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  value="85%"
                  label="Global Coverage"
                  icon={<Globe className="text-orange-600 dark:text-orange-400" />}
                  trend="up"
                />
                <StatCard
                  value="92%"
                  label="Data Accuracy"
                  icon={<Award className="text-orange-600 dark:text-orange-400" />}
                  trend="up"
                />
                <StatCard
                  value="30%"
                  label="Improvement"
                  icon={<TrendingUp className="text-orange-600 dark:text-orange-400" />}
                  trend="up"
                />
              </div>
            </Paper>
          </AnimatedCard>
        </motion.div>
      </Container>
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
    content: (
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}>
              <Typography
                variant="h2"
                component="h1"
                className="text-3xl md:text-4xl font-bold text-white mb-4">
                Website Design and Implementation
              </Typography>
              <div className="w-24 h-1 bg-gray-300 dark:bg-gray-600 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <AnimatedCard delay={0.1}>
            <Paper
              elevation={0}
              className="p-8 my-6 bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row items-center mb-10">
                <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                  <div className="p-5 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                    <Code className="text-white" size={48} />
                  </div>
                </div>
                <div className="md:w-3/4 text-center md:text-left">
                  <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    align="center"
                    className="text-3xl font-bold text-white mb-4">
                    Website Design and Implementation
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-white">
                    The journey from concept to a fully functional, dynamic web
                    application.
                  </Typography>
                </div>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Accordion className="bg-white dark:bg-gray-900 rounded-xl mb-4">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="concept-content"
                      id="concept-header"
                      className="rounded-xl">
                      <div className="flex items-center">
                        <Target className="text-white mr-3" size={24} />
                        <Typography
                          variant="h5"
                          className="font-semibold text-white">
                          From Concept to Wireframes
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body1"
                        paragraph
                        className="text-white mb-2">
                        Every strong website begins with clarity. We started
                        with wireframes and design mockups to map out layout,
                        user flow, and content structure. This phase helped
                        transform abstract ideas into something tangible before
                        any development began.
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-white">
                        From day one, the goal was simple: build a site that
                        feels modern, intuitive, and ready to grow with the
                        brand.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Accordion className="bg-white dark:bg-gray-900 rounded-xl mb-4">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="techstack-content"
                      id="techstack-header"
                      className="rounded-xl">
                      <div className="flex items-center">
                        <Zap className="text-white mr-3" size={24} />
                        <Typography
                          variant="h5"
                          className="font-semibold text-white">
                          Choosing a Modern Web Development Tech Stack
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body1"
                        paragraph
                        className="text-white mb-2">
                        The front end was built using <strong>React</strong> and
                        <strong>TypeScript</strong> to create a scalable,
                        maintainable architecture. This stack gave us confidence
                        to move fast without sacrificing long-term stability.
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-white">
                        Styling was handled with <strong>Tailwind CSS</strong>,
                        while
                        <strong>Framer Motion</strong> added subtle, purposeful
                        animations that improve the overall user experience
                        without overwhelming it.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Accordion className="bg-white dark:bg-gray-900 rounded-xl mb-4">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="design-content"
                      id="design-header"
                      className="rounded-xl">
                      <div className="flex items-center">
                        <Lightbulb className="text-white mr-3" size={24} />
                        <Typography
                          variant="h5"
                          className="font-semibold text-white">
                          Design Principles That Shaped the Website
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon className="text-white" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Accessibility for all users"
                            className="text-white"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon className="text-white" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Fast load times and optimized performance"
                            className="text-white"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon className="text-white" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Scalable architecture for future growth"
                            className="text-white"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon className="text-white" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Secure development and data protection best practices"
                            className="text-white"
                          />
                        </ListItem>
                      </List>
                      <Typography
                        variant="body1"
                        className="text-white">
                        These principles guided every design and development
                        decision, especially when trade-offs were necessary.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Accordion className="bg-white dark:bg-gray-900 rounded-xl mb-4">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="challenges-content"
                      id="challenges-header"
                      className="rounded-xl">
                      <div className="flex items-center">
                        <Shield className="text-white mr-3" size={24} />
                        <Typography
                          variant="h5"
                          className="font-semibold text-white">
                          Technical Challenges and Problem Solving
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body1"
                        paragraph
                        className="text-white mb-2">
                        Building a real-world production site comes with
                        challenges. We addressed responsive layouts across
                        devices, optimized complex animations, integrated
                        third-party APIs, and ensured consistent behavior across
                        browsers.
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-white">
                        Each obstacle was an opportunity to refine the codebase
                        and improve the final experience.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Accordion className="bg-white dark:bg-gray-900 rounded-xl mb-4">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="process-content"
                      id="process-header"
                      className="rounded-xl">
                      <div className="flex items-center">
                        <Clock className="text-white mr-3" size={24} />
                        <Typography
                          variant="h5"
                          className="font-semibold text-white">
                          An Agile and Iterative Development Process
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body1"
                        paragraph
                        className="text-white mb-2">
                        The project followed an agile workflow, allowing
                        features to be built, tested, and refined in short
                        cycles. This made it easier to adapt and improve
                        continuously.
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-white">
                        One key lesson stood out: great web development is less
                        about tools and more about understanding users and
                        building experiences that genuinely help them.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Accordion className="bg-white dark:bg-gray-900 rounded-xl mb-4">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="future-content"
                      id="future-header"
                      className="rounded-xl">
                      <div className="flex items-center">
                        <Zap className="text-white mr-3" size={24} />
                        <Typography
                          variant="h5"
                          className="font-semibold text-white">
                          What's Next for the JGM Innovation Website
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <ArrowForwardIcon className="text-white" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Advanced analytics and user behavior tracking"
                            className="text-white"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ArrowForwardIcon className="text-white" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Improved accessibility features"
                            className="text-white"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ArrowForwardIcon className="text-white" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Further performance optimizations"
                            className="text-white"
                          />
                        </ListItem>
                      </List>
                      <Typography
                        variant="body1"
                        className="text-white">
                        These enhancements will help us better understand our
                        audience and continue refining the experience.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Accordion className="bg-white dark:bg-gray-900 rounded-xl mb-4">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="conclusion-content"
                      id="conclusion-header"
                      className="rounded-xl">
                      <div className="flex items-center">
                        <Award className="text-white mr-3" size={24} />
                        <Typography
                          variant="h5"
                          className="font-semibold text-white">
                          Final Thoughts
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        variant="body1"
                        paragraph
                        className="text-white mb-2">
                        Building the JGM Innovation website was both challenging
                        and deeply rewarding. Seeing everything come together
                        made every design tweak and late-night bug fix
                        worthwhile.
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-white">
                        With modern technology, thoughtful design, and an
                        iterative mindset, we've built a website that truly
                        reflects our vision—and one that's ready for what comes
                        next.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>

                <div className="mt-10">
                  <Typography
                    variant="h5"
                    className="text-xl font-bold text-white mb-6 text-center">
                    Technology Stack
                  </Typography>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FeatureCard
                      title="React"
                      description="Component-based UI library"
                      icon={<Code className="text-cyan-600 dark:text-cyan-400" size={24} />}
                      delay={1.0}
                    />
                    <FeatureCard
                      title="TypeScript"
                      description="Typed superset of JavaScript"
                      icon={<Zap className="text-cyan-600 dark:text-cyan-400" size={24} />}
                      delay={1.1}
                    />
                    <FeatureCard
                      title="Tailwind CSS"
                      description="Utility-first CSS framework"
                      icon={<Sparkles className="text-cyan-600 dark:text-cyan-400" size={24} />}
                      delay={1.2}
                    />
                    <FeatureCard
                      title="Framer Motion"
                      description="Production-ready animation library"
                      icon={<Target className="text-cyan-600 dark:text-cyan-400" size={24} />}
                      delay={1.3}
                    />
                  </div>
                </div>
              </div>
            </Paper>
          </AnimatedCard>
        </motion.div>
      </Container>
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
    content: (
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                align="center"
                className="text-3xl md:text-4xl font-bold text-white mb-2">
                Advanced Features and Optimizations
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                align="center"
                className="text-xl md:text-2xl font-semibold text-white mb-4">
                Pushing the JGM Innovation Website Further
              </Typography>
              <div className="w-24 h-1 bg-gray-300 dark:bg-gray-600 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <Typography
            variant="body1"
            gutterBottom
            align="center"
            className="text-white mb-8 px-4">
            After shipping the initial version, we kept going. This update
            focuses on performance, advanced features, and the engineering
            decisions that made the platform faster, more secure, and easier to
            evolve.
          </Typography>

          <AnimatedCard delay={0.1}>
            <Paper
              elevation={0}
              className="p-8 my-6 bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
              <Divider className="my-6 bg-gray-300 dark:bg-gray-700" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
                <Accordion className="bg-white dark:bg-gray-900 rounded-xl">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="performance-content"
                    id="performance-header"
                    className="rounded-xl">
                    <div className="flex items-center">
                      <Zap className="text-white mr-3" size={24} />
                      <Typography
                        variant="h5"
                        className="font-semibold text-white">
                        Performance, Refined
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body1"
                      paragraph
                      className="text-white mb-2">
                      Performance became a deliberate design constraint. We
                      introduced code splitting with React's lazy loading to
                      reduce initial bundle size and improve
                      time-to-interactive.
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-white">
                      A custom <strong>LazyImage</strong> component ensures
                      images load only when they enter the viewport—saving
                      bandwidth and keeping the experience smooth across
                      devices.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <AnimatedCard delay={0.4}>
                  <div className="h-full bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Zap className="text-white mr-3" size={24} />
                        <Typography
                          variant="h6"
                          className="text-lg font-semibold text-white"
                          gutterBottom>
                          Features That Stay Out of the Way
                        </Typography>
                      </div>
                      <Typography
                        variant="body1"
                        paragraph
                        className="text-white mb-3">
                        We added Progressive Web App features to make the site
                        feel reliable and app-like without adding complexity.
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-white">
                        Offline support, push notifications, and home-screen
                        installation work quietly in the background—ready when
                        users need them.
                      </Typography>
                    </CardContent>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.5}>
                  <div className="h-full bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Shield className="text-white mr-3" size={24} />
                        <Typography
                          variant="h6"
                          className="text-lg font-semibold text-white"
                          gutterBottom>
                          Accessibility Isn't Optional
                        </Typography>
                      </div>
                      <Typography
                        variant="body1"
                        paragraph
                        className="text-white mb-3">
                        Semantic HTML, ARIA attributes, keyboard navigation, and
                        screen reader support were built in from the start—not
                        patched on later.
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-white">
                        The result is a site that's more inclusive, more usable,
                        and more resilient.
                      </Typography>
                    </CardContent>
                  </div>
                </AnimatedCard>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="my-8 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Target className="text-white mr-3" size={24} />
                  <Typography
                    variant="h6"
                    className="text-lg font-semibold text-white">
                    Learning From Real Usage
                  </Typography>
                </div>
                <Typography
                  variant="body1"
                  paragraph
                  className="text-white mb-3">
                  We integrated analytics across the platform to understand how
                  people actually use it. User journeys, engagement patterns,
                  performance metrics, and error tracking help us iterate with
                  confidence.
                </Typography>
                <Typography
                  variant="body1"
                  className="text-white">
                  These insights keep decisions grounded in real behavior
                  instead of assumptions.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
                <Accordion className="bg-white dark:bg-gray-900 rounded-xl">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="security-content"
                    id="security-header"
                    className="rounded-xl">
                    <div className="flex items-center">
                      <Lock className="text-white mr-3" size={24} />
                      <Typography
                        variant="h5"
                        className="font-semibold text-white">
                        Security, by Default
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body1"
                      paragraph
                      className="text-white mb-2">
                      Security is woven into the architecture. A strict Content
                      Security Policy helps prevent XSS attacks, while
                      authenticated APIs, input validation, and encrypted
                      communication protect user data.
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-white">
                      Secure session management ensures the platform remains
                      trustworthy at scale.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                <Accordion className="bg-white dark:bg-gray-900 rounded-xl">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="future-content"
                    id="future-header"
                    className="rounded-xl">
                    <div className="flex items-center">
                      <Sparkles className="text-white mr-3" size={24} />
                      <Typography
                        variant="h5"
                        className="font-semibold text-white">
                        Where We're Headed Next
                      </Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      variant="body1"
                      paragraph
                      className="text-white mb-2">
                      We're exploring AI-driven personalization, intelligent
                      search, and richer interactive features like real-time
                      collaboration and customizable dashboards.
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-white">
                      The goal is simple: build a platform that adapts to users
                      instead of forcing users to adapt to it.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>

              <Divider className="my-8 bg-gray-300 dark:bg-gray-700" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-center">
                <Typography
                  variant="body2"
                  align="center"
                  className="text-white italic">
                  The JGM Innovation website continues to evolve through
                  thoughtful iteration. Performance, security, and user
                  experience guide every decision—keeping the platform fast,
                  flexible, and future-ready.
                </Typography>
              </motion.div>
            </Paper>
          </AnimatedCard>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              value="98%"
              label="Performance Score"
              icon={<Zap className="text-white" />}
              trend="up"
            />
            <StatCard
              value="99.9%"
              label="Uptime"
              icon={<Shield className="text-white" />}
              trend="up"
            />
            <StatCard
              value="42%"
              label="Load Time Reduction"
              icon={<Target className="text-white" />}
              trend="down"
            />
          </div>
        </motion.div>
      </Container>
    ),
    category: "Web Development",
  },
];
