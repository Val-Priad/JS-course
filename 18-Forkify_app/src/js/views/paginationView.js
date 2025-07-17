// @ts-ignore
import icons from "url:../../img/icons.svg";
import View from "./view";
class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");
    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        if (this._data.currentPage === 1 && numPages > 1) {
            return this._generateMarkupButtonNext();
        }
        if (this._data.currentPage === numPages && numPages > 1) {
            return this._generateMarkupButtonPrevious();
        }
        if (this._data.currentPage < numPages) {
            return `${this._generateMarkupButtonPrevious()}
              ${this._generateMarkupButtonNext()}`;
        }
        return "";
    }
    _generateMarkupButtonNext() {
        return `          
          <button data-goto=${this._data.currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${this._data.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    _generateMarkupButtonPrevious() {
        return `          
          <button data-goto=${this._data.currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage - 1}</span>
          </button>`;
    }
    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", (e) => {
            const btn = e.target.closest(".btn--inline");
            if (!btn)
                return;
            handler(+btn.dataset.goto);
        });
    }
}
export default new PaginationView();
