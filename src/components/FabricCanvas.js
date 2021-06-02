import React, { useContext, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import 'fabric-history';

import { FabricContext } from '../lib/ctx';
import { CANVAS_DEFAULT_COLOR, originalSize } from '../lib/api';

function Canvas() {
  const [canvas, initCanvas] = useContext(FabricContext);
  const canvasRef = useRef(null);

  const createCanvas = () => {
    return new fabric.Canvas(canvasRef.current, {
      ...originalSize,
      backgroundColor: CANVAS_DEFAULT_COLOR, // 'transparent',
      preserveObjectStacking: true,
    });
  };

  useEffect(() => {
    if (canvasRef) {
      initCanvas(createCanvas());
    }
  }, [canvasRef]);

  const onSelected = () => {
    console.log('OBJECT SELECTED');
    if (canvas && canvas.getActiveObjects()) {
      const items = canvas.getActiveObjects();
      items.forEach((current) => {
        console.log(current);
        const fill = current.get('fill');
        const opacity = current.get('opacity');
        console.log('fill', fill, 'opacity', opacity);
      });
    }
  };
  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', () => onSelected());
      canvas.on('selection:cleared', () => {
        console.log('CLEAR');
      });
    }
  }, [canvas]);

  // onKeyDown={(e) => handleKeyPress(e)}
  return <canvas ref={canvasRef} />;
}

export default Canvas;
