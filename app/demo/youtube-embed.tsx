"use client";
import { useState } from "react";

interface YoutubeEmbedProps {
    videoId: string;
    title?: string;
}

export function YoutubeEmbed({
    videoId,
    title
}: YoutubeEmbedProps) {
    
    const [isPlaying, setIsPlaying] = useState(false);

    if (isPlaying) {
        return (
            <iframe 
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
        )
    }

    return (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="relative w-full h-full group"
          aria-label={`Play ${title}`}
        >
            <img 
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-lg">
                    <span className="ml-1 text-xl">▶</span>
                </div>
            </div>
        </button>
    )
} 