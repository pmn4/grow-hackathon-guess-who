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

      // Adjust columns to fit within min and max card width
      // cols = Math.min(
      //   Math.max(cols, Math.floor(containerWidth / maxCardWidth)),
      //   Math.floor(containerWidth / minCardWidth)
      // );
      rows = Math.ceil(itemCount / cols);

      // const cardWidth = containerWidth / cols - 16; // 16px for gap
      // const cardHeight = cardWidth * aspectRatio;

      // console.log({
      //   cardWidth,
      //   cardHeight,
      //   containerHeight,
      //   totalCardHeight: cardHeight * rows,
      // });

      // If cards are too tall, adjust rows and recalculate columns
      // if (cardHeight * rows > containerHeight) {
      //   rows = Math.floor(containerHeight / (cardHeight + 16)); // 16px for gap
      //   cols = Math.ceil(itemCount / rows);
      // }

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
