const METRIC_HEIGHT = "cm";
const METRIC_WEIGHT = "kg";
const IMPERIAL_HEIGHT = "in";
const IMPERIAL_WEIGHT = "lbs";

const ACTIVITY_MULTIPLIERS = new Map();
ACTIVITY_MULTIPLIERS.set("sedentary", 1.2);
ACTIVITY_MULTIPLIERS.set("light", 1.375);
ACTIVITY_MULTIPLIERS.set("moderate", 1.55);
ACTIVITY_MULTIPLIERS.set("heavy", 1.725);
ACTIVITY_MULTIPLIERS.set("insane", 1.9);

var global_units = true; //true for metric, false for imperial
var global_sex = true; //true for male, false for female

function changeUnits() {
    var heightLabel = document.getElementById("heightUnits");
    var weightLabel = document.getElementById("weightUnits");

    if (heightLabel.innerText == METRIC_HEIGHT || weightLabel.innerText == METRIC_WEIGHT) { //metric
        global_units = false;
        heightLabel.innerText = IMPERIAL_HEIGHT;
        weightLabel.innerText = IMPERIAL_WEIGHT;
    } else {
        global_units = true;
        heightLabel.innerText = METRIC_HEIGHT;
        weightLabel.innerText = METRIC_WEIGHT;
    }
}

function updateSex() {
    if (global_sex) {
        global_sex = false;
    } else {
        global_sex = true;
    }
}

function calculateTdee() {
    var age = document.getElementById("age").value;
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var activity = document.getElementById("activity").value;
    var bodyfat = document.getElementById("bodyfat").value;

    console.log(age + "years " + height + "cm " + weight + "kg " + activity + " " + bodyfat);

    var bmr = calculateBmr(age, height, weight, bodyfat);
    console.log("Calculated BMR = " + bmr);

    var tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS.get(activity));
    console.log("Calculated TDEE = " + tdee);

    var bmi = calculateBmi(height, weight);
    console.log("Calculated BMI = " + bmi);

    document.getElementById("maintCals").innerText = "Your BMR is " + bmr + "\nYour TDEE is " + tdee + "\nYour BMI is " + bmi;
}

function calculateBmr(age, height, weight, bodyfat) { //TODO: utilise bodyfat in the calculation
    //normalise to metric units
    if (!global_units) {
        weight = weight * 0.45359237;
        height = height * 2.54;
    }

    if (global_sex) { //male
        return Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5));
    } else { //female
        return Math.round(((10 * weight) + (6.25 * height) - (5 * age) - 161));
    }
}

function calculateBmi(height, weight) {
    //normalise to metric units
    if (!global_units) {
        weight = weight * 0.45359237;
        height = height * 2.54;
    }
    heightM = height / 100;

    return Math.round((weight / heightM / heightM) * 10) / 10; //round the BMI equation to 1 decimal
}