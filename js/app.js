
const sidebar=document.getElementById("sidebar");
const overlay=document.getElementById("overlay");
const menuBtn=document.getElementById("menuBtn");

if(menuBtn){
menuBtn.onclick=()=>{
sidebar.classList.toggle("active");
overlay.classList.toggle("active");
}
}

if(overlay){
overlay.onclick=()=>{
sidebar.classList.remove("active");
overlay.classList.remove("active");
}
}

const {collection,addDoc,onSnapshot}=window.fb;
const db=window.db;

const categoriesRef=collection(db,"categories");
const productsRef=collection(db,"products");
const ordersRef=collection(db,"orders");

window.products=[];

function loadCategories(){
const categoryList=document.getElementById("categoryList");

onSnapshot(categoriesRef,(snapshot)=>{

if(categoryList) categoryList.innerHTML="";

document.querySelectorAll(".categoryDropdown").forEach(d=>{
d.innerHTML='<option value="">Select Category</option>';
});

snapshot.forEach(doc=>{

const data=doc.data();

document.querySelectorAll(".categoryDropdown").forEach(d=>{
d.innerHTML+=`<option value="${data.name}">${data.name}</option>`;
});

if(categoryList){
categoryList.innerHTML+=`<div class="order-card">${data.name}</div>`;
}

});

});
}

function loadProducts(){
const productList=document.getElementById("productList");

onSnapshot(productsRef,(snapshot)=>{

window.products=[];

if(productList) productList.innerHTML="";

snapshot.forEach(doc=>{

const data=doc.data();

window.products.push(data);

if(productList){
productList.innerHTML+=`<div class="order-card">${data.name}<br>${data.category}</div>`;
}

});

});
}

function loadOrders(){
const orderList=document.getElementById("orderList");

onSnapshot(ordersRef,(snapshot)=>{

if(orderList) orderList.innerHTML="";

snapshot.forEach(doc=>{

const data=doc.data();

if(orderList){
orderList.innerHTML+=`<div class="order-card">${data.customer}<br>${data.date}<br>${data.category}<br>${data.product}</div>`;
}

});

});
}

const categoryForm=document.getElementById("categoryForm");
if(categoryForm){
categoryForm.onsubmit=async(e)=>{
e.preventDefault();
await addDoc(categoriesRef,{name:categoryName.value});
categoryForm.reset();
}
}

const productForm=document.getElementById("productForm");
if(productForm){
productForm.onsubmit=async(e)=>{
e.preventDefault();
await addDoc(productsRef,{
name:productName.value,
category:productCategory.value
});
productForm.reset();
}
}

const orderCategory=document.getElementById("orderCategory");
if(orderCategory){
orderCategory.onchange=()=>{
productDropdown.innerHTML='<option>Select Product</option>';

window.products
.filter(p=>p.category===orderCategory.value)
.forEach(p=>{
productDropdown.innerHTML+=`<option value="${p.name}">${p.name}</option>`;
});
}
}

const orderForm=document.getElementById("orderForm");
if(orderForm){
orderForm.onsubmit=async(e)=>{
e.preventDefault();
await addDoc(ordersRef,{
date:orderDate.value,
customer:customerName.value,
category:orderCategory.value,
product:productDropdown.value
});
orderForm.reset();
}
}

window.onload=()=>{
loadCategories();
loadProducts();
loadOrders();
}
