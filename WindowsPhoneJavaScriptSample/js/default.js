// 空白のテンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkID=329104
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: このアプリケーションは新しく起動しました。ここでアプリケーションを
                // 初期化します。
            } else {
                // TODO: このアプリケーションは中断されてから終了しました。
                // スムーズなユーザー エクスペリエンスとなるよう、ここでアプリケーション状態を復元し、アプリが停止したようには見えないようにします。
            }
            args.setPromise(WinJS.UI.processAll());

            // ボタンを押したときのイベントを追加
            $("#action").on("click", function () {
                // NSEGの表示
                $("#hello").text("NSEG Advent Calendar 2015");

                // カメラデバイスのチェック
                var dev = Windows.Devices.Enumeration.DeviceClass.videoCapture;
                Windows.Devices.Enumeration.DeviceInformation.findAllAsync(dev).then(
                    successCallback,
                    errorCallback
                );


                // NSEGのサイトをスクレイピングして表示
                WinJS.xhr({
                    url: "http://nseg.jp",
                    responseType: "document"
                }).done(function completed(result) {
                    $(result.responseXML).find("h1").each(function (i) {
                        // デバッグで確認するため、変数に入れておく
                        var h1 = $(this).text();
                        $("#result").text(h1);
                    });
                });
            });
        }
    };


    function successCallback(deviceInformationCollection) {
        var numDevices = deviceInformationCollection.length;
        if (numDevices) {
            var cameraInfo = "";
            for (var i = 0; i < numDevices; i++) {
                var info = deviceInformationCollection[i];
                cameraInfo += info.name + ",";
            }
            $("#camera").text(cameraInfo);
        }
    };

    function errorCallback(e) {
        console.log("error");
    };

    app.oncheckpoint = function (args) {
        // TODO: このアプリケーションは中断しようとしています。ここで中断中に
        // 維持する必要のある状態を保存します。中断中に自動的に保存され、
        // 復元される WinJS.Application.sessionState オブジェクトを使用
        // できます。アプリケーションを中断する前に
        // 非同期操作を完了する必要がある場合は、
        // args.setPromise() を呼び出してください。
    };

    app.start();
})();
