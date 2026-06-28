"use client";

import { Button } from "@/components/ui/button";
import { handleCopy } from "@/lib/utils";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  content: string;
};

export function CopyContextButton({ content }: Props) {
    const [copied, setCopied] = useState(false);

function handleContextCopy() {
    handleCopy(content || "");
    toast.success("Context copied.");
    setCopied(true);
    setTimeout(() => {
        setCopied(false);
    }, 2000)
  }

  return (
    <Button
      variant="outline"
      onClick={() => handleContextCopy()}
      disabled={copied}
    >
      <Copy className="mr-2 h-4 w-4" />
      {copied ? "Copied" :"Copy Context"}
    </Button>
  );
}