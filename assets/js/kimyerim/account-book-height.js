//화면 리사이즈 & 가계부 드래그 때 가계부 height 계산하는 로직
const setAccountBookContainerHeight = () => {
  const accountBookContainer = document.querySelector(
    "#account_book_container"
  );
  const BookContainerAbsoluteCoord =
    accountBookContainer.getBoundingClientRect();
  const BookContainerY = BookContainerAbsoluteCoord.y;

  const globalFooterMenu = document.querySelector("#menu_list");
  const globalFooterMenuHeight = globalFooterMenu.offsetHeight;

  accountBookContainer.style.height = `${
    window.innerHeight - BookContainerY - globalFooterMenuHeight //76은 하단 메뉴 푸터 height
  }px`;
};

window.addEventListener("resize", () => {
  setAccountBookContainerHeight();
}); //화면 크기의 변화에 맞춰서 가계부의 크기가 적절히 아래로 늘어남

setAccountBookContainerHeight();

export default setAccountBookContainerHeight;
