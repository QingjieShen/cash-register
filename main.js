const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cashDrawerScreen = document.querySelector(".screen");
const changeDue = document.getElementById("change-due");
const changeInfo = document.querySelector(".change-info");
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
const currencyToDisplay = [
    ["PENNY", "Pennies"],
    ["NICKLE", "Nickels"],
    ["DIME", "Dimes"],
    ["QUARTER", "Quarters"],
    ["ONE", "Ones"],
    ["FIVE", "Fives"],
    ["TEN", "Tens"],
    ["TWENTY", "Twenties"],
    ["ONE HUNDRED", "Hundreds"] 
]

let price = 19.5;
let cid = [
    ["PENNY", 3.5],
    ["NICKLE", 14],
    ["DIME", 20],
    ["QUARTER", 14.25],
    ["ONE", 30],
    ["FIVE", 25],
    ["TEN", 30],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// display the price which customer need to pay
const showTotalPrice = (price) => {
    cashDrawerScreen.innerHTML = `<p>Total: $${price}</p>`;
}


// shows and updates the change in the drawer
const showCID = () => {
    let changeInDrawer = [];
    for (let i = 0; i < cid.length; i++) {
        for(let j = 0; j < currencyToDisplay.length; j++) {
            if (cid[i][0] === currencyToDisplay[j][0]) {
                changeInDrawer.push([currencyToDisplay[j][1], cid[i][1]])
            }
        }
    }
    changeInfo.innerHTML = "<h3>Change in drawer</h3>"
    changeInDrawer.forEach((el) => {
        changeInfo.innerHTML += `<p>${el[0]}: $${el[1]}</p>`
    }) 
}

// 
const getChange = (changeLeft, totalCashInDrawer) => {
    let changeInfoDetails = [];
    const cidReverse = [...cid].reverse();
    const currencyReverse = [...currencyUnit].reverse();
    for (let i = 0; i < cidReverse.length; i++) {
        if (changeLeft > currencyReverse[i][1] && changeLeft > 0) {
            let count = 0;
            let total = cidReverse[i][1];
            while (total > 0 && changeLeft >= currencyReverse[i][1]) {
                total -= currencyReverse[i][1];
                changeLeft = parseFloat((changeLeft -= currencyReverse[i][1]).toFixed(2));
                count++;
            }
            changeInfoDetails.push([cidReverse[i][0], count * currencyReverse[i][1]]);
        }
    }
    const changeInfoDetailsFiltered = changeInfoDetails.filter((el)=> {
        return el[1] > 0;
    });

    if (changeLeft > 0) {
        changeDue.innerHTML = `<p>${cashDrawerStatus[0]}</p>`;
    // } else if (changeLeft === 0 && totalCashInDrawer === 0) {
    //     changeDue.innerHTML = `<p>${cashDrawerStatus[1]}</p>`;
    //     changeInfoDetailsFiltered.forEach((el) => {
    //         changeDue.innerHTML += `<p>${el[0]}: $${el[1]}</p>`
    //     })
    } else {
        changeInfoDetailsFiltered.forEach((el) => {
            cid.forEach((element) => {
                if (el[0] === element[0]) {
                    //element[1] = (element[1] - el[1]).toFixed(2);
                    element[1] -= el[1];
                }
            });
            totalCashInDrawer = 0;
            cid.forEach((el) => {
                totalCashInDrawer += el[1];
            })
            if (totalCashInDrawer === 0) {
                changeDue.innerHTML = `<p>${cashDrawerStatus[1]}</p>`;
            } else {
                changeDue.innerHTML = `<p>${cashDrawerStatus[2]}</p>`;
            }
            changeInfoDetailsFiltered.forEach((el) => {
                changeDue.innerHTML += `<p>${el[0]}: $${el[1]}</p>`
            })
        });
        showCID();
    }

}

// check if the money in cash drawer is greater than or equels to the change due 
const isChangeEnough = (moneyPaid) => {
    let totalCashInDrawer = 0;
    cid.forEach((el) => {
        totalCashInDrawer += el[1];
    })
    if (totalCashInDrawer < moneyPaid - price) {
        changeDue.innerHTML = `<p>${cashDrawerStatus[0]}</p>`;
    } else {
        getChange((moneyPaid - price), totalCashInDrawer);
    }
}


// The main function, used to calculate the change result
const change = () =>{
    // refresh the change in drawer
    const cashAmount = parseFloat(cash.value); 
    showCID();
    // if the money customer gave is less than the price due, give an alert
    if (cashAmount < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (cashAmount === price) {
        // if the money customer gave is equal to the price due, just take the money and add the money to cash drwer
        changeDue.innerHTML = "<p>No change due - customer paid with exact cash</p>"
    } else {
        // here we are going to mantain when the customer paid enough money
        // use the changeResult() function to check change status
        isChangeEnough(cashAmount);
    }


    // clean up the input field
    cash.value = "";
}


// load the total price when loading the html page
document.addEventListener("DOMContentLoaded", () => {
    cashDrawerScreen.innerHTML = `<p>Total: $${price}</p>`;
    showCID();
 });

// detect user click event or press "Enter" after typing the number
purchaseBtn.addEventListener("click", change)
cash.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        change();
    }
})
