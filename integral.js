const labFunction = () =>  {
    const eps = 0.00001; // точность
    const m0 = 0.5;
    const mN = 1.6;
    const n = 10;

    const functionByY =  (y) => {
        return (Math.pow(y,2) + 0.5) / (Math.sqrt(Math.pow(y,2) + 1)); // 3 вариант
    }

    const functionByX =  (x) => {
        return (Math.pow(x,2) + 0.5) / (Math.sqrt(Math.pow(x,2) + 1));
    }

    const generateArray = (length, offset = 0) => {
        return Array.from({length}, (_, index) => index + offset); // массив от 1 до n
    }

    const trapezoidalMethod = (a, b, n) => {
        const h = (b - a) / n;
        const sum = generateArray(n-1, 1)
            .reduce((accum, value) => accum + functionByY(functionByX(a + value * h)), 0);
        return h * (0.5 * (functionByY(functionByX(a)) + functionByY(functionByX(a + n * h))) + sum);
    }

    const simpsonMethod = (a, b, n) => {
        const h = (b - a) / n;
        const sumOdd = n / 2 < 1 ? 0 : generateArray(n/2, 1) // вычисление суммы нечетных
            .reduce((accum, value) => accum + functionByY(functionByX(a + (value * 2 - 1) * h)), 0);
        const sumEven = n / 2 - 1 < 1 ? 0 : generateArray(n/2 - 1, 1) // вычисление суммы четных
            .reduce((accum, value) => accum + functionByY(functionByX(a + (value * 2) * h)), 0);
        return h/3 * (functionByY(functionByX(a)) + functionByY(functionByX(a + n * h)) + 2 * sumEven + 4 * sumOdd);
    }

    const calcIntegral = (method) => {
        let localN = n;
        let flag = false;
        let result = method(m0, mN, localN);

        do {
            localN *= 2;
            const res = method(m0, mN, localN);
            flag = Math.abs(res - result) >= eps;
            result = res;
        } while (flag);

        return result;
    }
    console.log(calcIntegral(trapezoidalMethod));
    console.log(calcIntegral(simpsonMethod));

    // const halfDivisionTds = document.querySelectorAll(".halfDivision > *"); // заполнение таблицы в HTML
    // halfDivisionTds[1].innerHTML = `${spanA}, ${spanB}, ${(spanA + spanB) /2}`;
    // halfDivisionTds[2].innerHTML = `${c}`;
    // halfDivisionTds[3].innerHTML = `${counter}`;

}

document.addEventListener("DOMContentLoaded", labFunction);