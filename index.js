// ASSIGN BAR VARIABLES
const chartBars = document.querySelectorAll(".chart__bar");
const chartBarsArr = Array.from(chartBars);
let spendingDataArr = [];
let highestVal = 0;

// FUNCTION TO FETCH DATA FROM A LOCAL JSON FILE
async function fetchData() {
  const response = await fetch("data.json");
  const jsonData = await response.json();
  return jsonData;
}

// FUNCTION TO CHECK IS EVERY SPENDING VALUE BELOW THRESHOLD (70)
const isBelowThreshold = (currentValue) => currentValue <= 70;

// USE DATA TO DISPLAY A CHART
fetchData().then((jsonData) => {
  let spendingData = jsonData;

  // ARRANGE ALL SPENDING DATA INTO AN ARRAY
  for (const data of spendingData) {
    spendingDataArr.push(data.amount);
  }

  // DETECTING THE HIGHEST SPENDING DAY AND ADDING VALUES AND STYLE CLASS TO IT
  for (let i = 0; i < chartBarsArr.length; i++) {
    chartBarsArr[i].textContent = `$${spendingDataArr[i].toFixed(1)}`;

    if (highestVal < spendingDataArr[i]) {
      highestVal = spendingDataArr[i];
    }
  }
  let highestValIndex = spendingDataArr.indexOf(highestVal);
  chartBarsArr[highestValIndex].classList.add("chart__bar--highest");

  // CASE WHEN HIGHEST SPENDING DAY IS LESS OR EQUAL TO 70 (MAX BAR HEIGHT 210PX)
  if (spendingDataArr.every(isBelowThreshold)) {
    for (let i = 0; i < chartBarsArr.length; i++) {
      chartBarsArr[i].style.height = `${spendingDataArr[i] * 3}px`;
    }
  } else {
    // CASE WHEN HIGHEST SPENDING DAY IS HIGHER THAN 70 (MAX BAR HEIGHT 210PX)
    chartBarsArr[highestValIndex].style.height = `${100}%`;
    for (let i = 0; i < chartBarsArr.length; i++) {
      chartBarsArr[i].style.height = `${
        (spendingDataArr[i] / highestVal) * 100
      }%`;
    }
  }
});
