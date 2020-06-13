let arr = [];
let lis = document.getElementById("myList").querySelectorAll("li");
let inputBox = document.getElementById("searchicon");

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("performanceAdded");
const myParam2 = urlParams.get("testCreated");
const myParam3 = urlParams.get("emailSend");

for (i = 0; i < lis.length; i++) {
  arr.push(lis[i].textContent.trim());
}

if (myParam === "true") {
  notie.alert({
    position: "bottom",
    time: 3,
    type: "success",
    text: "<h2>Performance Added Successfully</h2>",
  });
  var myNewURL = refineURL();
  window.history.pushState("params removed", "Title", "/" + myNewURL);
}

if (myParam2 === "true") {
  notie.alert({
    position: "bottom",
    time: 3,
    type: "success",
    text: "<h2>Test Created Successfully</h2>",
  });
  var myNewURL = refineURL();
  window.history.pushState("params removed", "Title", "/" + myNewURL);
}

if (myParam3 === "true") {
  notie.alert({
    position: "bottom",
    time: 3,
    type: "success",
    text: "<h2>Mail Send Successfully To All The Trainees</h2>",
  });
  var myNewURL = refineURL();
  window.history.pushState("params removed", "Title", "/" + myNewURL);
}

function refineURL() {
  var currURL = window.location.href;
  var afterDomain = currURL.substring(currURL.lastIndexOf("/") + 1);
  var beforeQueryString = afterDomain.split("?")[0];
  return beforeQueryString;
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
