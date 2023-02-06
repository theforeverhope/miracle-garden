/**
  * 生成随机数 [min, max)
  * @param {*} min 随机数最小值
  * @param {*} max 随机数最大值
  * @param {*} times 随机数是times的倍数
  */
export function random(min, max, times = 1) {
  const num = Math.floor(Math.random() * (max - min) + min);
  return (num % times) + num;
}

/**
 * 角度值转弧度值
 * @param {*} n 角度值
 */
export function degreeToRadian(n) {
  return n * Math.PI / 180;
}

/**
 * 生成随机颜色
 */
export function randomColor() {
  return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 1)`;
}

/**
 * 颜色添加透明度
 */
export function getColorWithOpacity(color, opacity) {
  if (/rgba/.test(color)  || /rgb/.test(color)) {
    let cMatch = color.match(/((?<=(rgba\())|(?<=(rgb\())).*(?=(\)))/)[0];
    let cArr = cMatch.split(",");
    return `rgba(${+cArr[0] || random(0, 255)}, ${+cArr[1] || random(0, 255)}, ${+cArr[2] || random(0, 255)}, ${opacity})`
  }
  return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 1)`;
}

/**
 * 
 */

/**
 * 生成随机ID
 */
export function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}