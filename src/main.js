const resultContainerIdElement = "result-container";
const resultTextIdElement = "result-text-value";

const errorContainerIdElement = "error-container";
const errorTextIdElement = "error-text-value";

let formElement = undefined;

window.onload = () => {
  assignInitialValueToInputs();
};

function showResult(e) {
  disableFeedbacks();

  e.preventDefault();
  const params = getValuesFromInputs(INPUTS_ID_LIST);

  try {
    const salary = CalculateSalary(params);
    showResultSuccess(salary);
  } catch (e) {
    showResultError(e);
  }
}

function showResultSuccess(salary) {
  toggleElementView(resultContainerIdElement, "visible");
  assignTextToElement(
    resultTextIdElement,
    moneyMask(salary.toString()).textValue
  );
}

function showResultError(e) {
  toggleElementView(errorContainerIdElement, "visible");
  assignTextToElement(errorTextIdElement, e.message);
}

function disableFeedbacks() {
  toggleElementView(resultContainerIdElement, "hidden");
  toggleElementView(errorContainerIdElement, "hidden");
}

const params = {
  workHours: 120,
  minimumSalary: 1320,
  extrasHours: 10,
};

function assignTextToElement(idElement, text) {
  document.getElementById(idElement).innerText = text;
}

function toggleElementView(idElement, status = false) {
  const element = document.getElementById(idElement);
  const currentVisibility = element.style.visibility;

  const toggleVisibility = {
    hidden: "visible",
    visible: "hidden",
  };

  element.style.visibility = status || toggleVisibility[currentVisibility];
}
