// @ts-ignore
import View from "./view.js";
class AddRecipeView extends View {
    _parentElement = document.querySelector(".upload");
    _baseContent = this._parentElement.cloneNode(true);
    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal");
    _successMessage = "Recipe was successfully added!";
    constructor() {
        super();
        this.addHandlerShowWindow();
        this.addHandlerHideWindow();
    }
    toggleWindow() {
        this._overlay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");
    }
    addHandlerShowWindow() {
        this._btnOpen.addEventListener("click", () => {
            this._parentElement.innerHTML = this._baseContent.innerHTML;
            this.toggleWindow();
        });
    }
    addHandlerHideWindow() {
        this._btnClose.addEventListener("click", () => {
            this.toggleWindow();
        });
    }
    addHandlerUpload(handler) {
        this._parentElement.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = Object.fromEntries([
                ...new FormData(this._parentElement),
            ]);
            handler(formData);
        });
    }
}
export default new AddRecipeView();
