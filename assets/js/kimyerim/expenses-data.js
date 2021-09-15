const getExpensesData = (url) => {
  const expensesData = {};

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.bankList;
    })
    .then((bankList) => {
      bankList.forEach((el) => {
        const date = el.date.split("-").join(".");
        expensesData[date] =
          expensesData[date] === undefined
            ? [
                {
                  income: el.income,
                  classify: el.classify,
                  history: el.history,
                  price: el.price,
                },
              ]
            : [
                ...expensesData[date],
                {
                  income: el.income,
                  classify: el.classify,
                  history: el.history,
                  price: el.price,
                },
              ];
      });
      return expensesData;
    });
};

export default getExpensesData;
