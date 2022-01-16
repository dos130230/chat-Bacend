
 export default (str) => {
  let date = new Date(str)
  let mnth = ("0" + (date.getMonth() + 1)).slice(-2)
  let day = ("0" + date.getDate()).slice(-2);
  let hours = ("0" + date.getHours()).slice(-2);
  let minut = ("0" + date.getMinutes()).slice(-2);
  let sekund = ("0" + date.getSeconds()).slice(-2);

  let sana = [date.getFullYear(), mnth, day].join("-");
  let vaqat = [hours, minut, sekund].join(":");
  return sana+" | " +vaqat
}




