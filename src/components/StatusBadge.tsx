interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  open: "bg-green-100 text-green-800",
  closed: "bg-red-100 text-red-800",
  close: "bg-red-100 text-red-800",
  active: "bg-yellow-100 text-yellow-800",
  critical: "bg-red-200 text-red-900",
  stable: "bg-blue-100 text-blue-800",
  serious: "bg-orange-100 text-orange-800",
  good: "bg-green-200 text-green-900",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const normalized = status.toLowerCase();
  const style = statusStyles[normalized] || "bg-gray-100 text-gray-800";
  const capitalize =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <div
      className={`rounded-lg text-sm px-2 py-1 ${style} min-w-[80px] text-center`}
    >
      {capitalize}
    </div>
  );
};

export default StatusBadge;
