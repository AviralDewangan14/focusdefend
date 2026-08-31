import { create } from "zustand";


// 8 scenes for the Part3B-1 Cinematic Story
export type SceneType = "scene01" | "scene02" | "scene03" | "scene04" | "scene05" | "scene06" | "scene07" | "scene08";

interface StoreState {
  currentScene: SceneType;
  setCurrentScene: (scene: SceneType) => void;
  phoneRef: React.RefObject<HTMLDivElement | null> | null;
  cameraRigRef: React.RefObject<HTMLDivElement | null> | null;
  aiCoreRef: React.RefObject<HTMLDivElement | null> | null;
  setPhoneRef: (ref: React.RefObject<HTMLDivElement | null>) => void;
  setCameraRigRef: (ref: React.RefObject<HTMLDivElement | null>) => void;
  setAiCoreRef: (ref: React.RefObject<HTMLDivElement | null>) => void;
}

export const useStore = create<StoreState>((set) => ({
  currentScene: "scene01",
  setCurrentScene: (scene) => set({ currentScene: scene }),
  phoneRef: null,
  cameraRigRef: null,
  aiCoreRef: null,
  setPhoneRef: (ref) => set({ phoneRef: ref }),
  setCameraRigRef: (ref) => set({ cameraRigRef: ref }),
  setAiCoreRef: (ref) => set({ aiCoreRef: ref }),
}));
