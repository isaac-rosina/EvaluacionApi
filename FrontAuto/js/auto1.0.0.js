function agregarAuto() {
    var auto = {
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        año: document.getElementById("año").value,
        patente: document.getElementById("patente").value,
        km: document.getElementById("kilometros").value,
        fechaIngreso: document.getElementById("fechaIngreso").value,
    };

    fetch("http://localhost:5177/api/Auto", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(auto)
    })
        .then((res) => res.json())
        .then(() => {
            document.getElementById("marca").value = "";
            document.getElementById("modelo").value = "";
            document.getElementById("año").value = "";
            document.getElementById("patente").value = "";
            document.getElementById("kilometros").value = "";
            document.getElementById("fechaIngreso").value = "";
            obtenerAuto();
        });
}

function obtenerAuto() {
    fetch("http://localhost:5177/api/Auto")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            mostrarAuto(data);
        })
        .catch((error) => console.error(error));
}

function mostrarAuto() {
    
}

function buscarValoresAuto() {

}

function editarAuto() {

}

function validacionEliminar() {

}
function eliminarAuto() {

}

ObtenerAlumno();