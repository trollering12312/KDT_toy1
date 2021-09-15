const managementOpenBtn = document.querySelector("#management_open_btn");
const managementCloseBtn = document.querySelector("#management_close_btn");
const management = document.querySelector("#management");

managementOpenBtn.addEventListener("click", () => {
  management.classList.toggle("is_active");
});

managementCloseBtn.addEventListener("click", () => {
  management.classList.toggle("is_active");
});
