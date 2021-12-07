var map = L.map("map").setView([-34.5957735, -58.3731428], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Nicolas Cinzer Aeroterra S.A. Test',
    maxZoom: 18,
}).addTo(map);

L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
  .openPopup();
