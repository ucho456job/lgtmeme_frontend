if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>i(e,n),f={module:{uri:n},exports:t,require:r};s[n]=Promise.all(a.map((e=>f[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"5f10e48003f835e620c0af3c160f00a4"},{url:"/_next/static/NqyArgW75i8J_mcedxWkr/_buildManifest.js",revision:"ae9eef61ecb4f32528f2e03fce5305d0"},{url:"/_next/static/NqyArgW75i8J_mcedxWkr/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/12-7441d45d036a1a4c.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/724-de7131b435e88f51.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/798-8d3eec750cf35fe2.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/945-f8334b7c5bf9dfb6.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/app/_not-found-a835bb74b97c382c.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/app/add/page-3def5bcf759306c5.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/app/layout-888b0a3ed4313425.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/app/page-d5ade322d55420f4.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/app/privacy-policy/page-a72508a86b850c08.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/app/terms-of-service/page-f071ffb65a552a28.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/fd9d1056-d8ce21920b0c00b4.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/main-357afc0cdcf6dc9b.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/main-app-37cfb01e149ff023.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/pages/_app-27277a117f49dcf1.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/pages/_error-91a5938854a6f402.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-a2a1ca19ffe53684.js",revision:"NqyArgW75i8J_mcedxWkr"},{url:"/_next/static/css/5250036adc4f054a.css",revision:"5250036adc4f054a"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/favicon.ce8c4cf3.ico",revision:"16f8c0b7f0fa4d3af7fa1a1a46a5a69e"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/favicon.ico",revision:"16f8c0b7f0fa4d3af7fa1a1a46a5a69e"},{url:"/icon-192x192.png",revision:"59754001114f4695d00e89b80250ecf1"},{url:"/icon-256x256.png",revision:"f3015e64edfcafa0d11815abba2e2aad"},{url:"/icon-384x384.png",revision:"dde3c5d83a99d6049b947bf8a4ee5f62"},{url:"/icon-512x512.png",revision:"90bb57ae691863efddf1be0f6acc50c1"},{url:"/manifest.webmanifest",revision:"76979ffaf49f820c5faa5447d30d23c0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
