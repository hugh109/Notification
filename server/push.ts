import * as webpush from 'web-push';

const vapidKeys = {
  publicKey: 'BGZVd9VIFTMHhcH-5Gs86C7mVnN5RxVgE2w9wFCHs7XrWC4CtK5NBCoVdpvzjao5eCYinHH47ItrCBcnGsAbWHA',
  privateKey: 'pm1Ofj9SWZYS1tjwRbz3WusrwvfeHTTaKdu1HKKp0JA'
};
const webPush = webpush;

webPush.setVapidDetails(
  'mailto:hugh117@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const options = {
  //icon: 'assets/images/android_048.png',
  body: '主動 推送訊息',
  image: 'https://firebasestorage.googleapis.com/v0/b/proxnotification.appspot.com/o/0013.jpg?alt=media&token=a82120e1-317d-41ff-a25b-cacea8a9f217',
  data: {
    link: 'https://www.yahoo.com.tw',
    link_ok: 'https://www.google.com/',
    link_ng: 'https://www.google.com.tw/maps?hl=zh-TW&tab=wl'
  },
  requireInteraction: true,
  actions: [{
    action: 'yes',
    title: '參加'
    //,    icon: './assets/images/img_ok.png'
  },
  {
    action: 'no',
    title: '不參加'
    //,    icon: './assets/images/img_ng.png'
  },
  ]
};

const subscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/cl5srZVtxvs:APA91bFBXqqksAsVOHPH2qNan3yEG0Tt8_YWaFHtpJ-HYx99mvXAPOWagOaJUH6Ljrj-rDY7nxypCTLnFFsbJ7ej8z2akIqgCMoIsdvtRVgPEMFx_CF-h1kNfoTIsaSKvjw3Ly_7sv4P',
  expirationTime: null,
  keys: {
    p256dh: 'BAiKQTW79ajbIdXY6jMBR8GV9DpMikFu2OkEn_8YBno7z6v5WdJLvj0oDC4X3_6SS12j7gK6DxWQZ8HrzYOR-B0',
    auth: 'lcSKY5IM6BTVp7fESIj6Aw'
  }
};

webPush.sendNotification(subscription, JSON.stringify(options));

