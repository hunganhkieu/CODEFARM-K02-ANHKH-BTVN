// Input:
function filterEvenNumbers(arr) {
  // Xử lý và in ra kết quả
  const newArr = [];

  if (!Array.isArray(arr)) {
    console.log("Dữ liệu nhập vào phải là dạng mảng");
    return;
  }

  if (!arr.every((item) => typeof item === "number")) {
    console.log("Phần tử trong mảng phải là một số");
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      newArr.push(arr[i]);
    }
  }
  console.log(newArr);
}

// Output:
filterEvenNumbers([1, 2, 3, 4, 5, 6]); // Output: [2, 4, 6]
filterEvenNumbers([1, 3, 5, 7]); // Output: []
filterEvenNumbers([]); // Output: []
filterEvenNumbers([-2, -1, 0, 1, 2]); // Output: [-2, 0, 2]
