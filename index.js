// Your code here
let employeeObj;


function createEmployeeRecord(array) {
    employeeObj = {
        "firstName": array[0],
        "familyName": array[1],
        "title": array[2],
        "payPerHour": array[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
    return employeeObj;
}

function createEmployeeRecords(arrayOfArrays) {
    let newArray = [];
    arrayOfArrays.forEach((array) => {
        newArray.push(createEmployeeRecord(array))
    })
    return newArray;

}

function createTimeInEvent(employeeObj, date) {
    let dateArray = date.split(' ')
    let hour = parseInt(dateArray[1], 10)
    let day = dateArray[0]
    let timeInObj = {
        "type": "TimeIn",
        "hour": hour,
        "date": day,
    }
    employeeObj.timeInEvents.push(timeInObj)
    return employeeObj;
}

function createTimeOutEvent(employeeObj, date) {
    let dateArray = date.split(' ')
    let hour = parseInt(dateArray[1], 10)
    let day = dateArray[0]
    let timeOutObj = {
        "type": "TimeOut",
        "hour": hour,
        "date": day
    }
    employeeObj.timeOutEvents.push(timeOutObj)
    return employeeObj;

}

function hoursWorkedOnDate(employeeObj, date) {
    let num;
    for (let i = 0; i < employeeObj.timeInEvents.length; i++) {
        if (employeeObj.timeInEvents[i].date === date) {
            num = employeeObj.timeOutEvents[i].hour - employeeObj.timeInEvents[i].hour
            return num / 100;
        }
    }
    return false;
}

function wagesEarnedOnDate(employeeObj, date) {
    let num = hoursWorkedOnDate(employeeObj, date)
    num = num * employeeObj.payPerHour
    return num;

}

function allWagesFor(employeeObj) {
    let wages = [];
    for (let i = 0; i < employeeObj.timeInEvents.length; i++) {
        wages.push(wagesEarnedOnDate(employeeObj, employeeObj.timeInEvents[i].date))
    }
    let num = wages.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );

    return num;

}

function calculatePayroll(employeeArray) {
    let num;
    let allWages = [];
    employeeArray.forEach(x => allWages.push(allWagesFor(x)))

    num = allWages.reduce((accumulator, currentValue) => accumulator + currentValue,
    0
  )
  return num


}