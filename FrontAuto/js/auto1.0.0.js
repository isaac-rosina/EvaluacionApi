let patentes = [];

function agregarAuto() {
    var auto = {
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        año: document.getElementById("año").value,
        patente: document.getElementById("patente").value,
        km: document.getElementById("kilometros").value,
        fechaIngreso: document.getElementById("fechaIngreso").value,
        disponible: true,
    };

    if ((auto.marca && auto.modelo && auto.año && auto.patente && auto.km && auto.fechaIngreso) == "") {
        alert("Todos los campos deben estar completos.");
        return;
    };
    if (auto.modelo.length > 10) {
        alert("El modelo puede tener 10 carácteres como máximo.");
        return;
    }
    if (auto.km < 0) {
        alert("Los kilometros no pueden ser negativos");
        return;
    };
    if (patentes.includes(auto.patente)) {
        alert(`La patente ${auto.patente} ya existe en el sistema, elija otro.`);
        return;
    }

    fetch("https://evaluacionapi-j5hx.onrender.com/api/Auto", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(auto)
    })
        .then((res) => res.json())
        .then(() => {
            alert("Auto agregado exitosamente");
            alert("El auto que agregaste esta disponible por lo tanto no podra ser eliminado");
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
    fetch("https://evaluacionapi-j5hx.onrender.com/api/Auto")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            mostrarAuto(data);

            patentes = data.map(auto => auto.patente);
            console.log("patentes", patentes);
        })
        .catch((error) => console.error(error));
}

function mostrarAuto(data) {
    const tbody = document.getElementById("tablaAuto");
    tbody.innerHTML = "";

    data.forEach((element) => {
        let tr = tbody.insertRow();

        tr.insertCell(0).innerHTML = element.marca;
        tr.insertCell(1).innerHTML = element.modelo;
        tr.insertCell(2).innerHTML = element.año;
        tr.insertCell(3).innerHTML = element.patente;
        tr.insertCell(4).innerHTML = element.km;
        tr.insertCell(5).innerHTML = element.fechaIngreso;
        tr.insertCell(6).innerHTML = element.disponible? "SÍ" : "NO";

        // Boton de editar
        let editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.classList.add("btn", "btn-primary");
        editar.style.fontFamily = '"Momo Trust Display", sans-serif';
        editar.setAttribute(
            "onclick",
            `buscarValoresAuto(${element.autoId})`
        );

        let tEditar = tr.insertCell(7);
        tEditar.appendChild((editar));

        // Boton de eliminar
        let eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.classList.add("btn", "btn-danger");
        eliminar.style.fontFamily = '"Momo Trust Display", sans-serif';
        eliminar.setAttribute(
            "onclick",
            `validacionEliminar(${element.autoId}, ${element.disponible})`
        );

        let tEliminar = tr.insertCell(8);
        tEliminar.appendChild((eliminar));
    });
}

function buscarValoresAuto(id) {
    fetch(`https://evaluacionapi-j5hx.onrender.com/api/Auto/${id}`)
        .then((res) => {
            if(!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`)
            }
            return res.json();
        })
        .then((data) => {
            console.log("Auto:", data);

            document.getElementById("idEditar").value = data.autoId;
            document.getElementById("marcaEditar").value = data.marca;
            document.getElementById("modeloEditar").value = data.modelo;
            document.getElementById("añoEditar").value = data.año;
            document.getElementById("patenteEditar").value = data.patente;
            document.getElementById("kilometrosEditar").value = data.km;
            document.getElementById("fechaIngresoEditar").value = data.fechaIngreso;
            document.getElementById(data.disponible? "disponible-si" : "disponible-no").checked = true;

            const id = `<span id="idEditar">${data.autoId}</span>`
            document.getElementById("idEditar").innerHTML = id;

            let modal = new bootstrap.Modal(document.getElementById("modalEditar"),);

            modal.show();
        })
        .catch((error) => console.error("No se pudo acceder a la API:", error));
}

function editarAuto() {
    let id = document.getElementById("idEditar").value;
    console.log("ID:", id);

    let editarAuto = {
        autoId: parseInt(id),
        marca: document.getElementById("marcaEditar").value,
        modelo: document.getElementById("modeloEditar").value,
        año: parseInt(document.getElementById("añoEditar").value),    
        patente: document.getElementById("patenteEditar").value,
        km: parseInt(document.getElementById("kilometrosEditar").value),  
        fechaIngreso: document.getElementById("fechaIngresoEditar").value || null, 
        disponible: document.querySelector('input[name="disponible"]:checked').value === "true",
    }

     if ((editarAuto.marca && editarAuto.modelo && editarAuto.año && editarAuto.patente && editarAuto.km && editarAuto.fechaIngreso) == "") {
        alert("Todos los campos deben estar completos.");
        return;
    };
    if (editarAuto.modelo.length > 10) {
        alert("El modelo puede tener 10 carácteres como máximo.");
        return;
    }
    if (editarAuto.km < 0) {
        alert("Los kilometros no pueden ser negativos");
        return;
    };

     fetch(`https://evaluacionapi-j5hx.onrender.com/api/Auto/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editarAuto),
    })
    .then(() => {
        document.getElementById("idEditar").value = 0;
        document.getElementById("marcaEditar").value = "";
        document.getElementById("modeloEditar").value = "";
        document.getElementById("añoEditar").value = "";
        document.getElementById("patenteEditar").value = "";
        document.getElementById("kilometrosEditar").value = "";
        document.getElementById("fechaIngresoEditar").value = "";

        let modal = bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalEditar")
        );

        modal.hide();
        obtenerAuto();
    })
    .catch((error) => console.error("No se pudo editar el vehículo.", error));
}

function validacionEliminar(id, disponible) {
    if (disponible == true) {
        alert("No se puede eliminar un vehículo disponible.");
        return;
    };

    var siEliminar = confirm("¿Deseas eliminar el vehículo?");

    if(siEliminar == true) {
        eliminarAuto(id);
    }
}
function eliminarAuto(id) {
    fetch(`https://evaluacionapi-j5hx.onrender.com/api/Auto/${id}`, {
        method: "DELETE",
    })
        .then(() => {
            obtenerAuto();
        })
        .catch((error) => console.error("No se pudo acceder a la API.", error));
}

obtenerAuto();