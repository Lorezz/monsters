import React, { useContext, useState, useEffect } from 'react';
import { Button, Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { FiTriangle, FiCircle, FiSquare, FiDelete } from 'react-icons/fi';
import { BiText, BiDuplicate } from 'react-icons/bi';
import {
  MdUndo,
  MdRedo,
  MdFirstPage,
  MdLastPage,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
} from 'react-icons/md';

import {
  RiStackFill,
  RiStackLine,
  RiApps2Fill,
  RiApps2Line,
} from 'react-icons/ri';

import { FabricContext } from '../lib/ctx';
import * as api from '../lib/api';
import Buttonbar from './Buttonbar';

const Tools = ({ size, isSM }) => {
  const [canvas] = useContext(FabricContext);
  const [color, setColor] = useState('#464954');
  const [bg, setBg] = useState('#464954');
  const [stroke, setStroke] = useState('#464954');

  const iconSize = isSM ? 14 : 20;

  const onSelected = () => {
    // console.log('OBJECT SELECTED');
    if (canvas && canvas.getActiveObjects()) {
      const items = canvas.getActiveObjects();
      items.forEach((current) => {
        const fill = current.get('fill');
        if (fill) {
          setColor(fill);
        }
        // const opacity = current.get('opacity');
        // console.log('fill', fill, 'opacity', opacity);
      });
    }
  };

  useEffect(() => {
    if (canvas) {
      api.setCanvas(canvas);
      // console.log('init keyboard');
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
      // console.log('SET SIZE', size);
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

  return (
    <Box w={{ base: 100, md: 400 }} p={4} overflowY="scroll" maxH={'90%'}>
      <Heading fontSize="sm">{'TOOLS'}</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} mb={10}>
        <Box mb={5}>
          <Text fontSize="xs">CANVAS BG</Text>
          <input
            type="color"
            value={bg}
            onChange={(e) => handleChangeCanvasBGColor(e.target.value)}
          />
        </Box>

        <Box mb={5}>
          <Text fontSize="xs">FILL</Text>
          <input
            type="color"
            value={color}
            onChange={(e) => handleChangeFillColor(e.target.value)}
          />
        </Box>

        <Button py={2} onClick={() => api.undo()} title="UNDO">
          <MdUndo size={iconSize} />
        </Button>
        <Button py={2} onClick={() => api.redo()} title="REDO">
          <MdRedo size={iconSize} />
        </Button>
        <Button py={2} onClick={() => api.selectAll()} title="SELECT ALL">
          <RiApps2Fill size={iconSize} />
        </Button>
        <Button py={2} onClick={() => api.deselectAll()} title="DESELECT ALL">
          <RiApps2Line size={iconSize} />
        </Button>

        <Button
          py={2}
          onClick={() => api.duplicate()}
          title="DUPLICATE SELECTED"
        >
          <BiDuplicate size={iconSize} />
        </Button>
        <Button py={2} onClick={() => api.removeObj()} title="REMOVE SELECTED">
          <FiDelete size={iconSize} />
        </Button>
        <Button py={2} onClick={() => api.group()} title="GROUP">
          <RiStackFill size={iconSize} />
        </Button>
        <Button py={2} onClick={() => api.ungroup()} title="UNGROUP">
          <RiStackLine size={iconSize} />
        </Button>

        <Button py={2} onClick={() => api.sendToBack()} title="SEND BACK">
          <MdFirstPage size={iconSize} />
        </Button>
        <Button
          py={2}
          onClick={() => api.sendBackwards()}
          title="SEND BACKWARDS"
        >
          <MdChevronLeft size={iconSize} />
        </Button>
        <Button py={2} onClick={() => api.bringForward()} title="BRING FORWARD">
          <MdChevronRight size={iconSize} />
        </Button>
        <Button
          py={2}
          onClick={() => api.bringToFront()}
          title="BRING TO FRONT"
        >
          <MdLastPage size={iconSize} />
        </Button>

        <Button py={2} onClick={() => api.clear()} title="CLEAR CANVAS">
          <MdClose size={iconSize} />
        </Button>
        <Button py={2} onClick={() => api.addText()}>
          <BiText size={iconSize} />
        </Button>

        <Button py={2} onClick={() => api.addTri()} title="ADD TRIANGLE">
          <FiTriangle size={iconSize} />
        </Button>
        <Button py={2} onClick={() => api.addCircle()} title="ADD CIRCLE">
          <FiCircle size={iconSize} />
        </Button>
        <Button py={2} onClick={() => api.addRect()} title="ADD RECTANGLE">
          <FiSquare size={iconSize} />
        </Button>

        {/* <Button py={2} onClick={() => api.zoomOut()} title="ZOOM OUT">
            <MdZoomOut />
          </Button>
          <Button py={2} onClick={() => api.zoomIn()} title="ZOOM IN">
            <MdZoomIn />
          </Button>
          <Button py={2} leftIcon={<MdSave />} onClick={() => api.saveToSvg()}>
            SVG
          </Button>
          <Button py={2} leftIcon={<MdSave />} onClick={() => api.saveToJson()}>
            JSON
          </Button>
          <Box>
          <Text fontSize="xs">STROKE</Text>
          <input
            type="color"
            value={stroke}
            onChange={(e) => handleChangeStrokeColor(e.target.value)}
          />
        </Box> */}
      </SimpleGrid>
      <Buttonbar isSM={isSM} />
    </Box>
  );
};

export default Tools;
