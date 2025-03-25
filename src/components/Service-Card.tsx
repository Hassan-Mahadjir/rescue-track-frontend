import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

interface ServiceCardProps {
  title: string;
  imageSrc?: string;
  icon?: React.ReactNode;
  text?: string;
  buttons: { label: string; onClick: () => void }[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  imageSrc,
  icon,
  text,
  buttons,
}) => {
  return (
    <div className="flex flex-col bg-gradient-to-t from-main to-second-green items-center rounded-xl px-4 py-10 space-y-4 w-64">
      <p className="text-center font-semibold text-white">{title}</p>

      {icon ? (
        <div className="text-white text-6xl">{icon}</div> // Display icon if provided
      ) : (
        imageSrc && (
          <Image src={imageSrc} alt="Service icon" width={100} height={100} />
        )
      )}
      <p className="text-white text-xs">{text}</p>

      {buttons.map((button, index) => (
        <Button
          key={index}
          onClick={button.onClick}
          className="w-full bg-white text-main text-lg hover:bg-second-main hover:text-white"
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export default ServiceCard;
