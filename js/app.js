$(function() {
  console.log(1);
  formInit();
});
console.log(2);

function formInit() {
  eventSet();

  //--------------
  var _permission = Notification.permission;
  if (_permission !== "default") {
    $("#btnSetNotification")
      .text("已設定推播通知 - " + _permission)
      .attr("disabled", "disabled");
  }
}

function eventSet() {
  $("#btnSetNotification").on("click", checkNotificationStatus);
  $("#btnShowMsg").on("click", function() {
    if (checkNotificationStatus() == true) {
      showNotification("提示", "測試是否正常顯示");
    }
  });
}

function checkNotificationStatus() {
  var _permission = Notification.permission;
  if (_permission !== "default") {
    var _flag = _permission == "granted" ? true : false;

    return _flag;
  } else {
    if ("Notification" in window && "serviceWorker" in navigator) {
      console.log("SetNotification");
    }

    Notification.requestPermission(function(status) {
      console.log("User Choice", status);
      if (status !== "granted") {
        console.log("推播允許被拒絕了!");
      } else {
        //displayNotification();
        showNotification("提示", "已完成 通知 設定");
      }
    });
  }
}

function showNotification(title, msg) {
  var _options = {
    body: msg,
    tag: "confirm-notification",
    renotify: true
    // actions: [
    //   {
    //     action: "confirm",
    //     title: "確認",
    //     icon: "./src/images/icons/demo-icon96.png"
    //   },
    //   {
    //     action: "cancel",
    //     title: "取消",
    //     icon: "./src/images/icons/demo-icon96.png"
    //   }
    // ]
  };

  return new Notification(title, _options);
}
