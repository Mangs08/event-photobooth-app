// Photobooth App Types

export type PhotoboothMode = "idle" | "capture" | "preview" | "enhancement";

export interface PhotoboothPhoto {
  id: string;
  uri: string;
  timestamp: number;
  width?: number;
  height?: number;
}

export interface Enhancement {
  id: string;
  name: string;
  type: "filter" | "overlay" | "frame";
  value: string;
}

export interface PhotoboothContextType {
  mode: PhotoboothMode;
  setMode: (mode: PhotoboothMode) => void;
  photos: PhotoboothPhoto[];
  addPhoto: (photo: PhotoboothPhoto) => void;
  removePhoto: (id: string) => void;
  clearPhotos: () => void;
  currentEnhancement: Enhancement | null;
  setCurrentEnhancement: (enhancement: Enhancement | null) => void;
}
