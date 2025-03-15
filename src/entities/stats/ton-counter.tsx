"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ElegantCounterProps {
  value: number;
  duration?: number;
  delay?: number;
}

export default function ElegantCounter({
  value,
  duration = 1.5,
  delay = 0,
}: ElegantCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValueRef = useRef(0);

  useEffect(() => {
    // Only animate if the value has changed
    if (value !== prevValueRef.current) {
      setIsAnimating(true);

      // Start from the previous value
      const startValue = prevValueRef.current;

      // Calculate the increment per frame
      const totalFrames = duration * 60; // Assuming 60fps
      const increment = (value - startValue) / totalFrames;

      let currentFrame = 0;
      let currentValue = startValue;

      // Start the animation after the delay
      const timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          currentFrame++;
          currentValue += increment;

          // Ensure we don't exceed the target value due to floating point errors
          if (
            (increment > 0 && currentValue >= value) ||
            (increment < 0 && currentValue <= value) ||
            currentFrame >= totalFrames
          ) {
            setDisplayValue(value);
            clearInterval(intervalId);

            // End animation state
            setTimeout(() => {
              setIsAnimating(false);
            }, 300);
          } else {
            setDisplayValue(Math.round(currentValue));
          }
        }, 1000 / 60); // Update at 60fps

        return () => clearInterval(intervalId);
      }, delay * 1000);

      // Update the previous value ref
      prevValueRef.current = value;

      return () => clearTimeout(timeoutId);
    }
  }, [value, duration, delay]);

  return (
    <div className="relative flex items-center justify-center">
      <motion.span
        animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold"
        style={{ color: "var(--color-main, #627ffe)" }}
      >
        {displayValue}
      </motion.span>
    </div>
  );
}
