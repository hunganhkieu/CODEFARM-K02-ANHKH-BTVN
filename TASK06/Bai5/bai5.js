// Input:
function insertNumber(arr, num) {
  // Xử lý và in ra kết quả
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i]) && typeof arr[i] === "number") {
      newArr.push(arr[i]);
    }
  }

  if (typeof num === "number" && !Number.isNaN(num)) {
    newArr.push(num);
  }

  for (let i = 0; i < newArr.length - 1; i++) {
    for (let j = 0; j < newArr.length - 1 - i; j++) {
      if (newArr[j] > newArr[j + 1]) {
        let temp = newArr[j];
        newArr[j] = newArr[j + 1];
        newArr[j + 1] = temp;
      }
    }
  }
  console.log(newArr);
}

// Output:
insertNumber([1, 3, 5, 7, 9], 6); // Output: [1, 3, 5, 6, 7, 9]
insertNumber([3, "hello", 1, NaN, 4, null], 2); // Output: [1, 2, 3, 4]
insertNumber([], 5); // Output: [5]
insertNumber([-1, 10, -5, "abc"], -3); // Output: [-5, -3, -1, 10]
insertNumber([5, 2, 8], NaN); // Output: [2, 5, 8]
