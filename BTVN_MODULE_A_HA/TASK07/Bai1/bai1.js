// Input:
const arrayNumber = [1, 2, 3, 4, 3, 2, 1];
function checkSymmetricalArr(arr) {
  // Xử lý logic

  if (!Array.isArray(arr) || arr.length === 0) {
    console.log("Dữ liệu không hợp lệ");
    return;
  }

  if (arr.length === 1) {
    console.log("Mảng có 1 phần tử, không kiểm tra được");
    return;
  }

  for (let i = 0; i < arr.length / 2; i++) {
    if (arr[i] !== arr[arr.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

// Output:
const result = checkSymmetricalArr(arrayNumber);
console.log(result); //true
