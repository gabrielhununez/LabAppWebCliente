export function showMsg(msg, type) {
	let toastHtml = `<div class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive"
                     aria-atomic="true">
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="toast-body fs-6 fw-bold text-body-tertiary">
                            ${msg}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                                aria-label="Close"></button>
                    </div>
                </div>`;

	let toastContainer = document.querySelector(".toast-container");
	toastContainer.innerHTML += toastHtml;

	let toast = document.querySelector(".toast");
	const toastBootstrap = new bootstrap.Toast(toast);
	toastBootstrap.show();
}
