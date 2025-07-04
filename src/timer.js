function showDate() {
    let date = new Date().toLocaleTimeString();
    const interval = setInterval(() => {
      date = new Date().toLocaleTimeString();
      console.log(date);
      console.log(interval);
      document.getElementById("root").innerHTML = date;
    }, 1000);
  }
setTimeout("showDate()", 1000);