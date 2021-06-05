import { useContext } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
const shareUrl = 'https://monsters-factory.netlify.app';
import { MdSave, MdMoreVert, MdFileUpload, MdShare } from 'react-icons/md';
// import { Helmet } from 'react-helmet';

const Share = () => {
  const [canvas] = useContext(FabricContext);
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
