// Import necessary Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Your Firebase configuration (same as in your main app)
const firebaseConfig = {
  apiKey: "AIzaSyDWRfmNGsp3cBvD5mODOj1g7uOFbWXph-k",
  authDomain: "exclusivechat-64482.firebaseapp.com",
  projectId: "exclusivechat-64482",
  storageBucket: "exclusivechat-64482.appspot.com",
  messagingSenderId: "159353508205",
  appId: "1:159353508205:web:595954835fac71ef53ca64",
  databaseURL: "https://exclusivechat-64482-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background message handler (when app is closed)
messaging.onBackgroundMessage((payload) => {
  console.log('[Firebase SW] Received background message', payload);
  
  // Customize your notification
  const notificationTitle = payload.notification?.title || "New Message";
  const notificationOptions = {
    body: payload.notification?.body || "You have new messages in Ziia Chat",
    icon: '/icon-512.png',
    image: payload.notification?.image,
    data: {
      url: payload.data?.url || '/',
      messageId: payload.data?.messageId
    },
    actions: [
      { action: 'open', title: 'Open Chat' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  // Show notification
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification);
  event.notification.close();
  
  // Handle different actions
  if (event.action === 'open') {
    clients.openWindow(event.notification.data.url || '/');
  } else if (event.action === 'dismiss') {
    // Just close the notification
  } else {
    // Default click behavior
    clients.openWindow(event.notification.data.url || '/');
  }
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event.notification);
});
