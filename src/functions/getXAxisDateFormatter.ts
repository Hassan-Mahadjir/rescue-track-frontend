export const getXAxisFormatter = (duration: string) => {
  switch (duration) {
    case "Today":
      return (date: string) =>
        new Date(date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
    case "This Week":
      return (date: string) =>
        new Date(date).toLocaleDateString("en-US", { weekday: "short" });
    case "This Month":
      return (date: string) => {
        const day = new Date(date).getDate();
        if (day <= 7) return "Week 1";
        if (day <= 14) return "Week 2";
        if (day <= 21) return "Week 3";
        return "Week 4";
      };
    default:
      return (date: string) => date;
  }
};
