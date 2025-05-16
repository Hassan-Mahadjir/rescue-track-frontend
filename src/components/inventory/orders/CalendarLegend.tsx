export function CalendarLegend() {
  const legendItems = [
    { color: "bg-yellow-400", label: "Pending" },
    { color: "bg-purple-500", label: "Completed" },
    { color: "bg-red-500", label: "Cancelled" },
    { color: "bg-blue-500", label: "Delivered" },
    { color: "bg-green-500", label: "Received" },
  ];

  return (
    <div className="flex gap-4 mb-4 text-sm">
      <div className="font-semibold">Legend:</div>
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
