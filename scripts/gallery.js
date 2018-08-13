"use strict"
const url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=72157689349104906&user_id=126785613%40N04&extras=original_format&format=json&nojsoncallback=1&api_key=9f46232676650675ddd2cc7bf3ca979d";

function getData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function (error, response, data) {
        var data = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(data);
        } else {
            console.error(data);
        }

    }
    xhr.send(null);
}
const carousel = document.querySelector("#carousel");
const link = document.getElementById("link");
const download = document.getElementById("download");
const left = document.querySelectorAll("button.flip.left")[0];
const right = document.querySelectorAll("button.flip.right")[0];
const leftIcon = document.querySelectorAll("i.left.material-icons.md-light")[0];
const rightIcon = document.querySelectorAll("i.right.material-icons.md-light")[0];
var photoArr = [];
var index = 0;

function loadUrls(data) {
    var photos = data.photoset.photo;
    for (var i = 0; i < photos.length; i++) {
        var photo = {};
        photo.id = photos[i].id;
        photo.url = "https://farm" + photos[i].farm + ".staticflickr.com/" + photos[i].server + "/" + photos[i].id + "_" + photos[i].secret + "_b.jpg";
        photo.original = "https://farm" + photos[i].farm + ".staticflickr.com/" + photos[i].server + "/" + photos[i].id + "_" + photos[i].originalsecret + "_o." + photos[i].originalformat;
        photo.title = photos[i].title;
        photoArr.push(photo);
    }
    var urlString = "url('" + photoArr[0].url + "')";
    carousel.style.backgroundImage = urlString;
    link.href = "https://flickr.com/photos/" + data.photoset.owner + "/" + photoArr[0].id + "/in/album-" + data.photoset.id;
    leftIcon.classList.add("md-inactive");
    left.onclick = function () {
        if (index > 0) {
            index--;
            var urlString = "url('" + photoArr[index].url + "')";
            carousel.style.backgroundImage = urlString;
            link.href = "https://flickr.com/photos/" + data.photoset.owner + "/" + photoArr[index].id + "/in/album-" + data.photoset.id;
            if (index == 0 && !leftIcon.classList.contains("md-inactive")) {
                leftIcon.classList.add("md-inactive");
            } else {
                leftIcon.classList.remove("md-inactive");
                if (index != photoArr.length - 1 && photoArr.length > 1) {
                    rightIcon.classList.remove("md-inactive");
                }
            }
        }
    }
    right.onclick = function () {
        if (index < photoArr.length - 1) {
            index++;
            var urlString = "url('" + photoArr[index].url + "')";
            carousel.style.backgroundImage = urlString;
            link.href = "https://flickr.com/photos/" + data.photoset.owner + "/" + photoArr[index].id + "/in/album-" + data.photoset.id;
            if (index == photoArr.length - 1 && !rightIcon.classList.contains("md-inactive")) {
                rightIcon.classList.add("md-inactive");
                if (index != 0 && photoArr.length > 1) {
                    leftIcon.classList.remove("md-inactive");
                }
            } else {
                rightIcon.classList.remove("md-inactive");
                if (index != 0 && photoArr.length > 1) {
                    leftIcon.classList.remove("md-inactive");
                }
            }
        }

    }

}


getData(url, loadUrls);