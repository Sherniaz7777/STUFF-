const list=document.querySelector('.list')
const root=document.querySelector('.root')
const block4=document.querySelector('.block-4-in')
const box=document.querySelector('.box')
const imgHome=document.querySelector('.header-img')
const CardCount1=document.querySelector('#imgs-sp1')
const CardCount2=document.querySelector('#imgs-sp2')
const btnlike=document.querySelector('#header-btn-like')
const btncorzina=document.querySelector('#header-btn-corz')


const urlstuff='https://fakestoreapi.com/products'


async function getProducts() {
    const res=await fetch(urlstuff)
    const data=await res.json()
    console.log(data);
    renderCategory(data)
    renderProducts(data.slice(0 ,5))
}
getProducts()

function ShowBox() {
    box.innerHTML=''
    box.innerHTML+=`
    <div>
         <div class="box-all">
            
                         <h1>BIG SALE 20%</h1>
                         <div class="box-in">
                               <div class="box-in1">
                                   <h3>the bestseller of 2022</h3>
                                   <p>LENNON R2D2 WITH NVIDIA 5090 TI</p>
                                    <button>Shop Now</button>
                                </div>

                               <div class="box-in2">
                                       <img src="/img/image 1 (2).png" alt="">
                                   </div>

                          </div>
                    </div>
                    
                    </div>
    `
}
// ShowBox()

imgHome.onclick=()=>{

    ShowBox()
}


function renderCategory(arr) {
    const newcategory=[]
    const result=arr.filter(el=>{
        if (!newcategory.includes(el.category)) {
            newcategory.push(el.category)
        }
    })
   

    for (const obj of newcategory) {
     list.innerHTML+=`
     <li onclick="getProductsByCategory(event)">${obj}</li>
     `
        
    }

    
}

function renderProducts(arr) {
    root.innerHTML=''
    for (const obj of arr) {
        root.innerHTML+=`
        <div class="card" onclick='GetId(${obj.id})' style="width: 18rem;" >
           <img src="${obj.image}" class="card-img-top" alt="Card image cap">
         <div class="card-body">
         <h5 class="card-title">${obj.title}</h5>
           <p class="card-text">${obj.category}</p>
           <a href="#" class="btn btn-primary">${obj.price} $</a>
        </div>
      </div>
        `
    }
}

async function getProductsByCategory(nameCategory) {
    const c = nameCategory.target.innerText;
    const res = await fetch(urlstuff);
    const data = await res.json();
    const filterData = data.filter(el => el.category === c);
    console.log(filterData);
    renderProducts(filterData.slice(0,5))
    
    const priceFilterFunction = el => el.price < 100;
    renderBlock4(data.slice(0,7),  priceFilterFunction);
}

function renderBlock4(arr, filterFunction) {
    block4.innerHTML = '';
    const filteredData = arr.filter(filterFunction);

    for (const obj of filteredData) {
        block4.innerHTML += `
            <div  class="card" onclick='GetId(${obj.id})' style="width: 18rem;">
                <img src="${obj.image}" class="card-img-top" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${obj.title}</h5>
                    <p class="card-text">${obj.category}</p>
                    <a href="#" class="btn btn-primary">${obj.price} $</a>
                </div>
            </div>
        `;
    }
}



getProductsByCategory({ target: { innerText: '' } });

async function GetId(id) {
    const res=await fetch('https://fakestoreapi.com/products/'+id)
    const data=await res.json()
    // console.log(data);
    getOnclickcategory(data)
}

function getOnclickcategory(obj) {
    box.innerHTML=''
    // obj.forEach(res => {
    box.innerHTML+=`
    <div>
    <div class="box-all1">
         <div class="Click-category">
                    <div class="box-img-cate">
                          <img src="${obj.image}" alt="">
                    </div>
                        <div class="box-anket">
                                      <h3>${obj.title}</h3>
                                      <h5>$${obj.price}</h5>
                                      <h2 id="box-anket-h2">Color:  <span id="box-anket-span-h2">Blanc</span></h2>
                                      <h4 id="box-anket-h4">Rate:  <span id="box-anket-span-h4">${obj.rating.rate}</span></h4>
                                      <p>${obj.description}</p>
                                  <div class="box-btn">
                                      <button onclick="incrCard(${obj.id})" id="box-btn-in-1">Add to cart</button>
                                      <button onclick="incrCard1(${obj.id})" id="box-btn-in-2">Add to favorites</button>
                                    </div>
                               
                       </div>
                      
        </div>

          <div class="box-all1-p">
                <p id="box-all1-p-1">19 people purchased</p>
                <p id="box-all1-p-2">Find in a store</p>
            </div>
    </div>
    </div>`
                // });
}
// getOnclickcategory()

let CountData=[]

 async function incrCard(id) {
    const res=await fetch(urlstuff+'/'+id)
    const data=await res.json()
    console.log(data);
    CountData.push(data)
    console.log(CountData);
    CardCount2.innerHTML=CountData.length
}

let CountData1=[]

 async function incrCard1(id) {
    const res=await fetch(urlstuff+'/'+id)
    const data=await res.json()
    console.log(data);
    CountData1.push(data)
    console.log(CountData1);
    CardCount1.innerHTML=CountData1.length
}

btncorzina.onclick=()=>{

}
btnlike.onclick=()=>{
    
}
