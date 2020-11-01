function education() {
  var cards=document.querySelectorAll("#card_education");
  var checkBox = document.getElementById("education");
  var text = document.querySelectorAll("#card_education");
  var username=document.querySelector("#user").innerHTML;
  for(var i=0;i<cards.length;i++){
    cards[i].style.visibility="hidden";
  }
  
 if (checkBox.checked == true) {
  fetch(`/api/register/education/${username}`)
  .then(response => response.json()) 
    .then(json => { 
         //alert(json.data.username);
         const user=json.data;
          for (var i = 0; i <user.schemeDetails.length ;i++) {
            switch (i) {
              case 0:
                document.querySelectorAll(".card-title")[i].innerHTML=user.schemeDetails[i].schemeName;
                document.querySelectorAll(".card-text")[i].innerHTML=user.schemeDetails[i].schemeInfo;
                text[i].style.visibility = "visible";
                document.querySelectorAll(".card")[i].addEventListener("click", function(){
                  var name=user.schemeDetails[0].schemeName;
                  window.location.href='http://serene-badlands-53690.herokuapp.com/'+name; 
                })
                break;
              case 1:
                document.querySelectorAll(".card-title")[i].innerHTML=user.schemeDetails[i].schemeName;
                document.querySelectorAll(".card-text")[i].innerHTML=user.schemeDetails[i].schemeInfo;
                text[i].style.visibility = "visible";
                document.querySelectorAll(".card")[i].addEventListener("click", function(){
                  var name=user.schemeDetails[1].schemeName;
                  window.location.href='http://serene-badlands-53690.herokuapp.com/'+name; 
                })
                break;
                
              case 2:
                  document.querySelectorAll(".card-title")[i].innerHTML=user.schemeDetails[i].schemeName;
                  document.querySelectorAll(".card-text")[i].innerHTML=user.schemeDetails[i].schemeInfo;
                  text[i].style.visibility = "visible";
                  document.querySelectorAll(".card")[i].addEventListener("click", function(){
                    var name=user.schemeDetails[2].schemeName;
                    window.location.href='http://serene-badlands-53690.herokuapp.com/'+name; 
                  })
                break;
              case 3:
                document.querySelectorAll(".card-title")[i].innerHTML=user.schemeDetails[i].schemeName;
                document.querySelectorAll(".card-text")[i].innerHTML=user.schemeDetails[i].schemeInfo;
                text[i].style.visibility = "visible";
                document.querySelectorAll(".card")[i].addEventListener("click", function(){
                  var name=user.schemeDetails[3].schemeName;
                  window.location.href='http://serene-badlands-53690.herokuapp.com/'+name; 
                })
                break;
              case 4:
                document.querySelectorAll(".card-title")[i].innerHTML=user.schemeDetails[i].schemeName;
                document.querySelectorAll(".card-text")[i].innerHTML=user.schemeDetails[i].schemeInfo;
                text[i].style.visibility = "visible";
                document.querySelectorAll(".card")[i].addEventListener("click", function(){
                  var name=user.schemeDetails[4].schemeName;
                  window.location.href='http://serene-badlands-53690.herokuapp.com/'+name; 
                })
                break;
              
            }
      
          }

     
        
     
      
    })
  }
  
}


