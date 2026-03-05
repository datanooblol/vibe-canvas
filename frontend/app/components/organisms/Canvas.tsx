// Canvas Organism: Main canvas component that manages all post-its and interactions
'use client';
import { useState, useEffect } from 'react';
import PostIt, { PostItData } from '../molecules/PostIt';
import Button from '../atoms/Button';
import { colors, sizes } from '../tokens/design-tokens';

export default function Canvas() {
  // State: All post-its on the canvas
  const [postIts, setPostIts] = useState<PostItData[]>([]);
  // State: Counter for generating unique IDs
  const [nextId, setNextId] = useState(0);
  // State: Array of selected post-it IDs
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  // State: ID of post-it currently being edited (null if none)
  const [editingId, setEditingId] = useState<number | null>(null);
  // State: Drag operation data (null if not dragging)
  const [dragging, setDragging] = useState<{ ids: number[]; startX: number; startY: number; initialPositions: Map<number, {x: number, y: number}> } | null>(null);
  // State: Resize operation data (null if not resizing)
  const [resizing, setResizing] = useState<{ id: number; handle: string; startX: number; startY: number; initialWidth: number; initialHeight: number; initialX: number; initialY: number } | null>(null);
  // State: Selection box data (null if not selecting)
  const [selecting, setSelecting] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

  // Create a new post-it at default position
  const createPostIt = () => {
    setPostIts([...postIts, { id: nextId, x: 100, y: 100, text: 'New Note', ...sizes.postItDefault }]);
    setNextId(nextId + 1);
  };

  // Update text content of a specific post-it
  const updateText = (id: number, text: string) => {
    setPostIts(postIts.map(p => p.id === id ? { ...p, text } : p));
  };

  // Delete all selected post-its
  const deleteSelected = () => {
    if (selectedIds.length > 0) {
      setPostIts(postIts.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  // Effect: Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      // Don't handle shortcuts when editing text
      if (editingId !== null) return;
      // Delete selected post-its with Backspace or Delete
      if (e.key === 'Backspace' || e.key === 'Delete') {
        deleteSelected();
      }
      // Select all post-its with Ctrl+A
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        setSelectedIds(postIts.map(p => p.id));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIds, postIts, editingId]);

  // Effect: Handle mouse move and mouse up for drag, resize, and selection
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Handle dragging post-its
      if (dragging) {
        const deltaX = e.clientX - dragging.startX;
        const deltaY = e.clientY - dragging.startY;
        setPostIts(postIts.map(p => {
          if (dragging.ids.includes(p.id)) {
            const initial = dragging.initialPositions.get(p.id);
            return { ...p, x: initial!.x + deltaX, y: initial!.y + deltaY };
          }
          return p;
        }));
      }
      // Handle resizing post-it
      if (resizing) {
        const deltaX = e.clientX - resizing.startX;
        const deltaY = e.clientY - resizing.startY;
        setPostIts(postIts.map(p => {
          if (p.id === resizing.id) {
            let newWidth = resizing.initialWidth;
            let newHeight = resizing.initialHeight;
            let newX = resizing.initialX;
            let newY = resizing.initialY;

            // Adjust dimensions based on which handle is being dragged
            if (resizing.handle.includes('e')) newWidth = resizing.initialWidth + deltaX; // East: increase width
            if (resizing.handle.includes('w')) { // West: decrease width, move left
              newWidth = resizing.initialWidth - deltaX;
              newX = resizing.initialX + deltaX;
            }
            if (resizing.handle.includes('s')) newHeight = resizing.initialHeight + deltaY; // South: increase height
            if (resizing.handle.includes('n')) { // North: decrease height, move up
              newHeight = resizing.initialHeight - deltaY;
              newY = resizing.initialY + deltaY;
            }

            // Apply minimum size constraints
            return { ...p, width: Math.max(sizes.postItMin.width, newWidth), height: Math.max(sizes.postItMin.height, newHeight), x: newX, y: newY };
          }
          return p;
        }));
      }
      // Handle selection box dragging
      if (selecting) {
        setSelecting({ ...selecting, currentX: e.clientX, currentY: e.clientY });
      }
    };

    const handleMouseUp = () => {
      // Finish selection: find all post-its inside selection box
      if (selecting) {
        const minX = Math.min(selecting.startX, selecting.currentX);
        const maxX = Math.max(selecting.startX, selecting.currentX);
        const minY = Math.min(selecting.startY, selecting.currentY);
        const maxY = Math.max(selecting.startY, selecting.currentY);
        
        const selected = postIts.filter(p => 
          p.x + p.width > minX && p.x < maxX && p.y + p.height > minY && p.y < maxY
        ).map(p => p.id);
        
        setSelectedIds(selected);
        setSelecting(null);
      }
      // Clear drag and resize states
      setDragging(null);
      setResizing(null);
    };

    // Only add listeners when actively dragging, selecting, or resizing
    if (dragging || selecting || resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, selecting, resizing, postIts]);

  // Start dragging a post-it (or multiple if already selected)
  const handlePostItMouseDown = (postIt: PostItData, e: React.MouseEvent) => {
    e.stopPropagation();
    // If post-it is already selected, drag all selected post-its together
    const idsToMove = selectedIds.includes(postIt.id) ? selectedIds : [postIt.id];
    if (!selectedIds.includes(postIt.id)) {
      setSelectedIds([postIt.id]);
    }
    // Store initial positions of all post-its being dragged
    const initialPositions = new Map();
    idsToMove.forEach(id => {
      const p = postIts.find(post => post.id === id);
      if (p) initialPositions.set(id, { x: p.x, y: p.y });
    });
    setDragging({
      ids: idsToMove,
      startX: e.clientX,
      startY: e.clientY,
      initialPositions
    });
  };

  // Start resizing a post-it from a specific handle
  const handleResizeStart = (postIt: PostItData, handle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setResizing({
      id: postIt.id,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialWidth: postIt.width,
      initialHeight: postIt.height,
      initialX: postIt.x,
      initialY: postIt.y
    });
  };

  return (
    <div 
      className={`w-screen h-screen ${colors.canvas}`}
      onMouseDown={(e) => {
        // Start selection box when clicking on empty canvas
        if (e.target === e.currentTarget) {
          setSelectedIds([]);
          setSelecting({ startX: e.clientX, startY: e.clientY, currentX: e.clientX, currentY: e.clientY });
        }
      }}
    >
      {/* Button to create new post-its */}
      <Button onClick={createPostIt}>+ Post-it</Button>
      {/* Render all post-its */}
      {postIts.map((postIt) => (
        <PostIt
          key={postIt.id}
          postIt={postIt}
          isSelected={selectedIds.includes(postIt.id)}
          isEditing={editingId === postIt.id}
          onMouseDown={(e) => handlePostItMouseDown(postIt, e)}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setEditingId(postIt.id);
          }}
          onTextChange={(text) => updateText(postIt.id, text)}
          onEditEnd={() => setEditingId(null)}
          onResizeStart={(handle, e) => handleResizeStart(postIt, handle, e)}
        />
      ))}
      {/* Render selection box while dragging */}
      {selecting && (
        <div
          className={`absolute border-2 ${colors.selectionBox} bg-transparent pointer-events-none`}
          style={{
            left: Math.min(selecting.startX, selecting.currentX),
            top: Math.min(selecting.startY, selecting.currentY),
            width: Math.abs(selecting.currentX - selecting.startX),
            height: Math.abs(selecting.currentY - selecting.startY)
          }}
        />
      )}
    </div>
  );
}
