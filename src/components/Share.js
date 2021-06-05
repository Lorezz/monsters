import { Flex, Button } from '@chakra-ui/react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
// import { useContext } from 'react';
// import { MdSave, MdMoreVert, MdFileUpload, MdShare } from 'react-icons/md';
// import { Helmet } from 'react-helmet';

// import { FabricContext } from '../lib/ctx';
const Share = () => {
  // const [canvas] = useContext(FabricContext);
  const shareUrl = 'https://monsters-factory.netlify.app';
  return (
    <Flex alignItems="center" justifyContent="space-around" my={10}>
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
