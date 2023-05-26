const labFunction = () =>  {
    const eps = 0.00001; // точность
    const m0 = 0.5;
    const mN = 1.6;
    const n = 10;

    const CForGauss = [ // Квадратурные коэффициенты Гаусса
        [2],
        [1, 1],
        [5/9, 8/9, 5/9],
        [0.347855, 0.652145, 0.347855, 0.652145],
        [0.4786287, 0.2369269, 0.5688888, 0.2369269, 0.4786287]
    ];
    const TForGauss = [
        [0],
        [-0.577350, 0.577350],
        [-0.774597, 0, 0.774597],
        [-0.8611363, -0.3399810, 0.3399810, 0.8611363],
        [-0.9061798, -0.5384693, 0, 0.5384693, 0.9061798]
    ];

    const functionBy =  (x) => {
        return (Math.pow(x,2)+ 0.5) / (Math.sqrt(Math.pow(x,2) + 1)); // 3 вариант
    }

    const generateArray = (length, offset = 0) => {
        return Array.from({length}, (_, index) => index + offset); // массив от 1 до n
    }

    const ruleOfRunge = (I1, I2, n1, n2, m) => { // Правило Рунге для оценки погрешности
        return I2 + (Math.pow(n1, m) * (I2-I1) / (Math.pow(n2, m)- Math.pow(n1, m)));
    }

    // Алгоритм вычисления интеграла
    const calcIntegral = (method, m) => {
        let localN = n;
        let flag = false;
        let result = method(m0, mN, localN);

        do {
            localN *= 2;
            const res = method(m0, mN, localN);
            flag = Math.abs(res - result) >= eps;
            if (!flag && m) {
                result = ruleOfRunge(result, res, localN/2, localN, m); // Правило Рунге
            } else {
                result = res;
            }
        } while (flag);

        return result;
    }

    // Метод трапеций
    const trapezoidalMethod = (a, b, n) => {
        const h = (b - a) / n;
        const sum = generateArray(n-1, 1) // сгенерировали массив от 1 до n-1
            .reduce((accum, value) => accum + functionBy(a + value * h), 0);
        return h * (0.5 * (functionBy(a) + functionBy(a + n * h)) + sum); // формула трапеций
    }

    // Метод Симпсона
    const simpsonMethod = (a, b, n) => {
        const h = (b - a) / n;
        const sumOdd = n / 2 < 1 ? 0 : generateArray(n/2, 1) // вычисление суммы нечетных
            .reduce((accum, value) => accum + functionBy(a + (value * 2 - 1) * h), 0);
        const sumEven = n / 2 - 1 < 1 ? 0 : generateArray(n/2 - 1, 1) // вычисление суммы четных
            .reduce((accum, value) => accum + functionBy(a + (value * 2) * h), 0);
        return h/3 * (functionBy(a) + functionBy(a + n * h) + 2 * sumEven + 4 * sumOdd);
    }

    // Метод Гаусса
    const gaussMethod = (a, b, n) => {
        const funcX = (t) => {
            return (b+a)/2 + (b-a)/2 * t;
        }

        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += CForGauss[n-1][i] * functionBy(funcX(TForGauss[n-1][i])); // значения берем из "таблицы"
        }
        return sum * (b-a) / 2;
    }

    console.log("Метод трапеций: " + calcIntegral(trapezoidalMethod));
    console.log("Метод трапеций (+ правило Рунге): " + calcIntegral(trapezoidalMethod, 2));
    console.log("Метод Симпсона: " + calcIntegral(simpsonMethod));
    console.log("Метод Симпсона (+ правило Рунге): " + calcIntegral(simpsonMethod, 4));
    console.log("Метод Гаусса (4): " + gaussMethod(m0,mN, 4));
    console.log("Метод Гаусса (5): " + gaussMethod(m0,mN, 5));

}

document.addEventListener("DOMContentLoaded", labFunction);