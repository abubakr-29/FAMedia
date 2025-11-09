"use client";

import { useEffect, useRef } from "react";

export default function TabTitleChanger() {
  const originalTitle = useRef<string>("FA Media | Web Development Agency");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Safely access document inside useEffect (runs only on client)
    if (typeof document !== "undefined") {
      originalTitle.current = document.title;

      const handleVisibilityChange = () => {
        if (document.hidden) {
          const messages = ["Taking a short break?", "Back soon - FA Media"];
          let index = 0;

          intervalRef.current = setInterval(() => {
            document.title = messages[index];
            index = (index + 1) % messages.length;
          }, 1500);
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          document.title = originalTitle.current;
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, []);

  return null;
}
