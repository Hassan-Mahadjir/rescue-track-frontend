export function CalendarLegend() {
  const legendItems = [
    { color: "bg-orange-400", label: "Medication" },
    { color: "bg-yellow-400", label: "Vaccine" },
    { color: "bg-blue-400", label: "Syringe" },
    { color: "bg-green-400", label: "Lab equipment" },
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
