var position = new naver.maps.LatLng(37.3595704, 127.105399);
var mapOptions = {
    center: position,
    zoom: 10
};
var map = new naver.maps.Map('map', mapOptions);
var markerList = [];
var infowindowList = []
for (var i in data) {
    var anchor = new naver.maps.Point(12, 12);
    var anchorSize = new naver.maps.Size(0, 0);
    var target = data[i];
    var latlng = new naver.maps.LatLng(target.lat, target.lng);
    marker = new naver.maps.Marker({
        map: map,
        position: latlng,
        icon: {
            content: '<div class="marker"></div>',
            anchor: anchor
        },
    });
    var content = `<div class="infowindowWrap">
    <div class="infowindowTitle">${target.title}</div>
    <div class="infowindowContent">${target.content}</div>
    <div class="infowindowDate">${target.date}</div>
    </div>`
    var infowindow = new naver.maps.InfoWindow({
        content: content,
        backgroundColor: "#00ff0000",
        borderColor: "#00ff0000",
        anchorSize: anchorSize
    })
    markerList.push(marker);
    infowindowList.push(infowindow);
}

for (var i = 0, ii = markerList.length; i < ii; i++) {
    naver.maps.Event.addListener(map, "click", clickMap(i));
    naver.maps.Event.addListener(markerList[i], "click", getClickHandler(i));
}

function clickMap(i) {
    return function () {
        var infowindow = infowindowList[i];
        infowindow.close()
    }
}

function getClickHandler(i) {
    return function () {
        var marker = markerList[i];
        var infowindow = infowindowList[i];
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker)
        }
    }
}

let currentUse = true;

// $('#current').click(()=>{}); // JQuery code
document.getElementById('current').addEventListener('click',
    function replyClick() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const latlng = new naver.maps.LatLng(lat, lng);

                if (currentUse) {
                    marker = new naver.maps.Marker({
                        map: map,
                        position: latlng,
                        icon: {
                            content: '<img class="pulse" draggable="false" unselectable="on" src="https://myfirstmap.s3.ap-northeast-2.amazonaws.com/circle.png">',
                            anchor: new naver.maps.Point(11, 11)

                        }
                    });
                    currentUse = false;
                }
                map.setZoom(14, false);
                map.panTo(latlng);
            })
        } else {
            alert("위치 정보 사용 불가능");
        }
    });