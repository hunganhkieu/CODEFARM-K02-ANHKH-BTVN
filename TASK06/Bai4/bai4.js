// Input:
function findMinMaxAverage(arr) {
  // Xử lý và in ra kết quả
  let max = arr[0];
  let maxIndex = 0;
  let min = arr[0];
  let minIndex = 0;
  let total = null;
  let average = null;
  let count = 0;

  if (!Array.isArray(arr)) {
    console.log("Dữ liệu nhập vào phải là dạng mảng");
    return;
  }

  if (arr.length === 0) {
    console.log("Đây là mảng rỗng");
    return;
  }

  if (!arr.every((item) => typeof item === "number")) {
    console.log("Phần tử trong mảng phải là một số");
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      maxIndex = i;
    }

    if (arr[i] < min) {
      min = arr[i];
      minIndex = i;
    }

    if (checkPrime(arr[i])) {
      total += arr[i];
      count++;
    }
  }

  if (count > 0) {
    average = total / count;
    average = average.toFixed(2);
  }

  console.log(
    `max: ${max}, maxIndex: ${maxIndex}, min: ${min}, minIndex: ${minIndex}, primeAverage: ${
      average !== null ? average : null
    }`
  );
}

function checkPrime(x) {
  if (x < 2) return false;
  for (let i = 2; i <= Math.sqrt(x); i++) {
    if (x % i === 0) {
      return false;
    }
  }
  return true;
}

// Output:
findMinMaxAverage([3, 1, 4, 1, 5, 9, 2, 6, 9]); // Output: {max: 9, maxIndex: 5, min: 1, minIndex: 1, primeAverage: 3.33 }
findMinMaxAverage([5, 5, 2, 2, 1]); // Output: {max: 5, maxIndex: 0, min: 1, minIndex: 4, primeAverage: 3.5 }
findMinMaxAverage([-3, 7, -8, 11, 0]); // Output: {max: 11, maxIndex: 3, min: -8, minIndex: 2, primeAverage: 9 }
