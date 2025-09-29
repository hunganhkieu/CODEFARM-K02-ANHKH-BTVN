// Input:
function printPrimeNumber(n) {
  // Xử lý và in ra kết quả
  if (isNaN(n) || Number(n) < 2) {
    console.log("Số nhập vào không hợp lệ");
    return;
  }

  for (let i = 2; i <= n; i++) {
    if (checkPrime(i)) {
      console.log(i);
    }
  }
}

function checkPrime(x) {
  for (let i = 2; i < x; i++) {
    if (x % i === 0) {
      return false;
    }
  }
  return true;
}

// Output:
printPrimeNumber(10); // 2 3 5 7
