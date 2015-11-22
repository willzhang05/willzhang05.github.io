var canvas = document.getElementById('mandelbrot'),
	ctx = canvas.getContext("2d"),
	w = canvas.width,
	h = canvas.height,
	xp = 0,
	sI,
	imgData = ctx.getImageData(0, 0, w, h),
	data = imgData.data;

function colorGen() {
    return Math.floor(Math.random() * 255)
}

var r = colorGen(),
	g = colorGen(),
	b = colorGen();

function mandelbrot() {
    var xsf = 4 / w,
		ysf = 4 / h;
    for(var yp = 0; yp < h; yp++) {
        var x = xp * xsf + (2 - (w * xsf)),
			y = yp * ysf + (2 - (h * ysf)),
			z0 = 0,
			z1 = 0,
			z2 = 0;
        for (var t = 0; t < 100; t++) {
            z0 = z1;
            z1 = Math.pow(z1, 2) - Math.pow(z2, 2) + x;
            z2 = (2 * z0 * z2) + y;
            if(Math.sqrt(Math.pow(z1, 2) + Math.pow(z2, 2)) >= 2) {
                /*ctx.fillStyle = rgbToHex(r, g, b);
				ctx.fillRect(xp, yp, 1, 1);*/
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

function update() {
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