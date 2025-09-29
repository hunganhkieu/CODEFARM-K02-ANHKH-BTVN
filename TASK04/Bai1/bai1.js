function calcBMI() {
  let weight = Number(window.prompt("Xin mời nhập weight:"));
  let height = Number(window.prompt("Xin mời nhập height:"));
  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Giá trị nhập vào không hợp lệ");
    return;
  }
  let BMI = weight / (height * height);
  BMI = Math.round(BMI * 100) / 100;

  if (BMI > 0 && BMI < 18.5) {
    alert(`BMI = ${BMI}, Thiếu cân`);
  } else if (BMI >= 18.5 && BMI < 23) {
    alert(`BMI = ${BMI}, Bình thường`);
  } else if (BMI >= 23 && BMI < 25) {
    alert(`BMI = ${BMI}, Thừa cân`);
  } else if (BMI >= 25) {
    alert(`BMI = ${BMI}, Béo phì`);
  } else {
    alert("BMI ko hợp lệ");
  }
}
calcBMI();
