const slider = document.getElementById("price-slider");

noUiSlider.create(slider, {
  start: [50, 200], // Giá trị bắt đầu
  connect: true, // Dải nối giữa 2 đầu
  range: {
    min: 0,
    max: 500,
  },
  step: 1,
});

const minLabel = document.getElementById("min-price");
const maxLabel = document.getElementById("max-price");

slider.noUiSlider.on("update", function (values) {
  minLabel.innerText = `$${Math.round(values[0])}`;
  maxLabel.innerText = `$${Math.round(values[1])}`;
});
