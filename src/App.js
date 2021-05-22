import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import saveAs from 'save-as';
import 'fabric-history';

function App() {
  const [canvas, setCanvas] = useState('');
  const [dataJSON, setDataJSON] = useState('');
  const [dataSVG, setDataSVG] = useState('');
  const [color, setColor] = useState('#464954');
  const canvasRef = useRef(null);
  const originalSize = { height: 600, width: 800 };
  const initCanvas = () => {
    return new fabric.Canvas(canvasRef.current, {
      ...originalSize,
      // backgroundColor: '#464954',
      backgroundColor: 'transparent',
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
      fill: 'white',
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
      fill: 'blue',
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
      fill: 'green',
      radius: 50,
      left: 200,
      top: 200,
    });
    canvas.add(triangle);
    canvas.requestRenderAll();
  };

  // const addSample = () => {

  //   fabric.loadSVGFromURL('/test_svg/eyes.svg', (objects, options) => {
  //     var obj = fabric.util.groupSVGElements(objects, options);
  //     obj
  //       .scaleToHeight(canvas.height / 2)
  //       .set({ left: canvas.width / 4, top: canvas.height / 4 })
  //       .setCoords();

  //     canvas.add(obj).renderAll();
  //   });

  //   const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="167" height="170.57" viewBox="0 0 167 170.57"><g id="body_9"><path fill="#345ee2" d="M167,17.25c0,8.81-7.15,17.6-16,17.6s-16-8.79-16-17.6S142.66,4,151.47,4,167,8.43,167,17.25"/></g></svg>`;

  //   fabric.loadSVGFromString(svgStr, (objects, options) => {
  //     var obj = fabric.util.groupSVGElements(objects, options);
  //     obj
  //       .scaleToHeight(canvas.height / 2)
  //       .set({ left: canvas.width / 4, top: canvas.height / 4 })
  //       .setCoords();

  //     canvas.add(obj);
  //     canvas.requestRenderAll();
  //   });

  //   const svgStr2 = `<svg xmlns="http://www.w3.org/2000/svg"><g id="mouth_9">
  //     <path fill="#c52728" d="M29.2,13.84c0,7.64-6.2,8.81-13.84,8.81S1.52,21.48,1.52,13.84a13.84,13.84,0,0,1,27.68,0" transform="translate(0 0)"/>
  //     <path fill="#fceaed" d="M21.65,7.83a4.73,4.73,0,0,0,2.86-4.35A13.79,13.79,0,0,0,6.28,3.41c.2,2.21,1,4.87,3.63,4.7a5.15,5.15,0,0,0,5-4.19s1.4,6.15,6.71,3.91" transform="translate(0 0)"/>
  //   </g></svg>`;

  //   fabric.loadSVGFromString(svgStr2, (objects, options) => {
  //     var obj2 = fabric.util.groupSVGElements(objects, options);
  //     obj2
  //       .scaleToHeight(50)
  //       .set({ left: canvas.width / 4, top: canvas.height / 4 })
  //       .setCoords();

  //     canvas.add(obj2).renderAll();
  //   });

  //   fabric.loadSVGFromString(arm9, (objects, options) => {
  //     var obj2 = fabric.util.groupSVGElements(objects, options);
  //     obj2
  //       .scaleToHeight(50)
  //       .set({ left: canvas.width / 4, top: canvas.height / 4 })
  //       .setCoords();

  //     canvas.add(obj2);
  //   });
  // };

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
    // var json_data = JSON.stringify(canvas.toDatalessJSON());
    // console.log('dataless', json_data);
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

  // function readSingleFile(e) {
  //   var file = e.target.files[0];
  //   if (!file) {
  //     return;
  //   }
  //   var reader = new FileReader();
  //   reader.onload = function (e) {
  //     var contents = e.target.result;
  //   };
  //   reader.readAsText(file);
  // }

  const onInputFile = async (e, type) => {
    const file = e?.target?.files[0];
    if (!file) return;
    const data = await readFile(file);
    console.log(data);
    if (type === 'svg') {
      loadSvgStr(data);
    } else {
      loadJson(data);
    }
  };

  const handleLoadJson = (e) => {
    e?.preventDefault();
    if (!dataJSON) return;
    loadJson(dataJSON);
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

  const handleLoadSVG = (e) => {
    e.preventDefault();

    if (!dataSVG) return;
    loadSvgStr(dataSVG);
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

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const sections = ['Eyes', 'Body', 'Mouth', 'Legs', 'Arms', 'Accessories'];
  return (
    <div>
      <h1>Monster Factory</h1>
      <div className="cols">
        <div>
          <div>
            <button onClick={() => undo()}>undo</button>
            <button onClick={() => redo()}>redo</button>

            {/* <button onClick={() => addSample()}>add rects</button> */}
            <button onClick={() => duplicate()}>duplicate</button>
            <button onClick={() => addText()}>add text</button>
            <button onClick={() => removeObj()}>remove current</button>
            <button onClick={() => group()}>group</button>
            <button onClick={() => ungroup()}>ungroup</button>
            <button onClick={() => selectAll()}>selectAll</button>
            <button onClick={() => deselectAll()}>deselectAll</button>
          </div>
          <div>
            <button onClick={() => clear()}>clear</button>
            <button onClick={() => sendToBack()}>sendToBack</button>
            <button onClick={() => sendBackwards()}>sendBackwards</button>
            <button onClick={() => bringForward()}>bringForward</button>
            <button onClick={() => bringToFront()}>bringToFront</button>
            <button onClick={() => saveToSvg()}>saveToSvg</button>
            <button onClick={() => saveToJson()}>saveToJson</button>
            <button onClick={() => setZoom(canvas.getZoom() + 0.1)}>
              zoom
            </button>
            <input
              type="color"
              value={color}
              onChange={(e) => handleChangeColor(e.target.value)}
            />
          </div>
          <div
            style={{
              backgroundColor: '#464954',
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
            </section>
          </div>

          <div style={{ display: 'flex' }}>
            <section>
              <h4>{'Load JSON'}</h4>
              <form onSubmit={(e) => handleLoadJson(e)}>
                <div>
                  <textarea
                    cols={30}
                    rows={10}
                    value={dataJSON}
                    onChange={(e) => setDataJSON(e.target.value)}
                  />
                </div>
                <div>
                  <button type="submit">Load JSON</button>
                </div>
              </form>
            </section>
            <section>
              <h4>{'Load SVG'}</h4>
              <form onSubmit={(e) => handleLoadSVG(e)}>
                <div>
                  <textarea
                    cols={30}
                    rows={10}
                    value={dataSVG}
                    onChange={(e) => setDataSVG(e.target.value)}
                  />
                </div>
                <div>
                  <button type="submit">Load SVG</button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <div>
          <div className="sections_wrap">
            <section>
              <h4>{'SHAPES'}</h4>
              <button onClick={() => addTri()}>tri</button>
              <button onClick={() => addCircle()}>circle</button>
              <button onClick={() => addRect()}>rect</button>
            </section>
            {sections.map((section) => {
              return (
                <section key={section} className="section">
                  <h4>{section}</h4>
                  <div className="grid">
                    {numbers.map((n) => {
                      const svg = `/svg/${section.toLowerCase()}${n}.svg`;
                      return (
                        <img
                          alt={`${section}_${n}`}
                          key={`${section}_${n}`}
                          width={75}
                          height={75}
                          src={svg}
                          onClick={() => loadSvg(svg)}
                        />
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
