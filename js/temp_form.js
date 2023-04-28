// временный скрипт для того чтобы показать как работают лейблы и прочие элементы полей и формы

const fields = document.querySelectorAll(".input-field, .input2-field");

fields.forEach(field => {
  const input = field.querySelector(".input, .input2")
  const label = field.querySelector(".input-label, .input2-label")
  input.addEventListener("focus", () => field.classList.add("focus"));
  input.addEventListener("blur", e => {
    if (e.target.value === '') {
      field.classList.remove("focus")
    }
  });
});