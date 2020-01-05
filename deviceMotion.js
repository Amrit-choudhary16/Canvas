let startTime = new Date().getTime();
window.addEventListener('load', (event) => {
    let loadTime = new Date().getTime() - startTime;
    console.log("Load : " + loadTime + " milliseconds");
});
document.addEventListener('readystatechange', (event) => {
    let loadTime = new Date().getTime() - startTime;
    console.log("readystatechange : " + loadTime + " milliseconds");
    if(document.readyState === 'complete'){
        requestT();
    }
});
document.addEventListener('DOMContentLoaded', (event) => {
    let loadTime = new Date().getTime() - startTime;
    console.log("DOMContentLoaded : " + loadTime + " milliseconds");
});
function imgToCanvas(width, height, xIncrement, yIncrement) {
    let c = document.getElementById('c');
    c.width = width;
    c.height = height;
    let cx = c.getContext('2d');
    cx.clearRect(0, 0, width, height);
    let centerPointXStart = (width / 2) - xIncrement;
    let centerPointYStart = (height / 2) + yIncrement;
    cx.fillStyle = "black";
    let items = 4, a = 10, p = 20, b = 18, d = 7, k = 1;
    for (let r = 0; r < 9; r++) {
        for (let i = 0; i < items; i++) {
            let degree = (360 * i / items);
            let radius = 30;
            let startPointX = centerPointXStart;
            let startPointY = centerPointYStart;
            let endPointX = startPointX + radius * Math.cos(2 * Math.PI * i / items);
            let endPointY = startPointY + radius * Math.sin(2 * Math.PI * i / items);
            let y = 1, m = 40;
            for (let j = 0; j < 15; j++) {
                if (j % 2 !== 0) {
                    k = -1;
                } else {
                    k = 1;
                }
                if (degree < 90) {
                    cx.beginPath();
                    cx.moveTo(startPointX, startPointY);
                    cx.bezierCurveTo(startPointX + a, startPointY + (k * (p + (j * d))), endPointX - a, endPointY + (k * (p + (j * d))), endPointX, endPointY);
                    cx.bezierCurveTo(endPointX - a, endPointY + (k * b), startPointX + a, startPointY + (k * b), startPointX, startPointY);
                    cx.fill();
                    cx.closePath();
                }
                if (degree >= 90 && degree < 180) {
                    cx.beginPath();
                    cx.moveTo(startPointX, startPointY);
                    cx.bezierCurveTo(startPointX - (k * b), startPointY + a, endPointX - (k * b), endPointY - a, endPointX, endPointY);
                    cx.bezierCurveTo(endPointX - (k * (p + (j * d))), endPointY - a, startPointX - (k * (p + (j * d))), startPointY + a, startPointX, startPointY);
                    cx.fill();
                    cx.closePath();
                }
                if (degree >= 180 && degree < 270) {
                    cx.beginPath();
                    cx.moveTo(startPointX, startPointY);
                    cx.bezierCurveTo(startPointX - a, startPointY - (k * b), endPointX + a, endPointY - (k * b), endPointX, endPointY);
                    cx.bezierCurveTo(endPointX + a, endPointY - (k * (p + (j * d))), startPointX - a, startPointY - (k * (p + (j * d))), startPointX, startPointY);
                    cx.fill();
                    cx.closePath();
                }
                if (degree >= 270 && degree < 360) {
                    cx.beginPath();
                    cx.moveTo(startPointX, startPointY);
                    cx.bezierCurveTo(startPointX + (k * (p + (j * d))), startPointY - a, endPointX + (k * (p + (j * d))), endPointY + a, endPointX, endPointY);
                    cx.bezierCurveTo(endPointX + (k * b), endPointY + a, startPointX + (k * b), startPointY - a, startPointX, startPointY);
                    cx.fill();
                    cx.closePath();
                }
                startPointX = endPointX;
                startPointY = endPointY;
                endPointX = centerPointXStart + (radius + m * y) * Math.cos(2 * Math.PI * i / items);
                endPointY = centerPointYStart + (radius + m * y) * Math.sin(2 * Math.PI * i / items);
                radius = radius + m * y;
                y++;
            }
        }
        cx.translate(centerPointXStart, centerPointYStart);
        cx.rotate(10 * Math.PI / 180);
        cx.translate(-centerPointXStart, -centerPointYStart);
    }
}
function requestT() {
    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
        alert("enter");
        DeviceMotionEvent.requestPermission()
            .then(response => {
                alert("response: " + response);
                if (response === "granted") {
                    if (window.DeviceMotionEvent) {
                        console.log("DeviceMotionEvent supported");
                        window.addEventListener("devicemotion", deviceMotionHandler);

                    }
                }
            })
            .catch(console.error);
    } else {
        alert("DeviceMotionEvent is not defined");
    }
}
// document.getElementById("request").onclick = requestT;
// if (window.DeviceMotionEvent) {
//     window.addEventListener("devicemotion", handleMotionEvent, false);
// }
function deviceMotionHandler(event) {
    let x = event.accelerationIncludingGravity.x.toFixed(2);
    let y = event.accelerationIncludingGravity.y.toFixed(2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let xIncrement = x === null ? 0 : x * 25;
    let yIncrement = y === null ? 0 : y * 25;
    window.requestAnimationFrame(imgToCanvas(width, height, xIncrement, yIncrement));
}