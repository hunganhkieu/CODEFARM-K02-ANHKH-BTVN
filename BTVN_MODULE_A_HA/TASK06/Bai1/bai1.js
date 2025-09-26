// Input:
function cleanFalsyValues(arr) {
  // Xử lý và in ra kết quả
  const newArr = [];

  if (!Array.isArray(arr)) {
    console.log("Dữ liệu nhập vào phải là dạng mảng");
    return;
  }

  if (arr.length === 0) {
    console.log("Đây là mảng rỗng");
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      newArr.push(arr[i]);
    }
  }
  console.log(newArr);
}

// Output:
cleanFalsyValues([1, 0, "", null, "hello", undefined, NaN, 2, 3]); // Output: [1, "hello", 2, 3]
