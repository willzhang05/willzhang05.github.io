"use strict"
var string = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e231c1ba5cd23dadce11b95fac1c81fa&user_id=126785613%40N04&tags=105b18dee6f551e2dbb0ddcb4ddaa01a&format=json&nojsoncallback=1&auth_token=72157661658455321-0e97f1bc6666191c&api_sig=62f876eb0e2444df8f3e7a1db7ca28e3";
var imageMod = [];
window.onload = function() {
	for(var i = 0; i < 15; i++) {
		imageMod.push(new ImageModule);
	}
}
var ImageModule = class {
	constructor() {
		var parent = document.getElementById("content"),
		imgCard = document.createElement("div"),
		mod = document.createElement("div"),
		bar = document.createElement("div"),
		label = document.createElement("div");
		//expand = document.createElement("button");
		imgCard.className = "image-card";
		imgCard.style.backgroundImage = "url('https://farm6.staticflickr.com/5628/22942329799_c1e4d053a2_o.jpg')";
		mod.className = "";
		bar.className = "info-bar";
		label.className = "info-text";
		label.innerHTML = "Image";
		//expand.className = "expand-button";
		//expand.onclick = function() {toggleModExpand(imgCard, expand)};
		imgCard.appendChild(bar);
		//label.appendChild(expand);
		bar.appendChild(label);
		imgCard.appendChild(mod);
		parent.appendChild(imgCard);
	}
}