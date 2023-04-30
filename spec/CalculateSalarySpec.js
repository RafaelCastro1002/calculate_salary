// const CalculateSalaryFunction = require('../src/CalculateSalary')
const generateErrorResponse = (field, errorType) => {
    return errorsMessages[field][errorType]
}

describe('Test Calculate Salary Function', () => {
    let calculateSalary

    beforeEach(() => {
        // calculateSalary = jasmine.createSpy().and.returnValue(810)
        calculateSalary = CalculateSalary
    })

    it('should return correct salary value', () => {
        const params = {
            workHours: 120,
            minimumSalary: 1320,
            extrasHours: 10
        }

        /*
            {
                workHours: 120,
                minimumSalary: 1320,
                extrasHours: 10
            }

            hoursInMonth = 44 x 5 = 220

            hourlyRate = minimumSalary / housrInMonth

            extrasHourlyRate = hourlyRate * 1.5

            salary = 
                (hourlyRate * workHours) + (extrasHourlyRate * extrasHours)
            
            salary = 810
        */

        expect(calculateSalary(params)).toEqual(810)
    })

    it('should return required workHours error', () => {
        const params = {
            minimumSalary: 1320,
            extrasHours: 10
        }

        const errorMessage = generateErrorResponse('workHours', 'required')

        expect(() => calculateSalary(params)).toThrowError(errorMessage);
    })

    it('should return required minimumSalary error', () => {
        const params = {
            workHours: 120,
            extrasHours: 10
        }

        const errorMessage = generateErrorResponse('minimumSalary', 'required')

        expect(() => calculateSalary(params)).toThrowError(errorMessage);
    })

    it('should return required extrasHours error', () => {
        const params = {
            workHours: 120,
            minimumSalary: 1320,
        }

        const errorMessage = generateErrorResponse('extrasHours', 'required')

        expect(() => calculateSalary(params)).toThrowError(errorMessage);
    })

    it('should return isPositive workHours error', () => {
        const params = {
            workHours: -1,
            minimumSalary: 1320,
            extrasHours: 10
        }

        const errorMessage = generateErrorResponse('workHours', 'isPositive')

        expect(() => calculateSalary(params)).toThrowError(errorMessage);
    })

    it('should return isPositive minimumSalary error', () => {
        const params = {
            workHours: 120,
            minimumSalary: -1,
            extrasHours: 10
        }

        const errorMessage = generateErrorResponse('minimumSalary', 'isPositive')

        expect(() => calculateSalary(params)).toThrowError(errorMessage);
    })

    it('should return isPositive extrasHours error', () => {
        const params = {
            workHours: 120,
            minimumSalary: 1,
            extrasHours: -1
        }

        const errorMessage = generateErrorResponse('extrasHours', 'isPositive')

        expect(() => calculateSalary(params)).toThrowError(errorMessage);
    })
})