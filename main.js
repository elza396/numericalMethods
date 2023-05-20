const labFunction = () =>  {
    const spanA = -1; // концы отрезка a и b
    const spanB = 0;
    const coeff1 = 3; // вариант 3
    const coeff2 = 6;
    const coeff3 = -3;
    const coeff4 = 1;
    const eps = 0.000001; // точность

    // вывод уравнение на HTML
    const equationDiv = document.querySelector(".equation");
    equationDiv.innerHTML = "Вариант 3: x<sup>3</sup>-3x<sup>2</sup>+6x+3=0"

    const functionBy =  (x) => {
        return coeff4*Math.pow(x,3) + coeff3*Math.pow(x,2) + coeff2*x + coeff1;
    }

    const getDerivative = (x) => { // функция нахождения первой производной
        return 3*coeff4*Math.pow(x,2) + 2*coeff3*x + coeff2;
    }
    const getSecondDerivative = (x) => { // функция нахождения второй производной
        return 6*coeff4*x + 2*coeff3;
    }

    const getSpans = () => { // возвращает массив концов отрезка (первый - неподвижный)
        if (functionBy(spanA) * getSecondDerivative(spanA) > 0) {
            return [spanA, spanB] // первое значение неподвижно
        } else {
            return [spanB, spanA]
        }
    }

    let counter = 0 // счетчик

    // HalfDivisionMethod
    let a = spanA;
    let b = spanB;
    let c;

    while (Math.abs(b - a) >= eps) { // Math.abs - модуль
        counter++;
        c = (a + b) / 2;
        if (functionBy(c) === 0) { // если f(x0) = 0, то х0 - искомый корень
            break;
        } if (functionBy(a) * functionBy(c) < 0) {
            b = c;
        } else {
            a = c;
        }
    }

    const halfDivisionTds = document.querySelectorAll(".halfDivision > *"); // заполнение таблицы в HTML
    halfDivisionTds[1].innerHTML = `${spanA}, ${spanB}, ${(spanA + spanB) /2}`;
    halfDivisionTds[2].innerHTML = `${c}`;
    halfDivisionTds[3].innerHTML = `${counter}`;

    //Chord Method
    let xNext;
    let [xFixed, xCurr] = getSpans(); // неподвижный и подвижный (начальное приближение) конец отрезка (Деструктуризация)
    counter = 0; // обнуляем счетчик

    // заполнение таблицы в HTML
    const chordMethodTds = document.querySelectorAll(".chordMethod > *");
    chordMethodTds[1].innerHTML = `${spanA}, ${spanB}, ${xCurr}`;

    while (Math.abs(xFixed - xCurr) >= eps) { // сам метод
        xNext = xFixed - functionBy(xFixed) * (xCurr - xFixed) / (functionBy(xCurr) - functionBy(xFixed));
        xCurr = xFixed;
        xFixed = xNext;
        counter++;
    }

    // заполнение таблицы в HTML
    chordMethodTds[2].innerHTML = `${xNext}`;
    chordMethodTds[3].innerHTML = `${counter}`;

    // Tangent Method
    let [firstX, lastX] = getSpans(); // за начальное приближение берем первое
    counter = 0;

    // заполнение таблицы в HTML
    const tangentMethodTds = document.querySelectorAll(".tangentMethod > *");
    tangentMethodTds[1].innerHTML = `${spanA}, ${spanB}, ${firstX}`;

    while (Math.abs(firstX - lastX) >= eps) {
        xNext = firstX - functionBy(firstX)/getDerivative(firstX);
        lastX = firstX;
        firstX = xNext;
        counter++;
    }

    // заполнение таблицы в HTML
    tangentMethodTds[2].innerHTML = `${xNext}`;
    tangentMethodTds[3].innerHTML = `${counter}`;

    // Combined Method
    [a, b] = getSpans();
    let aNext, bNext;
    counter = 0;

    // заполнение таблицы в HTML
    const combinedMethodTds = document.querySelectorAll(".combinedMethod > *");
    combinedMethodTds[1].innerHTML = `${spanA}, ${spanB}, ${a}`;

    while (Math.abs(b - a) >= eps && counter < 100) {
        aNext = a - functionBy(a)/getDerivative(a);
        bNext = a - functionBy(a) * (b - a) / (functionBy(b) - functionBy(a));
        a = aNext;
        b = bNext;
        counter++;
    }

    // заполнение таблицы в HTML
    combinedMethodTds[2].innerHTML = `${aNext}`;
    combinedMethodTds[3].innerHTML = `${counter}`;

    // Iteration Method
    counter = 0;
    [a, b] = getSpans();
    let tmp;

    const qMax = Math.max(getDerivative(a), getDerivative(b));
    const k = Math.ceil(qMax/2); // округление до целого числа в большую сторону

    // заполнение таблицы в HTML
    const iterationMethodTds = document.querySelectorAll(".iterationMethod > *");
    iterationMethodTds[1].innerHTML = `${spanA}, ${spanB}, ${a}`; // начальное выбираем любое значение из интервала

    c = a - functionBy(a)/k; // первая итерация
    tmp = a;
    counter++;

    while (Math.abs(c - tmp) >= eps && counter < 100) {
        tmp = c;
        c = c - functionBy(c)/k;
        counter++;
    }

    // заполнение таблицы в HTML
    iterationMethodTds[2].innerHTML = `${c}`;
    iterationMethodTds[3].innerHTML = `${counter}`;
}

document.addEventListener("DOMContentLoaded", labFunction);