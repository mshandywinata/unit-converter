const lengthUnits = {
    'mm': 'milimeter',
    'cm': 'centimeter',
    'm': 'meter',
    'km': 'kilometer',
    'in': 'inch',
    'ft': 'foot',
    'yd': 'yard',
    'mi': 'mile',
};

const fromMeter = {
    'mm': 1000,
    'cm': 100,
    'm': 1,
    'km': 0.001,
    'in': 39.3701,
    'ft': 3.28084,
    'yd': 1.09361,
    'mi': 0.000621371,
}

const toMeter = {
    'mm': 0.001,
    'cm': 0.01,
    'm': 1,
    'km': 1000,
    'in': 0.0254,
    'ft': 0.3048,
    'yd': 0.9144,
    'mi': 1609.344,
};

const weightUnits = {
    'mg': 'miligram',
    'g': 'gram',
    'kg': 'kilogram',
    'oz': 'ounce',
    'lb': 'pound',
};

const fromGram = {
    'mg': 1000,
    'g': 1,
    'kg': 0.001,
    'oz': 0.035274,
    'lb': 0.00220462,
};

const toGram = {
    'mg': 0.001,
    'g': 1,
    'kg': 1000,
    'oz': 28.3495,
    'lb': 453.592,
};

const tempUnits = {
    'c': 'celcius',
    'f': 'fahrenheit',
    'k': 'kelvin',
};

function getOptions(arr) {
    let opts = "";
    for (const [key, value] of Object.entries(arr)) {
        opts += `<option value="${key}">${value.slice(0, 1).toUpperCase() + value.slice(1)}</option>`;
    }
    return opts;
}

function fromLengthBase(value, unit) {
    return value * fromMeter[unit];
}

function toLengthBase(value, unit) {
    return value * toMeter[unit];
}

function getLength(value, from, to) {
    return fromLengthBase(toLengthBase(value, from), to);
}

function fromWeightBase(value, unit) {
    return value * fromGram[unit];
}

function toWeightBase(value, unit) {
    return value * toGram[unit];
}

function getWeight(value, from, to) {
    return fromWeightBase(toWeightBase(value, from), to);
}

function getTemp(value, from, to) {
    let celcius;

    if (from === 'c') celcius = value;
    else if (from === 'k') celcius = (value - 32) * 5 / 9;
    else if (from === 'f') celcius = value - 273.15;

    if (to === 'c') return celcius;
    else if (to === 'k') return celcius * 9 / 5 + 32;
    else if (to === 'f') return celcius + 273.15;
}

const navOption = document.querySelectorAll("nav a");
const navOptionValue = navOption.innerHTML;
const unitFromOption = document.querySelector("#unitFrom");
const unitToOption = document.querySelector("#unitTo");
const labelValue = document.querySelector("label.value");
const convertBtn = document.querySelector("input.convert");
const formSection = document.querySelector("section.form");
const resultSection = document.querySelector("section.result");
const resultValue = document.querySelector("h2.result");
const resetBtn = document.querySelector("input.reset");



// initialize default page for length property
let currentType = 'length';
unitFromOption.innerHTML = getOptions(lengthUnits);
unitToOption.innerHTML = getOptions(lengthUnits);
// hide result section
resultSection.classList.add("hidden");

navOption[0].addEventListener("click", (e) => {
    e.preventDefault();
    unitFromOption.innerHTML = getOptions(lengthUnits);
    unitToOption.innerHTML = getOptions(lengthUnits);
    currentType = 'length';
    labelValue.textContent = 'Enter Length to Convert';
})

navOption[1].addEventListener("click", (e) => {
    e.preventDefault();
    unitFromOption.innerHTML = getOptions(weightUnits);
    unitToOption.innerHTML = getOptions(weightUnits);
    currentType = 'weight'
    labelValue.textContent = 'Enter Weight to Convert';
})

navOption[2].addEventListener("click", (e) => {
    e.preventDefault();
    unitFromOption.innerHTML = getOptions(tempUnits);
    unitToOption.innerHTML = getOptions(tempUnits);
    currentType = 'temp';
    labelValue.textContent = 'Enter Temperature to Convert';
})

convertBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const val = parseFloat(document.querySelector("#value").value);
    const from = unitFromOption.value;
    const to = unitToOption.value;

    let result;
    if (currentType === 'length') result = getLength(val, from, to);
    else if (currentType === 'weight') result = getWeight(val, from, to);
    else if (currentType === 'temp') result = getTemp(val, from, to);

    resultValue.textContent = `${val} ${from} = ${result} ${to}`;
    resultSection.classList.remove("hidden");
    formSection.classList.add("hidden");
})

resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resultSection.classList.add("hidden");
    formSection.classList.remove("hidden");
    document.querySelector("#value").value = 0;
})
