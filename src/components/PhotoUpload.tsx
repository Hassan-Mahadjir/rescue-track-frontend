import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  onImageSelect?: (file: File) => void;
  initialImage?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "square";
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-20 h-20",
  lg: "w-24 h-24",
};

const shapeClasses = {
  circle: "rounded-full",
  square: "rounded-lg",
};

export const PhotoUpload = ({
  onImageSelect,
  initialImage,
  className,
  size = "md",
  shape = "circle",
}: PhotoUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(initialImage || null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageSelect?.(file);
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <label className="cursor-pointer relative">
        {selectedImage ? (
          <div className={cn(sizeClasses[size], shapeClasses[shape], "overflow-hidden")}>
            <Image
              src={selectedImage}
              alt="Profile Preview"
              width={size === "sm" ? 64 : size === "md" ? 80 : 96}
              height={size === "sm" ? 64 : size === "md" ? 80 : 96}
              className={cn("object-cover w-full h-full", shapeClasses[shape])}
            />
          </div>
        ) : (
          <div
            className={cn(
              sizeClasses[size],
              shapeClasses[shape],
              "bg-green-700 flex items-center justify-center text-white"
            )}
          >
            +
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
}; 