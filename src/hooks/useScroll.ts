import React, { useState } from "react";

const useScroll = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  return {
    scrollTop,
    setScrollTop,
  }
}