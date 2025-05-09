interface StockLevelBadgeProps {
  level: "Full" | "Empty" | "Re-order" | string;
}

const stockStyles: Record<string, string> = {
  Full: "bg-green-100 text-green-800",
  Empty: "bg-red-100 text-red-800",
  "Re-order": "bg-yellow-100 text-yellow-800",
  Low: "bg-blue-100 text-blue-800",
};

const StockLevelBadge = ({ level }: StockLevelBadgeProps) => {
  const style = stockStyles[level] || stockStyles["Low"];

  return (
    <div
      className={`rounded-lg text-sm px-2 py-1 flex justify-center items-center ${style}`}
    >
      {level}
    </div>
  );
};

export default StockLevelBadge;
