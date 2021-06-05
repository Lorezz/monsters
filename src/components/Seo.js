import { Helmet } from 'react-helmet';
// import { useContext } from 'react';
// import { FabricContext } from '../lib/ctx';
const Share = () => {
  // const [canvas] = useContext(FabricContext);

  const baseUrl = 'https://monsters-factory.netlify.app/';
  const title = `Monster's Factory`;
  const description = `Try to create the most funny and cute monster.`;
  const image = `${baseUrl}/og.png`; //TOO ADD IMAGE FROM CANVAS FOR SHARE
  const twitterUser = '@wisejerk';
  return (
    <>
      <Helmet>
        <meta property="og:url" content={baseUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="516" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:site" content={twitterUser} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={title} />
      </Helmet>
    </>
  );
};
export default Share;
