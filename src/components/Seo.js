import { Helmet } from 'react-helmet';

const Seo = () => {
  const baseUrl = 'https://monsters-factory.netlify.app';
  const title = `Monster's Factory`;
  const description = `Try to make the funniest and cutest Monster.`;
  const image = `${baseUrl}/og.png`;
  const w = '800';
  const h = '516';
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

{
  /* <meta property="og:url" content="https://monsters-factory.netlify.app/" />
    <meta property="og:title" content="Monster's Factory" />
    <meta property="og:description" content="Try to create the most funny and cute monster." />
    <meta property="og:image" content="https://monsters-factory.netlify.app/og.png" />
    <meta property="og:image:width" content="800" />
    <meta property="og:image:height" content="516" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Monster's Factory" />
    <meta name="twitter:description" content="Try to create the most funny and cute monster." />
    <meta name="twitter:site" content="@wisejerk" />
    <meta name="twitter:image" content="https://monsters-factory.netlify.app/og.png" />
    <meta name="twitter:image:alt" content="Monster's Factory"/> */
}
