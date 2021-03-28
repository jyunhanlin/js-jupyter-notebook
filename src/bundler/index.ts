import * as esbuild from 'esbuild-wasm';

import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

let isServerInit = false;

const bundle = async (rawCode: string) => {
  if (!isServerInit) {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.10.2/esbuild.wasm',
    });

    isServerInit = true;
  }

  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    });

    return {
      code: result.outputFiles[0].text,
      err: '',
    };
  } catch (err) {
    return {
      code: '',
      err: err.message,
    };
  }
};

export default bundle;
