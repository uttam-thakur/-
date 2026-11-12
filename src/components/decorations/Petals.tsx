import { animation } from '../../config/animation';
import type { CSSProperties } from 'react';
import RosePetal from './RosePetal';
export default function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: animation.petals.count }, (_, i) => (
        <span
          className="petal"
          key={i}
          style={
            {
              left: `${(i * 43 + 7) % 100}%`,
              width: 14 + (i % 4) * 3,
              animationDelay: `-${i * 0.9}s`,
              animationDuration: `${10 + (i % 5) * 2}s`,
              '--turn': `${i % 2 ? 420 : -360}deg`,
            } as CSSProperties
          }
        >
          <span className="petal-tumble">
            <RosePetal />
          </span>
        </span>
      ))}
    </div>
  );
}
