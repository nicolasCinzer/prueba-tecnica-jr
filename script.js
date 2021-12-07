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

const addMarkerFromForm = () => {
  return addMarker(
    description.value,
    address.value,
    phone.value,
    category.value,
    coord.value.split(",")
  );
};

const addMarker = (description, address, phone, category, coord) => {
  const marker = L.marker(coord)
    .bindPopup(
      "<b>Descripción</b>: " +
        description +
        "</br><b>Dirección</b>: " +
        address +
        "</br><b>Teléfono</b>: " +
        phone +
        "</br><b>(X, Y)</b>: " +
        coord +
        "</br><b>Categoría</b>: " +
        category +
        "</br>" +
        buttonRemove
    )
    .addTo(map);
  marker.on("popupopen", removeMarker);
};

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);

function addFromFile() {
  var fileUpload = document.getElementById("files");
  var reader = new FileReader();
  reader.addEventListener("load", function () {
    const result = JSON.parse(reader.result);
    result.forEach((marker) => {
      addMarker(
        marker.description,
        marker.address,
        marker.phone,
        marker.category,
        marker.coord.split(",")
      );
    });
  });
  reader.readAsText(fileUpload.files[0]);
}

const buttonRemove = '<button type="button" class="remove">Borrar</button>';

function removeMarker() {
  const marker = this;
  const btn = document.querySelector(".remove");
  btn.addEventListener("click", function () {
    map.removeLayer(marker);
  });
}
