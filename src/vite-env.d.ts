/// <reference types="vite/client" />

declare module '*.{png,jpg,jpeg,gif,bmp,svg,webp}' {
  const value: string;
  export default value;
}
