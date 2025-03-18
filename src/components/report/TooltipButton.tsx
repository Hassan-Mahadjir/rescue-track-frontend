import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button, ButtonProps } from "@/components/ui/button";
import { ReactNode } from "react";

interface TooltipButtonProps extends ButtonProps {
  tooltipText: string;
  children: ReactNode;
}

export const TooltipButton = ({
  tooltipText,
  children,
  ...props
}: TooltipButtonProps) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          className="hover:bg-main hover:text-white"
          variant="outline"
          {...props}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-white text-black">
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};
