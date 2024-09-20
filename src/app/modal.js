import { aside } from "./aside.js";

export function createModal(prod) {
    let modal = `
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
    let modalContainer = document.querySelector('#staticBackdrop')
    modalContainer.innerHTML = modal;

    setTimeout(() => {
      let btnAddToCart = document.querySelector(`#addCarrito-${prod.id}`);
      btnAddToCart.onclick = () => {
        let objlocalStorage = JSON.parse(localStorage.getItem("productosCarrito"));
        let producExist = objlocalStorage.find((prod) => prod.id === prod.id);
        let index = objlocalStorage.findIndex((prod) => prod.id === prod.id);
  
        if (producExist) {
          producExist.quantity = producExist.quantity + 1;
          objlocalStorage[index] = producExist;
        } else {
          prod.quantity = 1;
          objlocalStorage.push(prod);
        }
        /* leer de localstorage */
        /* objlocalStorage.push(product); */
        /* guardar en localstorage. solo admite tipo string */
        localStorage.setItem("productosCarrito", JSON.stringify(objlocalStorage));
        aside();
      };
    }, 0);

    const myModal = new bootstrap.Modal(modalContainer);
    myModal.show();
}