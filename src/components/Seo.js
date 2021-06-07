import { Helmet } from 'react-helmet';

const Seo = () => {
  const baseUrl = 'https://monster-factory.netlify.app';
  const title = `Monster Factory`;
  const description = `Try to make the funniest and cutest Monster.`;
  const image = `${baseUrl}/og.png`;
  const w = '1266';
  const h = '808';
  const twitterUser = '@wisejerk';
  return (
    <Helmet>
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={w} />
      <meta property="og:image:height" content={h} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={twitterUser} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
    </Helmet>
  );
};
export default Seo;
