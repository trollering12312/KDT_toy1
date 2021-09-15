import { url } from "./config.js";
import getExpensesData from "./expenses-data.js";

const getProcessedExpenses = (expenses) => {
  const processedExpenses = {};

  for (let i in expenses) {
    expenses[i].forEach((el) => {
      const price = el.income === "in" ? el.price : -1 * el.price;

      processedExpenses[i] = processedExpenses[i]
        ? processedExpenses[i] + price
        : price;
    });
  }

  return processedExpenses;
};

const drawBarGhaph = (data) => {
  const canvas1 = document.querySelector("#management_chart1").getContext("2d");
  const myChart = new Chart(canvas1, {
    type: "bar",
    data: {
      labels: Object.keys(data).map((el) => el.substr(8)),
      datasets: [
        {
          labels: "",
          data: Object.values(data),
          backgroundColor: ["rgba(56, 201, 118, 1)"],
          borderColor: ["rgba(56, 201, 118, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: false,
      },
      responsive: false, //이 부분이 핵심입니다. responsive: true하면 됩니다.
    },
  });
};

const init = async (url) => {
  const expensesData = await getExpensesData(url);
  const processedExpenses = getProcessedExpenses(expensesData);
  drawBarGhaph(processedExpenses);
};

init(url);
