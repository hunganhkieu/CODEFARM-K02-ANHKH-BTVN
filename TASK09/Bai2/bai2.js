// Input:
const fruits = [
  "apple",
  "banana",
  "kiwi",
  "kiwi",
  "banana",
  "orange",
  "apple",
  "kiwi",
];

function removeDuplicate(arr) {
  // Xử lý và in ra kết quả
  return arr.reduce((acc, cur) => {
    const checkFruits = acc.some(
      (item) => item === cur || (Number.isNaN(item) && Number.isNaN(cur))
    );
    if (!checkFruits) {
      acc.push(cur);
    }
    return acc;
  }, []);
}

// Output:
const result = removeDuplicate(fruits);
console.log(result); // ["apple", "banana", "kiwi", "orange"]
