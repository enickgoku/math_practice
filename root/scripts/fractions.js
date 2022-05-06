const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const audio = document.getElementById("myAudio");

let answer;

function getElementById(id) {
    return document.getElementById(id);
}

function setInnerHTML(id, value) {
    console.info(value)
    document.getElementById(id).innerHTML = value;
}

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
        numerator: numeratorA,
        denominator: denominatorA,
    } = valueA;

    const {
        numerator: numeratorB,
        denominator: denominatorB,
    } = valueB;

    const numerator = (numeratorA * denominatorB) + (numeratorB * denominatorA);
    const denominator = denominatorA * denominatorB;

    return simplifyFraction(numerator, denominator);
}

function generateEquation() {
    let num1;
    let num2;

    const answers = [];

    // Generate true answer
    while (answers.length < 1) {
        const valueA = generateFraction();
        const valueB = generateFraction();

        num1 = `${valueA.numerator} / ${valueA.denominator}`;
        num2 = `${valueB.numerator} / ${valueB.denominator}`;
    
        const { numerator, denominator } = calculateAnswer(valueA, valueB);

        const answerLabel = `${numerator} / ${denominator}`

        if (numerator > denominator || denominator > 20) {
            console.log('\x1b[31mInvalid Answer!\x1b[0m');
            console.log('\x1b[33mValue A:\x1b[0m', valueA);
            console.log('\x1b[33mValue B:\x1b[0m', valueB);
            console.log('\x1b[33mAnswer:\x1b[0m', answerLabel)
            console.log('\x1b[33mRetrying...\x1b[0m');
            continue
        }

        // Recognized by event listener
        answer = answerLabel;

        answers.push(answerLabel);
    }

    // Generate dummy answers
    while (answers.length < 3) {
        const { numerator, denominator } = generateFraction();

        const answerLabel = `${numerator} / ${denominator}`;

        // Try again if this collides with other answers in the array
        if (answers.includes(answerLabel)) {
            console.log('\x1b[31mAnswer Collision!\x1b[0m');
            console.log('\x1b[33mAnswer:\x1b[0m', label)
            console.log('\x1b[33mRetrying...\x1b[0m');
            continue;
        } else {
            answers.push(answerLabel);
        }
    }

    // Shuffle the answers
    for (let i = answers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = answers[i];
        answers[i] = answers[j];
        answers[j] = temp;
    }

    console.log('\x1b[32mAnswers:\x1b[0m', answers);

    // For display in the main problem view
    setInnerHTML("num1", num1);
    setInnerHTML("num2", num2);

    const [answer1, answer2, answer3] = answers

    setInnerHTML('option1', answer1);
    setInnerHTML('option2', answer2);
    setInnerHTML('option3', answer3);
}

option1.addEventListener("click", function() {
    if (option1.innerHTML == answer) {
        generateEquation();
    }
    else {
        audio.play();
    }
});

option2.addEventListener("click", function() {
    if (option2.innerHTML == answer) {
        generateEquation();
    }
    else {
        audio.play();
    }
});

option3.addEventListener("click", function() {
    if (option3.innerHTML == answer) {
        generateEquation();
    }
    else {
        audio.play();
    }
});

generateEquation();
