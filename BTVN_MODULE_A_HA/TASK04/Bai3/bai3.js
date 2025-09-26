function swapNumber() {
  let a = Number(window.prompt("Xin mời nhập số a:"));
  let b = Number(window.prompt("Xin mời nhập số b:"));
  let c = Number(window.prompt("Xin mời nhập số c:"));
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    alert("Dữ liệu nhập vào không hợp lệ");
    return;
  }
  alert(`3 số ban đầu lần lượt là: a = ${a}, b = ${b}, c= ${c}`);

  if (a > b) {
    a = a + b;
    b = a - b;
    a = a - b;
  }

  if (a > c) {
    a = a + c;
    c = a - c;
    a = a - c;
  }

  if (b > c) {
    b = b + c;
    c = b - c;
    b = b - c;
  }

  alert(`kết quả sau khi đổi chỗ 3 số là: a = ${a}, b = ${b}, c = ${c}`);
}
swapNumber();
