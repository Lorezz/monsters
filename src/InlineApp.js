import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import saveAs from 'save-as';
import 'fabric-history';
import { Button, ButtonGroup, Box } from '@chakra-ui/react';
import { FiTriangle, FiCircle, FiSquare } from 'react-icons/fi';
import { BiText, BiDuplicate } from 'react-icons/bi';
import { MdUndo, MdRedo, MdSave } from 'react-icons/md';
import FileUploader from './components/DropArea';
function App() {
  const [canvas, setCanvas] = useState('');
  const [color, setColor] = useState('#464954');
  const canvasRef = useRef(null);
  const originalSize = { height: 600, width: 600 };
  const CANVAS_DEFAULT_COLOR = '#464954';
  const initCanvas = () => {
    return new fabric.Canvas(canvasRef.current, {
      ...originalSize,
      // backgroundColor: 'transparent',
      backgroundColor: CANVAS_DEFAULT_COLOR,
      preserveObjectStacking: true,
      // isDrawingMode: false,
      // selection: false,
      // hoverCursor: 'pointer',
      // stopContextMenu: true
    });
  };

  useEffect(() => {
    if (canvasRef) {
      setCanvas(initCanvas());
    }
  }, [canvasRef]);

  const onSelected = () => {
    console.log('OBJECT SELECTED');
    // if (canvas && canvas.getActiveObjects()) {
    //   const items = canvas.getActiveObjects();
    //   items.forEach((current) => {
    //     console.log(current);
    //     const fill = current.get('fill');
    //     const opacity = current.get('opacity');
    //     console.log('fill', fill, 'opacity', opacity);
    //   });
    // }
  };

  const setFill = (fill) => {
    var aObject = canvas.getActiveObject();
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

  const setStroke = (stroke) => {
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

  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', () => onSelected());
      canvas.on('selection:cleared', () => {
        console.log('CLEAR');
      });
    }
  }, [canvas]);

  const addRect = () => {
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

  const addTri = () => {
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

  const addCircle = () => {
    const triangle = new fabric.Circle({
      fill: '#79e4f6',
      radius: 50,
      left: 200,
      top: 200,
    });
    canvas.add(triangle);
    canvas.requestRenderAll();
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
    canvas.backgroundColor = CANVAS_DEFAULT_COLOR;
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
    // var json_data = JSON.stringify(canvas.toDatalessJSON());
    const result = canvas.toJSON();
    console.log('json', result);
    const str = JSON.stringify(result, null, 2);
    let blob = new Blob([str], { type: 'text/plain' });
    saveAs(blob, 'monster.json');
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      let fr = new FileReader();
      fr.onload = (x) => resolve(fr.result);
      fr.readAsText(file);
    });
  };

  const onInputFile = async (e, type) => {
    const file = e?.target?.files[0];
    // if (!file) return;
    // const data = await readFile(file);
    // console.log(data);
    // if (type === 'svg') {
    //   loadSvgStr(data);
    // } else {
    //   loadJson(data);
    // }
    onDropFile(file, type);
  };

  const onDropFile = async (file, type) => {
    if (!file) return;
    const data = await readFile(file);
    console.log(data);
    if (type === 'svg') {
      loadSvgStr(data);
    } else {
      loadJson(data);
    }
  };

  const loadJson = (data) => {
    const json = JSON.parse(data);
    if (!json) return;
    canvas.loadFromJSON(
      json,
      () => {
        canvas.renderAll();
      },
      (o, object) => {
        console.log(o, object);
      }
    );
  };

  const loadSvgStr = (data) => {
    fabric.loadSVGFromString(data, (objects, options) => {
      var obj = fabric.util.groupSVGElements(objects, options);
      obj
        .scaleToHeight(canvas.height / 6)
        .set({ left: canvas.width / 2, top: canvas.height / 2 })
        .setCoords();

      canvas.add(obj);
      canvas.requestRenderAll();
    });
  };

  const handleChangeColor = (hex) => {
    console.log('change color', hex);
    setColor(hex);
    setFill(hex);
  };

  const loadSvg = (svgPath) => {
    fabric.loadSVGFromURL(svgPath, (objects, options) => {
      var obj = fabric.util.groupSVGElements(objects, options);
      obj
        .scaleToHeight(canvas.height / 6)
        .set({ left: canvas.width / 2, top: canvas.height / 2 })
        .setCoords();

      canvas.add(obj);
      canvas.requestRenderAll();
    });
  };

  const undo = () => {
    canvas.undo();
  };
  const redo = () => {
    canvas.redo();
  };

  const duplicate = () => {
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
  };

  const resize = () => {
    canvas.setWidth(originalSize.width * canvas.getZoom());
    canvas.setHeight(originalSize.height * canvas.getZoom());
  };

  const setZoom = (val) => {
    canvas.setZoom(val);
    resize();
  };

  const zoomIn = () => {
    setZoom(canvas.getZoom() + 0.1);
  };
  const zoomOut = () => {
    setZoom(canvas.getZoom() - 0.1);
  };

  function handleKeyPress(e) {
    const objType = canvas?.getActiveObject()?.type;
    if (objType && objType === 'i-text') return;
    e.preventDefault();
    // console.log(e.keyCode);
    if (!e) return;
    const cmd = e.ctrlKey || e.metaKey; //e.shiftKey ||  e.altKey

    if (e.keyCode === 90 && e.ctrlKey) {
      console.log('Ctrl+z');
      undo();
    } else if (e.keyCode === 89 && cmd) {
      console.log('Ctrl+y');
      redo();
    } else if (e.keyCode === 71 && cmd) {
      console.log('Ctrl+g');
      group();
    } else if (e.keyCode === 85 && cmd) {
      console.log('Ctrl+u');
      ungroup();
    } else if (e.keyCode === 65 && cmd) {
      console.log('Ctrl+a');
      selectAll();
    } else if (e.keyCode === 27) {
      console.log('Esc');
      deselectAll();
      // } else if (e.keyCode === 67 && cmd) {
      //   console.log('Ctrl+c');
      //   copy();
    } else if (e.keyCode === 187 && cmd) {
      console.log('Ctrl -');
      zoomIn();
    } else if (e.keyCode === 189 && cmd) {
      console.log('Ctrl -');
      zoomOut();
    } else if (e.keyCode === 86 && cmd) {
      console.log('Ctrl+v');
      duplicate();
    } else if (e.keyCode === 8) {
      console.log('backspace');
      removeObj();
    } else if (e.keyCode === 84) {
      console.log('t');
      addText();
    } else if (e.keyCode === 38) {
      if (cmd) {
        console.log('to back');
        sendToBack();
      } else {
        console.log('backwards');
        sendBackwards();
      }
    } else if (e.keyCode === 40) {
      if (cmd) {
        console.log('to front');
        bringToFront();
      } else {
        console.log('forward');
        bringForward();
      }
    } else {
      console.log('ignore');
    }
  }
  useEffect(() => {
    if (canvas) {
      console.log('init keyboard');
      window.addEventListener('keydown', (e) => handleKeyPress(e));
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [canvas]);

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const sections = ['Eyes', 'Body', 'Mouth', 'Legs', 'Arms', 'Accessories'];
  return (
    <div onKeyDown={(e) => handleKeyPress(e)}>
      <h1>Monster Factory</h1>
      <div className="cols">
        <div>
          <div>
            <div>
              <h4>{'TOOLS'}</h4>
              <ButtonGroup colorScheme="blackAlpha" size="md" spacing="1">
                <Button onClick={() => addTri()}>
                  <FiTriangle />
                </Button>
                <Button onClick={() => addCircle()}>
                  <FiCircle />
                </Button>
                <Button onClick={() => addRect()}>
                  <FiSquare />
                </Button>
                <Button onClick={() => addText()}>
                  <BiText />
                </Button>
              </ButtonGroup>
              <ButtonGroup colorScheme="blackAlpha" size="md" spacing="1">
                <Button onClick={() => undo()}>
                  <MdUndo />
                </Button>
                <Button onClick={() => redo()}>
                  <MdRedo />
                </Button>
              </ButtonGroup>
              <ButtonGroup colorScheme="blackAlpha" size="md" spacing="1">
                <Button onClick={() => duplicate()}>
                  <BiDuplicate />
                </Button>
                <Button onClick={() => removeObj()}>remove current</Button>
              </ButtonGroup>
              <ButtonGroup colorScheme="blackAlpha" size="md" spacing="1">
                <Button onClick={() => group()}>group</Button>
                <Button onClick={() => ungroup()}>ungroup</Button>
                <Button onClick={() => sendToBack()}>sendToBack</Button>
                <Button onClick={() => sendBackwards()}>sendBackwards</Button>
                <Button onClick={() => bringForward()}>bringForward</Button>
                <Button onClick={() => bringToFront()}>bringToFront</Button>
              </ButtonGroup>
              <ButtonGroup colorScheme="blackAlpha" size="md" spacing="1">
                <Button onClick={() => selectAll()}>selectAll</Button>
                <Button onClick={() => deselectAll()}>deselectAll</Button>
                <Button onClick={() => clear()}>clear</Button>
                <Button leftIcon={<MdSave />} onClick={() => saveToSvg()}>
                  Save SVG
                </Button>
                <Button leftIcon={<MdSave />} onClick={() => saveToJson()}>
                  Save JSON
                </Button>
                <Button onClick={() => zoomIn()}>zoom</Button>
              </ButtonGroup>
            </div>
            <div>
              <h4>{'FILL'}</h4>
              <input
                type="color"
                value={color}
                onChange={(e) => handleChangeColor(e.target.value)}
              />
            </div>
          </div>
          <div
            style={{
              // backgroundColor: '#464954',
              padding: 0,
              margin: 0,
              position: 'relative',
            }}
          >
            <canvas ref={canvasRef} />
          </div>

          <div style={{ display: 'flex' }}>
            <section>
              <h4>{'Load JSON'}</h4>
              <input
                type="file"
                accept="application/json"
                onChange={(e) => onInputFile(e, 'json')}
              />
            </section>
            <section>
              <h4>{'Load SVG'}</h4>
              <input
                type="file"
                accept="image/svg+xml"
                onChange={(e) => onInputFile(e, 'svg')}
              />
              <FileUploader
                accept="image/svg+xml"
                onDone={(f) => onDropFile(f, 'svg')}
              />
            </section>
          </div>
        </div>
        <div>
          <div className="sections_wrap">
            {sections.map((section) => {
              return (
                <section key={section} className="section">
                  <h4>{section}</h4>
                  <div className="grid">
                    {numbers.map((n) => {
                      const svg = `/svg/${section.toLowerCase()}${n}.svg`;
                      return (
                        <Box d="flex" bg="gray.700" key={`${section}_${n}`}>
                          <img
                            alt={`${section}_${n}`}
                            key={`svg_${section}_${n}`}
                            src={svg}
                            onClick={() => loadSvg(svg)}
                            style={{ width: 40, height: 40 }}
                          />
                        </Box>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
