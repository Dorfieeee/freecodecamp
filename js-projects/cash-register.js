const CASH = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
]

function checkCashRegister(price, cash, cid) {
    let change = cash - price;
    let changeArray = []
    // create exact copy of CID array
    let local_cid = cid.map(arr => arr.slice())
    // loop through each element of local_cid reversely
    for(let i = CASH.length - 1, counter = 0; i >= 0; i--) {    
        // replace total money value with number of each individual currency
        local_cid[i][1] = Math.floor(local_cid[i][1] / CASH[i][1])
        // if there is at least 1 coin/note AND change can be divided by its value
        while(local_cid[i][1] > 0 && change / CASH[i][1] >= 1) {
            counter += 1
            local_cid[i][1] -= 1
            // fixing floating numbers
            change = (change - CASH[i][1]).toPrecision(4)            
        }
        // push [NAME, VALUE] if at least 1 counted
        counter && changeArray.push([CASH[i][0], counter * CASH[i][1]])
        counter = 0        
    }
    
    const is_local_cid_empty = local_cid.filter((value) => value[1] > 0).length 
    const has_a_change_left = !(change == 0)
    
    return  has_a_change_left
            ? {status: "INSUFFICIENT_FUNDS", change: []} 
            : is_local_cid_empty
            ? {status: "OPEN", change: changeArray}
            : {status: "CLOSED", change: cid}
}
// 
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))