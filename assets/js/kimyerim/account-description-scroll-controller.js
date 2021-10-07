import setAccountBookContainerHeight from "./account-book-height.js";

const home = document.querySelector("#home");
const accountDescription = document.querySelector("#account_description");
const dragButton = document.querySelector("#drag");
const loan = document.querySelector("#loan");
const misc = document.querySelector("#misc");

let isMouseDown = false;

dragButton.addEventListener("mousedown", () => {
  isMouseDown = true;
});

home.addEventListener("mouseup", () => {
  isMouseDown = false;
});

home.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;

  const accountDescriptionAbsoluteCoord =
    accountDescription.getBoundingClientRect();

  const accountDescdefaultHeight = accountDescriptionAbsoluteCoord.height;
  const walk = accountDescriptionAbsoluteCoord.y - e.pageY;

  //최대로 내려갈 수 있는 높이 & 최대로 올라갈 수 있는 높이를 제한 만들기
  if (loan.getBoundingClientRect().bottom < e.pageY) return;
  //lodash로 속도 조절좀 해야할듯

  if (misc.getBoundingClientRect().bottom > e.pageY) return;

  accountDescription.style.height = `${accountDescdefaultHeight + walk}px`;
  accountDescription.style.top = `${e.pageY}px`;

  //중간쯤 오면 알아서 위로 붙게 / 알아서 아래로 붙게

  setAccountBookContainerHeight();
});

console.log(misc.getBoundingClientRect());
