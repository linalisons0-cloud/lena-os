// LENA OS 9.5: offline cache intentionally disabled while updating.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',()=>{});
