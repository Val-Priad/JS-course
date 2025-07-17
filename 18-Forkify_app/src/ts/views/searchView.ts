class SearchView {
  _parentElement = document.querySelector(".search");

  getQuery() {
    return (
      this._parentElement.querySelector(".search__field") as HTMLInputElement
    ).value;
  }

  clearInput() {
    (
      this._parentElement.querySelector(".search__field") as HTMLInputElement
    ).value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
    // We use submit here to respond when the enter is clicked
  }
}

export default new SearchView();
