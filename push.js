var webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BFtWBkLAV4ow6IMSvhnEZv18oT6Zzh3v3678SqkruBhBaUTGYSL-h2KOlOaszxO_rqN1pgw1f_3XbmzZmcB9Ebs',
  privateKey: 'IGh6hOnwhJoFHrz4FzktdhNn8x3zJDA36xCxWXJRP6w',
};

webPush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);
var pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/cGOKFDFI9Bk:APA91bF9vRkvCZ6F8ysmcMhU-dXfetayjmM9xsESkGbDk-xqcl0ncTK7FLuTTiD0vc_AhpnuNKNmDBotefoAQHMQvyOpk8Bp-L4BnvoLWc-BS8HQVzBpJwKmc3BhLpVdPoibWVmB8OEL',
  keys: {
    p256dh: 'BPqC9u2bP3QArGkq6PeIPDhnUhm9miHE3Y0M5vZCvmkK7mdhKTt1h4aMP7BznISMKA6lFM736wnrzuOtffn6MLY=',
    auth: 'KaJcQ82vWEfHRHOfhdGDUw==',
  },
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
  gcmAPIKey: '147052519199',
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
