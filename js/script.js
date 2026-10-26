// Demo catalogue. Edit names, prices and image URLs here.
const WHATSAPP_NUMBER = "919850826021"; // Replace with your real number: country code + digits only.
const products = [
 {id:1,name:"Traditional Ganpati Murti",price:1899,category:"traditional",img:"images/ganpati-1.jpg"},
 {id:2,name:"Elegant Marble-Style Bappa",price:2499,category:"designer",img:"images/ganpati-2.jpg"},
 {id:3,name:"Golden Metal-Finish Murti",price:3499,category:"metal",img:"images/ganpati-3.jpg"},
 {id:4,name:"Eco-conscious Clay Bappa",price:999,category:"eco",img:"images/ganpati-4.jpg"},
 {id:5,name:"Premium Designer Ganpati",price:4999,category:"designer",img:"images/ganpati-5.jpg"},
 {id:6,name:"Classic Clay Ganpati Murti",price:1499,category:"traditional",img:"images/ganpati-6.jpg"},
 {id:7,name:"Antique Gold-Tone Bappa",price:2799,category:"metal",img:"images/ganpati-7.jpg"},
 {id:8,name:"White Designer Ganpati",price:3199,category:"designer",img:"images/ganpati-8.jpg"}
];
const money = n => "₹" + Number(n).toLocaleString("en-IN");
let cart = [];
try { cart = JSON.parse(localStorage.getItem("ganpatiMurtiCart") || "[]"); } catch { cart = []; }
function card(p){return `<article class="product-card"><button class="heart" aria-label="Toggle favourite" onclick="this.textContent=this.textContent==='♥'?'♡':'♥'">♡</button><div class="product-image"><img loading="lazy" src="${p.img}" alt="${p.name}" onerror="this.onerror=null;this.src='images/ganpati-9.jpg'"></div><div class="product-info"><h3>${p.name}</h3><p class="price">${money(p.price)}</p><button class="btn btn-maroon" onclick="addToCart(${p.id})">🛒 Add to Cart</button></div></article>`;}
const featured = document.getElementById("featuredProducts");
if(featured) featured.innerHTML = products.slice(0,5).map(card).join("");
function renderProducts(){
 const grid=document.getElementById("allProducts"); if(!grid)return;
 const q=(document.getElementById("productSearch")?.value||"").trim().toLowerCase();
 const cat=document.getElementById("categoryFilter")?.value||"all";
 const sort=document.getElementById("sortProducts")?.value||"featured";
 let list=products.filter(p=>(p.name.toLowerCase().includes(q))&&(cat==="all"||p.category===cat));
 if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);
 const count=document.getElementById("productCount");if(count)count.textContent=`${list.length} murti${list.length===1?"":"s"} found`;
 grid.innerHTML=list.length?list.map(card).join(""):'<p class="no-products">No murtis match your search. Try another name or category.</p>';
}
renderProducts();
["productSearch","categoryFilter","sortProducts"].forEach(id=>document.getElementById(id)?.addEventListener(id==="productSearch"?"input":"change",renderProducts));
function addToCart(id){const p=products.find(x=>x.id===id);if(!p)return;const existing=cart.find(x=>x.id===id);if(existing)existing.qty++;else cart.push({...p,qty:1});saveCart();renderCart();openCart();}
function removeFromCart(id){cart=cart.filter(p=>p.id!==id);saveCart();renderCart();}
function changeQty(id,delta){const p=cart.find(x=>x.id===id);if(!p)return;p.qty+=delta;if(p.qty<=0)removeFromCart(id);else{saveCart();renderCart();}}
function saveCart(){try{localStorage.setItem("ganpatiMurtiCart",JSON.stringify(cart));}catch(e){}}
function renderCart(){
 document.querySelectorAll("#cartCount").forEach(el=>el.textContent=cart.reduce((s,p)=>s+p.qty,0));
 const items=document.getElementById("cartItems");
 if(items)items.innerHTML=cart.length?cart.map(p=>`<div class="cart-line"><div><b>${p.name}</b><br>${money(p.price)} each<div class="qty-controls"><button onclick="changeQty(${p.id},-1)" aria-label="Decrease quantity">−</button><span>${p.qty}</span><button onclick="changeQty(${p.id},1)" aria-label="Increase quantity">+</button></div></div><div><b>${money(p.price*p.qty)}</b><button onclick="removeFromCart(${p.id})">Remove</button></div></div>`).join(""):'<p class="empty-note">Your cart is empty. Add a Bappa you love.</p>';
 const total=document.getElementById("cartTotal");if(total)total.textContent=money(cart.reduce((s,p)=>s+p.price*p.qty,0));
}
function openCart(){document.getElementById("cartDrawer")?.classList.add("open");document.getElementById("cartShade")?.classList.add("open");document.getElementById("cartDrawer")?.setAttribute("aria-hidden","false");}
function closeCart(){document.getElementById("cartDrawer")?.classList.remove("open");document.getElementById("cartShade")?.classList.remove("open");document.getElementById("cartDrawer")?.setAttribute("aria-hidden","true");}
document.getElementById("cartOpen")?.addEventListener("click",openCart);document.getElementById("cartClose")?.addEventListener("click",closeCart);document.getElementById("cartShade")?.addEventListener("click",closeCart);
function openWhatsApp(message){if(!WHATSAPP_NUMBER||WHATSAPP_NUMBER.length<10){alert("Please set your WhatsApp number in js/script.js.");return;}window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer");}
document.getElementById("checkoutBtn")?.addEventListener("click",()=>{if(!cart.length){alert("Your cart is empty. Add a murti first.");return;}const lines=cart.map(p=>`• ${p.name} × ${p.qty} — ${money(p.price*p.qty)}`).join("\n");openWhatsApp(`Namaste! I would like to enquire about these Ganpati murtis:\n${lines}\nEstimated total: ${money(cart.reduce((s,p)=>s+p.price*p.qty,0))}\nPlease confirm availability, final prices and delivery.`);});
document.getElementById("whatsappFloat")?.addEventListener("click",e=>{e.preventDefault();openWhatsApp("Namaste! I would like to enquire about your Ganpati murtis.");});
document.getElementById("contactWhatsApp")?.addEventListener("click",e=>{e.preventDefault();openWhatsApp("Namaste! I would like to enquire about Ganpati murti designs, sizes and prices.");});
document.getElementById("contactForm")?.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.currentTarget);openWhatsApp(`Namaste Ganpati Store!\nName: ${d.get("name")}\nPhone: ${d.get("phone")}\nInterested in: ${d.get("interest")}\nMessage: ${d.get("message")||"Please share available designs and prices."}`);});
document.getElementById("menuToggle")?.addEventListener("click",()=>{const nav=document.getElementById("nav");nav?.classList.toggle("open");document.getElementById("menuToggle")?.setAttribute("aria-expanded",nav?.classList.contains("open")?"true":"false");});
document.querySelectorAll(".year").forEach(el=>el.textContent=new Date().getFullYear());
renderCart();
