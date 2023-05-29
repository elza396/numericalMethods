const labFunction = () =>  {
    const x0 = 0;
    const y0 = 2;
    const h1 = 0.1; // шаг
    const h2 = 0.05;
    const a = 0;
    const b = 1;

    const functionBy =  (x, y) => {
        return y / (x + Math.pow(y, 2)) ; // 3 вариант
    }

    const getCounts = (a, b, h) => {
        return Math.round((b - a) / h + 1); // кол-во отрезков
    }

    // Метод Эйлера
    const eilerMethod = (func, x0, y0, h) => {
        const counts = getCounts(a, b, h);
        const y = [];
        y.push(y0);
        let x = x0;

        for (let i = 1; i < counts; i++) {
            y.push(y[i-1] + h * func(x, y[i-1]));
            x += h;
        }
        return y;
    }

    // Усовершенствованный метод Эйлера
    const improvedEilerMethod = (func, x0, y0, h) => {
        const counts = getCounts(a, b, h);
        const y = [];
        y.push(y0);
        let x = x0;

        for (let i = 1; i < counts; i++) {
            const xHalf = x + h/2;
            const yHalf = y[i-1] + h/2 * func(x, y[i-1]);
            y.push(y[i-1] + h * func(xHalf, yHalf));
            x += h;
        }
        return y;
    }

    // Метод Рунге-Кутты
    const rungeKuttMethod = (func, x0, y0, h) => {
        const counts = getCounts(a, b, h);
        const y = [];
        y.push(y0);
        let x = x0;

        for (let i = 1; i < counts; i++) {
            const k1 = func(x, y[i-1]);
            const k2 = func(x + h/2, y[i-1] + h/2 * k1);
            const k3 = func(x + h/2, y[i-1] + h/2 * k2);
            const k4 = func(x + h, y[i-1] + h * k3);

            y.push(y[i-1] + h/6 * (k1 + 2*k2 + 2*k3 + k4));
            x += h;
        }
        return y;
    }


    console.log("Метод Эйлера (h=0.1): " + eilerMethod(functionBy, x0, y0, h1).map(item => "  " + item));
    console.log("Метод Эйлера (h=0.05): " + eilerMethod(functionBy, x0, y0, h2).map(item => "  " + item));
    console.log("Усовершенствованный метод Эйлера (h=0.1): " + improvedEilerMethod(functionBy, x0, y0, h1).map(item => "  " + item));
    console.log("Усовершенствованный метод Эйлера (h=0.05): " + improvedEilerMethod(functionBy, x0, y0, h2).map(item => "  " + item));
    console.log("Метод Рунге-Кутты (h=0.1): " + rungeKuttMethod(functionBy, x0, y0, h1).map(item => "  " + item));
    console.log("Метод Рунге-Кутты (h=0.05): " + rungeKuttMethod(functionBy, x0, y0, h2).map(item => "  " + item));
}

document.addEventListener("DOMContentLoaded", labFunction);