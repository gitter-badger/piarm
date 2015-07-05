/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
**/

let date = new Date();
let datetime = date.getFullYear() +
    '-' + date.getMonth() +
    '-' + date.getDay() +
    ' ' + date.getHours() +
    ':' + date.getMinutes() +
    ':' + date.getSeconds();

export default datetime;