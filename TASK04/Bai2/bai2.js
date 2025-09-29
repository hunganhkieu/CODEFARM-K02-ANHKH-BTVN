function swapNumber() {
  let a = Number(window.prompt("Xin mời nhập số a:"));
  let b = Number(window.prompt("Xin mời nhập số b:"));
  if (isNaN(a) || isNaN(b)) {
    alert("Dữ liệu nhập vào không hợp lệ");
    return;
  }
  alert(`2 số ban đầu lần lượt là: a = ${a}, b = ${b}`);

  a = a + b;
  b = a - b;
  a = a - b;

  alert(`kết quả sau khi hoán vị 2 số là: a = ${a}, b = ${b}`);
}
swapNumber();
