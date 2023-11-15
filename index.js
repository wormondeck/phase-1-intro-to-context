function createEmployeeRecord(employee) {


    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
     return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecord, event) {
    

    let [date, hour] = event.split(" ");
    let eventObj = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    };
    
    employeeRecord.timeInEvents.push(eventObj)
      return employeeRecord
}


function createTimeOutEvent(employeeRecord, event) {
    
    
    let [date, hour] = event.split(" ");
    let eventObj = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    };
    
    employeeRecord.timeOutEvents.push(eventObj)
        return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
   
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date)
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date)
        

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hours = hoursWorkedOnDate(employeeRecord, date)
    return employeeRecord.payPerHour * hours
}

function calculatePayroll(employeeRecords) {
    
    let totalWages = employeeRecords.reduce((record, memo) => {
        
        return record + allWagesFor(memo)
    }, 0)
    return totalWages;
}

function allWagesFor(employeeRecord) {
    let eligibleDates = employeeRecord.timeInEvents.map(function (event) {
        return event.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        
        return memo + wagesEarnedOnDate(employeeRecord, d)

    }, 0)

    return payable
}
