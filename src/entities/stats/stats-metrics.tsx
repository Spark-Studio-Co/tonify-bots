import { motion } from "framer-motion";

interface Metric {
  label: string;
  value: number;
}

interface StatsMetricsProps {
  metrics: Metric[];
  className?: string;
}

export default function StatsMetrics({
  metrics,
  className = "",
}: StatsMetricsProps) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="bg-white rounded-xl p-4 text-center"
        >
          <div
            className="text-xl font-bold mb-1"
            style={{ color: "var(--color-main, #627ffe)" }}
          >
            {metric.value.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
