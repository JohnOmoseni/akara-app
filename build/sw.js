if(!self.define){let e,i={};const n=(n,c)=>(n=new URL(n+".js",c).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let s={};const f=e=>n(e,r),d={module:{uri:r},exports:s,require:f};i[r]=Promise.all(c.map((e=>d[e]||f(e)))).then((e=>(o(...e),s)))}}define(["./workbox-74f2ef77"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-C_emqb0C.js",revision:null},{url:"assets/index-DdhbEGY-.css",revision:null},{url:"favicon_io/android-chrome-192x192.png",revision:"0a7c9c1a3f1f031d055216ce84408751"},{url:"favicon_io/android-chrome-512x512.png",revision:"06d7c155f7b2d866ac4459b1db65f5b1"},{url:"favicon_io/apple-touch-icon.png",revision:"0c5201175c3b469c1237452b68694dcd"},{url:"favicon_io/favicon-16x16.png",revision:"94c78d1780e6a61a59547698501c7a8f"},{url:"favicon_io/favicon-32x32.png",revision:"806f9cd255a93c597be5de77434c2bda"},{url:"favicon_io/favicon.svg",revision:"5c71506d5e8e475a97613deb2f900d5c"},{url:"images/404.png",revision:"e4eb6c354950b9d6fcd6df912e177552"},{url:"images/confetti.png",revision:"e2f36500cc2b43b59129eb98c65fb614"},{url:"index.html",revision:"53d1958cf255f98fc95f3546e6321beb"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon_io/android-chrome-192x192.png",revision:"0a7c9c1a3f1f031d055216ce84408751"},{url:"favicon_io/android-chrome-512x512.png",revision:"06d7c155f7b2d866ac4459b1db65f5b1"},{url:"favicon_io/apple-touch-icon.png",revision:"0c5201175c3b469c1237452b68694dcd"},{url:"manifest.webmanifest",revision:"1179990c1f474a27617e164e01991a72"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/.*\.(?:js|css|html|png|jpg|jpeg|svg|gif|woff2?|ttf|otf|eot)$/,new e.CacheFirst({cacheName:"assets-cache",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3})]}),"GET")}));
