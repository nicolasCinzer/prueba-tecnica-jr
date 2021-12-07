var map = L.map("map").setView([-34.5957735, -58.3731428], 15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Nicolas Cinzer Aeroterra S.A. Test",
  maxZoom: 18,
}).addTo(map);

let description = document.getElementById("description");
let address = document.getElementById("address");
let phone = document.getElementById("phone");
let category = document.getElementById("category");
let coord = document.getElementById("coord");

const addMarker = () => {
  L.marker(coord.value.split(","))
    .bindPopup(
      "<b>Descripción</b>: " +
        description.value +
        "</br><b>Dirección</b>: " +
        address.value +
        "</br><b>Teléfono</b>: " +
        phone.value +
        "</br><b>(X, Y)</b>: " +
        coord.value.split(",") +
        "</br><b>Categoría</b>: " +
        category.value
    )
    .addTo(map);
};

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);
