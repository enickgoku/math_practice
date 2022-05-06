// const option1 = document.getElementById("option1");
// const option2 = document.getElementById("option2");
// const option3 = document.getElementById("option3");
// const audio = document.getElementById("myAudio");

// function getElementById(id) {
//     return document.getElementById(id);
// }

// function setInnerHTML(id, value) {
//     const { numerator, denominator } = value

//     document.getElementById(id).innerHTML = `${numerator} / ${denominator}`;
// }

function generateRandomNumber() {
    return Math.floor(Math.random() * 13);
}

function validateFraction(numerator, denominator) {
    return numerator > denominator || numerator === denominator || numerator === 0;
}

function getDivisor(numerator, denominator) {
    let x = numerator;
    let y = denominator;

    while (y) {
        let t = y;
        y = x % y;
        x = t;
    }

    return x;
}

function simplifyFraction(numerator, denominator) {
    // Simplify fractions
    let divisor = getDivisor(numerator, denominator);

    numerator /= divisor;
    denominator /= divisor;

    return { numerator, denominator, divisor };
}

function generateFraction() {
    let numerator = generateRandomNumber();
    let denominator = generateRandomNumber();

    // Is the numerator smaller than the denominator?
    let invalid = validateFraction(numerator, denominator);

    // Don't stop generating until a bottom-heavy fraction is generated.
    while (invalid) {
        numerator = generateRandomNumber();
        denominator = generateRandomNumber();

        if (denominator / numerator === 0) {
            numerator /= numerator;
            denominator /= numerator;
        }

        invalid = validateFraction(numerator, denominator);
    }

    return simplifyFraction(numerator, denominator);
}

function calculateAnswer(valueA, valueB) {
    const {
        divisor: divisorA,
        numerator: numeratorA,
        denominator: denominatorA,
    } = valueA;

    const {
        divisor: divisorB,
        numerator: numeratorB,
        denominator: denominatorB,
    } = valueB;

    const divisor = Math.max(divisorA, divisorB);

    const numerator = (numeratorA * divisor) + (numeratorB * divisor);
    const denominator = (denominatorA * divisor) + (denominatorB * divisor);

    console.log('Pre-Simp:', { numerator, denominator })

    return simplifyFraction(numerator, denominator);
}

function generateEquation() {
    const answers = [];

    // Don't generate more than 3 answers
    for (let i = 0; i < 3; i++) {
        const value = generateFraction();

        // TODO: Randomize
        i % 2 === 0 ? answers.push(value) : answers.unshift(value);
    }

    const valueA = generateFraction();
    const valueB = generateFraction();

    const answer = calculateAnswer(valueA, valueB);

    console.log('Value A:', valueA);
    console.log('Value B:', valueB);
    console.log('Answer:', answer);

    // For display in the main problem view
    // const num1 = generateFraction();
    // setInnerHTML("num1", num1);

    // const num2 = generateFraction();
    // setInnerHTML("num2", num2);

    // const [answer1, answer2, answer3] = answers

    // setInnerHTML('option1', answer1);
    // setInnerHTML('option2', answer2);
    // setInnerHTML('option3', answer3);
}

// option1.addEventListener("click", function() {
//     if (option1.innerHTML == answer) {
//         generateEquation();
//     }
//     else {
//         audio.play();
//     }
// });

// option2.addEventListener("click", function() {
//     if (option2.innerHTML == answer) {
//         generateEquation();
//     }
//     else {
//         audio.play();
//     }
// });

// option3.addEventListener("click", function() {
//     if (option3.innerHTML == answer) {
//         generateEquation();
//     }
//     else {
//         audio.play();
//     }
// });

generateEquation();
