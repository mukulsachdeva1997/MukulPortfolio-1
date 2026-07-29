import broomWebp from "@/assets/broom.webp";
import { cn } from "@/lib/utils";

const TEXTURE =
  "absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0_1px,transparent_1px_9px)] pointer-events-none";

function KnowYourRightsBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden flex items-center justify-end pr-8 bg-gradient-to-br from-[hsl(224,55%,30%)] to-[hsl(221,78%,55%)]",
        className
      )}
    >
      <div className={TEXTURE} />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 w-[62px] h-[62px] stroke-white opacity-90"
      >
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <g className="animate-banner-tip origin-[12px_7px]">
          <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
        </g>
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute z-10 top-5 right-6 w-5 h-5 stroke-white/75"
      >
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
        <path d="M4 17v2" />
        <path d="M5 18H3" />
      </svg>
    </div>
  );
}

const ORBIT_CX = 160;
const ORBIT_CY = 82;
const ORBIT_R = 46;
const AVATAR_ANGLES = [-90, 30, 150];
const USER_PATH = "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2";
const BROOM_SIZE = 44;

function TidyTeamBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-secondary to-[hsl(148,55%,34%)]",
        className
      )}
    >
      <div className={TEXTURE} />
      <svg
        className="absolute inset-0 w-full h-full z-10"
        viewBox={`0 0 ${ORBIT_CX * 2} 160`}
      >
        <circle
          cx={ORBIT_CX}
          cy={ORBIT_CY}
          r={ORBIT_R}
          className="fill-none stroke-white/40 animate-banner-orbit-dash"
          strokeWidth={1.5}
          strokeDasharray="3 6"
          strokeLinecap="round"
        />
        <image
          href={broomWebp}
          x={ORBIT_CX - BROOM_SIZE / 2}
          y={ORBIT_CY - BROOM_SIZE / 2}
          width={BROOM_SIZE}
          height={BROOM_SIZE}
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" }}
        />
        {AVATAR_ANGLES.map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = ORBIT_CX + ORBIT_R * Math.cos(rad);
          const y = ORBIT_CY + ORBIT_R * Math.sin(rad);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={15} className="fill-white/[0.16] stroke-white/70" strokeWidth={1.5} />
              <g transform={`translate(${x - 8}, ${y - 9}) scale(0.72)`}>
                <path d={USER_PATH} className="stroke-white fill-none" strokeWidth={2} />
                <circle cx={12} cy={7} r={4} className="stroke-white fill-none" strokeWidth={2} />
              </g>
            </g>
          );
        })}
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute z-10 top-4 left-4 w-[18px] h-[18px] opacity-[0.85]"
      >
        <path d="m3 17 2 2 4-4" />
        <path d="m3 7 2 2 4-4" />
        <path d="M13 6h8" />
        <path d="M13 12h8" />
        <path d="M13 18h8" />
      </svg>
    </div>
  );
}

const GRAPH_W = 320;
const GRAPH_H = 160;
const FIRM_CLUSTERS = [
  {
    color: "var(--primary)",
    label: "FIRM A",
    labelPos: [8, 10] as [number, number],
    nodes: [
      [18, 20],
      [30, 12],
      [35, 30],
      [15, 35],
      [25, 42],
    ] as [number, number][],
  },
  {
    color: "var(--secondary)",
    label: "FIRM B",
    labelPos: [8, 97] as [number, number],
    nodes: [
      [18, 65],
      [30, 58],
      [38, 76],
      [14, 82],
      [26, 90],
    ] as [number, number][],
  },
  {
    color: "hsl(38,85%,62%)",
    label: "FIRM C",
    labelPos: [66, 10] as [number, number],
    nodes: [
      [68, 25],
      [80, 18],
      [90, 36],
      [72, 46],
      [85, 52],
      [76, 62],
    ] as [number, number][],
  },
];
// sparse cross-cluster bridges: [clusterA, nodeIndexA, clusterB, nodeIndexB]
const BRIDGES: [number, number, number, number][] = [
  [0, 2, 0, 2],
  [1, 4, 2, 0],
  [0, 0, 1, 0],
];

function ThesisBanner({ className }: { className?: string }) {
  const scaled = FIRM_CLUSTERS.map((c) =>
    c.nodes.map(([x, y]) => [(x / 100) * GRAPH_W, (y / 100) * GRAPH_H] as [number, number])
  );

  let nodeIndex = 0;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br from-[hsl(224,32%,13%)] to-[hsl(220,30%,20%)]",
        className
      )}
    >
      <div className={TEXTURE} />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${GRAPH_W} ${GRAPH_H}`}
      >
        {scaled.map((pts, ci) =>
          pts.map((p, i) =>
            pts.slice(i + 1).map((q, j) => (
              <line
                key={`w-${ci}-${i}-${j}`}
                x1={p[0]}
                y1={p[1]}
                x2={q[0]}
                y2={q[1]}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth={1}
              />
            ))
          )
        )}

        {BRIDGES.map(([ca, na, cb, nb], i) => {
          const p = scaled[ca][na];
          const q = scaled[cb][nb];
          return (
            <line
              key={`bridge-${i}`}
              x1={p[0]}
              y1={p[1]}
              x2={q[0]}
              y2={q[1]}
              className="stroke-white/30"
              strokeWidth={1}
              strokeDasharray="2 3"
            />
          );
        })}

        {FIRM_CLUSTERS.map((c, ci) => {
          const [lx, ly] = c.labelPos;
          const nodeEls = scaled[ci].map(([x, y]) => {
            const duration = 2.6 + (nodeIndex % 4) * 0.35;
            const delay = (nodeIndex % 5) * -0.5;
            nodeIndex++;
            return (
              <circle
                key={`n-${ci}-${x}-${y}`}
                className="animate-banner-levitate"
                style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
                cx={x}
                cy={y}
                r={2.6}
                fill={c.color}
                opacity={0.9}
              />
            );
          });
          return (
            <g key={c.label}>
              {nodeEls}
              <text
                x={(lx / 100) * GRAPH_W}
                y={(ly / 100) * GRAPH_H}
                fill={c.color}
                className="font-mono text-[9px] tracking-wide opacity-[0.85]"
              >
                {c.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const CHART_BAR_HEIGHTS = [18, 28, 24, 40, 34, 52, 46, 64, 58, 76];

function IqviaBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br from-primary to-[hsl(200,65%,46%)]",
        className
      )}
    >
      <div className={TEXTURE} />
      <div className="absolute left-0 right-0 bottom-0 flex items-end gap-[5px] h-[100px]">
        {CHART_BAR_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className="flex-1 bg-white/[0.22] origin-bottom animate-banner-chart-bar"
            style={{ height: `${h}px`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute top-[18px] left-5 w-[26px] h-[26px] stroke-white/[0.85]"
      >
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    </div>
  );
}

function PriossBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[hsl(168,55%,18%)] to-[hsl(172,60%,30%)]",
        className
      )}
    >
      <div className={TEXTURE} />
      <span className="absolute left-1/2 top-1/2 w-[88px] h-[88px] rounded-full border border-white/35 animate-banner-ripple" />
      <span className="absolute left-1/2 top-1/2 w-[88px] h-[88px] rounded-full border border-white/35 animate-banner-ripple [animation-delay:1.5s]" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 w-[46px] h-[46px] stroke-white opacity-95"
      >
        <rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </div>
  );
}

const BANNERS: Record<string, (props: { className?: string }) => JSX.Element> = {
  knowyourrights: KnowYourRightsBanner,
  tidyteam: TidyTeamBanner,
  thesis: ThesisBanner,
  iqvia: IqviaBanner,
  prioss: PriossBanner,
};

export function getProjectBanner(id: string) {
  return BANNERS[id];
}
