const lengthUnits = {
    'mm': 'milimeter',
    'cm': 'centimeter',
    'm': 'meter',
    'km': 'kilometer',
    'in': 'inch',
    'ft': 'foot',
    'yd': 'yard',
    'mi': 'mile',
}

const weightUnits = {
    'mg': 'miligram',
    'g': 'gram',
    'kg': 'kilogram',
    'oz': 'ounce',
    'lb': 'pound',
}

const tempUnits = {
    'c': 'celcius',
    'f': 'fahrenheit',
    'k': 'kelvin',
}

function getOptions(arr) {
    let opts = "";
    for (const [key, value] of Object.entries(arr)) {
        opts += `<option value="${key}">${value.slice(0, 1).toUpperCase() + value.slice(1)}</option>`;
    }
    return opts;
}

const navOption = document.querySelectorAll("nav a");
const navOptionValue = navOption.innerHTML;
const unitFromOption = document.querySelector("#unitFrom");
const unitToOption = document.querySelector("#unitTo");

unitFromOption.innerHTML = getOptions(lengthUnits);
unitToOption.innerHTML = getOptions(lengthUnits);

if (navOptionValue === "Weight") {
    navOption.addEventListener("click", () => {
        unitFromOption.innerHTML = getOptions(weightUnits);
    })
}