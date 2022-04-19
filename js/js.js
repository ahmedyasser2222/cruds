let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let s_t = document.getElementById("s-t");
let s_g = document.getElementById("s-g");
let tab = document.getElementById("tab");
let menu=document.getElementById("menu")
var x = 0;
let state = "create";
var index = 0;

/***========= cal total ========== */
function calTotal() {
  if (price.value != "") {
    x = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = "Total : " + x;
  } else {
    total.innerHTML = "Total :";
  }
}

/** ========== create ========= */
function cre() {
  console.log(index);
  if (title.value == "") {
    alert("Inter name of product");
  } else {
    calTotal()
    create.innerHTML = state;
    let productData;
    productData =
      localStorage.product != null ? JSON.parse(localStorage.product) : [];
    let newPro = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: x,
      count: count.value,
      category: category.value.toLowerCase(),
    }; // end newPro

    if (state === "Update") {
      productData[index].title = newPro.title;
      productData[index].price = newPro.price;
      productData[index].taxes = newPro.taxes;
      productData[index].ads = newPro.ads;
      productData[index].discount = newPro.discount;
      productData[index].total = newPro.total;
      productData[index].count = newPro.count;
      productData[index].category = newPro.category;
      console.log(productData[index]);
      localStorage.setItem("product", JSON.stringify(productData));
      clear();
      showData();
      state = "create";
    } else {
      productData.push(newPro);
      localStorage.setItem("product", JSON.stringify(productData));
      clear();
      showData();
    }
  }
  create.innerHTML="Create"
}
/** =====Show data */

function showData() {
  let pro = JSON.parse(localStorage.product);
  tab.innerHTML = "";
  for (let i = 0; i < pro.length; i++) {
    tab.innerHTML += `
   <tr>
   <td> ${i + 1}                 </td>
   <td> ${pro[i].title}      </td>
   <td> ${pro[i].price}      </td>
   <td> ${pro[i].taxes}      </td>
   <td> ${pro[i].ads}        </td>
   <td> ${pro[i].discount}   </td>
   <td> ${pro[i].total}      </td>
   <td> ${pro[i].count}      </td>
   <td> ${pro[i].category}   </td>
   <td><button onclick="update(${i})" id="update">update</button></td>
   <td><button onclick="rem(${i})" id="delete" >delete</button></td>
   </tr>  
   `;
  }
} //end showData

/*** ======= delete item */
function rem(x) {
  let pro = JSON.parse(localStorage.product);
  pro.splice(x, 1);
  localStorage.product = JSON.stringify(pro);
  showData();
}

/**======== onload========== */
window.onload = () => showData();
/***========================== */

/**==============clear ========= */
function clear() {
  title.value = "";
  price.value = "";
  total.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "Total :";
}
//////////////update///////////
function update(s) {
  let pro = JSON.parse(localStorage.product);
  title.value = pro[s].title;
  price.value = pro[s].price;
  total.value = pro[s].total;
  taxes.value = pro[s].taxes;
  ads.value = pro[s].ads;
  discount.value = pro[s].discount;
  count.value = pro[s].count;
  category.value = pro[s].category;
  state = "Update";
  create.innerHTML = state;
  index = s;
}
/**====search data */
function searchData(value) {
  let pro = JSON.parse(localStorage.product);
  let data=[];
  
 // console.log(value.includes("s"))
  for(let i=0 ; i< pro.length ;i++) {
      if( pro[i].title.includes(value.toLowerCase()) || pro[i].category.includes(value.toLowerCase()) ){
        data.push(pro[i])
      }
   } 
  tab.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    tab.innerHTML += `
   <tr>
   <td> ${i + 1}                 </td>
   <td> ${data[i].title}      </td>
   <td> ${data[i].price}      </td>
   <td> ${data[i].taxes}      </td>
   <td> ${data[i].ads}        </td>
   <td> ${data[i].discount}   </td>
   <td> ${data[i].total}      </td>
   <td> ${data[i].count}      </td>
   <td> ${data[i].category}   </td>
   <td><button onclick="update(${i})" id="update">update</button></td>
   <td><button onclick="rem(${i})" id="delete" >delete</button></td>
   </tr>  
   `;
  }
} // end search fun

 function showMenu(){
 let left= document.getElementById("left")
 left.classList.toggle("show-menu")
 console.log("ok")
}