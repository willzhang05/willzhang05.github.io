"use strict"
var string = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=ae976304a535e7ed8ff2100c1d5b2dc7&photoset_id=72157659451270924&user_id=126785613%40N04&extras=original_format&format=json&api_key=9f46232676650675ddd2cc7bf3ca979d",
    script = document.createElement("script");
script.src = string;
document.getElementById("wrapper").appendChild(script);
var linkArr = [],
    capArr = [],
    imgMod = [],
    imgNum = 0;

function jsonFlickrApi(data) {
    var photos = data.photoset.photo;
    for (var i = 0; i < photos.length; i++) {
        linkArr.push(["https://farm" + photos[i].farm + ".staticflickr.com/" + photos[i].server + "/" + photos[i].id + "_" + photos[i].secret + "_z.jpg",
            "https://farm" + photos[i].farm + ".staticflickr.com/" + photos[i].server + "/" + photos[i].id + "_" + photos[i].originalsecret + "_o." + photos[i].originalformat
        ]);
        capArr.push(photos[i].title);
    }
}

function loadMore() {
    var temp = imgNum;
    if (temp + 4 > linkArr.length) {
        for (var i = imgNum; i < linkArr.length; i++) {
            imgMod.push(new imgModule(linkArr[linkArr.length - i - 1], capArr[capArr.length - i - 1]));
            imgNum++;
        }
        document.getElementById("load-more").style.display = "none";
    } else {
        for (var i = imgNum; i < temp + 4; i++) {
            imgMod.push(new imgModule(linkArr[linkArr.length - i - 1], capArr[capArr.length - i - 1]));
            imgNum++;
        }
    }
}

function expandImage(url, cap) {
    var gallery = document.getElementById("gallery");
    var galleryWrap = document.getElementById("gallery-wrapper");
    if(gallery.childNodes.length != 0) {
        gallery.removeChild(gallery.firstChild);
    }
    galleryWrap.style.opacity = "1";
    galleryWrap.style.visibility = "visible";
    document.getElementById("gallery-caption").innerHTML = cap;
    
    var img = new Image();
    img.src = url;
    var checkLoad = window.setInterval(function() {
        if(img.complete) {
            console.log("asdf");
            gallery.appendChild(img);
            window.clearInterval(checkLoad);
        }
    }, 100);
}

window.onload = function() {
    for (var i = imgNum; i < 12; i++) {
        imgMod.push(new imgModule(linkArr[linkArr.length - i - 1], capArr[capArr.length - i - 1]));
        imgNum++;
    }
}

var imgModule = class {
    constructor(url, cap) {
        this.url = url[0];
        this.orig = url[1];
        var parent = document.getElementById("content"),
            imgCard = document.createElement("div"),
            mod = document.createElement("div"),
            bar = document.createElement("div"),
            label = document.createElement("div");
        imgCard.className = "image-card";
        imgCard.style.backgroundImage = "url(" + url[0] + ")";
        imgCard.onclick = function() {
            expandImage(url[1], cap);
        };
        mod.className = "";
        bar.className = "info-overlay";
        label.className = "info-text";
        label.innerHTML = cap;
        imgCard.appendChild(bar);
        bar.appendChild(label);
        imgCard.appendChild(mod);
        parent.insertBefore(imgCard, document.getElementById("load-more"));
    }
}