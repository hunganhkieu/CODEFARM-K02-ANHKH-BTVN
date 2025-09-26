// Hãy mở rộng Array.prototype bằng cách thêm một phương thức mới là forEach2(callback) có chức năng tương tự như phương thức forEach() nguyên bản của JavaScript.

// Cụ thể:

// Phương thức này nhận một hàm callback làm tham số duy nhất của callback, bỏ qua tham số thisArg. Hàm này sẽ được gọi cho từng phần tử trong mảng.
// Hàm callback nhận vào 3 tham số: giá trị hiện tại, chỉ mục của phần tử và chính mảng đó.
// Phương thức chỉ lặp qua các phần tử theo length ban đầu của mảng (nếu mảng thay đổi trong quá trình lặp, số lần lặp không bị thay đổi).
// Phương thức sẽ bỏ qua các phần tử trống (empty elements) trong mảng khi gọi callback.
// Yêu cầu: Không được sử dụng phương thức forEach() nguyên bản của JavaScript.

Array.prototype.forEach2 = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      callback(this[i], i, this);
    }
  }
};

// Sample usage
const arr = [1, 2, 3, 4, 5];

arr.forEach2((value, index) => {
  console.log(`Value at index ${index}: ${value}`);
});

// Output:
// Value at index 0: 1
// Value at index 1: 2
// Value at index 2: 3
// Value at index 3: 4
// Value at index 4: 5
