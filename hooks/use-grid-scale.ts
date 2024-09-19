import { useState, useEffect } from "react";

export function useGridScale(
  totalItems: number,
  containerRef: React.RefObject<HTMLDivElement>
) {
  const [gridDimensions, setGridDimensions] = useState({
    columns: 1,
    rows: 1,
    itemSize: 200,
  });

  useEffect(() => {
    function updateGrid() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const aspectRatio = containerWidth / containerHeight;

        let columns = Math.round(Math.sqrt(totalItems * aspectRatio));
        let rows = Math.ceil(totalItems / columns);

        // Adjust if we have too many rows
        if (rows > columns / aspectRatio) {
          rows = Math.round(Math.sqrt(totalItems / aspectRatio));
          columns = Math.ceil(totalItems / rows);
        }

        const itemWidth = containerWidth / columns;
        const itemHeight = containerHeight / rows;
        const itemSize = Math.min(itemWidth, itemHeight);

        setGridDimensions({ columns, rows, itemSize });
      }
    }

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, [totalItems, containerRef]);

  return gridDimensions;
}
