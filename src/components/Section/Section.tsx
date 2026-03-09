"use client";

import { useEffect, useState, ReactNode, useReducer } from "react";
import { twMerge } from "tailwind-merge";
import { produce } from "immer";

export interface SectionProps {
  title: string;
  children: ReactNode;
  slotProps?: {
    root?: React.HTMLProps<HTMLDivElement>;
  };
}

const CHAR_MS = 55;

interface State {
  displayed: string;
  lineVisible: boolean;
  contentVisible: boolean;
}

type Actions =
  | {
      type: "UPDATE_DISPLAYED";
      payload: string;
    }
  | {
      type: "MAKE_VISIBLE";
    }
  | { type: "RESET" };

const initialState = {
  displayed: "",
  lineVisible: false,
  contentVisible: false,
} as const satisfies State;

const reducer = produce((draft: State, action: Actions) => {
  switch (action.type) {
    case "UPDATE_DISPLAYED":
      draft.displayed = action.payload;
      break;
    case "MAKE_VISIBLE":
      draft.lineVisible = true;
      draft.contentVisible = true;
      break;
    case "RESET":
      return initialState;
    default: {
      const type = (action as any).type;
      throw new Error(`Unknown action type: ${type}`);
    }
  }
});

export function Section({ title, children, slotProps }: SectionProps) {
  const [{ displayed, lineVisible, contentVisible }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    dispatch({ type: "RESET" });

    let i = 0;
    const typing = setInterval(() => {
      i++;
      dispatch({ type: "UPDATE_DISPLAYED", payload: title.slice(0, i) });
      if (i >= title.length) {
        clearInterval(typing);
        dispatch({ type: "MAKE_VISIBLE" });
      }
    }, CHAR_MS);

    return () => clearInterval(typing);
  }, [title]);

  return (
    <>
      <div
        className={twMerge(
          "mb-8 flex items-center gap-2 min-h-[40px]",
          slotProps?.root?.className,
        )}
        {...slotProps?.root}
      >
        <span className="font-pixel text-xl text-pink">❯</span>
        <h1 className="font-retro text-4xl text-body uppercase">{displayed}</h1>
        <div
          className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent transition-all duration-[1500ms] ease-out"
          style={{
            boxShadow: "0 0 6px rgba(0,207,255,0.2)",
            transformOrigin: "left",
            transform: lineVisible ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </div>

      <div
        className="transition-opacity duration-500"
        style={{ opacity: contentVisible ? 1 : 0 }}
      >
        {children}
      </div>
    </>
  );
}
