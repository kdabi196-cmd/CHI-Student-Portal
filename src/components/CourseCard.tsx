import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Course, Language } from "../types";
import { ArrowRight, BookOpen } from "lucide-react";

interface CourseCardProps {
  course: Course;
  lang: Language;
  onClick: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, lang, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-surface border border-border-subtle aspect-[4/5]"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y }} className="h-[120%] w-full">
          <img
            src={course.image}
            alt={course.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 rounded bg-brand-primary/20 backdrop-blur-md border border-brand-primary/30 text-[10px] font-display uppercase tracking-widest text-brand-primary">
              {course.code}
            </div>
            <div className="flex items-center gap-1 text-xs text-white/60">
              <BookOpen size={12} />
              <span>{course.lessons.length} {lang === "en" ? "Lessons" : "درس"}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-display leading-tight group-hover:text-brand-secondary transition-colors">
            {course.title}
          </h3>
          
          <div className="pt-2">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs text-white/40">{lang === "en" ? "Progress" : "التقدم"}</span>
              <span className="text-sm font-display text-brand-secondary">{course.progress}%</span>
            </div>
            <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-0 bottom-0 left-0 bg-brand-secondary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-semibold text-brand-secondary">
              {lang === "en" ? "Continue Learning" : "واصل التعلم"}
            </span>
            <ArrowRight size={14} className="text-brand-secondary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
