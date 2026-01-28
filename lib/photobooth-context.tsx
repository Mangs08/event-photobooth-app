import React, { createContext, useContext, useState, ReactNode } from "react";
import type { PhotoboothMode, PhotoboothPhoto, Enhancement, PhotoboothContextType } from "./types";

const PhotoboothContext = createContext<PhotoboothContextType | undefined>(undefined);

export function PhotoboothProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PhotoboothMode>("idle");
  const [photos, setPhotos] = useState<PhotoboothPhoto[]>([]);
  const [currentEnhancement, setCurrentEnhancement] = useState<Enhancement | null>(null);

  const addPhoto = (photo: PhotoboothPhoto) => {
    setPhotos((prev) => [...prev, photo]);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const clearPhotos = () => {
    setPhotos([]);
  };

  return (
    <PhotoboothContext.Provider
      value={{
        mode,
        setMode,
        photos,
        addPhoto,
        removePhoto,
        clearPhotos,
        currentEnhancement,
        setCurrentEnhancement,
      }}
    >
      {children}
    </PhotoboothContext.Provider>
  );
}

export function usePhotobooth() {
  const context = useContext(PhotoboothContext);
  if (context === undefined) {
    throw new Error("usePhotobooth must be used within a PhotoboothProvider");
  }
  return context;
}
