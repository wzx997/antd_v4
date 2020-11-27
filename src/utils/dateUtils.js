/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export function formatDate(time) {
  if (!time) return ''
  let date = new Date(time)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

//根据生日自动计算年龄
export function getAgeByBirthday(birthday) {
  let returnAge; //返回的数据

  let strBirthdayArr = birthday.split("-");
  if (strBirthdayArr.length < 2) {
    return 0;
  }
  let birthYear = parseInt(strBirthdayArr[0]);
  let birthMonth = parseInt(strBirthdayArr[1]);
  let birthDay = parseInt(strBirthdayArr[2]);

  let d = new Date();
  let nowYear = d.getFullYear();
  let nowMonth = d.getMonth() + 1;
  let nowDay = d.getDate();

  if (nowYear === birthYear) {
    returnAge = 0;//同年 则为0岁
  } else {
    let ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        let dayDiff = nowDay - birthDay;//日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        let monthDiff = nowMonth - birthMonth;//月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge;//返回周岁年龄
}