const labFunction = () =>  {
    const m0 = 0;
    const mN = 1;
    const n = 10; // для формулы трапеции
    const w = Math.PI; // числовой параметр лямбда
    const K = (x, s) => {
        return (1-x)*Math.sin(2*Math.PI*s); // ядро интегрального уравнения
    }

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

    const functionBy =  (x) => { // заданная функция
        return 0.5*(1-x); // 3 вариант
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

    // Метод Гаусса для решения системы диф уравнений
    const gaussMethodForSystem = (a, y, n) => {
        let x, max, k, index;
        const eps = 0.00001;  // точность
        x = [];
        k = 0;
        while (k < n)
        {
            // Поиск строки с максимальным a[i][k]
            max = Math.abs(a[k][k]);
            index = k;
            for (let i = k + 1; i < n; i++)
            {
                if (Math.abs(a[i][k]) > max)
                {
                    max = Math.abs(a[i][k]);
                    index = i;
                }
            }
            // Перестановка строк
            if (max < eps)
            {
                // нет ненулевых диагональных элементов
                console.log("Решение получить невозможно из-за нулевого столбца ");
                return 0;
            }
            for (let j = 0; j < n; j++)
            {
                let temp = a[k][j];
                a[k][j] = a[index][j];
                a[index][j] = temp;
            }
            let temp = y[k];
            y[k] = y[index];
            y[index] = temp;
            // Нормализация уравнений
            for (let i = k; i < n; i++)
            {
                let temp = a[i][k];
                if (Math.abs(temp) < eps) continue; // для нулевого коэффициента пропустить
                for (let j = 0; j < n; j++) {
                    a[i][j] = a[i][j] / temp;
                }
                y[i] = y[i] / temp;
                if (i === k)  continue; // уравнение не вычитать само из себя
                for (let j = 0; j < n; j++ ) {
                    a[i][j] = a[i][j] - a[k][j];
                }
                y[i] = y[i] - y[k];
            }
            k++;
        }
        // обратная подстановка
        for (let k = n - 1; k >= 0; k--)
        {
            x[k] = y[k];
            for (let i = 0; i < k; i++)
            y[i] = y[i] - a[i][k] * x[k];
        }
        return x;
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

    // const A = new Array()

}

document.addEventListener("DOMContentLoaded", labFunction);