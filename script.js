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
let fileUpload = document.getElementById("files");
let error = document.getElementById("error");

const addMarkerFromForm = () => {
  let msg = [];
  if (validateCoord(coord.value.split(","))) {
    msg.push("Valor de coordenada no valido. -180 < X < 180 , -90 < Y < 90");
  }

  if (!validatePhone(phone.value)) {
    msg.push(
      "Numero de telefono no valido. Debe comenzar con 54 9 y debe tener 13 "
    );
  }

  if (msg.length > 0) {
    error.innerText = msg.join(", ");
  }

  if (msg.length == 0) {
    error.innerText = "";
    return addMarker(
      description.value,
      address.value,
      phone.value,
      category.value,
      coord.value.split(",")
    );
  }
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

const onMapClick = (p) => {
  const marker = L.marker(p.latlng)
    .bindPopup(
      "<b>(X, Y)</b>: " +
        p.latlng.lat +
        ", " +
        p.latlng.lng +
        "</br>" +
        buttonRemove
    )
    .addTo(map);
  marker.on("popupopen", removeMarker);
};

map.on("click", onMapClick);

const addFromFile = () => {
  var reader = new FileReader();
  reader.addEventListener("load", () => {
    const result = JSON.parse(reader.result);
    result.forEach((marker) => {
      if (validateCoord(marker.coord.split(","))) {
        error.innerText = "Coordenadas no validas.";
      } else if (!validatePhone(marker.phone)) {
        error.innerText = "Numero telefonico no valido.";
      } else if (!validateCategory(marker.category)) {
        error.innerText = "Categoria no valida";
      } else {
        addMarker(
          marker.description,
          marker.address,
          marker.phone,
          marker.category,
          marker.coord.split(",")
        );
      }
    });
  });
  reader.readAsText(fileUpload.files[0]);
};

const buttonRemove = '<button type="button" class="remove">Borrar</button>';

function removeMarker() {
  const marker = this;
  const btn = document.querySelector(".remove");
  btn.addEventListener("click", () => {
    map.removeLayer(marker);
  });
}

const validatePhone = (phone) => {
  let spacelessPhoneNumber = phone.replace(/\s/g, "");
  if (
    spacelessPhoneNumber.includes("549") &&
    spacelessPhoneNumber.split("").length === 13
  ) {
    return true;
  }
};

const validateCategory = (category) => {
  if (
    category === "Comercial" ||
    category === "Residencial" ||
    category === "Mixta"
  ) {
    return true;
  } else {
    return false;
  }
};

const validateCoord = (coord) => {
  if (
    coord[0] >= 180 ||
    coord[0] <= -180 ||
    coord[1] >= 90 ||
    coord[1] <= -90 ||
    coord[0] == ""
  ) {
    return true;
  }
};
