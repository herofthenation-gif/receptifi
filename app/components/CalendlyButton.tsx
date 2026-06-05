"use client";

const CALENDLY_URL = "https://calendly.com/karmello-koba1ba/30min";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function CalendlyButton({ className, style, children }: Props) {
  function open(e: React.MouseEvent) {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Calendly = (window as any).Calendly;
    if (Calendly?.initPopupWidget) {
      Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank", "noopener");
    }
  }

  return (
    <button type="button" className={className} style={style} onClick={open}>
      {children}
    </button>
  );
}
