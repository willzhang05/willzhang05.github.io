var canvas = document.getElementById('mandelbrot');
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
var xp = 0;
var sI;
var imgData = ctx.getImageData(0, 0, w, h);
var data = imgData.data;

function colorGen() {
    return Math.floor(Math.random() * 255)
}

var r = colorGen();
var g = colorGen();
var b = colorGen();

var mandelbrot = function() {
    var xsf = 4 / w;
    var ysf = 4 / h;
    for (var yp = 0; yp < h; yp++) {
        var x = xp * xsf + (2 - (w * xsf));
        var y = yp * ysf + (2 - (h * ysf));
        var z0 = 0;
        var z1 = 0;
        var z2 = 0;
        for (var t = 0; t < 100; t++) {
            z0 = z1;
            z1 = Math.pow(z1, 2) - Math.pow(z2, 2) + x;
            z2 = (2 * z0 * z2) + y;
            if (Math.sqrt(Math.pow(z1, 2) + Math.pow(z2, 2)) >= 2) {
                /*ctx.fillStyle=rgbToHex(r, g, b);
				ctx.fillRect(xp,yp,1,1);*/
                data[t] = r;
                data[++t] = g;
                data[++t] = b;
                data[++t] = 255;
                ctx.putImageData(imgData, xp, yp);
                break;
            }
        }
    }
};

var update = function() {
    xp++;
    mandelbrot();
    if (xp >= w) {
        stopInterval();
    }
};

function resetGen() {
    xp = 0;
    r = colorGen();
    g = colorGen();
    b = colorGen();
}

function interval() {
    sI = setInterval(update, 50)
}

function stopInterval() {
    clearInterval(sI)
}