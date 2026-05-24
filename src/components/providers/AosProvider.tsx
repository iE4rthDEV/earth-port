"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

interface AosProviderProps {
  children: React.ReactNode;
}

const AosProvider: React.FC<AosProviderProps> = ({ children }) => {
  useEffect(() => {
    AOS.init({
      disable: window.innerWidth < 1024,
      duration: 1000,
      easing: "ease-out",
    });
  }, []);

  return <>{children}</>;
};

export default AosProvider;
