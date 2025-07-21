// Input:
function filterLongStrings(arr) {
  // Xử lý và in ra kết quả
  let newArr = [];

  if (!Array.isArray(arr)) {
    console.log("Dữ liệu nhập vào phải là dạng mảng");
    return;
  }

  if (arr.length === 0) {
    console.log("Đây là mảng rỗng");
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > 5) {
      newArr.push(arr[i]);
    }
  }
  console.log(newArr);
}

// Output:
filterLongStrings(["hello", "world", "javascript", "nodejs"]); // Output: ["javascript", "nodejs"]
filterLongStrings(["hi", "hello world", "a b c", "goodbye!!"]); // Output: ["hello world", "goodbye!!"]
filterLongStrings(["hi", "bye", "yes"]); // Output: []
