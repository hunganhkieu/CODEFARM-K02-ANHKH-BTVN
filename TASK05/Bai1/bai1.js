// Input:
function printSquareNumber(n) {
  // Xử lý và in ra kết quả
  if (isNaN(n) || n < 2) {
    console.log("Dữ liệu nhập vào không hợp lệ");
    return;
  }

  for (i = 2; i <= n; i++) {
    if (checkSquare(i)) {
      console.log(i);
    }
  }
}

function checkSquare(x) {
  for (let i = 2; i * i <= x; i++) {
    if (i * i === x) {
      return true;
    }
  }
  return false;
}

let n = Number(prompt("Xin mời nhập số: "));
// Output:
printSquareNumber(n); // 4 9
