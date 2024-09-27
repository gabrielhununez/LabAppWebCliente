import {getProducts} from "../api.js";
import { createModal } from "./modal.js";

let cardContainer = document.querySelector("#template-card");

function viewModal(prod) {
	let modalTitle = document.querySelector('#staticBackdropLabel');
	modalTitle.innerHTML = prod.title;
	let modalImage = document.querySelector('#modal-img');
	modalImage.src = prod.image;
	modalImage.alt = prod.title;
	let modalDescripcion = document.querySelector('#modal-description');
	modalDescripcion.innerHTML = prod.description;
}

export function createCards() {
	getProducts().then((data) => {
		data.map((prod) => {
			let card = `<div class="col-md-4">
							<div class="card product-card mb-4">
								<div class="product-img">
									<img src="${prod.image}" class="card-img-top" alt="${prod.title}">
								</div>
								<div class="card-body d-flex flex-column">
									<h5 class="product-title">${prod.title}</h5>
									<p class="product-price">$${prod.price}</p>
									<button class="btn btn-primary w-100" id="btn-prod-${prod.id}">Agregar al carrito</button>
								</div>
							</div>
						</div>`;;
			setTimeout(() => {
				let btnProd = document.querySelector(`#btn-prod-${prod.id}`);
				btnProd.onclick = () => createModal(prod);
			}, 0);
			cardContainer.innerHTML += card;
		});
	});
}