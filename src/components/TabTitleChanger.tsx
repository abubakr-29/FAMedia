"use client";

import { useEffect, useRef } from "react";

export default function TabTitleChanger() {
  const originalTitle = useRef<string>(document.title);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const messages = ["Taking a short break?", "Back soon - FA Media"];

        let messageIndex = 0;

        intervalRef.current = setInterval(() => {
          document.title = messages[messageIndex];
          messageIndex = (messageIndex + 1) % messages.length;
        }, 2000);
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        document.title = originalTitle.current;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup when component unmounts
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return null;
}
