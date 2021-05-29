import React, { useContext, useState, useEffect } from 'react';
import { Button, ButtonGroup, Box, Heading, Kbd } from '@chakra-ui/react';
import { FiTriangle, FiCircle, FiSquare, FiDelete } from 'react-icons/fi';
import { BiText, BiDuplicate } from 'react-icons/bi';
import {
  MdUndo,
  MdRedo,
  MdSave,
  MdSelectAll,
  MdTabUnselected,
  MdFirstPage,
  MdLastPage,
  MdChevronLeft,
  MdChevronRight,
  MdZoomOut,
  MdZoomIn,
  MdClose,
} from 'react-icons/md';

import {
  RiStackFill,
  RiStackLine,
  RiDragDropFill,
  RiDragDropLine,
  RiApps2Fill,
  RiApps2Line,
} from 'react-icons/ri';

import { FabricContext } from '../lib/ctx';
import * as api from '../lib/api';

const Tools = () => {
  const [canvas] = useContext(FabricContext);
  const [color, setColor] = useState('#464954');
  const [bg, setBg] = useState('#464954');
  const [stroke, setStroke] = useState('#464954');

  useEffect(() => {
    if (canvas) {
      api.setCanvas(canvas);
    }
  }, [canvas]);

  if (!canvas) {
    return null;
  }

  const handleChangeColor = (hex) => {
    console.log('change color', hex);
    setColor(hex);
    api.setFill(hex);
  };

  return (
    <Box>
      <Heading fontSize="sm">{'TOOLS'}</Heading>
      <ButtonGroup variant="outline" size="md" spacing="1">
        <Button onClick={() => api.addTri()} title="ADD TRIANGLE">
          <FiTriangle />
        </Button>
        <Button onClick={() => api.addCircle()} title="ADD CIRCLE">
          <FiCircle />
        </Button>
        <Button onClick={() => api.addRect()} title="ADD RECTANGLE">
          <FiSquare />
        </Button>
        <Button onClick={() => api.addText()}>
          <BiText />
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="outline" size="md" spacing="1">
        <Button onClick={() => api.undo()} title="UNDO">
          <MdUndo />
        </Button>
        <Button onClick={() => api.redo()} title="REDO">
          <MdRedo />
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="outline" size="md" spacing="1">
        <Button onClick={() => api.selectAll()} title="SELECT ALL">
          <RiApps2Fill />
        </Button>
        <Button onClick={() => api.deselectAll()} title="DESELECT ALL">
          <RiApps2Line />
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="outline" size="md" spacing="1">
        <Button onClick={() => api.duplicate()} title="DUPLICATE SELECTED">
          <BiDuplicate />
        </Button>
        <Button onClick={() => api.removeObj()} title="REMOVE SELECTED">
          <FiDelete />
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="outline" size="md" spacing="1">
        <Button onClick={() => api.group()} title="GROUP">
          <RiStackFill />
        </Button>
        <Button onClick={() => api.ungroup()} title="UNGROUP">
          <RiStackLine />
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="outline" size="md" spacing="1">
        <Button onClick={() => api.sendToBack()} title="SEND BACK">
          <MdFirstPage />
        </Button>
        <Button onClick={() => api.sendBackwards()} title="SEND BACKWARDS">
          <MdChevronLeft />
        </Button>
        <Button onClick={() => api.bringForward()} title="BRING FORWARD">
          <MdChevronRight />
        </Button>
        <Button onClick={() => api.bringToFront()} title="BRING TO FRONT">
          <MdLastPage />
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="outline" size="md" spacing="1">
        <Button onClick={() => api.clear()} title="CLEAR CANVAS">
          <MdClose />
        </Button>
        <Button onClick={() => api.zoomOut()} title="ZOOM OUT">
          <MdZoomOut />
        </Button>
        <Button onClick={() => api.zoomIn()} title="ZOOM IN">
          <MdZoomIn />
        </Button>
      </ButtonGroup>

      <ButtonGroup variant="outline" size="md" spacing="1">
        <Button leftIcon={<MdSave />} onClick={() => api.saveToSvg()}>
          SVG
        </Button>
        <Button leftIcon={<MdSave />} onClick={() => api.saveToJson()}>
          JSON
        </Button>
      </ButtonGroup>

      <Box>
        <Text fontSize="xs">CANVAS BG</Text>
        <input
          type="color"
          value={bg}
          onChange={(e) => handleChangeCanvasBGColor(e.target.value)}
        />
      </Box>
      <Box>
        <Text fontSize="xs">FILL</Text>
        <input
          type="color"
          value={color}
          onChange={(e) => handleChangeFillColor(e.target.value)}
        />
      </Box>
      <Box>
        <Text fontSize="xs">STROKE</Text>
        <input
          type="color"
          value={stroke}
          onChange={(e) => handleChangeStrokeColor(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default Tools;
