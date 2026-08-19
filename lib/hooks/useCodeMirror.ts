"use client";

import { useEffect, useRef, useState } from "react";
import { EditorView, keymap, lineNumbers, highlightSpecialChars, drawSelection } from "@codemirror/view";
import { EditorState, Compartment } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";

const themeCompartment = new Compartment();

const lemeTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#0a0a0b",
      color: "#ffffff",
      fontSize: "13px",
      height: "100%",
    },
    ".cm-content": {
      caretColor: "#ff6a00",
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      padding: "12px 0",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#ff6a00",
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": {
      backgroundColor: "rgba(255, 106, 0, 0.25)",
    },
    ".cm-gutters": {
      backgroundColor: "#101012",
      color: "#8a8a91",
      borderRight: "1px solid rgba(255,255,255,0.07)",
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    ".cm-activeLineGutter": {
      backgroundColor: "rgba(255, 106, 0, 0.08)",
    },
    ".cm-activeLine": {
      backgroundColor: "rgba(255, 106, 0, 0.05)",
    },
    ".cm-matchingBracket": {
      color: "#ff6a00",
      outline: "1px solid rgba(255, 106, 0, 0.4)",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 10px 0 8px",
    },
  },
  { dark: true }
);

interface UseCodeMirrorOptions {
  initialValue?: string;
  onChange?: (value: string) => void;
}

/**
 * Hook para montar um editor CodeMirror 6 com syntax highlighting de HTML
 * e tema escuro nas cores da Leme. Uso somente em Client Components.
 */
export function useCodeMirror({ initialValue = "", onChange }: UseCodeMirrorOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (!containerRef.current || viewRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const newValue = update.state.doc.toString();
        setValue(newValue);
        onChange?.(newValue);
      }
    });

    const startState = EditorState.create({
      doc: initialValue,
      extensions: [
        lineNumbers(),
        highlightSpecialChars(),
        history(),
        drawSelection(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        html(),
        oneDark,
        themeCompartment.of(lemeTheme),
        updateListener,
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [initialValue, onChange]);

  const setEditorValue = (newValue: string) => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current === newValue) return;
    view.dispatch({
      changes: { from: 0, to: current.length, insert: newValue },
    });
    setValue(newValue);
  };

  return { containerRef, value, setValue: setEditorValue };
}
