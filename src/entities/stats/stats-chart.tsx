import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ViewsChartProps {
  data: {
    date: string;
    views: number;
  }[];
  className?: string;
}

export default function ViewsChart({ data, className = "" }: ViewsChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const chartRef = useRef<HTMLDivElement>(null);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        setDimensions({
          width: chartRef.current.clientWidth,
          height: chartRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Find min and max values for scaling
  const minValue = Math.min(...data.map((d) => d.views));
  const maxValue = Math.max(...data.map((d) => d.views));
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };

  // Calculate chart area dimensions
  const chartWidth = dimensions.width - padding.left - padding.right;
  const chartHeight = dimensions.height - padding.top - padding.bottom;

  // Generate points for the line
  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * chartWidth;
    const y =
      padding.top +
      chartHeight -
      ((d.views - minValue) / (maxValue - minValue || 1)) * chartHeight;
    return { x, y, value: d.views, date: d.date };
  });

  // Generate path for the line
  const linePath =
    points.length > 0
      ? `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}`
      : "";

  // Generate path for the area under the line
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x},${
          padding.top + chartHeight
        } L ${points[0].x},${padding.top + chartHeight} Z`
      : "";

  // Format date for tooltip
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <motion.div
      ref={chartRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`bg-white rounded-xl p-4 ${className}`}
    >
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--color-dark, #121826)" }}
      >
        Просмотры ваших объявлений
      </h3>

      <div className="h-[250px] relative">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          {/* Y-axis grid lines */}
          {Array.from({ length: 5 }).map((_, i) => {
            const y = padding.top + (i / 4) * chartHeight;
            return (
              <line
                key={`grid-y-${i}`}
                x1={padding.left}
                y1={y}
                x2={dimensions.width - padding.right}
                y2={y}
                stroke="rgba(0, 0, 0, 0.05)"
                strokeWidth="1"
              />
            );
          })}

          {/* Area under the line */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            d={areaPath}
            fill="rgba(123, 195, 148, 0.1)"
          />

          {/* Line */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d={linePath}
            fill="none"
            stroke="#7bc394"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Data points */}
          {points.map((point, i) => (
            <g key={`point-${i}`}>
              {/* Invisible larger circle for better hover detection */}
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="transparent"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />

              {/* Visible point */}
              {hoveredPoint === i && (
                <motion.circle
                  initial={{ r: 0 }}
                  animate={{ r: 4 }}
                  cx={point.x}
                  cy={point.y}
                  fill="#7bc394"
                  stroke="white"
                  strokeWidth="2"
                />
              )}
            </g>
          ))}

          {/* X-axis labels (dates) */}
          {points
            .filter((_, i) => i % Math.ceil(points.length / 7) === 0)
            .map((point, i) => {
              const date = new Date(point.date);
              return (
                <text
                  key={`x-label-${i}`}
                  x={point.x}
                  y={padding.top + chartHeight + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {date.getDate()}
                </text>
              );
            })}

          {/* Tooltip */}
          {hoveredPoint !== null && (
            <g>
              <rect
                x={points[hoveredPoint].x - 60}
                y={points[hoveredPoint].y - 45}
                width="120"
                height="35"
                rx="4"
                fill="rgba(0, 0, 0, 0.7)"
              />
              <text
                x={points[hoveredPoint].x}
                y={points[hoveredPoint].y - 25}
                textAnchor="middle"
                fontSize="12"
                fill="white"
              >
                {formatDate(points[hoveredPoint].date)}
              </text>
              <text
                x={points[hoveredPoint].x}
                y={points[hoveredPoint].y - 10}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill="white"
              >
                {points[hoveredPoint].value} просмотров
              </text>
            </g>
          )}
        </svg>
      </div>
    </motion.div>
  );
}
