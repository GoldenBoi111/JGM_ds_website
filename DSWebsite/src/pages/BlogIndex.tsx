import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../components/posts";
import { motion } from "framer-motion";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Helmet } from "react-helmet-async";
import LazyImage from "../components/LazyImage";
import Skeleton from "../components/Skeleton";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const categories = [
  "All",
  ...Array.from(new Set(blogPosts.map((post) => post.category))),
];

const BlogIndex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);

  const filteredByCategory =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const filteredData = filteredByCategory.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter data based on loading and search
  const displayData = isLoading ? blogPosts.slice(0, 6) : filteredData;

  return (
    <>
      <Helmet>
        <title>JGM Innovation Blog - Data Science & AI Insights</title>
        <meta name="description" content="Explore the latest insights on data science, AI, and social impact from JGM Innovation's blog." />
        <meta name="keywords" content="data science, AI, machine learning, education, government, social impact, Peru, analytics, blog" />
        <link rel="canonical" href="https://jgm-innovation.com/blog" />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="JGM Innovation Blog - Data Science & AI Insights" />
        <meta property="og:description" content="Explore the latest insights on data science, AI, and social impact from JGM Innovation's blog." />
        <meta property="og:url" content="https://jgm-innovation.com/blog" />
        {/* Twitter */}
        <meta name="twitter:title" content="JGM Innovation Blog - Data Science & AI Insights" />
        <meta name="twitter:description" content="Explore the latest insights on data science, AI, and social impact from JGM Innovation's blog." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <main className="flex-grow">
          <div className="bg-zinc-950 text-white min-h-screen p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 text-center pt-24">
                The JGM Innovation Blog
              </motion.h1>
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative ${
                        selectedCategory === category
                          ? "text-white"
                          : "text-zinc-400 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}>
                      {selectedCategory === category && (
                        <motion.div
                          layoutId="selected-category-pill"
                          className="absolute inset-0 bg-blue-600 rounded-full z-0"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </motion.button>
                  ))}
                </div>
                <div className="relative w-full md:w-64">
                  <SearchRoundedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800/50 py-2 pl-10 pr-4 text-white placeholder-zinc-400 outline-none ring-0 ring-offset-0 focus:border-blue-500"
                    aria-label="Search blog posts"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayData.map((post, index) => (
                  isLoading ? (
                    <motion.div
                      key={`skeleton-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg h-full"
                    >
                      <Skeleton className="w-full h-48" />
                      <div className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6 mb-4" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="block bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300 h-full">
                        <LazyImage
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48"
                        />
                        <div className="p-6">
                          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                          <p className="text-zinc-400 mb-4">{post.description}</p>
                          <span className="text-blue-400 hover:underline">
                            Read More &rarr;
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  )
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogIndex;
