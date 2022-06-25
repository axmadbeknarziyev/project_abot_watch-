let savatcha = []


let malumotlar
$.ajax(`https://myjson.dit.upm.es/api/bins/j8nl` ,{
type: "GET",
success: function(ress){
    render(ress)
    console.log(ress);
    malumotlar = ress
},
error: function (err){
    console.log(err);
}
})


function render(users){
    $(".row1").html("")
    let sanoq = 0
    users.map(user => {
        
        let col = `
        <div class="col-3 ms-5">
        <div class="card p-3 m-4">
        <img src="${user.img_src}">
        <div class="text-center my-1">${user.name}</div>
        <div class="text-center my-1">${user.cost}</div>
        <div class="buttons">
        <button onclick="qosh(${sanoq})" class=" btn btn-primary  my-1 form-control text-white">Sotib olish</button>
        </div>
        </div>
        </div>
        `
        $(".row1").append(col)
        sanoq++
        
    })
}






let searchResult = ""
$("#search").on("input", () => {
    let value = $("#search").val()
    searchResult = malumotlar.filter(item => {
        return item.name.toLowerCase().includes(value.toLowerCase())
    })
    $(".row1").html("")
    render(searchResult)
})





let category
$.ajax("https://myjson.dit.upm.es/api/bins/awi1", {
type: "GET",
success: function(ress){
    render2(ress)
    category = ress
},
error: function (err){
    console.log(err);
}
})


function render2(data){
    $("#category").html("")
    data.map(item => {
        let option = `
        <option class="jsOption text-primary" value="${item.category}">${item.category}</option>
        `
        $("#category").append(option)
    })
}



function filterByCategory(category){
    let ByCategoryResult = malumotlar.filter(product => {
        return product.category.toLowerCase() === category.value.toLowerCase()
    })
    render(ByCategoryResult)
}




let start_value = 0, end_value = 0

function filterByPrise(val ,type){
    let value = Number(val.value)
    if(type === "start") {
        start_value = value
    }else if(type == "end"){
        end_value = value
    }
    let filterByCost = malumotlar.filter(malumot => {
        return Number(malumot.cost) >= start_value && Number(malumot.cost) <= end_value
    })
    render(filterByCost)
}

function qosh(index){
    savatcha.push(malumotlar[index])
    $(".badge").html(savatcha.length)
}


$(".btnSavat").on("click", () => {
    $(".row1").html("")
    $(".row2").removeClass("d-none")
    savatcha.forEach(item =>{
        let card = `
        <div class="col-12 listlar">
            <p class="d-flex justify-content-end"><i class="savat_icon fa-solid fa-trash pe-4"></i></p>
        
            <div class="d-flex justify-content-between">
                <img src="${item.img_src}">
                <div class="plus_minus d-flex justify-content-evenly">
                    <button class="btn btn-danger">-</button>
                    <p class="first ps-3 pe-4 ">1</p>
                    <button class="btn btn-primary">+</button>
                </div>
                <div class="items d-flex flex-column">
                    <p>Nomi: ${item.name}</p>
                    <p>Narxi: ${item.cost}</p>
                    <p class="text-center text-primary" style="font-size: 27px;">Umumiy summa: 34567</p>
                </div>
            </div>
        
        </div>
        `
        $(".row2").append(card)
    })
})
