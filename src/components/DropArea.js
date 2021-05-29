import React, { useCallback } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { MdFileUpload, MdPhoto } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
// import { humanFileSize, loadImgFromBlob } from 'lib/utils';

const MAX_IMAGE_IN_MB = 2;
const maxSize = MAX_IMAGE_IN_MB * 1024 * 1034;

function FileUploader({ onDone, accept = 'image/*' }) {
  const sendFile = (f) => {
    onDone && onDone(f);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      console.log('acceptedFiles', acceptedFiles);
      if (acceptedFiles && acceptedFiles.length > 0) {
        sendFile(acceptedFiles[0]);
      }
    } catch (e) {
      console.error('OnDrop Error', e);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    // isDragReject,
    // rejectedFiles
  } = useDropzone({ onDrop, maxSize, accept });

  return (
    <Box mb="20px">
      <Text textAlign="center" mb={2}>
        Click here or drop a file to upload! Max Sixe: {MAX_IMAGE_IN_MB}MB
      </Text>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        p={10}
        d="flex"
        alignItems="baseline"
        justifyContent="center"
        style={{ minHeight: 150 }}
      >
        <Box {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <div>
              <MdFileUpload size={140} />
            </div>
          ) : (
            <div>
              <MdPhoto size={140} />
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default FileUploader;
