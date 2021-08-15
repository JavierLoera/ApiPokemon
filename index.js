const btn = document.getElementById("btn");
const search = document.getElementById("search");
const container = document.querySelector(".container");
search.focus();
let id = "";

function error(mensaje) {
	let error = mensaje;
	let div = document.createElement("div");
	div.textContent = error;
	div.classList.add("validar_error");
	container.prepend(div);
	setTimeout(() => {
		document.querySelector(".validar_error").remove();
	}, 2000);
}

async function traerDatos(id) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	if (!response.ok) {
		error("No se encontro el pokemon, pruebe otro");
	}
	const data = await response.json();
	console.log(data);
	insertarImagen(data);
}

function insertarImagen(data) {
	var fragment = document.createDocumentFragment();
	let div = document.createElement("div");

	let img = document.createElement("img");
	img.src = data.sprites.front_default;
	let nombrePokemon = document.createElement("h1");
	nombrePokemon.textContent = data.name;

	div.appendChild(img);
	div.appendChild(nombrePokemon);
	fragment.appendChild(div);

	nombrePokemon.classList.add("pokemon_nombre");
	img.classList.add("pokemon_img");
	div.classList.add("pokemon_card");
	container.prepend(fragment);
}

btn.addEventListener("click", function (e) {
	traerDatos(id);
	validar();
});

search.addEventListener("change", function (e) {
	id = e.target.value;
});

search.addEventListener("keydown", function (e) {
	if (e.target.value != "" && e.key === "Enter") {
		traerDatos(id);
	}
	if (e.target.value === "" && e.key === "Enter") {
		error("Escriba algo porfavor");
	}
});

function validar() {
	if (search.value === "") {
		error("Escriba algo porfavor");
	}
}
