/* global configured */
(() => {
  document.querySelectorAll('.object').forEach(element => {
    const type = element.getAttribute('data-type');
    const obj = {
      id: `${type}-${+new Date()}`,
      getLayout: async () => ({
        qInfo: {
          qId: 'id:',
        },
        visualization: type,
      }),
      on() {},
      once() {},
    };

    const app = {
      id: `${+new Date()}`,
      createSessionObject: async () => obj,
      getObject: async () => obj,
      getAppLayout: async () => ({ qTitle: '', qLocaleInfo: {} }),
    };

    const n = configured(app);

    n.create(
      {
        type,
      },
      {
        element,
      }
    ).then(viz => {
      element.addEventListener('click', () => {
        viz.exportImage().then(res => {
          element.setAttribute('data-captured', res.url);
        });
      });
    });
  });
})();
