import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState, useCallback, useMemo, memo } from "react";
import { FiArrowRight } from "react-icons/fi";
import AboutImg from "@/assets/aboutimagelm.png";
import completeData from "../src/data/completeData.json";
import WaterDivider from "./ui/WaterDivider";

const iconComponents = {
  FiArrowRight: FiArrowRight,
};

const Counter = memo(
  ({
    value,
    suffix = "",
    duration = 1.8,
  }: {
    value: number;
    suffix?: string;
    duration?: number;
  }) => {
    const ref = useRef(null);
    const [display, setDisplay] = useState(0);
    const inView = useInView(ref, { once: true, margin: "0px" });
    const shouldReduceMotion = useReducedMotion();
    const hasAnimatedRef = useRef(false);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
      if (!inView || hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      if (shouldReduceMotion) {
        setDisplay(value);
        return;
      }

      let startTime: number;
      const startValue = 0;
      const endValue = value;
      const durationMs = duration * 1000;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(
          startValue + (endValue - startValue) * eased,
        );
        setDisplay(current);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplay(endValue);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [inView, value, duration, shouldReduceMotion]);

    return (
      <span ref={ref} className="tabular-nums">
        {display.toLocaleString()}
        {suffix}
      </span>
    );
  },
);

Counter.displayName = "Counter";

const ParticlesBackground = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>
    </div>
  );
});

ParticlesBackground.displayName = "ParticlesBackground";

const StatCard = memo(
  ({
    value,
    suffix,
    label,
  }: {
    value: number;
    suffix: string;
    label: string;
  }) => {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-border shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 w-full transform-gpu"
      >
        <div className="relative">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            <Counter value={value} suffix={suffix} />
          </span>
          <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-8 sm:w-12 h-0.5 bg-primary rounded-full" />
        </div>
        <p className="text-[10px] sm:text-xs font-bold text-muted-foreground
                       mt-3 leading-tight uppercase tracking-wide">
          {label}
        </p>
      </motion.div>
    );
  },
);

StatCard.displayName = "StatCard";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  const {
    badge,
    headline,
    description,
    image,
    stats,
    buttons,
    trustBadges,
    coreValues,
  } = completeData.about;

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: custom * 0.15,
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }),
    }),
    [],
  );

  const trustBadgesArray = useMemo(
    () => [
      {
        color: "from-primary to-primary/90",
        delay: 0.6,
        text: "Veteran Owned",
      },
      { color: "from-primary/90 to-primary/80", delay: 0.7, text: "Licensed" },
      { color: "from-primary/80 to-primary/70", delay: 0.8, text: "Insured" },
      {
        color: "from-primary/70 to-primary/60",
        delay: 0.9,
        text: "50+ Yrs Exp",
      },
    ],
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden py-6 md:py-8 lg:py-12"
      aria-label="About L&M Services"
    >
      <div className="absolute inset-0">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-primary/[0.02]" />
      </div>

      {/* STATIC DECORATIVE ELEMENTS FOR PERFORMANCE */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full opacity-50" />
        <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-primary/5 rounded-full opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 xl:gap-16 items-stretch ">
          <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
            className="relative group h-full w-full "
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-700 transform-gpu" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/50 h-full">
              <div className="relative h-full min-h-[400px] lg:min-h-full">
                <img
                  src={AboutImg}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  width="800"
                  height="1000"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6"
                >
                  <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-xl border border-border">
                    <span className="flex items-center gap-2 text-sm font-bold text-primary">
                      <span className="text-lg">🇺🇸</span>
                      {image.badge}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={1}
            className="flex flex-col justify-center space-y-8"
          >
            <motion.div
              variants={variants}
              custom={2}
              className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2
                         rounded-full border border-primary/20 w-fit"
            >
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-primary uppercase tracking-[0.2em] text-xs font-bold">
                {badge}
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h2
                variants={variants}
                custom={3}
                className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold
                           leading-[1.08] tracking-tight text-black"
              >
                {headline.prefix}{" "}
                <span className="text-primary">{headline.highlight}</span>{" "}
                <span>{headline.suffix}</span>
              </motion.h2>

              <motion.div
                variants={variants}
                custom={4}
                className="w-20 h-1 bg-primary rounded-full"
              />
            </div>

            <motion.p
              variants={variants}
              custom={5}
              className="text-muted-foreground text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {coreValues && (
              <motion.div
                variants={variants}
                custom={5.5}
                className="flex flex-wrap gap-2 pt-2"
              >
                {coreValues.map((value: string) => (
                  <span
                    key={value}
                    className="px-3 py-1.5 bg-primary/8 text-primary text-[11px]
                               font-bold rounded-full border border-primary/20
                               uppercase tracking-wide"
                  >
                    {value}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.div variants={variants} custom={6} className="pt-2 w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 w-full">
                {buttons.map((button: any, idx: number) => {
                  const isFirst = idx === 0;
                  const isHovered = hoveredButton !== null;
                  const useSecondaryStyle = (isFirst && isHovered) || (!isFirst && !isHovered);

                  return (
                    <motion.a
                      key={idx}
                      href={button.href}
                      onMouseEnter={() => setHoveredButton(idx)}
                      onMouseLeave={() => setHoveredButton(null)}
                      className={`
                        group relative overflow-hidden px-8 py-4 rounded-2xl w-full sm:w-auto 
                        inline-flex items-center justify-center gap-3 text-base font-bold transition-all duration-500
                        ${useSecondaryStyle
                          ? "bg-black/5 text-black hover:bg-black hover:text-white border border-black/10 hover:border-black shadow-md backdrop-blur-sm"
                          : "bg-primary text-white shadow-[0_0_40px_-10px_rgba(var(--primary-rgb),0.5)] border border-primary/50"
                        }
                        hover:scale-[1.02] active:scale-95
                      `}
                    >
                      <span className="relative z-10">{button.text}</span>
                      <FiArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              variants={variants}
              custom={7}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {stats.map((stat: any) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-1 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          className="relative block w-full h-10 md:h-12"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#redGradient)"
            d="M0,24L60,26.7C120,29,240,34,360,34C480,34,600,29,720,26.7C840,24,960,24,1080,26.7C1200,29,1320,34,1380,36.7L1440,39L1440,60L1380,60C1320,60,1200,60,1080,60C960,60,840,60,720,60C600,60,480,60,360,60C240,60,120,60,60,60L0,60Z"
          />
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.04"
              />
              <stop
                offset="50%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.06"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.04"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Integrated Water Divider - Transitions to Services */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <WaterDivider color="hsl(var(--primary))" className="translate-y-[1px]" />
      </div>
    </section>
  );
}
