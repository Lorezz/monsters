import { fabric } from 'fabric';
import saveAs from 'save-as';
import * as dayjs from 'dayjs';

export const CANVAS_DEFAULT_COLOR = '#464954' || 'transparent';
export const originalSize = { height: 600, width: 600 };
let size = originalSize;
let canvas = null;

export const setCanvas = (c) => {
  canvas = c;
};

const getFileName = (ext = 'svg') => {
  return `Monster-${dayjs().format()}.${ext}`;
};

export const allToGroup = () => {
  canvas.discardActiveObject();
  const sel = new fabric.ActiveSelection(canvas.getObjects(), {
    canvas: canvas,
  });
  canvas.setActiveObject(sel);
  canvas.getActiveObject().toGroup();
  const obj = canvas.getActiveObject();

  if (obj) {
    // const { width, height } = obj;
    const group = canvas.getActiveObject().toSVG();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg">${group}</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    saveAs(blob, getFileName());
  }
};

export const setSize = (s) => {
  // console.log('size', s);
  canvas.setWidth(s.width);
  canvas.setHeight(s.height);
  size = s;
  canvas.requestRenderAll();
};

export const setCanvasBGColor = (color) => {
  canvas.backgroundColor = color;
  canvas.requestRenderAll();
};

export const setFill = (fill) => {
  const aObject = canvas.getActiveObject();
  if (!aObject) return;
  if (aObject?.type === 'activeSelection') {
    aObject.getObjects().forEach((obj) => {
      obj.set('fill', fill);
    });
  } else {
    aObject.set('fill', fill);
  }
  canvas.requestRenderAll();
};

export const setStroke = (stroke) => {
  var aObject = canvas.getActiveObject();
  if (!aObject) return;
  if (aObject?.type === 'activeSelection') {
    aObject.getObjects().forEach((obj) => {
      obj.set('stroke', stroke);
    });
  } else {
    aObject.set('stroke', stroke);
  }
  canvas.requestRenderAll();
};

export const addRect = () => {
  let rect = new fabric.Rect({
    fill: '#f48fb1',
    width: 100,
    height: 100,
    left: 200,
    top: 200,
  });
  canvas.add(rect);
  canvas.requestRenderAll();
};

export const addTri = () => {
  const triangle = new fabric.Triangle({
    fill: '#8bf4c1',
    width: 100,
    height: 100,
    left: 200,
    top: 200,
  });
  canvas.add(triangle);
  canvas.requestRenderAll();
};

export const addCircle = () => {
  const triangle = new fabric.Circle({
    fill: '#79e4f6',
    radius: 50,
    left: 200,
    top: 200,
  });
  canvas.add(triangle);
  canvas.requestRenderAll();
};

export const addText = () => {
  let text = new fabric.IText('SampleText', {
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

export const deleteActiveObjects = () => {
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

export const clear = () => {
  !deleteActiveObjects() && canvas.clear();
  canvas.backgroundColor = CANVAS_DEFAULT_COLOR;
};

export const removeObj = () => {
  canvas.getActiveObjects().forEach((obj) => {
    canvas.remove(obj);
  });
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const group = () => {
  if (!canvas.getActiveObject()) {
    return;
  }
  if (canvas.getActiveObject().type !== 'activeSelection') {
    return;
  }
  canvas.getActiveObject().toGroup();
  canvas.requestRenderAll();
};

export const ungroup = () => {
  if (!canvas.getActiveObject()) {
    return;
  }
  if (canvas.getActiveObject().type !== 'group') {
    return;
  }
  canvas.getActiveObject().toActiveSelection();
  canvas.requestRenderAll();
};

export const bringToFront = () => {
  if (!canvas.getActiveObject()) {
    return;
  }
  canvas.getActiveObject().bringToFront();
  canvas.requestRenderAll();
};
export const bringForward = () => {
  if (!canvas.getActiveObject()) {
    return;
  }
  canvas.getActiveObject().bringForward();
  canvas.requestRenderAll();
};
export const sendBackwards = () => {
  if (!canvas.getActiveObject()) {
    return;
  }
  canvas.getActiveObject().sendBackwards();
  canvas.requestRenderAll();
};
export const sendToBack = () => {
  if (!canvas.getActiveObject()) {
    return;
  }
  canvas.getActiveObject().sendToBack();
  canvas.requestRenderAll();
};

export const deselectAll = () => {
  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const selectAll = () => {
  canvas.discardActiveObject();
  const sel = new fabric.ActiveSelection(canvas.getObjects(), {
    canvas: canvas,
  });
  canvas.setActiveObject(sel);
  canvas.requestRenderAll();
};

export const saveToSvg = () => {
  const svg = canvas.toSVG();
  let blob = new Blob([svg], { type: 'image/svg+xml' });
  saveAs(blob, getFileName());
};

export const saveToJson = () => {
  // var json_data = JSON.stringify(canvas.toDatalessJSON());
  const result = canvas.toJSON();
  // console.log('json', result);
  const str = JSON.stringify(result, null, 2);
  let blob = new Blob([str], { type: 'text/plain' });
  saveAs(blob, getFileName('json'));
};

export const readFile = (file) => {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = (x) => resolve(fr.result);
    fr.readAsText(file);
  });
};

export const onInputFile = async (e, type) => {
  const file = e?.target?.files[0];
  onDropFile(file, type);
};

export const onDropFile = async (file, type) => {
  if (!file) return;
  const data = await readFile(file);
  if (type === 'svg') {
    loadSvgStr(data);
  } else {
    loadJson(data);
  }
};

export const loadJson = (data) => {
  const json = JSON.parse(data);
  if (!json) return;
  canvas.loadFromJSON(
    json,
    () => {
      canvas.renderAll();
    },
    (o, object) => {
      // console.log(o, object);
    }
  );
};

export const loadSvgStr = (data, divider = 6) => {
  fabric.loadSVGFromString(data, (objects, options) => {
    var obj = fabric.util.groupSVGElements(objects, options);
    obj
      .scaleToHeight(canvas.height / divider)
      // .set({ left: canvas.width / 2, top: canvas.height / 2 })
      .set({ left: 100, top: 100 })
      .setCoords();

    canvas.add(obj);
    canvas.requestRenderAll();
  });
};

export const loadSvg = (svgPath, divider = 6) => {
  fabric.loadSVGFromURL(svgPath, (objects, options) => {
    var obj = fabric.util.groupSVGElements(objects, options);
    obj
      .scaleToHeight(canvas.height / divider)
      // .set({ left: canvas.width / 2, top: canvas.height / 2 })
      .set({ left: 100, top: 100 })
      .setCoords();

    canvas.add(obj);
    canvas.requestRenderAll();
  });
};

export const undo = () => {
  canvas.undo();
};
export const redo = () => {
  canvas.redo();
};

export const duplicate = () => {
  try {
    canvas.getActiveObject().clone((cloned) => {
      canvas.discardActiveObject();
      cloned.set({
        left: cloned.left + 10,
        top: cloned.top + 10,
        evented: true,
      });
      if (cloned.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        cloned.canvas = canvas;
        cloned.forEachObject((obj) => {
          canvas.add(obj);
        });
        cloned.setCoords();
      } else {
        canvas.add(cloned);
      }
      canvas.setActiveObject(cloned);
      canvas.requestRenderAll();
    });
  } catch (error) {
    console.log('error', error);
  }
};

export const resize = () => {
  canvas.setWidth(size.width * canvas.getZoom());
  canvas.setHeight(size.height * canvas.getZoom());
};

export const setZoom = (val) => {
  canvas.setZoom(val);
  resize();
};

export const zoomIn = () => {
  setZoom(canvas.getZoom() + 0.1);
};
export const zoomOut = () => {
  setZoom(canvas.getZoom() - 0.1);
};

export function handleKeyPress(e) {
  const objType = canvas?.getActiveObject()?.type;
  if (objType && objType === 'i-text') return;
  // e.preventDefault();
  // console.log(e.keyCode);
  if (!e) return;
  const cmd = e.ctrlKey || e.metaKey; //e.shiftKey ||  e.altKey
  if (e.keyCode === 90 && e.ctrlKey) {
    // console.log('Ctrl+z');
    undo();
  } else if (e.keyCode === 89 && cmd) {
    // console.log('Ctrl+y');
    redo();
  } else if (e.keyCode === 71 && cmd) {
    // console.log('Ctrl+g');
    group();
  } else if (e.keyCode === 85 && cmd) {
    // console.log('Ctrl+u');
    ungroup();
  } else if (e.keyCode === 65 && cmd) {
    // console.log('Ctrl+a');
    selectAll();
  } else if (e.keyCode === 27) {
    // console.log('Esc');
    deselectAll();
    // } else if (e.keyCode === 67 && cmd) {
    // console.log('Ctrl+c');
    //   copy();
  } else if (e.keyCode === 187 && cmd) {
    // console.log('Ctrl -');
    zoomIn();
  } else if (e.keyCode === 189 && cmd) {
    // console.log('Ctrl -');
    zoomOut();
  } else if (e.keyCode === 86 && cmd) {
    // console.log('Ctrl+v');
    duplicate();
  } else if (e.keyCode === 8) {
    // console.log('backspace');
    removeObj();
  } else if (e.keyCode === 84) {
    // console.log('t');
    addText();
  } else if (e.keyCode === 38) {
    if (cmd) {
      // console.log('to back');
      sendToBack();
    } else {
      // console.log('backwards');
      sendBackwards();
    }
  } else if (e.keyCode === 40) {
    if (cmd) {
      // console.log('to front');
      bringToFront();
    } else {
      // console.log('forward');
      bringForward();
    }
  } else {
    // console.log('ignore');
  }
}
