// select Function
function $(element) {
    return document.querySelector(element);
}

function $$(element) {
    return document.querySelectorAll(element);
}
// set date of today
let now = new Date();
let month = (now.getMonth() < 9) ? `0${
    now.getMonth() + 1
}` : `${
    now.getMonth() + 1
}`;
let day = (now.getDate() < 10) ? `0${
    now.getDate()
}` : `${
    now.getDate()
}`;
let year = now.getFullYear();
let todayDate = `${year}-${month}-${day}`;
// return the total amount of money thatis displayed on the screen
let total = 0;

// /
const tableHeader = `<tr><th>تعديل</th><th>السعر</th><th>الوقت</th><th>التاريخ</th><th>البضاعة</th><th>المشتري</th></tr>`;

// Declare Classes
/*
Purchase Class:
-create new purchases
*/
class Purchase {

    constructor(date, time, price, purchase, person) {
        this.date = (date) ? date : todayDate;
        this.time = time;
        this.price = price;
        this.purchase = purchase;
        this.person = person;
        this.id = Store.getStoredData().length + 1;


    }


}
/*
Store Class:
-Store new purchases to local Storage
*/
class Store { // get stored data as array of objects
    static getStoredData() {
        let purhases;
        if (localStorage.getItem('purchases') === null) {
            purhases = [];
        } else {
            purhases = JSON.parse(localStorage.getItem('purchases'));
        }
        return purhases;
    }

    // store new purchase
    static addNewPurchaseToStore() { // get the purhace info
        const purchaseInfo = new Purchase($('#date').value, $('#time').value, $('#price').value, $('#purchase').value, $('#name').value);
        const purchases = Store.getStoredData();
        purchases.push(purchaseInfo);
        localStorage.setItem('purchases', JSON.stringify(purchases));

    }
    // edit existed purchase
    static editPurchaseInfo(id, date, time, price, purchase, person) {
        console.log(id, date, time, price, purchase, person);
        // edit in localStorage
        let storedPurchases = Store.getStoredData();
        storedPurchases.forEach(one => {

            if (one.id == id) {
                console.log('sucsess');

                one.date = date;
                one.time = time;
                one.price = price;
                one.purchase = purchase;
                one.person = person;
            }
            localStorage.setItem('purchases', JSON.stringify(storedPurchases));

        });
    }
}
/*
UI Class:
-Controll what to display
*/
class UI { // new row with purchase info
    static newRow(id, price, time, date, purchase, person) {
        return `<tr id='${id}'><td><button id="done" style='display:none'>done</button><button id="edit">edit</button></td><td id="price1">${price}</td><td id="time1">${time}</td><td id="date1">${date}</td><td id="purchase1">${purchase}</td><td id="person1">${person}</td></tr>`;
    }
    // edit purchase info in UI
    static editUIPurchaseInfo(parent) {
        if ($('#date').value != '' && $('#time').value != '' && $('#price').value != '' && $('#purchase').value != '' && $('#name').value != '') { // edit the ui first
            parent.querySelector('#date1').innerHTML = $('#date').value;
            parent.querySelector('#time1').innerHTML = $('#time').value;
            parent.querySelector('#price1').innerHTML = $('#price').value;
            parent.querySelector('#purchase1').innerHTML = $('#purchase').value;
            parent.querySelector('#person1').innerHTML = $('#name').value;
        }

        console.log($('#name').value);
        console.log(parent.querySelector('#person1').innerHTML);


    }
    // empty form feilds
    static clearFormFields() {

        $('#date').value = todayDate;
        $('#time').value = '';
        $('#price').value = '';
        $('#purchase').value = '';
        $('#name').value = '';

    }
    // show Purhases on specific Date
    static findPurchasesOn(date) {

        $('#table-Header').innerHTML = tableHeader;
        let storedPurchases = Store.getStoredData();
        storedPurchases.forEach(one => {
            if (one.date == date) {
                $('#table-body').innerHTML += UI.newRow(one.id, one.price, one.time, one.date, one.purchase, one.person);
                total = total + Number(one.price);

            }
        })
        $('#sum').innerHTML = `${total} YR`;
    }
    // FILTER BY NAME
    static findPurchasesBy(name) {

        $('#table-Header').innerHTML = tableHeader;
        let storedPurchases = Store.getStoredData();
        storedPurchases.forEach(one => {
            if (one.person == name) {
                $('#table-body').innerHTML += UI.newRow(one.id, one.price, one.time, one.date, one.purchase, one.person);
                total = total + Number(one.price);
            }
        })
        $('#sum').innerHTML = `${total} YR`;
    }
    // show Purhases of All Time
    static findAllPurchases() {

        $('#table-Header').innerHTML = tableHeader;
        let storedPurchases = Store.getStoredData();
        storedPurchases.forEach(one => {

            $('#table-body').innerHTML += UI.newRow(one.id, one.price, one.time, one.date, one.purchase, one.person);
            total = total + Number(one.price);

        })
        $('#sum').innerHTML = `${total} YR`;
    }
    // clear table info
    static clearInfo() {
        $('#table-Header').innerHTML = '';
        $('#table-body').innerHTML = '';
        $('#sum').innerHTML = '';
        total = 0;

    }
    // get purchase info
    static getPurchaseInfo(parent, data) {


        switch (data) {
            case 'date':
                return parent.querySelector('#date1').innerHTML;
                break
            case 'price':
                return parent.querySelector('#price1').innerHTML;
                break
            case 'time':
                return parent.querySelector('#time1').innerHTML;
                break
            case 'purchase':
                return parent.querySelector('#purchase1').innerHTML;
                break
            case 'person':
                return parent.querySelector('#person1').innerHTML;
                break
            case 'id':
                return parent.id;
                break
        }


    }

}


/*
Add Events 
Last Thing
*/
// documennt load
window.addEventListener('load', () => {
    $('#sum').innerHTML = '0 YR';
    $('#chooseDate').value = todayDate;
    $('#date').value = todayDate;
    UI.clearInfo();
    UI.findAllPurchases();
    $('#time').focus();
})
// show form
$('#newPurchase').addEventListener('click', () => { // UI.showForm()
    UI.clearInfo();
    UI.findAllPurchases();
});
// //hide form
// $('#cancel').addEventListener('click', (e) => {
//     e.preventDefault();
//     UI.closeForm()
// });
// add new purchace to store
$('form').addEventListener('submit', (e) => {
    e.preventDefault();
    Store.addNewPurchaseToStore();
    UI.clearFormFields();

});

// search things
$('#FilterByDate').addEventListener('click', (e) => {
    UI.clearInfo();
    if ($('#chooseDate').value) {
        UI.findPurchasesOn($('#chooseDate').value);
    }
});

//
$('#sami').addEventListener('click', (e) => {
    UI.clearInfo();

    UI.findPurchasesBy('سامي');

});
$('#bassam').addEventListener('click', (e) => {
    UI.clearInfo();

    UI.findPurchasesBy('بسام');

});
$('#baleg').addEventListener('click', (e) => {
    UI.clearInfo();

    UI.findPurchasesBy('بليغ');

});
$('#mhmd').addEventListener('click', (e) => {
    UI.clearInfo();

    UI.findPurchasesBy('محمد');

});
$('#home').addEventListener('click', (e) => {
    UI.clearInfo();

    UI.findPurchasesBy('البيت');

});

$('tbody').addEventListener('click', (e) => {
    if (e.target.id == 'edit') {
        const parent = e.target.parentElement.parentElement;
        $('#date').value = UI.getPurchaseInfo(parent, 'date');
        $('#time').value = UI.getPurchaseInfo(parent, 'time');
        $('#price').value = UI.getPurchaseInfo(parent, 'price');
        $('#purchase').value = UI.getPurchaseInfo(parent, 'purchase');
        $('#name').value = UI.getPurchaseInfo(parent, 'person');
        parent.classList.add('edit');
        parent.querySelector('#done').style.display = 'inline';
    }
});
$('tbody').addEventListener('click', function (e) {
    if (e.target.id == 'done') {
        const parent = e.target.parentElement.parentElement;

        UI.editUIPurchaseInfo(parent);
        // console.log(UI.editPurchaseInfo(parent));
        console.log(1);

        Store.editPurchaseInfo(parent.id, UI.getPurchaseInfo(parent, 'date'), UI.getPurchaseInfo(parent, 'time'), UI.getPurchaseInfo(parent, 'price'), UI.getPurchaseInfo(parent, 'purchase'), UI.getPurchaseInfo(parent, 'person'));
        console.log(1);

        parent.classList.remove('edit');
        e.target.style.display = 'none';
        UI.clearFormFields();
    }
});

// /// learn intersecctiom
const options = { // root: nul, // is the veiwport
    threshold: 0, // if this value is 1 => this means that the whole section should be inside the veiwport or it won't fire
    rootMargin: 0
};
const infoTable = document.querySelector('#table-Header');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        console.log(entry.isIntersecting);
    })
}, options);

observer.observe(infoTable);
