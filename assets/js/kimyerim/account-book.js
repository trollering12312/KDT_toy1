import { url } from "./config.js";
import getExpensesData from "./expenses-data.js";

const accountBookOl = document.querySelector("#account_book_list");

const templateMonthly = `<li class="account_book_item">
    <div class="account_book_summary">
        <span>{{__date__}}</span>
        <strong>{{__incomeSum__}}</strong>
    </div>

    <ul class="description_list">
        {{__description__}}
    </ul>
  </li>`;

const templateDaily = `<li class="description_item">
    <span>{{__history__}}</span>
    <strong {{__class__}}>{{__price__}}</strong>
  </li>`;

const getIncomeSum = (i, data) => {
  const incomeSum = data[i].reduce((acc, el) => {
    return (
      acc + (el.income === "in" ? Number(el.price) : -1 * Number(el.price))
    );
  }, 0);

  return incomeSum;
};

const getDailyRecode = (data) => {
  const templateDailyArr = [];
  let templateDailyArrText = "";

  for (let i in data) {
    let templateDailyEdited = templateDaily;

    templateDailyEdited = templateDailyEdited.replace(
      "{{__history__}}",
      data[i].history
    );
    templateDailyEdited = templateDailyEdited.replace(
      "{{__price__}}",
      data[i].income === "in" ? `+${data[i].price}` : data[i].price
    );
    templateDailyEdited = templateDailyEdited.replace(
      "{{__class__}}",
      data[i].income === "in" ? 'class="income"' : ""
    );

    templateDailyArr.push(templateDailyEdited);
  }

  templateDailyArrText = templateDailyArr.join("\n");

  return templateDailyArrText;
};

const getMonthlyRecode = (data) => {
  const templateMonthlyArr = [];

  for (let i in data) {
    const incomeSum = getIncomeSum(i, data);

    let templateMonthlyEdited = templateMonthly;

    templateMonthlyEdited = templateMonthlyEdited.replace("{{__date__}}", i);
    templateMonthlyEdited = templateMonthlyEdited.replace(
      "{{__incomeSum__}}",
      incomeSum < 0 ? `${Math.abs(incomeSum)}원 지출` : `${incomeSum}원 수입`
    );

    let templateDailyEdited = getDailyRecode(data[i]);

    templateMonthlyEdited = templateMonthlyEdited.replace(
      "{{__description__}}",
      templateDailyEdited
    );
    templateMonthlyArr.push(templateMonthlyEdited);
  }

  return templateMonthlyArr;
};

const init = async (url) => {
  const data = await getExpensesData(url);

  const templateMonthlyArr = getMonthlyRecode(data);

  accountBookOl.innerHTML = templateMonthlyArr.reverse().join("\n");
};

init(url);
