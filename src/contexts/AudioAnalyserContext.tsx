"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useRef } from "react";

type AnalyserRef = React.MutableRefObject<AnalyserNode | null>;

const AudioAnalyserContext = createContext<AnalyserRef | null>(null);

export function AudioAnalyserProvider({ children }: { children: ReactNode }) {
  const ref = useRef<AnalyserNode | null>(null);
  return (
    <AudioAnalyserContext.Provider value={ref}>
      {children}
    </AudioAnalyserContext.Provider>
  );
}

export function useSharedAnalyserRef(): AnalyserRef | null {
  return useContext(AudioAnalyserContext);
}
