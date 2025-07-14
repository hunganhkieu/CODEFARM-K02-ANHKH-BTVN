function isTriangle() {
  let a = Number(window.prompt("Xin mời nhập số a:"));
  let b = Number(window.prompt("Xin mời nhập số b:"));
  let c = Number(window.prompt("Xin mời nhập số c:"));
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    alert("Dữ liệu nhập vào không hợp lệ");
    return false;
  }
  if (a <= 0 || b <= 0 || c <= 0) {
    alert("Cạnh của tam giác phải là lớn hơn 0");
    return false;
  }

  if (a + b > c && a + c > b && b + c > a) {
    alert("Đây là tam giác hợp lệ");
    return true;
  } else {
    alert("Tam giác không hợp lệ");
    return false;
  }
}

let message = isTriangle();
console.log(message);
