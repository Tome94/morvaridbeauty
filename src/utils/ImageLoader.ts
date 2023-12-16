// ImageLoader.ts
/// <reference types="webpack-env" />

interface RequireContext {
  keys(): string[];
  <T>(id: string): T;
}

const importAll = (context: RequireContext) => context.keys().map(context);

const imagesContext = require.context("../assets/HairPromo", false, /\.(png|jpg|jpeg)$/);
const imagePaths = imagesContext.keys();
console.log(imagePaths);

const images = importAll(imagesContext);

export default images;
