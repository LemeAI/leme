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
      backgroundColor: "rgba(255, 106, 0, 0.45)",
      color: "#ffffff",
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

  const selectText = (search: string) => {
    const view = viewRef.current;
    if (!view) return false;
    const doc = view.state.doc;
    const text = doc.toString();

    const normalizedSearch = search.replace(/\s+/g, " ").trim();
    const normalizedText = text.replace(/\s+/g, " ").trim();

    let index = text.indexOf(search);
    let length = search.length;

    if (index === -1 && normalizedSearch) {
      const normalizedIndex = normalizedText.indexOf(normalizedSearch);
      if (normalizedIndex !== -1) {
        let originalIndex = 0;
        let seenNonWhitespace = 0;
        while (originalIndex < text.length && seenNonWhitespace < normalizedIndex) {
          if (!/\s/.test(text[originalIndex])) {
            seenNonWhitespace++;
          }
          originalIndex++;
        }
        index = originalIndex;
        length = 0;
        let seen = 0;
        while (originalIndex < text.length && seen < normalizedSearch.length) {
          if (!/\s/.test(text[originalIndex])) {
            seen++;
          }
          length++;
          originalIndex++;
        }
      }
    }

    if (index === -1) {
      const openTagMatch = search.match(/<[^>]+>/);
      if (openTagMatch) {
        const openTag = openTagMatch[0];
        index = text.indexOf(openTag);
        length = openTag.length;
      }
    }

    if (index === -1 && normalizedSearch.length > 0) {
      const prefix = normalizedSearch.slice(0, 80).split("").filter((c) => !/\s/.test(c)).join("");
      if (prefix) {
        index = text.indexOf(prefix);
        length = prefix.length;
      }
    }

    if (index === -1) return false;

    view.dispatch({
      selection: { anchor: index, head: index + length },
      effects: EditorView.scrollIntoView(index, { y: "center" }),
    });
    view.focus();
    return true;
  };

  return { containerRef, value, setValue: setEditorValue, selectText };
}
