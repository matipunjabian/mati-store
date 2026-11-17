const products=[
{id:1,name:"Classic T-Shirt",cat:"Fashion",price:1499,old:1999,icon:"👕"},
{id:2,name:"Smartphone Pro",cat:"Mobiles",price:54999,old:59999,icon:"📱"},
{id:3,name:"Wireless Headphones",cat:"Electronics",price:4999,old:6999,icon:"🎧"},
{id:4,name:"Running Shoes",cat:"Shoes",price:4499,old:5499,icon:"👟"},
{id:5,name:"Laptop",cat:"Electronics",price:129999,old:139999,icon:"💻"},
{id:6,name:"Smart Watch",cat:"Accessories",price:7999,old:9999,icon:"⌚"},
{id:7,name:"Sofa Cushion Set",cat:"Home",price:2999,old:3999,icon:"🛋️"},
{id:8,name:"Denim Jacket",cat:"Fashion",price:3999,old:4999,icon:"🧥"},
{id:9,name:"Bluetooth Speaker",cat:"Electronics",price:3499,old:4499,icon:"🔊"},
{id:10,name:"Backpack",cat:"Accessories",price:2499,old:2999,icon:"🎒"},
{id:11,name:"Coffee Maker",cat:"Home",price:8999,old:10999,icon:"☕"},
{id:12,name:"Sunglasses",cat:"Fashion",price:1999,old:2499,icon:"🕶️"}
];
let visible=[...products],cart=JSON.parse(localStorage.getItem("matiCart")||"[]");

const money=n=>"Rs "+n.toLocaleString("en-PK");
function render(){
 const grid=document.getElementById("productGrid");
 grid.innerHTML=visible.map(p=>`<article class="product">
 <div class="product-img"><span class="badge">SALE</span>${p.icon}</div>
 <div class="product-body"><span class="category">${p.cat}</span><h3>${p.name}</h3>
 <div class="price">${money(p.price)} <span class="old">${money(p.old)}</span></div>
 <button class="add" onclick="addToCart(${p.id})">Add to Cart</button></div></article>`).join("");
 if(!visible.length) grid.innerHTML='<p>No products found.</p>';
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});save();toast("Added to cart");}
function save(){localStorage.setItem("matiCart",JSON.stringify(cart));updateCount();}
function updateCount(){document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);}
function filterCategory(cat){visible=cat==="All"?[...products]:products.filter(p=>p.cat===cat);document.getElementById("sectionTitle").textContent=cat==="All"?"All Products":cat;render();document.getElementById("products").scrollIntoView({behavior:"smooth"});}
function searchProducts(){const q=document.getElementById("searchInput").value.toLowerCase().trim();visible=products.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q));document.getElementById("sectionTitle").textContent=q?`Results for "${q}"`:"All Products";render();}
document.getElementById("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")searchProducts();});
function sortProducts(){const v=document.getElementById("sortSelect").value;if(v==="low")visible.sort((a,b)=>a.price-b.price);if(v==="high")visible.sort((a,b)=>b.price-a.price);if(v==="name")visible.sort((a,b)=>a.name.localeCompare(b.name));render();}
function openCart(){document.getElementById("cartModal").classList.remove("hidden");renderCart();}
function closeCart(){document.getElementById("cartModal").classList.add("hidden");}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML="<p style='padding:25px 0;color:#6b7280'>Your cart is empty.</p>";document.getElementById("cartTotal").textContent=money(0);return;}
 let total=0;
 box.innerHTML=cart.map(item=>{const p=products.find(x=>x.id===item.id);total+=p.price*item.qty;return `<div class="cart-item"><div class="cart-icon">${p.icon}</div><div class="cart-info"><h4>${p.name}</h4><div>${money(p.price)}</div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${item.qty}</span><button onclick="changeQty(${p.id},1)">+</button><button onclick="removeItem(${p.id})" style="margin-left:auto;border:0;background:none">🗑️</button></div></div></div>`}).join("");
 document.getElementById("cartTotal").textContent=money(total);
}
function changeQty(id,d){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=d;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);save();renderCart();}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();renderCart();}
function checkout(){if(!cart.length){toast("Your cart is empty");return;}toast("Checkout demo: connect your payment system here.");}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800);}
render();updateCount();
