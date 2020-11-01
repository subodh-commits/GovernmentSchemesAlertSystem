function validation(){
    const firstname=document.getElementById("fname").value;
    const lastname=document.getElementById("lname").value;
    const phonenumber=document.getElementById("pno").value;
    const birthdate=document.getElementById("bday").value;
    const age=document.getElementById("age").value;
    const gender=document.getElementById("gender").value;
    const email=document.getElementById("email").value;
    const address=document.getElementById("address").value;
    const education=document.getElementById("education").value;
    const occupation=document.getElementById("occupation").value;
    const caste=document.getElementById("caste").value;
    const annual=document.getElementById("annual").value;
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;
    const confirm_password=document.getElementById("confpass").value;
    if(firstname==""){
        document.getElementById("fname_error").innerHTML="**Please fill the Field";
        return false;
    }
    if(firstname.length<2||firstname.length>60){
        document.getElementById("fname_error").innerHTML="**length should be greatre than 1 character or less than 60 characters";
        return false;
    }
    if(lastname==""){
        document.getElementById("lname_error").innerHTML="**Please fill the Field";
        return false;
    }
    if(lastname.length<2||lastname.length>60){
        document.getElementById("lname_error").innerHTML="**length should be greatre than 1 character or less than 60 characters";
        return false;
    }
    if(phonenumber==""){
        document.getElementById("phone_error").innerHTML="**Please fill the Field";
        return false;
    }
    if((isNaN(phonenumber))){
        document.getElementById("phone_error").innerHTML="**characters is not allowed in this field";
        return false;
    }
    
    if(phonenumber.length!=10){
        document.getElementById("phone_error").innerHTML="**Invalid phonenumber";
        return false;
    }
    
    if(age==""){
        document.getElementById("age_error").innerHTML="**Please fill the field";
        return false;
    }
    
    if(isNaN(age)){
        document.getElementById("age_error").innerHTML="**characters is not Allowed";
        return false;
    }
    
    if(gender==""){
        document.getElementById("gender_error").innerHTML="**Please Fill the field";
        return false;
    }

    if(email==""){
        document.getElementById("email_error").innerHTML="**Please Fill the field";
        return false;
    }
    
   /* if(email.indexOf("@")<=0){
        document.getElementById("email_error").innerHTML="**@ is at invalid position";
        return false;
    }
   /* if((email.chatAt(email.length-4)!=".")&&((email.chatAt(email.length-3)!="."))){
        document.getElementById("email_error").innerHTML="**. is at invalid position";
        return false;
    }*/
    
     if(address==""){
        document.getElementById("address_error").innerHTML="**Please Fill the field";
        return false;
    }
    
    if(education==""){
        document.getElementById("education_error").innerHTML="**Please Fill the field";
        return false;
    }
    if(occupation==""){
        document.getElementById("occupation_error").innerHTML="**Please Fill the field";
        return false;
    }
    if(caste==""){
        document.getElementById("caste_error").innerHTML="**Please Fill the field";
        return false;
    }
    if(annual==""){
        document.getElementById("annual_error").innerHTML="**Please Fill the field";
        return false;
    }
    if(username==""){
        document.getElementById("username_error").innerHTML="**Please fill the Field";
        return false;
    }
    if(username.length<2||username.length>60){
        document.getElementById("username_error").innerHTML="**length should be greatre than 1 character or less than 60 characters";
        return false;
    }
    if(!isNaN(username)){
        document.getElementById("username_error").innerHTML="**Only Numbers is not Allowed";
        return false;
    }
    if(password==""){
        document.getElementById("password_error").innerHTML="**Please Fill the field";
        return false;
    }
    if(password.length<8||username.length>16){
        document.getElementById("password_error").innerHTML="**length should be greatre than 1 character or less than 60 characters";
        return false;
    }
    if(confirm_password!=password){
        document.getElementById("confpass_error").innerHTML="**Password does not matches to original one";
        return false;
    }
    
    if(confirm_password==""){
        document.getElementById("confpass_error").innerHTML="**Please Fill the field";
        return false;
    }
    
}



