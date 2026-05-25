import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './MindMap.css';

const MindMapNode = ({ node, isRoot = false }) => {
  // By default, expand the first level children (the root's direct children)
  const [expanded, setExpanded] = useState(isRoot);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="mindmap-node-container">
      <div className="mindmap-node-content">
        <div className={`mindmap-node-box ${isRoot ? 'mindmap-root-box' : ''}`}>
          {node.label}
        </div>
        {hasChildren && (
          <button 
            className="mindmap-toggle" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '<' : '>'}
          </button>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="mindmap-children">
          {node.children.map((child, index) => (
            <div key={child.id || index} className="mindmap-child-wrapper">
              <MindMapNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function MindMap({ onClose, data, title, subtitle }) {
  return (
    <div className="mindmap-overlay animate-fade-in">
      <div className="mindmap-header">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <button className="mindmap-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <TransformWrapper
          initialScale={1}
          minScale={0.2}
          maxScale={3}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 'max-content', minHeight: 'max-content' }}>
                  <MindMapNode node={data} isRoot={true} />
                </div>
              </TransformComponent>

              <div className="mindmap-controls">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()} title="Reset">↻</button>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}
