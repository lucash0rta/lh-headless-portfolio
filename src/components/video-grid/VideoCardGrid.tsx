"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { VideoCard } from "./VideoCard";

export interface GalleryImage {
  asset?: {
    url: string;
  };
  caption?: string | null;
}

export interface ProjectItem {
  _id: string;
  title: string;
  client: string;
  role?: string;
  year: number;
  introText?: string;
  compressedVideo?: string | null;
  longVideo?: string | null;
  gallery?: GalleryImage[];
}

interface Props {
  projects: ProjectItem[];
}

export default function VideoCardGrid({ projects }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <ul className="card-list">
      <AnimatePresence initial={false}>
        {projects.map((project) => (
          <VideoCard
            key={project._id}
            project={project}
            isSelected={selectedId === project._id}
            onOpen={() => setSelectedId(project._id)}
            onClose={() => setSelectedId(null)}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}


