"use client";

export default function HtmlViewer({
  src,
  title,
  fill = false,
}: {
  src: string;
  title: string;
  /** Ocupa 100% do container pai, sem borda/cartão — usado no viewer fullscreen. */
  fill?: boolean;
}) {
  const iframe = (
    <iframe
      src={src}
      title={title}
      // Sandbox restritivo: permite scripts e formulários dentro do HTML
      // renderizado, mas bloqueia acesso a same-origin, popups, etc.
      sandbox="allow-scripts allow-forms allow-popups allow-modals"
      referrerPolicy="no-referrer"
      className={fill ? "h-full w-full border-0 bg-white" : "h-[70vh] w-full bg-white"}
    />
  );

  if (fill) {
    return iframe;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line-soft bg-white">{iframe}</div>
  );
}
