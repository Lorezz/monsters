import { Flex, Button } from '@chakra-ui/react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
// import { useContext } from 'react';
// import { Helmet } from 'react-helmet';
// import { FabricContext } from '../lib/ctx';
// import { svgToB64 } from '../lib/utils';
const Share = () => {
  const shareUrl = 'https://monster-factory.netlify.app';
  // const [canvas] = useContext(FabricContext);
  // if (!canvas) {
  //   return null;
  // }
  // const w = canvas?.getWidth();
  // const h = canvas?.getHeight();
  // const image = canvas.toDataURL({
  //   width: canvas.width,
  //   height: canvas.height,
  //   left: 0,
  //   top: 0,
  //   format: 'png',
  // });

  return (
    <Flex alignItems="center" justifyContent="space-around" my={10}>
      {/* <Helmet>
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content={w} />
        <meta property="og:image:height" content={h} />
        <meta name="twitter:image" content={image} />
      </Helmet>   <Box>
        <img src={image} lazy="true" width={100} />
      </Box> */}
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
