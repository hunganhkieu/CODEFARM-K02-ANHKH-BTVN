// Input:
function filterDuplicate(arr) {
  const newArr1 = [];
  for (let i = 0; i < arr.length; i++) {
    if (!newArr1.includes(arr[i])) {
      newArr1.push(arr[i]);
    }
  }
  return newArr1;
}

function findCommonElement(arr1, arr2) {
  const cleanArr1 = filterDuplicate(arr1);
  const cleanArr2 = filterDuplicate(arr2);

  const result = [];

  for (let i = 0; i < cleanArr1.length; i++) {
    if (cleanArr2.includes(cleanArr1[i])) {
      result.push(cleanArr1[i]);
    }
  }

  if (result.length === 0) {
    return false;
  } else {
    return result;
  }
}

// Output:
console.log(findCommonElement([1, 2, 3], [2, 3, 4])); // 2 3
console.log(findCommonElement([1, 2, 3], [4, 5, 6])); // false
console.log(findCommonElement([1, 2, 2, 3, 4], [2, 3, 4, 5])); // 2 3 4
