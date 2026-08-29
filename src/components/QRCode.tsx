import { useMemo } from 'react';

// Deterministic pseudo-QR pattern generator (visual mock, not a real QR code)
export function QRCode({ value, size = 160 }: { value: string; size?: number }) {
  const grid = useMemo(() => {
    const n = 25;
    const cells: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

    // Simple hash-based fill
    let seed = 0;
    for (let i = 0; i < value.length; i++) seed = (seed * 31 + value.charCodeAt(i)) >>> 0;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0xffffffff;
    };
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        cells[r][c] = rand() > 0.5;
      }
    }

    // Finder patterns (3 corners)
    const drawFinder = (r0: number, c0: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const edge = r === 0 || r === 6 || c === 0 || c === 6;
          const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          cells[r0 + r][c0 + c] = edge || inner;
        }
      }
      // clear border
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (r === 7 || c === 7) {
            if (r0 + r < n && c0 + c < n) cells[r0 + r][c0 + c] = false;
          }
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(0, n - 7);
    drawFinder(n - 7, 0);

    return cells;
  }, [value]);

  const n = grid.length;
  const cell = size / n;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg">
      <rect width={size} height={size} fill="white" rx="6" />
      {grid.map((row, r) =>
        row.map((on, c) =>
          on ? (
            <rect
              key={`${r}-${c}`}
              x={c * cell}
              y={r * cell}
              width={cell}
              height={cell}
              fill="#0a0f1e"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
