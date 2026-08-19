"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const FRESH_HIGHLIGHT_MS = 3000;

interface MemoryHighlightState {
  baseMemory: Record<string, string | null>;
  freshUntilByKey: Record<string, number>;
  now: number;
}

function createMemoryHighlightStore() {
  let state: MemoryHighlightState = {
    baseMemory: {},
    freshUntilByKey: {},
    now: Date.now(),
  };
  const listeners = new Set<() => void>();

  function notify() {
    for (const listener of listeners) listener();
  }

  function setSnapshot(snapshot: MemoryHighlightState) {
    state = snapshot;
    notify();
  }

  function setBaseMemory(memory: Record<string, string | null>) {
    setSnapshot({ ...state, baseMemory: memory });
  }

  function detectChanges(memory: Record<string, string | null>, loading: boolean) {
    if (
      Object.keys(state.baseMemory).length === 0 &&
      !loading &&
      Object.keys(memory).length > 0
    ) {
      setBaseMemory(memory);
      return;
    }

    const changedKeys: string[] = [];
    for (const key of Object.keys(memory)) {
      if (!(key in state.baseMemory) || state.baseMemory[key] !== memory[key]) {
        changedKeys.push(key);
      }
    }

    if (changedKeys.length === 0) return;

    const mark = Date.now();
    const freshUntilByKey = { ...state.freshUntilByKey };
    for (const key of changedKeys) {
      freshUntilByKey[key] = mark + FRESH_HIGHLIGHT_MS;
    }
    setSnapshot({ ...state, freshUntilByKey });
  }

  function expire() {
    const now = Date.now();
    if (state.now === now) return;
    const freshUntilByKey: Record<string, number> = {};
    for (const [key, until] of Object.entries(state.freshUntilByKey)) {
      if (until > now) freshUntilByKey[key] = until;
    }
    setSnapshot({ ...state, freshUntilByKey, now });
  }

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot() {
      return state;
    },
    detectChanges,
    expire,
  };
}

/**
 * Mantém o snapshot inicial da memória e destaca (por um curto período)
 * as chaves que mudaram depois. Usa useSyncExternalStore para notificar o
 * React sem setState direto dentro de effects, respeitando as regras de
 * purity do React Compiler.
 */
export function useMemoryHighlightState(
  memory: Record<string, string | null>,
  loading: boolean
) {
  const [store] = useState(() => createMemoryHighlightStore());

  useEffect(() => {
    store.detectChanges(memory, loading);
  }, [memory, loading, store]);

  useEffect(() => {
    const interval = setInterval(() => store.expire(), 500);
    return () => clearInterval(interval);
  }, [store]);

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );
}
