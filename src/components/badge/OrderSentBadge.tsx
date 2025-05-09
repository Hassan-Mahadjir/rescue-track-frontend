interface OrderSentBadgeProps {
  count: number;
}

const OrderSentBadge = ({ count }: OrderSentBadgeProps) => {
  return (
    <div className="w-2/3 rounded px-2 py-1 text-sm font-semibold text-center bg-blue-200 text-blue-800">
      {count}
    </div>
  );
};

export default OrderSentBadge;
