const HOURS_IN_MONTH = 220;
const EXTRAS_HOURLY_RATE_PERCENTAGE = 1.5;

function CalculateSalary(params) {
  validateParamsFromCalculateSalary(params);

  const { workHours, minimumSalary, extrasHours } = params;

  const hourlyRate = minimumSalary / HOURS_IN_MONTH;
  const extrasHourlyRate = hourlyRate * EXTRAS_HOURLY_RATE_PERCENTAGE;
  const salary = hourlyRate * workHours + extrasHourlyRate * extrasHours;

  return salary;
}

function validateParamsFromCalculateSalary(params) {
  const paramsList = ["workHours", "minimumSalary", "extrasHours"];

  for (const paramString of paramsList) {
    validateRequiredParam(paramString, params[paramString]);
    validateIsPositiveParam(paramString, params[paramString]);
  }

  paramsIsNotZeroTogether([params.workHours, params.extrasHours])
}

function validateRequiredParam(paramNameString, param) {
  if (isNaN(param) && !param) {
    throw new Error(errorsMessages[paramNameString]["required"]);
  }
}

function validateIsPositiveParam(paramNameString, param) {
  if (!isNaN(param) && param < 0) {
    throw new Error(errorsMessages[paramNameString]["isPositive"]);
  }
}

function paramsIsNotZeroTogether (params) {
    let existZero = false

    params.forEach((p) => {
        if (p === 0) {
            if (existZero) {
                throw new Error('All values ​​are zeroed') 
            }
        
            existZero = true
        }
    })
}
