students = [
  { id: 1, name: "Nguyễn Văn A", age: 20, city: "Hà Nội" },
  { id: 2, name: "Trần Thị B", age: 19, city: "TP.HCM" },
  { id: 3, name: "Lê Văn C", age: 21, city: "Đà Nẵng" },
];

const table = document.getElementById("dataTable");

let content = `
    <thead>
        <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Tuổi</th>
            <th>Thành phố</th>
        </tr>
    </thead>
    <tbody>
`;

students.forEach((item) => {
  const tr = `
    <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.city}</td>
    </tr>
    `;
  content += tr;
});

content += `</tbody>`;
table.innerHTML = content;

table.style.border = "1px solid black";
table.querySelectorAll("th, td").forEach((cell) => {
  cell.style.border = "1px solid black";
});
