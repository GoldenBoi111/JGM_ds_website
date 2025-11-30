import { ReactLenis } from "@studio-freight/react-lenis";
import type Lenis from "@studio-freight/lenis";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  frame,
  cancelFrame,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import TiltedCard from "./TiltedCard.js";

// ------------------------------
// Types
// ------------------------------
interface ParallaxImgProps {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

interface Project {
  title: string;
  date: string;
  location: string;
  to: string;
}

interface ScheduleItemProps {
  title: string;
  date: string;
  location: string;
}

type LenisRef = {
  lenis: Lenis | undefined;
};

// ------------------------------
// Main Component
// ------------------------------
export default function SmoothScrollHero() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    const unsubscribe = frame.update(update, true);

    return () => cancelFrame(unsubscribe);
  }, []);
  return (
    <div className="bg-zinc-950">
      <ReactLenis
        ref={lenisRef}
        root
        options={{
          lerp: 0.05,
        }}>
        <Hero />
        <Schedule />
        <DevelopmentSection />
      </ReactLenis>
    </div>
  );
}

const SECTION_HEIGHT = 700;

// ------------------------------
// Hero Section
// ------------------------------
const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full overflow-hidden">
      <ParallexImages />
    </div>
  );
};

// ------------------------------
// Parallax Image Data
// ------------------------------
const parallaxImageData: ParallaxImgProps[] = [
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

// ------------------------------
// Parallax Images Container
// ------------------------------
const ParallexImages = () => {
  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 pt-[200px]">
      {parallaxImageData.map((img) => (
        <ParallaxImg key={img.src} {...img} />
      ))}
    </div>
  );
};

// ------------------------------
// Individual Parallax Image Component
// ------------------------------
const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef<HTMLImageElement | null>(null);

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

// ------------------------------
// Projects Data
// ------------------------------
const projects: Project[] = [
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

// ------------------------------
// Schedule Section
// ------------------------------
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

// ------------------------------
// Schedule Item Component
// ------------------------------
const ScheduleItem = ({ title, date }: ScheduleItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mt-9 flex items-start justify-between border-b border-zinc-800 px-3 pb-9">
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

// ------------------------------
// Development Section
// ------------------------------
const DevelopmentSection = () => {
  return (
    <section className="development">
      <div className="pt-10"></div>
      <h2>Areas of development</h2>
      <div className="cards mt-10 py-10">
        <Link className="card" to="/school-dropout-rates">
          <h3 className="color-white-900">School Dropout rates</h3>

          <TiltedCard
            imageSrc="https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0="
            altText="XYZ School"
            captionText="XYZ School"
            containerHeight="200px"
            containerWidth="200px"
            imageHeight="200px"
            imageWidth="200px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p
                style={{
                  fontWeight: "bold",
                  WebkitTextStrokeWidth: 0.5,
                  WebkitTextStrokeColor: "black",
                  color: "gold",
                  fontSize: 30,
                  padding: 6,
                }}>
                XYZ School
              </p>
            }
          />
          <p className="py-2">
            Call out a feature, benefit, or value of you site that can stand on
            its own.
          </p>
        </Link>
        <Link className="card" to="/education-quality">
          <h3>Education Quality</h3>
          <TiltedCard
            imageSrc="https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0="
            altText="XYZ School"
            captionText="XYZ School"
            containerHeight="200px"
            containerWidth="200px"
            imageHeight="200px"
            imageWidth="200px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p
                style={{
                  fontWeight: "bold",
                  WebkitTextStrokeWidth: 0.5,
                  WebkitTextStrokeColor: "black",
                  color: "gold",
                  fontSize: 30,
                  padding: 6,
                }}>
                XYZ School
              </p>
            }
          />
          <p className="py-2">
            Call out a feature, benefit, or value of your site that can stand on
            its own.
          </p>
        </Link>
        <Link className="card" to="/child-development-index">
          <h3>Child Development index</h3>
          <p className="py-2">
            Call out a feature, benefit, or value of your site that can stand on
            its own.
          </p>
        </Link>
      </div>
    </section>
  );
};
