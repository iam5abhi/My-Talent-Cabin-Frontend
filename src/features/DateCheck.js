export function endDate(timeStamp){
    var date = new Date(timeStamp);
    var year = date.getFullYear();
    var month = date.getMonth()<10?`0${date.getMonth()+1}`:date.getMonth()+1;;
    var dateVal = date.getDate()<10?`0${date.getDate()+1}`:date.getDate()+1;
    var formattedDate = year + '-' + month + '-' + dateVal;

    return formattedDate

}