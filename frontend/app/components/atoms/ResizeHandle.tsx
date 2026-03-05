// ResizeHandle Atom: Small draggable handle for resizing post-its
import { colors, sizes } from '../tokens/design-tokens';

// Props for the ResizeHandle component
type ResizeHandleProps = {
  handle: string; // Handle position: 'n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'
  onMouseDown: (e: React.MouseEvent) => void; // Mouse down handler to start resizing
};

export default function ResizeHandle({ handle, onMouseDown }: ResizeHandleProps) {
  // Get appropriate cursor style based on handle position
  const getCursor = () => {
    if (handle === 'n' || handle === 's') return 'ns-resize'; // North-South: vertical resize
    if (handle === 'e' || handle === 'w') return 'ew-resize'; // East-West: horizontal resize
    if (handle === 'ne' || handle === 'sw') return 'nesw-resize'; // Diagonal resize (top-right/bottom-left)
    if (handle === 'nw' || handle === 'se') return 'nwse-resize'; // Diagonal resize (top-left/bottom-right)
  };

  // Calculate handle position based on which edge/corner it represents
  const getPosition = () => {
    const style: React.CSSProperties = {};
    // Position on edges
    if (handle.includes('n')) style.top = -4; // North: top edge
    if (handle.includes('s')) style.bottom = -4; // South: bottom edge
    if (handle.includes('w')) style.left = -4; // West: left edge
    if (handle.includes('e')) style.right = -4; // East: right edge
    // Center handles on sides (not corners)
    if (!handle.includes('n') && !handle.includes('s')) {
      style.top = '50%';
      style.transform = 'translateY(-50%)';
    }
    if (!handle.includes('w') && !handle.includes('e')) {
      style.left = '50%';
      style.transform = 'translateX(-50%)';
    }
    return style;
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className={`absolute ${sizes.resizeHandle} ${colors.resizeHandle}`}
      style={{ cursor: getCursor(), ...getPosition() }}
    />
  );
}
