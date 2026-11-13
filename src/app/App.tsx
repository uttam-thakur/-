
import { useRef, useEffect, type CSSProperties } from 'react';
import { animation } from '../config/animation';
import { sections, visibleContentSections } from '../config/sections';
import { copy } from '../content/invitation';
import { sectionRegistry } from './sectionRegistry';
import { useEntrance } from '../hooks/useEntrance';
import { useInvitationAnimations } from '../hooks/useInvitationAnimations';
import EntranceGate from '../components/sections/EntranceGate';
import HeroSection from '../components/sections/HeroSection';
import FooterSection from '../components/sections/FooterSection';
import Petals from '../components/decorations/Petals';
import BackgroundOrnaments from '../components/decorations/BackgroundOrnaments';

const ornamentStyle = {
  '--rosette-period': `${animation.ornaments.rosettePeriod}s`,
  '--mandala-period': `${animation.ornaments.period}s`,
  '--mandala-opacity': animation.ornaments.opacity,
} as CSSProperties;

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);

  const entrance = useEntrance(root);

  useInvitationAnimations(root, entrance.opened);

  // Attempt autoplay when the page loads
  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio.loop = true;

    audio.play().catch(() => {
      // Browser blocked autoplay.
      // Music will start when the visitor opens the invitation.
    });
  }, []);

  // Start music when visitor clicks the entrance button
  const handleOpen = () => {
    const audio = musicRef.current;

    if (audio && audio.paused) {
      audio.play().catch((error) => {
        console.log('Music playback failed:', error);
      });
    }

    entrance.open();
  };

  const visible = visibleContentSections();

  return (
    <div ref={root} style={ornamentStyle}>

      {/* Background wedding music */}
      <audio
        ref={musicRef}
        src="/music/wedding.mp3"
        loop
        preload="auto"
      />

      {!entrance.opened && (
        <EntranceGate
          entranceRef={entrance.entranceRef}
          opening={entrance.opening}
          open={handleOpen}
        />
      )}

      <div className="invitation" inert={!entrance.opened}>
        {sections.ribbon && (
          <div className="preview-ribbon">{copy.ribbon}</div>
        )}

        {sections.petals && <Petals />}

        {sections.hero && (
          <HeroSection showScroll={visible.length > 0 || sections.footer} />
        )}

        <main className="invitation-content">
          {sections.flowers && visible.length > 0 && <BackgroundOrnaments />}

          <div className="edge-border" aria-hidden="true" />

          <div className="middle-sections">
            {visible.map((id) => {
              const Section = sectionRegistry[id];

              return (
                <div key={id} data-section={id} tabIndex={-1}>
                  <Section />
                </div>
              );
            })}
          </div>

          {sections.footer && <FooterSection />}
        </main>
      </div>
    </div>
  );
}
