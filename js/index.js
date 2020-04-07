function initMap() {
    var PaontaSahib = {lat: 30.4453, lng: 77.6021};
    map = new google.maps.Map(document.getElementById('map'), {
        center: PaontaSahib,
        zoom: 16,
        mapTypeId: 'roadmap',
    })
}