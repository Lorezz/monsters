import { Flex, Button, Box } from '@chakra-ui/react';
import saveAs from 'save-as';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { useContext } from 'react';
// import { MdSave, MdMoreVert, MdFileUpload, MdShare } from 'react-icons/md';
import { Helmet } from 'react-helmet';

import { FabricContext } from '../lib/ctx';
import { svgToB64 } from '../lib/utils';
const Share = () => {
  const [canvas] = useContext(FabricContext);
  const shareUrl = 'https://monsters-factory.netlify.app';

  if (!canvas) {
    return null;
  }
  const w = canvas?.getWidth();
  const h = canvas?.getHeight();
  const image = canvas.toDataURL({
    width: canvas.width,
    height: canvas.height,
    left: 0,
    top: 0,
    format: 'png',
  });

  return (
    <Flex alignItems="center" justifyContent="space-around" my={10}>
      <Helmet>
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content={w} />
        <meta property="og:image:height" content={h} />
        <meta name="twitter:image" content={image} />
      </Helmet>

      <Box>
        <img src={image} lazy="true" width={100} />
      </Box>
      <TwitterShareButton url={shareUrl}>
        <Button colorScheme="twitter">Twitter</Button>
      </TwitterShareButton>

      <FacebookShareButton url={shareUrl}>
        <Button colorScheme="facebook">Facebook</Button>
      </FacebookShareButton>

      <WhatsappShareButton url={shareUrl}>
        <Button colorScheme="teal">Whatsapp</Button>
      </WhatsappShareButton>
    </Flex>
  );
};
export default Share;
