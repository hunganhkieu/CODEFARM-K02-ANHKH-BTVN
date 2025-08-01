// Hãy viết hàm flattenCategories(arr) để làm phẳng mảng categories bất kỳ.
// Mảng đã làm phẳng là mảng 1 chiều với mỗi phần tử trong mảng mới sẽ chứa thông tin của một danh mục với thêm trường parentId để tham chiếu đến danh mục cha của danh mục đó.
// Nếu parentId của danh mục cha không có thì gán bằng 0.

// Input:
const categories = [
  {
    id: 1,
    name: "Electronics",
    children: [
      {
        id: 2,
        name: "Laptops",
        children: [
          {
            id: 3,
            name: "Apple",
          },
          {
            id: 4,
            name: "Dell",
          },
        ],
      },
      {
        id: 5,
        name: "Headphones",
      },
    ],
  },
  {
    id: 6,
    name: "Books",
    children: [
      {
        id: 7,
        name: "Fiction",
        children: [
          {
            id: 8,
            name: "Thrillers",
          },
          {
            id: 9,
            name: "Mystery",
          },
        ],
      },
      {
        id: 10,
        name: "Non-Fiction",
      },
    ],
  },
];

function flattenCategories(arr, parentId = 0) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const newItem = {
      id: item.id,
      name: item.name,
      parentId: parentId,
    };
    result.push(newItem);
    if (item.children && Array.isArray(item.children)) {
      const children = flattenCategories(item.children, item.id);
      result = result.concat(children);
    }
  }
  return result;
}
const result = flattenCategories(categories);
console.log(result);

// Output:
[
  { id: 1, name: "Electronics", parentId: 0 },
  { id: 2, name: "Laptops", parentId: 1 },
  { id: 3, name: "Apple", parentId: 2 },
  { id: 4, name: "Dell", parentId: 2 },
  { id: 5, name: "Headphones", parentId: 1 },
  { id: 6, name: "Books", parentId: 0 },
  { id: 7, name: "Fiction", parentId: 6 },
  { id: 8, name: "Thrillers", parentId: 7 },
  { id: 9, name: "Mystery", parentId: 7 },
  { id: 10, name: "Non-Fiction", parentId: 6 },
];
