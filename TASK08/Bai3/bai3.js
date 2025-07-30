// Input:
const arrayWords = ["Hello world", "JS is fun", "Arrays and strings"];
function countTotalWords(arr) {
  // Logic bài tập và trả về kết quả
  return arr.reduce((acc, cur) => {
    const totalWord = acc + cur.split(" ").length;
    return totalWord;
  }, 0);
}

// Output:
console.log(
  countTotalWords(["Hello world", "JS is fun", "Arrays and strings"]) // 8
);
