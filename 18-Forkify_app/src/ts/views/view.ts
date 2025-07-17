// @ts-ignore
import icons from "url:../../img/icons.svg"; // Parcel 2+ for all static uses url:

export default class View {
  _parentElement;
  _errorMessage;
  _successMessage;

  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    if (!data) return this.renderError();
    this._data = data;
    const newMarkup: any = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEl, idx) => {
      const curEl: any = curElements[idx];

      // ALGORITHM BELOW IS GOOD TO USE ONLY IN SMALL APPLICATIONS
      // IT'S BAD PERFORMANT

      // Updates changed Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild.nodeValue?.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _generateMarkup() {}

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner = () => {
    this._clear();
    const html = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `;
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  };

  renderError(message = this._errorMessage) {
    const markup = `        
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
    </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `        
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
    </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
