const labFunction = () =>  {
    const eps = 0.00001; // точность
    const m0 = 0.5;
    const mN = 1.6;
    const n = 10;

    const functionBy =  (x) => {
        return (Math.pow(x,2)+ 0.5) / (Math.sqrt(Math.pow(x,2) + 1)); // 3 вариант
    }

    const generateArray = (length, offset = 0) => {
        return Array.from({length}, (_, index) => index + offset); // массив от 1 до n
    }


    const trapezoidalMethod = (a, b, n) => {
        const h = (b - a) / n;
        const sum = generateArray(n-1, 1)
            .reduce((accum, value) => accum + functionBy(a + value * h), 0);
        return h * (0.5 * (functionBy(a) + functionBy(a + n * h)) + sum);
    }

    const simpsonMethod = (a, b, n) => {
        const h = (b - a) / n;
        const sumOdd = n / 2 < 1 ? 0 : generateArray(n/2, 1) // вычисление суммы нечетных
            .reduce((accum, value) => accum + functionBy(a + (value * 2 - 1) * h), 0);
        const sumEven = n / 2 - 1 < 1 ? 0 : generateArray(n/2 - 1, 1) // вычисление суммы четных
            .reduce((accum, value) => accum + functionBy(a + (value * 2) * h), 0);
        return h/3 * (functionBy(a) + functionBy(a + n * h) + 2 * sumEven + 4 * sumOdd);
    }

    const ruleOfRunge = (I1, I2, n1, n2, m) => {
        return I2 + (Math.pow(n1, m) * (I2-I1) / (Math.pow(n2, m)- Math.pow(n1, m)))
    }

    const calcIntegral = (method, m) => {
        let localN = n;
        let flag = false;
        let result = method(m0, mN, localN);

        do {
            localN *= 2;
            const res = method(m0, mN, localN);
            flag = Math.abs(res - result) >= eps;
            if (!flag) {
                result = ruleOfRunge(result, res, localN/2, localN, m);
            } else {
                result = res;
            }
        } while (flag);

        return result;
    }
    console.log("Метод трапеций: " + calcIntegral(trapezoidalMethod, 2));
    console.log("Метод Симпсона: " + calcIntegral(simpsonMethod, 4));

}

document.addEventListener("DOMContentLoaded", labFunction);