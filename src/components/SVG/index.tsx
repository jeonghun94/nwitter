interface SVGProps {
  size: number;
  fill: string;
  opacity?: number;
  children: React.ReactNode;
}

export default function SVG({ size, fill, opacity = 1, children }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{
        fill,
        opacity,
      }}
    >
      {/* <g>{children}</g> */}
      {children}
    </svg>
  );
}
