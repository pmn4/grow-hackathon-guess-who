import { useState, useEffect } from "react";

export function useGridScale(
  containerRef: React.RefObject<HTMLDivElement>,
  itemCount: number
) {
  const [gridStyle, setGridStyle] = useState({});

  useEffect(() => {
    const calculateGrid = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const aspectRatio = 4.5 / 3; // Aspect ratio of the card (height / width)

      // Calculate the ideal number of columns and rows
      const idealCols = Math.sqrt(
        (itemCount * aspectRatio * containerWidth) / containerHeight
      );
      let cols = Math.round(idealCols);
      let rows = Math.ceil(itemCount / cols);

      rows = Math.ceil(itemCount / cols);

      setGridStyle({
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "8px",
        justifyContent: "center",
        alignContent: "center",
        padding: "8px",
        height: "100%",
      });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, [containerRef, itemCount]);

  return gridStyle;
}
