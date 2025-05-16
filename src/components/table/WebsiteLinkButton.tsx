"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface WebsiteLinkButtonProps {
  url: string;
}

export function WebsiteLinkButton({ url }: WebsiteLinkButtonProps) {
  const displayUrl = url.replace(/^https?:\/\//, "");

  return (
    <Button variant="link" asChild className="m-0 p-0">
      <Link href={url} target="_blank" rel="noopener noreferrer">
        {displayUrl}
      </Link>
    </Button>
  );
}
