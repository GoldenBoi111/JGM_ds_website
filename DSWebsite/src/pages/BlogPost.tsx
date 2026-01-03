import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../components/posts";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import LazyImage from "../components/LazyImage";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-zinc-950 text-white min-h-screen flex flex-col items-center justify-center p-8 pt-24">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-zinc-400 mb-8">
          Sorry, we couldn't find the blog post you're looking for.
        </p>
        <Link
          to="/blog"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - JGM Innovation Blog</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={`data science, AI, ${post.category}, ${post.title}`} />
        <link rel="canonical" href={`https://jgm-innovation.com/blog/${post.slug}`} />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={`https://jgm-innovation.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        {/* Twitter */}
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.image} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="bg-zinc-950 text-white min-h-screen pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
          <LazyImage
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-zinc-400 mb-8">{post.date}</p>
          <div className="prose prose-invert prose-lg max-w-none">
            <p>{post.content}</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default BlogPost;
