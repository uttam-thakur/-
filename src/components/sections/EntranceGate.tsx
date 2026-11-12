import type { CSSProperties, RefObject } from 'react';
import { assets } from '../../data/assets';
import { copy } from '../../content/invitation';
import { coupleNames } from '../../helpers/presentation';
import GateDust from '../decorations/GateDust';
export default function EntranceGate({
  entranceRef,
  opening,
  open,
}: {
  entranceRef: RefObject<HTMLDivElement | null>;
  opening: boolean;
  open: () => void;
}) {
  return (
    <div className="entrance" ref={entranceRef}>
      <div className="gate-scene">
        <div className="gate-breath">
          <img
            className="gate-backdrop"
            src={assets.gate}
            alt={copy.entrance.imageAlt}
            fetchPriority="high"
          />
          <div
            className="gate-hole gate-hole-left"
            style={{ '--door-mask': `url("${assets.gateLeft}")` } as CSSProperties}
          />
          <div
            className="gate-hole gate-hole-right"
            style={{ '--door-mask': `url("${assets.gateRight}")` } as CSSProperties}
          />
          <img className="gate-door gate-left" src={assets.gateLeft} alt="" />
          <img className="gate-door gate-right" src={assets.gateRight} alt="" />
          <div className="gate-seam" aria-hidden="true" />
        </div>
      </div>
      <button
        type="button"
        className="gate-open-target"
        onClick={open}
        disabled={opening}
        aria-label={copy.entrance.openLabel}
      >
        <span className="gate-instruction">
          <span className="tap-circle">☞</span>
          <span>{copy.entrance.tap}</span>
        </span>
      </button>
      <GateDust />
      <div className="gate-flood" aria-hidden="true" />
      <div className="gate-names">
        <p>{copy.entrance.heading}</p>
        <span>{coupleNames()}</span>
      </div>
    </div>
  );
}
