"use strict"
var string = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=a825872234be8c389fe5c4c5943746ca&photoset_id=72157659451270924&user_id=126785613%40N04&format=json&auth_token=72157661329252499-36539803f7fd5616&api_sig=70b72d429c228180e0130dcf8422c2d2";
var script = document.createElement("script");
script.src = string;
document.getElementById("wrapper").appendChild(script);
var linkArr = [];
var capArr = [];
var imgMod = [];
var imgNum = 0;
function jsonFlickrApi(data) {
    var full = data.photoset;
	var photos = data.photoset.photo;
	for(var i = 0; i < photos.length; i++) {
		linkArr.push("https://farm" + photos[i].farm + ".staticflickr.com/" + photos[i].server + "/" + photos[i].id + "_" + photos[i].secret + "_z" + ".jpg");
		capArr.push("Photo");
	}
	var format = "http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"
}
function loadMore() {
	var temp = imgNum;
	for(var i = imgNum; i < temp + 4; i++) {
		imgMod.push(new imgModule(linkArr[i], capArr[i]));
		imgNum++;
	}
}
window.onload = function() {
	for(var i = imgNum; i < 12; i++) {
		imgMod.push(new imgModule(linkArr[i], capArr[i]));
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
		mod.className = "";
		bar.className = "info-bar";
		label.className = "info-text";
		label.innerHTML = cap;
		//expand.className = "expand-button";
		//expand.onclick = function() {toggleModExpand(imgCard, expand)};
		imgCard.appendChild(bar);
		//label.appendChild(expand);
		bar.appendChild(label);
		imgCard.appendChild(mod);
		parent.appendChild(imgCard);
	}
}