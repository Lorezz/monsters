export const openUrl = (url) => {
  window.open(url, '_blank');
};

export const svgToB64 = (svg) => {
  return 'data:image/svg+xml;base64,' + window.btoa(svg);
  // const  url = 'url("' + b64 + '")';
};
