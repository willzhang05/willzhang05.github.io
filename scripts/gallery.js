"use strict"
var string = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=9f46232676650675ddd2cc7bf3ca979d&user_id=126785613%40N04&format=json&photoset_id=72157659451270924",
	script = document.createElement("script");
script.src = string;
document.getElementById("wrapper").appendChild(script);
var linkArr = [],
	capArr = [],
	imgMod = [],
	imgNum = 0;

function jsonFlickrApi(data) {
    var full = data.photoset;
    var photos = data.photoset.photo;
    for (var i = 0; i < photos.length; i++) {
        linkArr.push("https://farm" + photos[i].farm + ".staticflickr.com/" + photos[i].server + "/" + photos[i].id + "_" + photos[i].secret + "_z" + ".jpg");
        capArr.push(photos[i].title);
    }
}

function loadMore() {
    var temp = imgNum;
	if(temp + 4 > linkArr.length) {
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

function expandImage() {
    console.log("test")
}

window.onload = function() {
    for (var i = imgNum; i < 12; i++) {
        imgMod.push(new imgModule(linkArr[linkArr.length - i - 1], capArr[capArr.length - i - 1]));
        imgNum++;
    }
}

var imgModule = class {
    constructor(url, cap) {
        var parent = document.getElementById("content"),
            imgCard = document.createElement("div"),
            mod = document.createElement("div"),
            bar = document.createElement("div"),
            label = document.createElement("div");
        //expand = document.createElement("button");
        imgCard.className = "image-card";
        imgCard.style.backgroundImage = "url(" + url + ")";
        imgCard.onclick = function() {
            expandImage()
        };
        mod.className = "";
        bar.className = "info-overlay";
        label.className = "info-text";
        label.innerHTML = cap;
        //expand.className = "expand-button";
        //expand.onclick = function() {toggleModExpand(imgCard, expand)};
        imgCard.appendChild(bar);
        //label.appendChild(expand);
        bar.appendChild(label);
        imgCard.appendChild(mod);
        parent.insertBefore(imgCard, document.getElementById("load-more"));
    }
}