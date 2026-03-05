// Button Atom: Reusable button component
import { colors, sizes, spacing } from '../tokens/design-tokens';

// Props for the Button component
type ButtonProps = {
  onClick: () => void; // Click handler function
  children: React.ReactNode; // Button text/content
};

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute ${spacing.buttonPosition} ${sizes.button} ${colors.button} text-white rounded shadow ${colors.buttonHover} z-10`}
    >
      {children}
    </button>
  );
}
