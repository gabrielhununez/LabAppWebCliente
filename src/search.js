import {getProducts} from "./api.js";
import {createCards} from "./app/cards.js";

export function buscador() {

    let cardContainer = document.querySelector("#template-card");
	let input = document.querySelector("#buscador");

	input.addEventListener("input", (e) => {
		console.log(e.target.value);
		if (e.target.value === "") {
			createCards();
		} else {
			getProducts().then((data) => {
				cardContainer.innerHTML = "";
				let exist = false;
				data.map((prod) => {
					let card;
					if (prod.title.toLowerCase().includes(e.target.value.toLowerCase())) {
						exist = true;
						card = `<div class="col">
								<div class="card" style="height: 500px">
								<img src=${prod.image} class="card-img-top img-fluid object-fit-contain h-75" alt=${prod.title}>
								<div class="card-body text-center">
									<h5 class="card-title text-truncate">${prod.title}</h5>
								</div>
								<button title="mas detalle del producto" type="button" id="btn-prod-${prod.id}">Mas detalles</button>
								</div>
							</div>`;
						cardContainer.innerHTML += card;

						setTimeout(() => {
							let btnProd = document.querySelector(`#btn-prod-${prod.id}`);
							btnProd.onclick = () => createModal(prod);
						}, 0);
					}
				});
				if (!exist) {
					cardContainer.innerHTML = "<p>No se encontraron productos.</p>";
				}
			});
		}
	});
}
