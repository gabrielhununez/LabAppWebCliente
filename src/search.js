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
						card = `
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">${prod.title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class='card mb-3' style='max-width: 540px;'>
                <div class='row g-0'>
                    <div class='col-md-4'>
                        <img id='modal-img' src='${prod.image}' class="img-fluid rounded-start" alt='${prod.title}'>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <p class="card-text">'${prod.description}'</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" id="addCarrito-${prod.id}">Sumar al Carrito</button>
          </div>
        </div>
    </div>
    `
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
