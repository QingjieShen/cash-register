const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cashDrawerStatus = [
    "Status: INSUFFICIENT_FUNDS",
    "Status: CLOSED",
    "Status: OPEN"
];
const currencyUnit = [
    ["PENNY", 0.01],
    ["NICKLE", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100] 
];

let price = 1.87;
let cid = [
    ["PENNY", 1.01],
    ["NICKLE", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// The main function, used to calculate the change result
const change = () =>{
    // if the money customer gave is less than the price due, give an alert

    // if the money customer gave is equal to the price due, just take the money and add the money to cash drwer

    // if the money customer gave is enough, call the exchange() function
}

// exchange function used to check if we can return the exact change.


// detect user click event
purchaseBtn.addEventListener("click", change)