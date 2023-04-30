const DEFAULT_MASK_INPUT_FUNCTION = (value) => ({
  value: value.toString().replace(".", ","),
});

function assignInitialValueToInputs() {
  INPUTS_ID_LIST.forEach(({ input, initialValue, type }) => {
    assignValueInputTypes(input, initialValue, type);
  });
}

function assignValueInputTypes(idElement, value, type) {
  switch (type) {
    case "money":
      assignMoneyValueInput(idElement, value);
      addListenerToChangeInput(idElement, assignMoneyValueInput);
      break;
    case "number":
      assignValueInputWithMask(idElement, value);
      addListenerToChangeInput(idElement, assignValueInputWithMask);
      break;
    default:
      throw new Error("Input type invalid");
  }
}

function assignValueInputWithMask(
  idElement,
  value,
  maskInput = DEFAULT_MASK_INPUT_FUNCTION
) {
  const input = document.getElementById(idElement);

  const valueWithMask = maskInput(value);

  input.value = valueWithMask.textValue || valueWithMask.value;
}

const assignMoneyValueInput = (idElement, value) => {
  assignValueInputWithMask(idElement, value, moneyMask);
};

function moneyMask(value) {
  if (value === "") {
    value = "0";
  }

  const containDecimals = value.includes(",");

  value = value.replace(".", "").replace(",", "").replace(/\D/g, "");
  const numberValue = containDecimals
    ? parseFloat(value) / 100
    : parseFloat(value);

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat("pt-BR", options).format(numberValue);

  return {
    textValue: "R$ " + result,
    value: numberValue,
  };
}

function getInputElement(idElement) {
  const input = document.getElementById(idElement);

  return input;
}

function addListenerToChangeInput(idElement, functionAssignValue) {
  const input = getInputElement(idElement);

  input.addEventListener("input", function (e) {
    const value = e.target.value;

    functionAssignValue(idElement, value);
  });
}

function getValuesFromInputs(inputs) {
  if (inputs.length) {
    return inputs.reduce((acc, { input, type }) => {
      const inputValue = getInputElement(input).value;

      const getValueByMask = (value) => ({
        money: moneyMask(value).value,
        number: Number(
          DEFAULT_MASK_INPUT_FUNCTION(value).value.replace(",", ".")
        ),
      });

      return {
        ...acc,
        [input]:
          inputValue !== "" ? getValueByMask(inputValue)[type] : undefined,
      };
    }, {});
  }

  return {};
}
