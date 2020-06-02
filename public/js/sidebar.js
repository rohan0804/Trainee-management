function openNav() {
  if ($(window).width() <= 1200) {
    document.getElementById("mysidenav").style.marginLeft = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("collapse").style.display = "none";
  } else {
    document.getElementById("mysidenav").style.marginLeft = "0";
    document.getElementById("main").style.marginLeft = "230px";
    document.getElementById("collapse").style.display = "none";
  }
}
function closeNav() {
  document.getElementById("mysidenav").style.marginLeft = "-230px";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("collapse").style.display = "inline-block";
}
$(window).on("load", function () {
  $(".loader-wrapper").fadeOut("slow");
});
new WOW().init();
