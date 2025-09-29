function sortUsersByName(users) {
  // Xử lý và in ra kết quả
  return users.sort((a, b) => {
    const fullNameFirst = a.fullName.split(" ");
    const fullNameBehind = b.fullName.split(" ");

    const nameFirst = fullNameFirst[fullNameFirst.length - 1];
    const nameBehind = fullNameBehind[fullNameBehind.length - 1];

    const surnameFirst = fullNameFirst.slice(0, -1).join(" ");
    const surnameBehind = fullNameBehind.slice(0, -1).join(" ");

    if (nameFirst > nameBehind) return 1;
    if (nameFirst < nameBehind) return -1;

    if (surnameFirst > surnameBehind) return 1;
    if (surnameFirst < surnameBehind) return -1;

    return 0;
  });
}

// Input:
const users = [
  { fullName: "Nguyễn Minh Hoàng" },
  { fullName: "Nguyễn Đức Hoàng" },
  { fullName: "Lê Văn" },
  { fullName: "Lê Văn Tình" },
  { fullName: "Lê Nin" },
];
console.log(sortUsersByName(users));
// Output:
[
  { fullName: "Nguyễn Đức Hoàng" }, // Tên: Hoàng, Họ và tên đệm: Nguyễn Đức
  { fullName: "Nguyễn Minh Hoàng" }, // Tên: Hoàng, Họ và tên đệm: Nguyễn Minh
  { fullName: "Lê Nin" }, // Tên: Nin
  { fullName: "Lê Văn Tình" }, // Tên: Tình
  { fullName: "Lê Văn" }, // Tên: Văn
];
