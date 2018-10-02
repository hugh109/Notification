/*
Public Key:
BGZVd9VIFTMHhcH-5Gs86C7mVnN5RxVgE2w9wFCHs7XrWC4CtK5NBCoVdpvzjao5eCYinHH47ItrCBcnGsAbWHA

Private Key:
pm1Ofj9SWZYS1tjwRbz3WusrwvfeHTTaKdu1HKKp0JA

{"endpoint":"https://fcm.googleapis.com/fcm/send/cl5srZVtxvs:APA91bFBXqqksAsVOHPH2qNan3yEG0Tt8_YWaFHtpJ-HYx99mvXAPOWagOaJUH6Ljrj-rDY7nxypCTLnFFsbJ7ej8z2akIqgCMoIsdvtRVgPEMFx_CF-h1kNfoTIsaSKvjw3Ly_7sv4P",
"expirationTime":null,
  "keys":{
    "p256dh":"BAiKQTW79ajbIdXY6jMBR8GV9DpMikFu2OkEn_8YBno7z6v5WdJLvj0oDC4X3_6SS12j7gK6DxWQZ8HrzYOR-B0",
  "auth":"lcSKY5IM6BTVp7fESIj6Aw"
  }
}
*/

const applicationServerPublicKey =
  "BHNuQA5JcQxbjZEFyIeFhoWpUzV1nTGOOudTZHT80H-SIgbZZdonk7vQJs3ZvWQNahcn8uG8zqh_3DYFzfyuGOg";

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
function subscribeUser(swRegistration) {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(subscription => {
      console.log("User is subscribed");
      console.log(JSON.stringify(subscription));
    })
    .catch(err => {
      console.log("Failed to subscribe the user: ", err);
    });
}
