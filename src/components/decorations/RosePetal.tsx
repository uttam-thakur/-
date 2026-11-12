import { useId } from 'react';
export default function RosePetal() {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="80%">
          <stop stopColor="#ff7f98" />
          <stop offset="50%" stopColor="#e0244f" />
          <stop offset="100%" stopColor="#8e0d2c" />
        </radialGradient>
      </defs>
      <path
        d="M12 2 C19 5 22 12 18 18 C15 22 9 22 6 18 C2 12 5 5 12 2Z"
        fill={`url(#${id})`}
      />
      <path
        d="M12 4 C10 9 10 14 12 20"
        stroke="#ffd0da"
        strokeWidth=".8"
        fill="none"
        opacity=".5"
      />
    </svg>
  );
}
