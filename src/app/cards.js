import {getProducts} from "../api.js";

let cardContainer = document.querySelector("#template-card");

export function createCards() {
	getProducts().then((data) => {
		data.map((prod) => {
			let card = `<div class="col">
                           <div class="card" style="height: 500px">
                           <img src=${prod.image} class="card-img-top img-fluid object-fit-contain h-75" alt=${prod.title}>
                           <div class="card-body text-center">
                               <h5 class="card-title">${prod.title}</h5>
                           </div>
                           <button title="mas detalle del producto" type="button" id="btn-prod-${prod.id}">Mas detalles</button>
                           </div>
                       </div>`;
			setTimeout(() => {
				let btnProd = document.querySelector(`#btn-prod-${prod.id}`);
				btnProd.onclick = () => createModal(prod);
			}, 0);
			cardContainer.innerHTML += card;
		});
	});
}