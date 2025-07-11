"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "motion/react";
import { cn } from "../lib/utils.js";

export const TracingBeam = ({
  children,
  className
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}>
      <div className="absolute top-3 -left-4 md:-left-20">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="border-slate-600 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? "#22d3ee" : "#06b6d4",
              borderColor: scrollYProgress.get() > 0 ? "#06b6d4" : "#0891b2",
            }}
            className="h-2 w-2 rounded-full border border-slate-500 bg-cyan-400" />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true">
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#334155"
            strokeOpacity="0.3"
            transition={{
              duration: 10,
            }}></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}>
              <stop stopColor="#22d3ee" stopOpacity="0"></stop>
              <stop stopColor="#22d3ee"></stop>
              <stop offset="0.325" stopColor="#06b6d4"></stop>
              <stop offset="0.675" stopColor="#8b5cf6"></stop>
              <stop offset="1" stopColor="#a855f7" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}; 