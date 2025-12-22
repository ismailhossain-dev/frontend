import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const useThem = () => {
     const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = (isDark) => {
    setTheme(isDark ? "dark" : "light");
  };

  return { theme, toggleTheme };

};

export default useThem;