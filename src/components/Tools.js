import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Box,
  Heading,
  Kbd,
  Text,
  Flex,
  Stack,
  Center,
  SimpleGrid,
  Wrap,
} from '@chakra-ui/react';
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

const Tools = ({ size }) => {
  const [canvas] = useContext(FabricContext);
  const [color, setColor] = useState('#464954');
  const [bg, setBg] = useState('#464954');
  const [stroke, setStroke] = useState('#464954');

  const onSelected = () => {
    console.log('OBJECT SELECTED');
    if (canvas && canvas.getActiveObjects()) {
      const items = canvas.getActiveObjects();
      items.forEach((current) => {
        console.log(current);
        const fill = current.get('fill');
        if (fill) {
          setColor(fill);
        }
        const opacity = current.get('opacity');
        console.log('fill', fill, 'opacity', opacity);
      });
    }
  };

  useEffect(() => {
    if (canvas) {
      api.setCanvas(canvas);
      console.log('init keyboard');
      window.addEventListener('keydown', (e) => api.handleKeyPress(e));

      canvas.on('selection:created', () => onSelected());
      canvas.on('selection:updated', () => onSelected());
      canvas.on('object:modified', () => onSelected());

      return () => {
        window.removeEventListener('keydown', api.handleKeyPress);
      };
    }
  }, [canvas]);

  useEffect(() => {
    if (size.width && size.height) {
      console.log('SET SIZE', size);
      api.setSize(size);
    }
  }, [size]);

  if (!canvas) {
    return null;
  }

  const handleChangeFillColor = (hex) => {
    setColor(hex);
    api.setFill(hex);
  };

  const handleChangeStrokeColor = (hex) => {
    api.setStroke(hex);
    setStroke(hex);
  };

  const handleChangeCanvasBGColor = (hex) => {
    api.setCanvasBGColor(hex);
    setBg(hex);
  };

  // useEffect(() => {
  //   if (canvas) {
  //   }
  // }, [canvas]);

  return (
    <Box w={400} p={4}>
      <Heading fontSize="sm">{'TOOLS'}</Heading>
      <Center>
        <SimpleGrid columns={2} spacing={2}>
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

          <Button onClick={() => api.undo()} title="UNDO">
            <MdUndo />
          </Button>
          <Button onClick={() => api.redo()} title="REDO">
            <MdRedo />
          </Button>
          <Button onClick={() => api.selectAll()} title="SELECT ALL">
            <RiApps2Fill />
          </Button>
          <Button onClick={() => api.deselectAll()} title="DESELECT ALL">
            <RiApps2Line />
          </Button>

          <Button onClick={() => api.duplicate()} title="DUPLICATE SELECTED">
            <BiDuplicate />
          </Button>
          <Button onClick={() => api.removeObj()} title="REMOVE SELECTED">
            <FiDelete />
          </Button>
          <Button onClick={() => api.group()} title="GROUP">
            <RiStackFill />
          </Button>
          <Button onClick={() => api.ungroup()} title="UNGROUP">
            <RiStackLine />
          </Button>

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

          <Button onClick={() => api.clear()} title="CLEAR CANVAS">
            <MdClose />
          </Button>
          <Button onClick={() => api.addText()}>
            <BiText />
          </Button>
          {/* <Button onClick={() => api.zoomOut()} title="ZOOM OUT">
            <MdZoomOut />
          </Button>
          <Button onClick={() => api.zoomIn()} title="ZOOM IN">
            <MdZoomIn />
          </Button> */}

          <Button onClick={() => api.addTri()} title="ADD TRIANGLE">
            <FiTriangle />
          </Button>
          <Button onClick={() => api.addCircle()} title="ADD CIRCLE">
            <FiCircle />
          </Button>
          <Button onClick={() => api.addRect()} title="ADD RECTANGLE">
            <FiSquare />
          </Button>

          <Box />
          <Button leftIcon={<MdSave />} onClick={() => api.saveToSvg()}>
            SVG
          </Button>
          <Button leftIcon={<MdSave />} onClick={() => api.saveToJson()}>
            JSON
          </Button>

          {/* <Box>
          <Text fontSize="xs">STROKE</Text>
          <input
            type="color"
            value={stroke}
            onChange={(e) => handleChangeStrokeColor(e.target.value)}
          />
        </Box> */}
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default Tools;
