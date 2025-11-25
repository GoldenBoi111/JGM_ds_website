import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiAlwaysdata } from "react-icons/si";
import { useRef } from "react";
import { Input } from "@chakra-ui/react";
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

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full">
      <CenterImage />

      <ParallaxImages />

      {/*<div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />*/}
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}></motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3 rounded-xl"
      />
      <ParallaxImg
        src="https://images.pexels.com/photos/3452236/pexels-photo-3452236.jpeg"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-xl"
      />
      <ParallaxImg
        src="https://images.pexels.com/photos/3947403/pexels-photo-3947403.jpeg"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3 rounded-xl"
      />
      <ParallaxImg
        src="https://images.pexels.com/photos/5198285/pexels-photo-5198285.jpeg"
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12 rounded-xl"
      />
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

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-0 text-white">
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50">
        Current Projects
      </motion.h1>
      <Link to="/datascience-education">
        <ScheduleItem
          title="Datascience: Education"
          date="2025"
          location="Florida"
        />
      </Link>
      <Link to="/datascience-healthcare">
        <ScheduleItem
          title="Datascience: Healthcare"
          date="2025"
          location="Texas"
        />
      </Link>
      <Link to="/datascience-financial-wellbeing">
        <ScheduleItem
          title="Datascience: Financial Wellbeing"
          date="2026"
          location="Florida"
        />
      </Link>
      <Link to="/datascience-food-insecurity">
        <ScheduleItem
          title="Datascience: Food insecurity"
          date="2026"
          location="Florida"
        />
      </Link>
      <Link to="/low-code-ai">
        <ScheduleItem
          title="Low Code AI: xxxxx"
          date="2025"
          location="California"
        />
      </Link>
      <Link to="/donation-drive">
        <ScheduleItem
          title="Donation drive: xxxx"
          date="2026"
          location="California"
        />
      </Link>
    </section>
  );
};

const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mt-9 flex items-center justify-between border-b border-zinc-800 text-black-900 px-3 pb-9">
      <div>
        <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase">
        <p className="text-xl uppercase text-end">{date}</p>
      </div>
    </motion.div>
  );
};

export default SmoothScrollHero;
