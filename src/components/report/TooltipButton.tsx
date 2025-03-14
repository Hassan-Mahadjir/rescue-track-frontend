import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button, ButtonProps } from "@/components/ui/button";
import { ReactNode } from "react";

// Define the props for the TooltipButton component
interface TooltipButtonProps extends ButtonProps {
  tooltipText: string; // The text to display in the tooltip
  children: ReactNode; // The content inside the button (e.g., icons, text)
}

export const TooltipButton = ({
  tooltipText,
  children,
  ...props
}: TooltipButtonProps) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button {...props}>{children}</Button>
      </TooltipTrigger>
      <TooltipContent className="bg-white text-black">
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};
