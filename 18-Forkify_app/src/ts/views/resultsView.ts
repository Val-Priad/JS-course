// @ts-ignore
import icons from "url:../../img/icons.svg";
import View from "./view";
import PreviewView from "./previewView";
class ResultsView extends PreviewView {
  _parentElement = document.querySelector(".results");
  _errorMessage = `No recipes found for your query! Please try again.`;
}

export default new ResultsView();
