let arr = [];
let lis = document.getElementById("myList").querySelectorAll("li");
let inputBox = document.getElementById("searchicon");
for (i = 0; i < lis.length; i++) {
  arr.push(lis[i].textContent.trim());
}

inputBox.onkeyup = () => {
  let inputValue = document.getElementById("searchicon").value;
  let query = inputValue.toLowerCase();
  query = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  let queryRegExp = new RegExp("^" + query, "i");
  let results = arr.filter((item) => {
    return queryRegExp.test(item);
  });

  if (results.length > 0) {
    document.getElementById("card").innerHTML = "";
  } else {
    return;
  }
  results.forEach((item) => {
    let x = item.indexOf(query);
    if (x > -1) {
      // let re = new RegExp(query, "g");
      item = item.replace(
        query,
        "<span style='background-color:yellow;font-weight:600;color:black'>" +
          query +
          "</span>"
      );
    }
    $("#card").append(
      "<li style='font-size: larger;'>" +
        "<a href='javascript:void(0);' title='Lazaro Roan'>" +
        item +
        "</a>" +
        "</li>"
    );
  });
};
function searchBar() {
  var element = document.getElementById("searchicon");
  var cname = element.className;
  if (cname == "disp-none") {
    element.classList.remove("disp-none");
    element.classList.add("disp-block");
  }
  if (cname == "disp-block") {
    element.classList.remove("disp-block");
    element.classList.add("disp-none");
  }
}
