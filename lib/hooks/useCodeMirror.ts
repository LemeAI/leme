"use client";

import { useEffect, useRef, useState } from "react";
import {
  Decoration,
  type DecorationSet,
  EditorView,
  keymap,
  lineNumbers,
  highlightSpecialChars,
  drawSelection,
} from "@codemirror/view";
import { EditorState, Compartment, StateEffect, StateField } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";

const themeCompartment = new Compartment();
const highlightCompartment = new Compartment();

const setHighlightEffect = StateEffect.define<{ from: number; to: number } | null>();

const highlightStateField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(decorations, tr) {
    decorations = decorations.map(tr.changes);
    for (const effect of tr.effects) {
      if (effect.is(setHighlightEffect)) {
        const value = effect.value;
        if (value) {
          decorations = Decoration.set([
            Decoration.mark({ class: "cm-leme-highlight" }).range(value.from, value.to),
          ]);
        } else {
          decorations = Decoration.none;
        }
      }
    }
    return decorations;
  },
  provide: (f) => EditorView.decorations.from(f),
});

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
    ".cm-leme-highlight": {
      backgroundColor: "rgba(255, 106, 0, 0.55)",
      color: "#ffffff",
      borderRadius: "2px",
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
        highlightCompartment.of([highlightStateField]),
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
    if (!view || !search.trim()) return false;
    const doc = view.state.doc;
    const text = doc.toString();

    const normalizedSearch = search.replace(/\s+/g, " ").trim();
    const normalizedText = text.replace(/\s+/g, " ").trim();

    let index = -1;
    let length = 0;

    const tryExact = () => {
      const idx = text.indexOf(search);
      if (idx === -1) return false;
      index = idx;
      length = search.length;
      return true;
    };

    const tryNormalized = () => {
      if (!normalizedSearch) return false;
      const normalizedIndex = normalizedText.indexOf(normalizedSearch);
      if (normalizedIndex === -1) return false;
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
      return true;
    };

    const tryOpenTag = () => {
      const openTagMatch = search.match(/<[^>]+>/);
      if (!openTagMatch) return false;
      const openTag = openTagMatch[0];
      const idx = text.indexOf(openTag);
      if (idx === -1) return false;
      index = idx;
      length = openTag.length;
      return true;
    };

    const tryAttribute = () => {
      const idMatch = search.match(/\bid\s*=\s*["']([^"']+)["']/);
      if (idMatch) {
        const attr = `id="${idMatch[1]}"`;
        const idx = text.indexOf(attr);
        if (idx !== -1) {
          index = idx;
          length = attr.length;
          return true;
        }
      }
      const classMatch = search.match(/\bclass\s*=\s*["']([^"']+)["']/);
      if (classMatch) {
        const classValue = classMatch[1].split(/\s+/).filter(Boolean)[0];
        if (classValue) {
          const attr = `class="${classMatch[1]}"`;
          const idx = text.indexOf(attr);
          if (idx !== -1) {
            index = idx;
            length = attr.length;
            return true;
          }
          const short = `class="${classValue}`;
          const idx2 = text.indexOf(short);
          if (idx2 !== -1) {
            index = idx2;
            length = short.length;
            return true;
          }
        }
      }
      return false;
    };

    const tryPrefix = () => {
      if (!normalizedSearch) return false;
      const prefix = normalizedSearch
        .slice(0, 80)
        .split("")
        .filter((c) => !/\s/.test(c))
        .join("");
      if (!prefix) return false;
      const idx = text.indexOf(prefix);
      if (idx === -1) return false;
      index = idx;
      length = prefix.length;
      return true;
    };

    const tryText = () => {
      const label = search
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (label.length < 3) return false;
      const first = text.indexOf(label);
      if (first === -1) return false;
      const second = text.indexOf(label, first + 1);
      if (second !== -1) return false;
      index = first;
      length = label.length;
      return true;
    };

    if (
      tryExact() ||
      tryNormalized() ||
      tryOpenTag() ||
      tryAttribute() ||
      tryText() ||
      tryPrefix()
    ) {
      const matchFrom = index;
      const matchTo = index + length;
      const startLine = doc.lineAt(matchFrom);
      const endLine = doc.lineAt(matchTo);
      const selectionFrom = startLine.from;
      const selectionTo = endLine.to;

      view.dispatch({
        selection: { anchor: selectionFrom, head: selectionTo },
        effects: [
          EditorView.scrollIntoView(matchFrom, { y: "center" }),
          setHighlightEffect.of({ from: matchFrom, to: matchTo }),
        ],
      });
      view.focus();
      return true;
    }

    return false;
  };

  return { containerRef, value, setValue: setEditorValue, selectText };
}
