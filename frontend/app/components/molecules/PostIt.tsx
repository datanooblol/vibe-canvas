// PostIt Molecule: A single post-it note with text and resize handles
import { colors } from '../tokens/design-tokens';
import ResizeHandle from '../atoms/ResizeHandle';

// Data structure for a post-it note
export type PostItData = {
  id: number; // Unique identifier
  x: number; // X position on canvas
  y: number; // Y position on canvas
  text: string; // Text content
  width: number; // Width in pixels
  height: number; // Height in pixels
};

// Props for the PostIt component
type PostItProps = {
  postIt: PostItData; // Post-it data
  isSelected: boolean; // Whether this post-it is selected
  isEditing: boolean; // Whether this post-it is in edit mode
  onMouseDown: (e: React.MouseEvent) => void; // Handler for starting drag
  onDoubleClick: (e: React.MouseEvent) => void; // Handler for entering edit mode
  onTextChange: (text: string) => void; // Handler for text changes
  onEditEnd: () => void; // Handler for exiting edit mode
  onResizeStart: (handle: string, e: React.MouseEvent) => void; // Handler for starting resize
};

export default function PostIt({
  postIt,
  isSelected,
  isEditing,
  onMouseDown,
  onDoubleClick,
  onTextChange,
  onEditEnd,
  onResizeStart,
}: PostItProps) {
  // Calculate font size proportional to post-it width (min 12px)
  const fontSize = Math.max(12, postIt.width / 15);

  return (
    <div
      className={`absolute ${colors.postIt} shadow-md p-4 ${isSelected ? colors.selection : ''}`}
      style={{ left: postIt.x, top: postIt.y, width: postIt.width, height: postIt.height }}
    >
      {/* Content area: handles drag and edit */}
      <div
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
        className="w-full h-full cursor-move overflow-hidden"
      >
        {isEditing ? (
          // Edit mode: show textarea
          <textarea
            autoFocus
            value={postIt.text}
            onChange={(e) => onTextChange(e.target.value)}
            onBlur={onEditEnd} // Exit edit mode when clicking outside
            className="w-full h-full bg-transparent text-sm resize-none outline-none"
            style={{ fontSize: `${fontSize}px` }}
          />
        ) : (
          // View mode: show text
          <p className="text-sm" style={{ fontSize: `${fontSize}px` }}>
            {postIt.text}
          </p>
        )}
      </div>
      {/* Resize handles: only show when selected */}
      {isSelected && (
        <>
          {/* 8 handles: 4 edges (n,e,s,w) + 4 corners (ne,se,sw,nw) */}
          {['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'].map((handle) => (
            <ResizeHandle
              key={handle}
              handle={handle}
              onMouseDown={(e) => onResizeStart(handle, e)}
            />
          ))}
        </>
      )}
    </div>
  );
}
