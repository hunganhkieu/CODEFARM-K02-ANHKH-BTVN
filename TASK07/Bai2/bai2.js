// Input:
function findSecondLargestNumber(arr) {
  // Xử lý và in ra kết quả
  if (
    !Array.isArray(arr) ||
    arr.length === 0 ||
    !arr.every((item) => typeof item === "number")
  ) {
    console.log("Dữ liệu không hợp lệ");
    return;
  }
  let max = arr[0];
  let secondMax = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }

  for (let j = 0; j < arr.length; j++) {
    if (secondMax < arr[j] && arr[j] < max) {
      secondMax = arr[j];
    }
  }

  if (secondMax === max) {
    console.log(-1);
  } else {
    console.log(secondMax);
  }
}

// Output:
findSecondLargestNumber([1, 2, 3, 4, 5]); // 4
findSecondLargestNumber([1, 1, 1]); // -1
findSecondLargestNumber([1]); // -1
