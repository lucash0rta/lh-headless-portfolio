"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { ProjectItem } from "./VideoCardGrid";

const openSpring = { type: "spring", stiffness: 200, damping: 30 } as const;
const closeSpring = { type: "spring", stiffness: 300, damping: 35 } as const;

const dismissDistance = 150;

interface Props {
  project: ProjectItem;
  isSelected: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function VideoCard({ project, isSelected, onOpen, onClose }: Props) {
  const y = useMotionValue(0);
  const zIndex = useMotionValue(isSelected ? 2 : 0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [exitButtonVisible, setExitButtonVisible] = useState(false);
  const gallery = project.gallery ?? [];

  function handleCheckSwipeToDismiss() {
    if (y.get() > dismissDistance) onClose();
  }

  function openGallery(index: number) {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  }

  function closeGallery() {
    setGalleryOpen(false);
  }

  function nextImage() {
    if (gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    }
  }

  function prevImage() {
    if (gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  }

  // Simplify z-index management for modern Framer Motion API
  if (isSelected && zIndex.get() !== 2) zIndex.set(2);
  if (!isSelected && zIndex.get() !== 0) zIndex.set(0);

  // Handle exit button visibility with delay
  useEffect(() => {
    if (isSelected) {
      const timer = setTimeout(() => {
        setExitButtonVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setExitButtonVisible(false);
    }
  }, [isSelected]);

  return (
    <li className="card">
      <div className={`card-content-container ${isSelected ? "open" : ""}`}>
        <motion.div
          ref={cardRef}
          className="card-content"
          style={{ zIndex, y }}
          layout
          transition={isSelected ? openSpring : closeSpring}
          drag={isSelected ? "y" : false}
          dragConstraints={{ top: -500, bottom: 0 }}
          onDrag={handleCheckSwipeToDismiss}
        >
          <div className="card-image-container">
            {project.compressedVideo ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src={project.compressedVideo} type="video/mp4" />
              </video>
            ) : null}
          </div>

          {isSelected ? (
            <>
              <div className="project-overlay">
                <button className={`exit-button ${exitButtonVisible ? 'visible' : ''}`} onClick={onClose} aria-label="Close project">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="content-container">
                <div className="card-title-container">
                  <h2 className="card-title">{project.client}</h2>
                  <div className="card-category">{project.title}<br/>{project.year}</div>
                </div>
                {project.introText ? <p>{project.introText}</p> : null}
                {project.longVideo ? (
                  project.longVideo.includes("youtube.com") || project.longVideo.includes("youtu.be") ? (
                    <div
                      style={{
                        position: "relative",
                        paddingBottom: "56.25%", // 16:9 ratio
                        height: 0,
                        overflow: "hidden",
                        marginTop: 16,
                      }}
                    >
                      <iframe
                        src={
                          project.longVideo.includes("watch?v=")
                            ? project.longVideo.replace("watch?v=", "embed/")
                            : project.longVideo.replace("youtu.be/", "www.youtube.com/embed/")
                        }
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                  ) : (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      style={{ width: "100%", marginTop: 16 }}
                    >
                      <source src={project.longVideo} type="video/mp4" />
                    </video>
                  )
                ) : null}
              {gallery.length > 0 ? (
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ marginBottom: 12 }}>Gallery</h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: 12
                    }}
                  >
                    {gallery.map((img, idx) => (
                      <div key={idx} style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => openGallery(idx)}>
                        {img.asset?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={img.asset.url}
                            alt={img.caption || `Gallery image ${idx + 1}`}
                            style={{ width: "100%", height: "auto", display: "block" }}
                          />
                        ) : null}
                        {img.caption ? (
                          <p style={{ padding: 8, fontSize: 14, color: "#666666", fontFamily: "'Inter', sans-serif" }}>{img.caption}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              </div>
            </>
          ) : null}
        </motion.div>
      </div>

      {!isSelected ? (
        <button className="card-open-link" aria-label="Open project" onClick={onOpen} />
      ) : null}

      {/* Main view titles under cards */}
      <div className={`main-title-container ${isSelected ? 'blurred' : ''}`}>
        <h2 className="main-title">{project.client}</h2>
        <div className="main-category">{project.title}<br/>{project.year}</div>
      </div>

      {/* Gallery Modal */}
      {galleryOpen && project.gallery && (
        <div className="gallery-modal" onClick={closeGallery}>
          <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-exit-button" onClick={closeGallery} aria-label="Close gallery">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="gallery-nav-button gallery-nav-left" onClick={prevImage} aria-label="Previous image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="gallery-nav-button gallery-nav-right" onClick={nextImage} aria-label="Next image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="gallery-image-container">
              {gallery[currentImageIndex]?.asset?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={gallery[currentImageIndex].asset.url}
                  alt={gallery[currentImageIndex].caption || `Gallery image ${currentImageIndex + 1}`}
                  className="gallery-image"
                />
              )}
            </div>

            <div className="gallery-dots">
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  className={`gallery-dot ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}



