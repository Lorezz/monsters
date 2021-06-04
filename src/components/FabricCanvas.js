import React, { useContext, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import 'fabric-history';

import { FabricContext } from '../lib/ctx';
import { CANVAS_DEFAULT_COLOR, originalSize } from '../lib/api';

function Canvas({ size }) {
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

  return <canvas ref={canvasRef} />;
}

export default Canvas;
