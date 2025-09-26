// Xây dựng bộ lọc tìm kiếm sản phẩm
// Yêu cầu
// Hiển thị danh sách sản phẩm.
// Bộ lọc theo danh mục (Lọc được nhiều danh mục cùng lúc).
// sắp xếp giá tiền từ cao đến thấp hoặc từ thấp đến cao.
// Tìm kiếm sản phẩm dựa theo tên sản phẩm (Tìm kiếm dựa trên sản phẩm đang được lọc).
// Không sử dụng json-server, chỉ sử dụng lại các kiến thức về mảng.
// Nhấn vào để xem Website mẫu (Làm các chức năng giống trang web này không cần làm thêm giỏ hàng, giao diện có thể tuỳ biến).
// Dữ liệu
const products = [
  {
    name: "Sony Playstation 5",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/playstation_5_tywoqq.png",
    type: "games",
    price: 499.99,
  },
  {
    name: "Samsung Galaxy",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739038/samsung_galaxy_iad0cv.png",
    type: "smartphones",
    price: 399.99,
  },
  {
    name: "Cannon EOS Camera",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739063/cannon_eos_camera_ydidrx.png",
    type: "cameras",
    price: 749.99,
  },
  {
    name: "Sony A7 Camera",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/sony_a7_camera_xvkxwd.png",
    type: "cameras",
    price: 1999.99,
  },
  {
    name: "LG TV",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739061/lg_tv_yl0k03.png",
    type: "televisions",
    price: 799.99,
  },
  {
    name: "Nintendo Switch",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739061/nintendo_switch_diq6cy.png",
    type: "games",
    price: 299.99,
  },
  {
    name: "Xbox Series X",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/xbox_series_x_e9yex6.png",
    type: "games",
    price: 499.99,
  },
  {
    name: "Samsung TV",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/samsung_tv_adpfag.png",
    type: "televisions",
    price: 1099.99,
  },
  {
    name: "Google Pixel",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739064/google_pixel_r2bpdo.png",
    type: "smartphones",
    price: 499.99,
  },
  {
    name: "Sony ZV1F Camera",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/sony_zv1f_camera_o7kt3t.png",
    type: "cameras",
    price: 799.99,
  },
  {
    name: "Toshiba TV",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739037/toshiba_tv_sdsrnz.png",
    type: "televisions",
    price: 499.99,
  },
  {
    name: "iPhone 14",
    url: "https://res.cloudinary.com/diefuqpsy/image/upload/v1757739062/iphone_14_fhu2gq.png",
    type: "smartphones",
    price: 999.99,
  },
];
const productList = document.getElementById("product-list");
const checkboxes = document.querySelectorAll(
  ".size-option input[type=checkbox]"
);
const search = document.getElementById("search");

function renderUi(data) {
  productList.innerHTML = "";
  data.forEach((item) => {
    const productItem = `
    <div class="product">
      <div class="product-img">
        <img src="${item.url}" alt="${item.name}">
      </div>
      <h3>${item.name}</h3>
      <div class="price"><h4>${item.price}</h4></div>
    </div>
    `;
    productList.innerHTML += productItem;
  });
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    let tickCategories = [];
    checkboxes.forEach((check) => {
      if (check.checked) {
        tickCategories.push(check.value);
      }
    });

    let filter = products.filter((item) => {
      if (tickCategories.length === 0) {
        return true;
      }
      return tickCategories.includes(item.type);
    });
    renderUi(filter);
  });
});

search.addEventListener("input", () => {
  let value = search.value.trim().toLowerCase();
  let filter = products.filter((item) =>
    item.name.toLowerCase().includes(value)
  );
  renderUi(filter);
});

products.sort((a, b) => b.price - a.price);
renderUi(products);
