import FileUploader from './components/DropArea';

const ImportSection = (api) => (
  <div style={{ display: 'flex' }}>
    <section>
      <h4>{'Load JSON'}</h4>
      <input
        type="file"
        accept="application/json"
        onChange={(e) => api.onInputFile(e, 'json')}
      />
    </section>
    <section>
      <h4>{'Load SVG'}</h4>
      <input
        type="file"
        accept="image/svg+xml"
        onChange={(e) => api.onInputFile(e, 'svg')}
      />
      {canvas && (
        <FileUploader
          accept="image/svg+xml"
          onDone={(f) => api.onDropFile(f, 'svg')}
        />
      )}
    </section>
  </div>
);

export default ImportSection;
