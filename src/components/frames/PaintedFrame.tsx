import type { ReactNode } from 'react';
import { useId } from 'react';
import { arch } from '../../constants/frame';
import Lotus from './Lotus';
export default function PaintedFrame({
  children,
  blue = false,
  gold = false,
  doors = false,
  colors,
}: {
  children: ReactNode;
  blue?: boolean;
  gold?: boolean;
  doors?: boolean;
  colors?: readonly string[];
}) {
  const uid = useId().replace(/:/g, '');
  return (
    <div className={`painted-frame ${gold ? 'gold-frame' : ''}`}>
      <div className="frame-window">
        {children}
        {doors && (
          <>
            <div className="shutter shutter-left" />
            <div className="shutter shutter-right" />
          </>
        )}
      </div>
      <svg viewBox="0 0 100 129.5" aria-hidden="true">
        <defs>
          <linearGradient id={`paint${uid}`} x2="0" y2="1">
            <stop
              offset="36.3%"
              stopColor={colors?.[0] ?? (gold ? '#bd8a2a' : blue ? '#1d5cc4' : '#f36b1c')}
            />
            <stop
              offset="36.3%"
              stopColor={colors?.[1] ?? (gold ? '#e6bc61' : '#f8c21b')}
            />
          </linearGradient>
          <linearGradient id={`mirror${uid}`}>
            <stop stopColor="#fff" />
            <stop offset=".5" stopColor="#9faeb9" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
        </defs>
        <path
          d={`M0 0 H100 V129.5 H0 Z ${arch}`}
          fillRule="evenodd"
          fill={`url(#paint${uid})`}
        />
        <rect
          x="4"
          y="4"
          width="92"
          height="121.5"
          rx="1"
          fill="none"
          stroke="#fff5ce"
          strokeWidth=".7"
        />
        <path d={arch} fill="none" stroke="#b78012" strokeWidth="3.4" />
        <path d={arch} fill="none" stroke="#fff5ce" strokeWidth=".6" />
        <g transform="translate(50 66.5) scale(1.085 1.06) translate(-50 -66.5)">
          <path
            d={arch}
            fill="none"
            stroke="#fff"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeDasharray="0 2.4"
          />
        </g>
        <path
          d="M18 9 Q30 3 43 8 M57 8 Q70 3 82 9"
          fill="none"
          stroke="#fff"
          strokeWidth=".8"
          strokeLinecap="round"
          strokeDasharray="0 1.8"
        />
        <circle cx="50" cy="7" r="1.5" fill="#fff" />
        <circle cx="50" cy="7" r=".7" fill="#e8336d" />
        {Array.from({ length: 14 }, (_, i) => (
          <path
            key={`b${i}`}
            d={`M${10 + i * 6.15} 120.5 l1.5 2 -1.5 2 -1.5 -2Z`}
            fill={`url(#mirror${uid})`}
            stroke="#fff"
            strokeWidth=".25"
          />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <g key={i}>
            {[8.8, 91.2].map((x) => (
              <path
                key={x}
                d={`M${x} ${49 + i * 6.2} l1.5 2 -1.5 2 -1.5 -2Z`}
                fill={`url(#mirror${uid})`}
                stroke="#fff"
                strokeWidth=".25"
              />
            ))}
          </g>
        ))}
        <Lotus x={11} y={19} />
        <Lotus x={89} y={19} />
      </svg>
    </div>
  );
}
