"use client";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ApiKeyForm() {
    const [apikey, setApikey] = useState("");
    const [showKey, setShowKey] = useState(false);

    return (
        <div className="space-y-4 mt-4">
            <div className="relative">
                <Input
                    type={showKey ? "password" : "text"}
                    value={apikey}
                    onChange={(e) =>  setApikey(e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="pr-10"
                />

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className='absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2'
                    onClick={() =>  setShowKey(current => !current)}
                >
                    {
                        showKey
                        ? <EyeOff className="h-4 w-4" />
                        : <Eye className="h-4 w-4" />
                    }
                </Button>
            </div>
            <Button disabled={!apikey.trim()}>
                Save API Key
            </Button>
        </div>
    )
}