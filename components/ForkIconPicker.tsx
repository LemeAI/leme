"use client";

import { useState } from "react";
import type { ForkIconChoice, ForkIconType } from "@/lib/types";

const PRESET_EMOJIS = ["🚀", "💡", "🎨", "⚡", "🔥", "✨", "🛠️", "📐", "🔮", "🌿", "🎯", "🔧"];

const PRESET_COLORS = [
  "#ff6a00",
  "#3b82f6",
  "#10b981",
  "#8b5cf6",
  "#ef4444",
  "#f59e0b",
  "#06b6d4",
  "#ec4899",
];

const DEFAULT_COLOR = "#ff6a00";

interface ForkIconPickerProps {
  value: ForkIconChoice;
  onChange: (value: ForkIconChoice) => void;
}

export default function ForkIconPicker({ value, onChange }: ForkIconPickerProps) {
  const [type, setType] = useState<ForkIconType>(value.type);
  const [emoji, setEmoji] = useState(value.type === "emoji" ? value.value : "🚀");
  const [text, setText] = useState(value.type === "text" ? value.value : "F");
  const [color, setColor] = useState(value.color ?? DEFAULT_COLOR);

  function update(next: Partial<ForkIconChoice>) {
    onChange({
      type,
      value: type === "emoji" ? emoji : text,
      color,
      ...next,
    });
  }

  function switchType(nextType: ForkIconType) {
    setType(nextType);
    update({ type: nextType, value: nextType === "emoji" ? emoji : text });
  }

  const preview = type === "emoji" ? emoji : text.slice(0, 2);

  return (
    <div className="rounded-lg border border-line-soft bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg text-2xl"
            style={{ backgroundColor: color }}
          >
            <span className="leading-none">{preview}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Ícone do fork</p>
            <p className="text-xs text-mute">Escolha um emoji ou texto curto</p>
          </div>
        </div>
      </div>

      <div className="mb-3 flex gap-1 rounded-md border border-line-soft bg-black/40 p-1">
        <button
          type="button"
          onClick={() => switchType("emoji")}
          className={`flex-1 rounded py-1.5 text-xs font-medium transition-colors ${
            type === "emoji" ? "bg-white text-black" : "text-mute hover:text-white"
          }`}
        >
          Emoji
        </button>
        <button
          type="button"
          onClick={() => switchType("text")}
          className={`flex-1 rounded py-1.5 text-xs font-medium transition-colors ${
            type === "text" ? "bg-white text-black" : "text-mute hover:text-white"
          }`}
        >
          Texto
        </button>
      </div>

      {type === "emoji" ? (
        <div className="mb-3 grid grid-cols-6 gap-2">
          {PRESET_EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => {
                setEmoji(e);
                update({ type: "emoji", value: e });
              }}
              className={`flex h-9 items-center justify-center rounded-md text-lg transition-colors ${
                emoji === e ? "bg-brand-500/20 text-brand-500" : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {e}
            </button>
          ))}
          <input
            type="text"
            value={emoji}
            onChange={(e) => {
              const value = e.target.value.slice(0, 2);
              setEmoji(value);
              update({ type: "emoji", value });
            }}
            placeholder="🚀"
            className="col-span-2 flex h-9 items-center justify-center rounded-md border border-line bg-white/5 px-2 text-center text-lg outline-none focus:border-brand-500"
          />
        </div>
      ) : (
        <div className="mb-3">
          <input
            type="text"
            value={text}
            maxLength={2}
            onChange={(e) => {
              const value = e.target.value.slice(0, 2).toUpperCase();
              setText(value);
              update({ type: "text", value });
            }}
            placeholder="F"
            className="field-input w-full text-center text-lg"
          />
        </div>
      )}

      <div>
        <p className="mb-2 text-xs font-medium text-mute">Cor de fundo</p>
        <div className="flex flex-wrap items-center gap-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setColor(c);
                update({ color: c });
              }}
              className={`h-7 w-7 rounded-full transition-transform ${
                color === c ? "scale-110 ring-2 ring-white" : "hover:scale-105"
              }`}
              style={{ backgroundColor: c }}
              aria-label={`Cor ${c}`}
            />
          ))}
          <label className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-line bg-white/5 hover:bg-white/10">
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                update({ color: e.target.value });
              }}
              className="sr-only"
            />
            <span className="text-xs">+</span>
          </label>
        </div>
      </div>
    </div>
  );
}
