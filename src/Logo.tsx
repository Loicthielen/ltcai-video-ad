import {
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

type LogoProps = {
  size?: number;
  /** Laisser undefined pour un rendu inline (flux normal). */
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  animate?: boolean;
  delay?: number;
};

export const Logo: React.FC<LogoProps> = ({
  size = 200,
  position,
  animate = false,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = animate
    ? spring({
        frame: frame - delay,
        fps,
        config: {damping: 12, stiffness: 100},
      })
    : 1;

  const opacity = animate
    ? interpolate(frame - delay, [0, 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  const positionStyles: React.CSSProperties = position
    ? {position: 'absolute'}
    : {};
  let transform = `scale(${scale})`;

  switch (position) {
    case 'center':
      positionStyles.top = '50%';
      positionStyles.left = '50%';
      transform = `translate(-50%, -50%) scale(${scale})`;
      break;
    case 'top-left':
      positionStyles.top = 40;
      positionStyles.left = 40;
      break;
    case 'top-right':
      positionStyles.top = 40;
      positionStyles.right = 40;
      break;
    case 'bottom-left':
      positionStyles.bottom = 40;
      positionStyles.left = 40;
      break;
    case 'bottom-right':
      positionStyles.bottom = 40;
      positionStyles.right = 40;
      break;
  }

  return (
    <Img
      src={staticFile('ltc-logo.png')}
      style={{
        width: size,
        height: size,
        opacity,
        transform,
        ...positionStyles,
      }}
    />
  );
};
