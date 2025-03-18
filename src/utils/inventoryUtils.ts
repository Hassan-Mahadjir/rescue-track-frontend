//To make the stock field dynamic based on the quantity
export const calculateStockLevel = (quantity: number): string => {
  if (quantity === 0) {
    return "Empty";
  } else if (quantity <= 10) {
    return "Re-order";
  } else if (quantity <= 50) {
    return "Mid";
  } else {
    return "Full";
  }
};

// Function to calculate stock summary
export const calculateStockSummary = (inventory: InventoryMedication[]) => {
  const stockLevels = {
    Full: 0,
    Mid: 0,
    Low: 0,
    Reorder: 0,
  };

  inventory.forEach((item) => {
    const stockLevel = calculateStockLevel(item.quantity);
    if (stockLevel === "Full") {
      stockLevels.Full += item.quantity;
    } else if (stockLevel === "Mid") {
      stockLevels.Mid += item.quantity;
    } else if (stockLevel === "Re-order") {
      stockLevels.Reorder += item.quantity;
    }
  });

  return [
    {
      name: "Total Materials",
      Full: stockLevels.Full,
      Mid: stockLevels.Mid,
      Low: stockLevels.Low,
      Reorder: stockLevels.Reorder,
    },
  ];
};
