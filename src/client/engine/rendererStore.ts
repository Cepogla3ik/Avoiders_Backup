import Renderer from './Renderer';

let renderer: Renderer | null = null;

export const setRenderer = (r: Renderer) => {
  renderer = r;
};

export const getRenderer = () => renderer;