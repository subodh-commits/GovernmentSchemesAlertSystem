$(function() {
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 50) {
            $("#navbar").addClass("active_nav");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
           $("#navbar").removeClass("active_nav");
        }
    });
});

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  