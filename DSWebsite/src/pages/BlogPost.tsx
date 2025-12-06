import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../components/posts";
import { motion } from "framer-motion";

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
    <div className="bg-zinc-950 text-white min-h-screen pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <img
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
  );
};

export default BlogPost;
