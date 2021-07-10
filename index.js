var CONST_METRIC_HEIGHT = "cm";
var CONST_METRIC_WEIGHT = "kg";
var CONST_IMPERIAL_HEIGHT = "in";
var CONST_IMPERIAL_WEIGHT = "lbs";

function changeUnits() {
    var heightLabel = document.getElementById("heightUnits");
    var weightLabel = document.getElementById("weightUnits");

    if (heightLabel.innerText == CONST_METRIC_HEIGHT || weightLabel.innerText == CONST_METRIC_WEIGHT) { //metric
        heightLabel.innerText = CONST_IMPERIAL_HEIGHT;
        weightLabel.innerText = CONST_IMPERIAL_WEIGHT;
    } else {
        heightLabel.innerText = CONST_METRIC_HEIGHT;
        weightLabel.innerText = CONST_METRIC_WEIGHT;
    }
}