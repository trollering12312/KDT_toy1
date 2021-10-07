import { url } from "./config.js";
import getExpensesData from "./expenses-data.js";

const getProcessedExpenses = (expenses) => {
  let processedExpenses = {};

  for (let i in expenses) {
    expenses[i].forEach((el) => {
      if (el.classify === "") el.classify = "income";

      processedExpenses[el.classify] = processedExpenses[el.classify]
        ? processedExpenses[el.classify] + el.price
        : el.price;
    });
  }

  delete processedExpenses.income;
  return processedExpenses;
};

const drawDoughnutGraph = (data) => {
  const canvas2 = document.querySelector("#management_chart2").getContext("2d");
  const myChart = new Chart(canvas2, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: [
            "rgba(189, 91, 0, 1)",
            "rgba(196, 196, 196, 1)",
            "rgba(254, 194, 41, 1",
            "rgba(0, 189, 178, 1)",
            "rgba(0, 87, 189, 1)",
          ],
          borderColor: [
            "rgba(189, 91, 0, 1)",
            "rgba(196, 196, 196, 1)",
            "rgba(254, 194, 41, 1",
            "rgba(0, 189, 178, 1)",
            "rgba(0, 87, 189, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
};

const setDisplay = (data) => {
  for (let i in data) {
    const display = document.querySelector(`#${i}`);
    display.innerHTML = `${data[i]}원`;
  }
};

const init = async (url) => {
  const expenses = await getExpensesData(url);
  const processedExpenses = getProcessedExpenses(expenses);

  drawDoughnutGraph(Object.values(processedExpenses));
  setDisplay(processedExpenses);
};

init(url);
