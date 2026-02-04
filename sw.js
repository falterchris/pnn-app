self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'Event Update', message: 'Neuigkeit verfügbar!' };
    
    const options = {
        body: data.message,
        icon: '/icon-192.png', // Optional: Pfad zu deinem Logo
        badge: '/badge.png',   // Optional: Kleines Icon für die Statusleiste
        vibrate: [100, 50, 100],
        data: { dateOfArrival: Date.now() }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Wenn der User auf die Benachrichtigung klickt: App öffnen
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
