/*
 * @FilePath: /水文感知数据监视平台/vite.config.js
 * @Author: maggot-code
 * @Date: 2022-11-21 14:19:59
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2025-05-08 17:23:59
 * @Description:
 */
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'
import viteCompression from 'vite-plugin-compression'
import autoImport from 'unplugin-auto-import/vite'
import vueComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import lodashImport from './plugins/lodash'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_ASSETS, VITE_API_BASE_URL_PRE, VITE_API_BASE_URL } = loadEnv(mode, process.cwd()) // eslint-disable-line  node/prefer-global/process
  return {
    base: VITE_ASSETS,
    clearScreen: true,
    server: {
      https: false,
      hmr: {
        overlay: true,
      },
      proxy: {
        [VITE_API_BASE_URL_PRE]: {
          target: VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/[VITE_API_BASE_URL_PRE]/, `/${VITE_API_BASE_URL_PRE}`), // eslint-disable-line  regexp/no-dupe-characters-character-class
        },
      },
    },
    // 设置scss的api类型为modern-compiler
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src',
        },
        {
          find: '~',
          replacement: '/src/internal',
        },
      ],
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
      dedupe: ['vue'],
      preserveSymlinks: false,
    },
    plugins: [
      vue(),
      splitVendorChunkPlugin(),
      mkcert(),
      autoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            'lodash-es': lodashImport,
          },
        ],
        dts: true,
        // eslint报错解决
        eslintrc: {
          enabled: true, // Default `false`
        },
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
      vueComponents({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        dts: true,
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3',
        scale: 1.0,
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: false,
      }),
      visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    json: {
      namedExports: true,
      stringify: false,
    },
    build: {
      minify: false,
      target: 'es2020',
      sourcemap: mode === 'production' ? false : 'hidden',
      chunkSizeWarningLimit: 500,
      assetsInlineLimit: 10000,
      modulePreload: true,
      cssCodeSplit: true,
      ssrManifest: false,
      emptyOutDir: true,
      manifest: false,
      write: true,
      brotliSize: false,
      rollupOptions: {
        output: {
          chunkFileNames: `assets/js/[name]-[hash].js`,
          entryFileNames: `assets/js/[name]-[hash].js`,
          assetFileNames: `assets/[name]-[hash].[ext]`,
        },
      },
    },
  }
})
