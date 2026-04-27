import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {brand} from '../config/brand';
import {Icon} from './Icon';
import {UseCase} from '../config/useCases';
import {MockupFrame} from './MockupFrame';

type Props = {
  useCase: UseCase;
  /** Durée totale de la scène (frames) pour animer le mockup de façon autonome */
  durationInFrames: number;
};

/**
 * Carte d'un cas d'usage : icône + label + mini-mockup animé.
 */
export const UseCaseCard: React.FC<Props> = ({useCase, durationInFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: {damping: 22, mass: 0.8, stiffness: 100},
  });
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(enter, [0, 1], [24, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 26,
        width: '100%',
      }}
    >
      {/* Icône + label */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 28,
            backgroundColor: brand.colors.navy,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.18)',
          }}
        >
          <Icon name={useCase.icon} size={68} color={brand.colors.cream} />
        </div>
        <div
          style={{
            fontFamily: brand.fonts.family,
            fontWeight: brand.fonts.weights.bold,
            fontSize: 40,
            color: brand.colors.navy,
            textAlign: 'center',
            maxWidth: 820,
            lineHeight: 1.15,
          }}
        >
          {useCase.label}
        </div>
      </div>

      {/* Mockup animé */}
      <MockupFrame width={760} height={420} title="LTC AI">
        <Mockup type={useCase.mockup} durationInFrames={durationInFrames} />
      </MockupFrame>
    </div>
  );
};

type MockupProps = {
  type: UseCase['mockup'];
  durationInFrames: number;
};

const Mockup: React.FC<MockupProps> = ({type, durationInFrames}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [6, durationInFrames - 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  switch (type) {
    case 'inbox':
      return <InboxMockup progress={progress} />;
    case 'pdf':
      return <PdfMockup progress={progress} />;
    case 'notification':
      return <NotificationMockup progress={progress} />;
    case 'records':
      return <RecordsMockup progress={progress} />;
    case 'chatBubbles':
      return <ChatMockup progress={progress} />;
    case 'dashboard':
      return <DashboardMockup progress={progress} />;
  }
};

/* ========================= MOCKUPS ========================= */

const InboxMockup: React.FC<{progress: number}> = ({progress}) => {
  // 5 emails → se vident de haut en bas
  const items = [0, 1, 2, 3, 4];
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      {items.map((i) => {
        const threshold = i / items.length;
        const cleared = progress > threshold;
        return (
          <div
            key={i}
            style={{
              height: 44,
              borderRadius: 10,
              backgroundColor: cleared
                ? brand.colors.cream
                : brand.colors.creamSoft,
              border: `1.5px solid ${
                cleared ? brand.colors.neutralLight : brand.colors.navy
              }`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 14px',
              gap: 12,
              opacity: cleared ? 0.35 : 1,
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: cleared
                  ? brand.colors.neutralLight
                  : brand.colors.accent,
              }}
            />
            <div
              style={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                backgroundColor: brand.colors.neutralLight,
                opacity: cleared ? 0.4 : 0.8,
              }}
            />
            <div
              style={{
                width: 60,
                height: 8,
                borderRadius: 4,
                backgroundColor: brand.colors.neutralLight,
                opacity: cleared ? 0.4 : 0.8,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const PdfMockup: React.FC<{progress: number}> = ({progress}) => {
  const lines = [0.85, 0.7, 0.9, 0.6, 0.78, 0.55, 0.72];
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: brand.colors.cream,
        borderRadius: 10,
        border: `1.5px solid ${brand.colors.neutralLight}`,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div
        style={{
          width: '40%',
          height: 18,
          backgroundColor: brand.colors.navy,
          borderRadius: 4,
        }}
      />
      <div
        style={{
          width: '55%',
          height: 10,
          backgroundColor: brand.colors.neutralLight,
          borderRadius: 4,
          marginBottom: 14,
        }}
      />
      {lines.map((w, i) => {
        const t = (i + 1) / lines.length;
        const filled = progress > t - 0.15;
        const reveal = Math.max(
          0,
          Math.min(1, (progress - (t - 0.25)) * 4),
        );
        return (
          <div
            key={i}
            style={{
              width: `${w * 100}%`,
              height: 9,
              borderRadius: 4,
              backgroundColor: filled
                ? brand.colors.navy
                : brand.colors.neutralLight,
              opacity: 0.35 + reveal * 0.65,
            }}
          />
        );
      })}
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            padding: '8px 16px',
            backgroundColor: brand.colors.accent,
            borderRadius: 6,
            fontFamily: brand.fonts.family,
            fontWeight: brand.fonts.weights.bold,
            fontSize: 14,
            color: brand.colors.cream,
            opacity: progress > 0.8 ? 1 : 0,
          }}
        >
          PDF prêt
        </div>
      </div>
    </div>
  );
};

const NotificationMockup: React.FC<{progress: number}> = ({progress}) => {
  const notifs = [0, 1, 2];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 10,
      }}
    >
      {notifs.map((i) => {
        const t = (i + 1) / (notifs.length + 0.5);
        const show = progress > t - 0.2;
        const localP = Math.max(
          0,
          Math.min(1, (progress - (t - 0.2)) * 3),
        );
        return (
          <div
            key={i}
            style={{
              opacity: show ? localP : 0,
              transform: `translateX(${(1 - localP) * -20}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: 14,
              borderRadius: 12,
              backgroundColor: brand.colors.creamSoft,
              border: `1.5px solid ${brand.colors.accent}`,
              boxShadow: '0 4px 12px rgba(21, 21, 170, 0.18)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                backgroundColor: brand.colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="bell" size={26} color={brand.colors.cream} />
            </div>
            <div style={{flex: 1}}>
              <div
                style={{
                  width: '60%',
                  height: 10,
                  backgroundColor: brand.colors.navy,
                  borderRadius: 4,
                  marginBottom: 6,
                }}
              />
              <div
                style={{
                  width: '80%',
                  height: 8,
                  backgroundColor: brand.colors.neutralLight,
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const RecordsMockup: React.FC<{progress: number}> = ({progress}) => {
  const rows = [0, 1, 2, 3];
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      {/* header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 2fr 1.5fr',
          gap: 12,
          padding: '10px 14px',
          backgroundColor: brand.colors.navy,
          borderRadius: 8,
        }}
      >
        {['Client', 'Email', 'Statut'].map((h) => (
          <div
            key={h}
            style={{
              fontFamily: brand.fonts.family,
              fontWeight: brand.fonts.weights.semibold,
              fontSize: 14,
              color: brand.colors.cream,
              letterSpacing: 1,
            }}
          >
            {h}
          </div>
        ))}
      </div>
      {rows.map((i) => {
        const t = (i + 1) / (rows.length + 0.5);
        const filled = progress > t - 0.25;
        return (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 2fr 1.5fr',
              gap: 12,
              padding: '12px 14px',
              backgroundColor: brand.colors.creamSoft,
              borderRadius: 8,
              border: `1.5px solid ${brand.colors.neutralLight}`,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                height: 9,
                width: filled ? '80%' : '30%',
                backgroundColor: brand.colors.navy,
                borderRadius: 4,
                transition: 'all 0.3s ease-in-out',
              }}
            />
            <div
              style={{
                height: 9,
                width: filled ? '90%' : '40%',
                backgroundColor: brand.colors.neutralLight,
                borderRadius: 4,
                transition: 'all 0.3s ease-in-out',
              }}
            />
            <div
              style={{
                height: 22,
                width: filled ? 90 : 50,
                borderRadius: 11,
                backgroundColor: filled
                  ? brand.colors.accent
                  : brand.colors.neutralLight,
                transition: 'all 0.3s ease-in-out',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const ChatMockup: React.FC<{progress: number}> = ({progress}) => {
  const bubbles = [
    {from: 'user', w: '55%'},
    {from: 'ai', w: '70%'},
    {from: 'user', w: '45%'},
    {from: 'ai', w: '65%'},
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 4,
      }}
    >
      {bubbles.map((b, i) => {
        const t = (i + 1) / (bubbles.length + 0.5);
        const show = progress > t - 0.22;
        const localP = Math.max(
          0,
          Math.min(1, (progress - (t - 0.22)) * 3),
        );
        const isAi = b.from === 'ai';
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: isAi ? 'flex-start' : 'flex-end',
              opacity: show ? localP : 0,
              transform: `translateY(${(1 - localP) * 10}px)`,
            }}
          >
            <div
              style={{
                width: b.w,
                height: 40,
                borderRadius: 16,
                backgroundColor: isAi
                  ? brand.colors.accent
                  : brand.colors.navy,
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: brand.colors.cream,
                  opacity: 0.7,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DashboardMockup: React.FC<{progress: number}> = ({progress}) => {
  const bars = [0.55, 0.7, 0.48, 0.82, 0.62, 0.9];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14,
        height: '100%',
      }}
    >
      {/* KPI Card */}
      <div
        style={{
          backgroundColor: brand.colors.navy,
          borderRadius: 12,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: brand.fonts.family,
            color: brand.colors.cream,
            fontSize: 14,
            opacity: 0.7,
            letterSpacing: 1,
          }}
        >
          REVENUS
        </div>
        <div
          style={{
            fontFamily: brand.fonts.family,
            fontWeight: brand.fonts.weights.bold,
            color: brand.colors.cream,
            fontSize: 36,
            marginTop: 4,
            opacity: progress > 0.3 ? 1 : 0,
          }}
        >
          +{Math.round(progress * 42)}%
        </div>
        <div
          style={{
            fontFamily: brand.fonts.family,
            color: brand.colors.cream,
            fontSize: 13,
            opacity: 0.5,
            marginTop: 6,
          }}
        >
          Ce mois-ci
        </div>
      </div>

      {/* Bars */}
      <div
        style={{
          backgroundColor: brand.colors.creamSoft,
          borderRadius: 12,
          border: `1.5px solid ${brand.colors.neutralLight}`,
          padding: 14,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          gap: 8,
        }}
      >
        {bars.map((h, i) => {
          const t = (i + 1) / bars.length;
          const p = Math.max(0, Math.min(1, (progress - t * 0.5) * 2));
          return (
            <div
              key={i}
              style={{
                width: 20,
                height: `${h * 100 * p}%`,
                backgroundColor:
                  i === bars.length - 1
                    ? brand.colors.accent
                    : brand.colors.navy,
                borderRadius: 4,
                transition: 'height 0.2s ease-in-out',
              }}
            />
          );
        })}
      </div>

      {/* Lines */}
      <div
        style={{
          gridColumn: '1 / -1',
          backgroundColor: brand.colors.creamSoft,
          borderRadius: 12,
          border: `1.5px solid ${brand.colors.neutralLight}`,
          padding: 14,
          height: 120,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 80"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 60 Q 50 40 80 45 T 160 30 T 240 20 T 300 10"
            stroke={brand.colors.accent}
            strokeWidth={3}
            fill="none"
            strokeDasharray={600}
            strokeDashoffset={600 - progress * 600}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
