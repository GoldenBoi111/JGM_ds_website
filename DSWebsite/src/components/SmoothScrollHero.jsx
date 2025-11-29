import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function SmoothScrollHero() {
  return (
    <div className="bg-zinc-950">
      <ReactLenis
        root
        options={{
          // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
          lerp: 0.05,
          //   infinite: true,
          //   syncTouch: true,
        }}>
        {/*<Nav />*/}
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
}

const SECTION_HEIGHT = 700;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full overflow-hidden">
      <ParallexImages />

      {/*<div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />*/}
    </div>
  );
};

const parallaxImageData = [
  {
    src: "https://images.pexels.com/photos/8422248/pexels-photo-8422248.jpeg",
    alt: "A teacher and students sitting on the floor, engaged in a lesson.",
    start: -200,
    end: 300,
    className: "w-1/3 rounded-xl",
  },
  {
    src: "https://images.pexels.com/photos/8363751/pexels-photo-8363751.jpeg",
    alt: "A Girl Holding Colored Pencils",
    start: -250,
    end: 350,
    className: "ml-auto w-3/8 rounded-xl",
  },
  {
    src: "https://images.pexels.com/photos/3452236/pexels-photo-3452236.jpeg",
    alt: "A group of young girls in colorful apparel, representing community.",
    start: 100,
    end: -150,
    className: "mx-auto w-2/3 rounded-xl",
  },
  {
    src: "https://images.pexels.com/photos/3992949/pexels-photo-3992949.jpeg",
    alt: "A young boy in a green shirt, smiling and looking up.",
    start: -100,
    end: 200,
    className: "ml-auto w-2/5 rounded-xl",
  },
  {
    src: "https://images.pexels.com/photos/8613319/pexels-photo-8613319.jpeg",
    alt: "A group of children playing together on a grassy field.",
    start: 100,
    end: -400,
    className: "ml-6 w-5/12 rounded-xl",
  },
];

const ParallexImages = () => {
  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 pt-[200px]">
      {parallaxImageData.map((img) => (
        <ParallaxImg key={img.src} {...img} />
      ))}
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

ParallaxImg.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
};

const projects = [
  {
    title: "Data Analysis on Peru Government Datasets",
    date: "September 2025",
    location: "",
    to: "/data-analysis-peru",
  },
  {
    title: "Website Design and Implementation",
    date: "October 2025",
    location: "",
    to: "/website-design",
  },
  {
    title: "AI Chatbot Integration for Automated Chart Generation",
    date: "November 2025",
    location: "",
    to: "/ai-chatbot-integration",
  },
];

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="relative z-1 mx-auto max-w-5xl px-4 py-12 text-white">
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50">
        Current Projects
      </motion.h1>
      {projects.map((project) => (
        <Link to={project.to} key={project.title}>
          <ScheduleItem
            title={project.title}
            date={project.date}
            location={project.location}
          />
        </Link>
      ))}
    </section>
  );
};

const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mt-9 flex items-start justify-between border-b border-zinc-800 text-black-900 px-3 pb-9">
      <div>
        <p className="mb-1.5 text-start text-lg md:text-2xl text-zinc-50">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm md:text-lg">
        <p className="text-end">{date}</p>
      </div>
    </motion.div>
  );
};

ScheduleItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default SmoothScrollHero;
