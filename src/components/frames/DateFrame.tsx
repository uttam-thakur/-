import type { ReactNode } from 'react';
import Lotus from './Lotus';
export default function DateFrame({ children }: { children: ReactNode }) {
  return (
    <div className="date-frame">
      <svg viewBox="0 0 200 100" aria-hidden="true">
        <defs>
          <linearGradient id="date-paint" x2="0" y2="1">
            <stop offset="38%" stopColor="#ef6922" />
            <stop offset="38%" stopColor="#f4bf20" />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          width="198"
          height="98"
          rx="1"
          fill="url(#date-paint)"
          stroke="#db9a20"
        />
        <rect
          x="4"
          y="4"
          width="192"
          height="92"
          rx="1"
          fill="none"
          stroke="#fff7d1"
          strokeWidth=".8"
        />
        <path
          d="M15 84V44 Q15 36 22 36Q20 28 30 29Q30 20 40 24Q43 15 52 20Q58 12 65 19Q74 11 81 17Q91 9 100 16Q109 9 119 17Q126 11 135 19Q142 12 148 20Q157 15 160 24Q170 20 170 29Q180 28 178 36Q185 36 185 44V84Z"
          fill="#8b1423"
          stroke="#fff0b7"
          strokeWidth="1.7"
        />
        <path
          d="M12 84V44Q12 32 20 32Q20 20 35 21Q40 12 54 15Q63 7 78 12Q90 3 100 11Q110 3 122 12Q137 7 146 15Q160 12 165 21Q180 20 180 32Q188 32 188 44V84"
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeDasharray=".1 2.4"
          strokeLinecap="round"
        />
        {Array.from({ length: 25 }, (_, i) => (
          <path key={i} d={`M${11 + i * 7.4} 89l1 2-1 2-1-2Z`} fill="#fff7da" />
        ))}
        <g transform="scale(.7)">
          <Lotus x={17} y={27} />
          <Lotus x={268} y={27} />
        </g>
      </svg>
      <div>{children}</div>
    </div>
  );
}
