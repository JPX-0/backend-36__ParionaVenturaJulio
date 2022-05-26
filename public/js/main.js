const inputRange = document.querySelector("#inputRange");
const renderMaxPrice = document.querySelector("#renderMaxPrice");
if(inputRange) {
  inputRange.oninput = () => {
    renderMaxPrice.innerText = inputRange.value;
  }
  renderMaxPrice.innerText = inputRange.value;
}