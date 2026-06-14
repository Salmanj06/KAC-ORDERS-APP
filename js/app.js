import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
FIREBASE COLLECTIONS
========================= */

const categoriesRef = collection(db, "categories");
const productsRef = collection(db, "products");
const ordersRef = collection(db, "orders");

window.products = [];

/* =========================
SIDEBAR
========================= */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (menuBtn) {

  menuBtn.addEventListener("click", () => {

    ```
sidebar.classList.toggle("active");

overlay.classList.toggle("active");
```

  });

}

if (overlay) {

  overlay.addEventListener("click", () => {

    ```
sidebar.classList.remove("active");

overlay.classList.remove("active");
```

  });

}

/* =========================
LOAD CATEGORIES
========================= */

function loadCategories() {

  const categoryList =
    document.getElementById("categoryList");

  onSnapshot(categoriesRef, (snapshot) => {

    ```
if (categoryList) {
  categoryList.innerHTML = "";
}

document
  .querySelectorAll(".categoryDropdown")
  .forEach(dropdown => {

    dropdown.innerHTML =
      '<option value="">Select Category</option>';

  });

snapshot.forEach(doc => {

  const data = doc.data();

  document
    .querySelectorAll(".categoryDropdown")
    .forEach(dropdown => {

      dropdown.innerHTML += `
      < option value = "${data.name}" >
        ${ data.name }
        </option >
      `;

    });

  if (categoryList) {

    categoryList.innerHTML += `
      < div class="order-card" >
        ${ data.name }
      </div >
      `;

  }

});
```

  });

}

/* =========================
SAVE CATEGORY
========================= */

const categoryForm =
  document.getElementById("categoryForm");

if (categoryForm) {

  categoryForm.addEventListener("submit",
    async (e) => {

      ```
  e.preventDefault();

  const categoryName =
    document.getElementById("categoryName").value;

  try {

    await addDoc(categoriesRef, {
      name: categoryName
    });

    alert("Category Saved");

    categoryForm.reset();

  } catch (error) {

    console.log(error);

    alert("Save Failed");

  }

});
```

    }

/* =========================
LOAD PRODUCTS
========================= */

function loadProducts() {

      const productList =
        document.getElementById("productList");

      onSnapshot(productsRef, (snapshot) => {

        ```
window.products = [];

if (productList) {
  productList.innerHTML = "";
}

snapshot.forEach(doc => {

  const data = doc.data();

  window.products.push(data);

  if (productList) {

    productList.innerHTML += `
          < div class="order-card" >
            ${ data.name }
        <br>
          ${data.category}
        </div>
        `;

  }

});
```

      });

    }

/* =========================
SAVE PRODUCT
========================= */

const productForm =
    document.getElementById("productForm");

  if (productForm) {

    productForm.addEventListener("submit",
      async (e) => {

        ```
  e.preventDefault();

  try {

    await addDoc(productsRef, {

      name:
        document.getElementById("productName").value,

      category:
        document.getElementById("productCategory").value

    });

    alert("Product Saved");

    productForm.reset();

  } catch (error) {

    console.log(error);

    alert("Save Failed");

  }

});
```

      }

/* =========================
CATEGORY FILTER PRODUCTS
========================= */

const orderCategory =
      document.getElementById("orderCategory");

    if (orderCategory) {

      orderCategory.addEventListener("change", () => {

        ```
const productDropdown =
  document.getElementById("productDropdown");

productDropdown.innerHTML =
  '<option value="">Select Product</option>';

window.products
  .filter(product =>
    product.category === orderCategory.value
  )
  .forEach(product => {

    productDropdown.innerHTML += `
          < option value = "${product.name}" >
            ${ product.name }
      </option >
          `;

  });
```

      });

    }

    /* =========================
    LOAD ORDERS
    ========================= */

    function loadOrders() {

      const orderList =
        document.getElementById("orderList");

      onSnapshot(ordersRef, (snapshot) => {

        ```
if (orderList) {
  orderList.innerHTML = "";
}

snapshot.forEach(doc => {

  const data = doc.data();

  if (orderList) {

    orderList.innerHTML += `
          < div class="order-card" >

        <strong>${data.customer}</strong>

        <br><br>

        Date:
        ${data.date}

        <br>

        Category:
        ${data.category}

        <br>

        Product:
        ${data.product}

      </div>
    `;

  }

});
```

});

}

/* =========================
SAVE ORDER
========================= */

const orderForm =
document.getElementById("orderForm");

if (orderForm) {

orderForm.addEventListener("submit",
async (e) => {

```
  e.preventDefault();

  try {

    await addDoc(ordersRef, {

      date:
        document.getElementById("orderDate").value,

      customer:
        document.getElementById("customerName").value,

      category:
        document.getElementById("orderCategory").value,

      product:
        document.getElementById("productDropdown").value

    });

    alert("Order Saved");

    orderForm.reset();

  } catch (error) {

    console.log(error);

    alert("Save Failed");

  }

});
```

}

/* =========================
INITIAL LOAD
========================= */

window.addEventListener("DOMContentLoaded", () => {

loadCategories();

loadProducts();

loadOrders();

});
