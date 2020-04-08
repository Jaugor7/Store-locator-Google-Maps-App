function initMap() {
    // Styles a map in night mode.
    var sydney = {lat: -33.863276, lng: 151.107977};
    map = new google.maps.Map(document.getElementById('map'), {
        center: sydney,
        zoom: 13,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
            },
            {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
            },
            {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
            },
            {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
            },
            {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
            },
            {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
            },
            {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
            },
            {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
            },
            {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
            }
        ]
        });
        infoWindow = new google.maps.InfoWindow();
        showStoresMarker();
}
var map;
var markers = [];
var infoWindow;

window.onload = () => {     //es6 syntax
    displayStores();
}

function displayStores(){
    var storesHtml = '';
    for(var [index, store] of stores.entries()){ 
        var address = store['addressLines'];
        var phone = store['phoneNumber'];
        storesHtml +=  `    

        <div class='store-container'>
            <div class='store-info-container'>
                <div class='store-address'>
                    <span>${address[0]}</span>
                    <span>${address[1]}</span>
                </div>
                <div class='store-phone-no'>${phone}</div>
            </div>


            <div class="store-number-container">
                <div class="store-number">${index+1}</div>
            </div>
        </div>
        
        `
        document.querySelector('.store-list ').innerHTML = storesHtml;
    } //these backticks are used to append html and javascript side by side
}

function showStoresMarker(){
    var bounds = new google.maps.LatLngBounds();
    for(var [index, store] of stores.entries()){ 
        var name = store['name'];
        var address = store['addressLines'][0];
        var latlng = new google.maps.LatLng(store['coordinates']['latitude'], store['coordinates']['longitude']);
        bounds.extend(latlng);
        createMarker(latlng, name, address, index+1);
    }
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, index) {
    var html = "<b>" + name + "</b> <br/>" + address;

    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label: String(index),
    });

    google.maps.event.addListener(marker, 'click', function() {         //info window
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });

    markers.push(marker);
  }