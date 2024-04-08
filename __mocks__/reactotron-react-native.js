export const Reactotron = {
  configure: () => Reactotron,
  useReactNative: () => Reactotron,
  asyncStorage: () => Reactotron,
  trackGlobalErrors: () => Reactotron,
  createEnhancer: () => jest.fn,
  use: () => Reactotron,
  connect: () => Reactotron,
  clear: () => Reactotron,
};

module.exports = Reactotron;
