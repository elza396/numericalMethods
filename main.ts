const labFunction = () =>  {
    const mainDiv = document.querySelector(".main")
    mainDiv.innerHTML = "Методы решения нелинейных уравнений"
    let a = -1;
    let b = 0;
    const exp = 0.000001;
    let x = 0;

    const functionBy =  (x) => {
        return x*x*x-3*x*x+6*x+3;
    }

    let counter = 0

    let c = (a+b)/2;

    // HalfDivisionMethod
    while ((b - a) >= exp) {
        if (functionBy(a) * functionBy(c) < 0) {
            b = c;
        } else {
            a = c;
            c = (a + b) / 2;
        }
        c = (a + b) / 2;
        x = c;
        counter++;
    }
    console.log("x=", x);
    console.log("counter=", counter);
}

document.addEventListener("DOMContentLoaded", labFunction);