import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import saveAs from 'save-as';

import {
  arm9,
  arm8,
  arm7,
  arm6,
  arm5,
  arm4,
  arm3,
  arm2,
  arm1,
} from './body-parts/arms';

function App() {
  const [canvas, setCanvas] = useState('');
  const canvasRef = useRef(null);

  const initCanvas = () => {
    return new fabric.Canvas(canvasRef.current, {
      height: 480,
      width: 640,
      backgroundColor: '#464954',
      preserveObjectStacking: true,
      // isDrawingMode: false,
      // selection: false,
      // hoverCursor: 'pointer',
      //stopContextMenu: true
    });
  };

  useEffect(() => {
    if (canvasRef) {
      setCanvas(initCanvas());
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

  const setFill = (fill) => {
    var aObject = canvas.getActiveObject();
    if (aObject.type === 'activeSelection') {
      aObject.getObjects().forEach((obj) => {
        obj.set('fill', fill);
      });
    } else {
      aObject.set('fill', fill);
    }
    canvas.requestRenderAll();
  };

  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', () => onSelected());
      canvas.on('selection:cleared', () => {
        console.log('CLEAR');
      });
    }
  }, [canvas]);

  const addRects = () => {
    // let rect = new fabric.Rect({
    //   width: 350,
    //   height: 100,
    //   fill: 'white',
    //   left: 0,
    //   top: 0,
    //   selectable: false,
    //   excludeFromExport: true,
    // });
    // canvas.add(rect);
    // let rect2 = new fabric.Rect({
    //   width: 100,
    //   height: 100,
    //   fill: 'red',
    //   left: 100,
    //   top: 100,
    // });
    // canvas.add(rect2);
    // const triangle = new fabric.Triangle({
    //   strokeWidth: 5,
    //   stroke: 'blue',
    //   fill: 'transparent',
    //   width: 50,
    //   height: 50,
    //   left: 200,
    //   top: 200,
    // });
    // canvas.add(triangle);
    // canvas.setActiveObject(triangle);

    fabric.loadSVGFromURL('/svg/eyes.svg', (objects, options) => {
      var obj = fabric.util.groupSVGElements(objects, options);
      obj
        .scaleToHeight(canvas.height / 2)
        .set({ left: canvas.width / 4, top: canvas.height / 4 })
        .setCoords();

      canvas.add(obj).renderAll();
    });

    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="167" height="170.57" viewBox="0 0 167 170.57"><g id="body_9"><path fill="#345ee2" d="M167,17.25c0,8.81-7.15,17.6-16,17.6s-16-8.79-16-17.6S142.66,4,151.47,4,167,8.43,167,17.25"/></g></svg>`;

    fabric.loadSVGFromString(svgStr, (objects, options) => {
      var obj = fabric.util.groupSVGElements(objects, options);
      obj
        .scaleToHeight(canvas.height / 2)
        .set({ left: canvas.width / 4, top: canvas.height / 4 })
        .setCoords();

      canvas.add(obj);
      canvas.requestRenderAll();
    });

    const svgStr2 = `<svg xmlns="http://www.w3.org/2000/svg"><g id="mouth_9">
      <path fill="#c52728" d="M29.2,13.84c0,7.64-6.2,8.81-13.84,8.81S1.52,21.48,1.52,13.84a13.84,13.84,0,0,1,27.68,0" transform="translate(0 0)"/>
      <path fill="#fceaed" d="M21.65,7.83a4.73,4.73,0,0,0,2.86-4.35A13.79,13.79,0,0,0,6.28,3.41c.2,2.21,1,4.87,3.63,4.7a5.15,5.15,0,0,0,5-4.19s1.4,6.15,6.71,3.91" transform="translate(0 0)"/>
    </g></svg>`;

    fabric.loadSVGFromString(svgStr2, (objects, options) => {
      var obj2 = fabric.util.groupSVGElements(objects, options);
      obj2
        .scaleToHeight(50)
        .set({ left: canvas.width / 4, top: canvas.height / 4 })
        .setCoords();

      canvas.add(obj2).renderAll();
    });

    fabric.loadSVGFromString(arm9, (objects, options) => {
      var obj2 = fabric.util.groupSVGElements(objects, options);
      obj2
        .scaleToHeight(50)
        .set({ left: canvas.width / 4, top: canvas.height / 4 })
        .setCoords();

      canvas.add(obj2);
    });
  };

  const addText = () => {
    let text = new fabric.IText('Sample Text', {
      left: canvas.width / 2,
      top: canvas.height / 2,
      fill: '#e0f7fa',
      fontFamily: 'sans-serif',
      hasRotatingPoint: false,
      centerTransform: true,
      originX: 'center',
      originY: 'center',
      lockUniScaling: true,
    });

    canvas.add(text);
    canvas.requestRenderAll();
  };

  const deleteActiveObjects = () => {
    const activeObjects = canvas.getActiveObjects();
    if (!activeObjects.length) return false;

    if (activeObjects.length) {
      activeObjects.forEach(function (object) {
        canvas.remove(object);
      });
    } else {
      canvas.remove(activeObjects);
    }

    return true;
  };

  const clear = () => {
    !deleteActiveObjects() && canvas.clear();
  };

  const removeObj = () => {
    canvas.getActiveObjects().forEach((obj) => {
      canvas.remove(obj);
    });
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const group = () => {
    if (!canvas.getActiveObject()) {
      return;
    }
    if (canvas.getActiveObject().type !== 'activeSelection') {
      return;
    }
    canvas.getActiveObject().toGroup();
    canvas.requestRenderAll();
  };

  const ungroup = () => {
    if (!canvas.getActiveObject()) {
      return;
    }
    if (canvas.getActiveObject().type !== 'group') {
      return;
    }
    canvas.getActiveObject().toActiveSelection();
    canvas.requestRenderAll();
  };

  const bringToFront = () => {
    if (!canvas.getActiveObject()) {
      return;
    }
    canvas.getActiveObject().bringToFront();
    canvas.requestRenderAll();
  };
  const bringForward = () => {
    if (!canvas.getActiveObject()) {
      return;
    }
    canvas.getActiveObject().bringForward();
    canvas.requestRenderAll();
  };
  const sendBackwards = () => {
    if (!canvas.getActiveObject()) {
      return;
    }
    canvas.getActiveObject().sendBackwards();
    canvas.requestRenderAll();
  };
  const sendToBack = () => {
    if (!canvas.getActiveObject()) {
      return;
    }
    canvas.getActiveObject().sendToBack();
    canvas.requestRenderAll();
  };

  const deselectAll = () => {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const selectAll = () => {
    canvas.discardActiveObject();
    const sel = new fabric.ActiveSelection(canvas.getObjects(), {
      canvas: canvas,
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
  };

  const saveToSvg = () => {
    const svg = canvas.toSVG();
    let blob = new Blob([svg], { type: 'image/svg+xml' });
    saveAs(blob, 'monster.svg');
  };

  const saveToJson = () => {
    var json_data = JSON.stringify(canvas.toDatalessJSON());
    console.log('dataless', json_data);
    const result = canvas.toJSON();
    console.log('json', result);
  };

  return (
    <div className="App">
      <h1>Fabric.js on React</h1>
      <button onClick={() => addRects()}>add rects</button>
      <button onClick={() => addText()}>add text</button>
      <button onClick={() => removeObj()}>remove current</button>
      <button onClick={() => group()}>group</button>
      <button onClick={() => ungroup()}>ungroup</button>
      <button onClick={() => selectAll()}>selectAll</button>
      <button onClick={() => deselectAll()}>deselectAll</button>
      <canvas ref={canvasRef} />

      <button onClick={() => clear()}>clear</button>
      <button onClick={() => sendToBack()}>sendToBack</button>
      <button onClick={() => sendBackwards()}>sendBackwards</button>
      <button onClick={() => bringForward()}>bringForward</button>
      <button onClick={() => bringToFront()}>bringToFront</button>
      <button onClick={() => saveToSvg()}>saveToSvg</button>
      <button onClick={() => saveToJson()}>saveToJson</button>
    </div>
  );
}

export default App;
