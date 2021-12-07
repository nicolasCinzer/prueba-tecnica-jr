var map = L.map("map").setView([-34.5957735, -58.3731428], 15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Nicolas Cinzer Aeroterra S.A. Test",
  maxZoom: 18,
}).addTo(map);

let description = document.getElementById("description")
let address = document.getElementById("address")
let phone = document.getElementById("phone")
let category = document.getElementById("category")
let coord = document.getElementById("coord")

const addMarker = () => { L.marker(coord.value.split(",")).addTo(map)}