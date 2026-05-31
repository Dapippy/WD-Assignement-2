//function to validate registration form
function regValidate(){
    var userID = $("#userID").val();
    var email = $("#uEmail").val();
    var phone = $("#uPhone").val();

    //registration form exclusive variables
    var pwd1 = $("#pwd1").val();
    var pwd2 = $("#pwd2").val();
    var genm = $("#rbMale").prop("checked");
    var genf = $("#rbFemale").prop("checked");
    var gennb = $("#rbNB").prop("checked");
    var dtvegan = $("#dtvegan").prop("checked");
    var dtvegetarian = $("#dtvegatarian").prop("checked");
    var dthalal = $("#dthalal").prop("checked");
    var dtgluten = $("#dtgluten").prop("checked");
    var dtnone = $("#dtnone").prop("checked");
    var uctry = $("#uctry").val();

    //error variables
    var errMsg = "";
    var result = true;
    var pattern = /^[a-zA-Z0-9\_]+$/;
    var patternNum = /^[0-9]+$/;
    var patternPass = /^[a-zA-Z0-9]+$/;

    //error rules
    //rule 1. all required variables must be filled in
    if(userID == ""){
        errMsg += "<li>User Name must be filled in</li>";
    }

    if (pwd1 == ""){
        errMsg += "<li>Password must be filled in</li>";
    }

    if (pwd2 == ""){
        errMsg += "<li>Confirm Password must be filled in</li>";
    }

    if (email == ""){
        errMsg +="<li>Email Adress must be filled in</li>";
    }

    if (phone == ""){
        errMsg += "<li>Phone Number must be filled in</li>";
    }

    if((!genf) && (!genm) && (!gennb)){
        errMsg += "<li>Gender must be selected</li>";
    }

    if ((!dtgluten) && (!dthalal) && (!dtnone) && (!dtvegan) && (!dtvegetarian)){
        errMsg += "<li>Dietary Preference must be set</li>";
    }

    if (uctry == "none"){
        errMsg += "<li>Region must be selected</li>";
    }

    //rule 2. check if values are in correct format 

    if (! userID.match(pattern)){
        errMsg += "<li>Name must not contain any symbols other than undeerscores</li>";
    }

    if(userID.length < 5){
        errMsg += "<li>User Name must be 5 characters or more</li>";
    }

    if ((pwd1 == pwd1.toUpperCase()) || (pwd1 == pwd1.toLowerCase())){
        errMsg += "<li>Password must contain both upper and lower case letters</li>";
    }

    if (pwd1.match(patternPass)){
        errMsg += "<li>Password must contains numbers, letters and symbols</li>";
    }

    if (email.indexOf('@') == 0){
        errMsg += "<li>Email must not start with @</li>";
    }

    if (email.indexOf('@') < 0){
        errMsg += "<li>Email must contain @symbol</li>";
    }

    if (!phone.match(patternNum)){
        errMsg += "<li>Phone number must contain numbers only</li>";
    }

    if ((phone.length < 8) || (phone.length > 15)){
        errMsg += "<li>Phone number must be 8-15 digits long</li>";
    }


    //rule 3. Passwords must match

    if (pwd1 != pwd2){
        errMsg += "<li>Passwords must match</li>";
    }
    
    //Display error message in pop up window
    //turns error message into html code for and overlay and popup 
    if (errMsg != ""){
        errMsg = "<div id='scrnOverlay'></div>"
                + "<section id='errWin' class='window'><ul>"
                + errMsg
                +"</ul><a href='#' id='errBtn' class='button'>Close</a></section>";

        //turns number of lines in error message into a variable to use to determine the top margin for the window
        var numOfItems = ((errMsg.match(/<li>/g)).length) + 6;

        //writes error message as html in body and sets up css for overlay and window
        $("body").after(errMsg);
        $("#scrnOverlay").css('visibility', 'visible');
        $("#errWin").css('height', numOfItems.toString() + 'em');
        $("#errWin").css('margin-top', (numOfItems/-2).toString() + 'em');
        $("#errWin").show();
        $("#errBtn").click(function() {
            $("#scrnOverlay").remove();
            $("#errWin").remove();
        });
        
        result = false;
    }

    return result;
}

//function to validate reservation form
function resValidate(){
    //get values inputted in the forms
    var userID = $("#userID").val();
    var email = $("#uEmail").val();
    var phone = $("#uPhone").val();
    
    //reservation page exclusive variables

    var restrnt = $("#resSelect").val();
    var date = $("#resdate").val();
    var hour = $("#resHour").val();
    var min = $("#resMin").val();
    var period = $("#halfday").val();
    var people = $("#resPeople").val();
    var rbvouch = $("#rbvouch").prop("checked");
    var rbcredit = $("#rbcredit").prop("checked");
    var credit = $("#credit").val();
    var cbsame = $("#samecheck").prop("checked");
    var billEmail = $("#billEmail").val();
    var depoNum  = $("#paydepo").val();
    var vouch = $("#vouch").val();

    //error variables
    var errMsg = "";
    var result = true;
    var pattern = /^[a-zA-Z ]+$/;
    var patternNum = /^[0-9]+$/;
    var patternDate = /^([0-9][0-9])\/(0[1-9]|1[0-2])\/([0-9][0-9])+$/;
    
    //gets current date 
    var curDate = new Date();

    //error rules
    //rule 1. all required variables must be filled in
    if(userID == ""){
        errMsg += "<li>Name must be filled in</li>";
    }

    if (email == ""){
        errMsg +="<li>Email Adress must be filled in</li>";
    }

    if (phone == ""){
        errMsg += "<li>Phone Number must be filled in</li>";
    }

    if (restrnt == "none"){
        errMsg += "<li>restaurant must be selected</li>";
    }

    if (date == ""){
        errMsg += "<li>Date must be filled in</li>";
    }

    if (hour == ""){
        errMsg += "<li>Reservation Hour must be filled in</li>";
    }

    if (min == ""){
        errMsg += "<li>Reservation Minutes must be filled in</li>";
    }

    if (period == ""){
        errMsg += "<li>AM or PM must be filled in</li>";
    }

    if (people == ""){
        errMsg += "<li>Number of people must be filled in</li>";
    }

    if (depoNum == ""){
        errMsg += "<li>Deposit amount must be filled in</li>";
    }
    if ((!rbcredit) && (!rbvouch)){
        errMsg += "<li>Payment method must be selected</li>";
    }
    //checks whether credit card or voucher is the payment method and then does the errors checks for whichever is picked
    if (rbcredit){
        if (credit == ""){
            errMsg += "<li>Payment information must be filled in</li>";
        }
        //makes sure credit is eith 15 to 16 characters long
        if ((credit.length < 15) || (credit.length > 16)){
            errMsg += "<li>Card number must be 15-16 digits long</li>";
        }
    } else if (rbvouch){
        if (vouch == ""){
            errMsg += "<li>Voucher code must be filled in</li>";
        }
        //checks if voucher is not 12 characters long
        if (vouch.length != 12){
            errMsg += "<li>Voucher code must be 12 digits</li>";
        }
    }

    

    //rule 2. check if email and phone numbers are in correct format
    if (email.indexOf('@') == 0){
        errMsg += "<li>Email must not start with @</li>";
    }

    if (email.indexOf('@') < 0){
        errMsg += "<li>Email must contain @symbol</li>";
    }

    if (!phone.match(patternNum)){
        errMsg += "<li>Phone number must contain numbers only</li>";
    }

    if ((phone.length < 10)){
        errMsg += "<li>Phone number must at least be 10 digits long</li>";
    }

    if (!date.match(patternDate)){
        errMsg += "<li>Date must be in format dd/mm/yy</li>";
    } 

    if (!people.match(patternNum)){
        errMsg += "<li>Number of people must be in digits only</li>";
    }

    if (people == 0) {
        errMsg += "<li>number of people must be more than 0</li>";
    }

    if (people > 10){
        errMsg += "<li>Number of people must not exceed 10</li>";
    }

    if (!depoNum.match(patternNum)){
        errMsg += "<li>deposit amount must be in numbers only</li>";
    }

    
    //rule 3. check if username is only letters and spaces

    if (! userID.match(pattern)){
        errMsg += "<li>Name must not contain any symbols</li>";
    }

    //rule 4. rearrange date to work for the script
    //checks if date matches pattern 
    if (date.match(patternDate)){
        //if it does it then turns it into an array and rearranges it to use to make new date object for further validating
        var datearr = date.split("/");
        //turns the year part of the date from 2 digits to 4 e.g '26' -> '2026'
        datearr[2] = "20" + datearr[2];
        var newDate = new Date(`${datearr[1]}/${datearr[0]}/${datearr[2]}`);

        //checks if date is valid
        //checks if month selected is febuary 
        if (datearr[1] == "02"){
            //checks if year inputed is a leap year
            if (datearr[2] % 4 === 0){
                //if yes then check if the day is greater 29
                if (datearr[0] > 29){
                    errMsg += "<li>Please enter a valid date</li>";
                }
            } else{
                //if no check if the day is greater than 28 
                if (datearr[0] > 28){
                    errMsg += "<li>Please enter a valid date</li>";
                }
            }
            //else check if the month is one that has only 30 days in it 
        } else if (datearr[1].match(/^[04|06|09|11]+$/)){
            if (datearr[0] > 30){
                //check if the day is greater than 30 and add to error message if it is
                errMsg += "<li>Please enter a valid date</li>";
            }
        } else {
            //else only check if it's greater than 31
            if (datearr[0] > 31){
                errMsg += "<li>Please enter a valid date</li>";
            }
        }

        //checks if the date object made from the inputed date is before the current date and returns an error if it is
        if (newDate < curDate){
            errMsg += "<li>Reservation date must be set in the future</li>";
        }
    }

    //checks if cbsame is true and sets billing email to the same as email if it is
    if (cbsame){
        $("#billEmail").val((function(){
            return email;
        }));
    } else {
        //if cbsame isn't true check billing email's value the same as the other email
        if (billEmail == ""){
            errMsg += "<li>Enter Billing Email</li>";
        }
        if (billEmail.indexOf('@') == 0){
            errMsg += "<li>Billing Email must not start with @</li>";
        }

        if (billEmail.indexOf('@') < 0){
            errMsg += "<li>Billing Email must contain @symbol</li>";
        }
    }

    //Display error message in pop up window
    if (errMsg != ""){
        errMsg = "<div id='scrnOverlay'></div>"
                + "<section id='errWin' class='window'><ul>"
                + errMsg
                +"</ul><a href='#' id='errBtn' class='button'>Close</a></section>";
        // gets the number of lines errMsg is and adds 9 to it so it doesn't cut of the close button
        var numOfItems = ((errMsg.match(/<li>/g)).length) + 9;

        //writes errMsg as html at the top of body
        $("body").after(errMsg);
        //sets up css for overlay and window 
        $("#scrnOverlay").css('visibility', 'visible');
        $("#errWin").css('height', numOfItems.toString() + 'em');
        $("#errWin").css('margin-top', (numOfItems/-2).toString() + 'em');
        $("#errWin").show();
        //sets up error button to close error window and overlay when pressed
        $("#errBtn").click(function() {
            $("#scrnOverlay").remove();
            $("#errWin").remove();
        });
        
        result = false;
    }
    //returns result to say that there are errors
    return result;
}

//function for toggling the billing email text input
function sameEmail(){
    //checks if same check is checked
    if ($(this).prop("checked")){
        //hides billing email text input if true
        $("#bill").hide();
    } else {
        //shows billing email textbox and resets it's value if false
        $("#bill").show();
        $("#billEmail").val((function(){
            return "";
        }));
    }
}

//function to hide and show payment textboxes 
function togglePay(){

    //gets both radio buttons checked values
    var rbcredit = $("#rbcredit").prop("checked");
    var rbvouch = $("#rbvouch").prop("checked");

    //checks if any of them are checked
    if (rbcredit){
        //makes creditinput visible and voucher input invisible
        $("#creditinput").show();
        $("#vouchinput").hide();
    } else if (rbvouch){
        //makes voucher invisible and credit visible
        $("#creditinput").hide();
        $("#vouchinput").show();
    }
    
}

//function to collapse restaurant info
function toggle(){
    //gets the elements parent's parent element and collapses it
    $(this).parent().parent().next().slideToggle();

    //checks if collapse button text is '[-]' and changes to '[+]' and vice versa
    if ($(this).html() == "[-]"){
        $(this).html("[+]");
    } else {
        $(this).html("[-]");
    }
}

//function for unchecking every dietary preference when 'Any' is selected
function toggleDietAll(){
    //checks if dtnone is checked
    if ($("#dtnone").prop("checked")){
        //if true then uncheck every other checkbox for diet
        $('#dtvegan').prop('checked', false);
        $('#dtgluten').prop('checked', false);
        $('#dtvegetarian').prop('checked', false);
        $('#dthalal').prop('checked', false);
    }
    
}

//function for searching through restaurants, couldn't get this working
function recommend(){
    //gets dietary preferances
    var dtNone = $("#dtnone").prop("checked");
    var dtVegan = $('#dtvegan').prop('checked');
    var dtGluten = $('#dtgluten').prop('checked');
    var dtVegetarian = $('#dtvegetarian').prop('checked');
    var dtHalal = $('#dthalal').prop('checked');

    //gets budget
    var rb$250 = $("#rb$250").prop("checked");
    var rb$500 = $("#rb$500").prop("checked");
    var rb$750 = $("#rb$750").prop("checked");
    var rb$250 = $("#rb$1000").prop("checked");
    var rbnone = $("#none").prop("checked");

    //gets dining purpose
    var cbFamily = $("#cbFamily").prop("checked");
    var cbHoliday = $("#cbTravel").prop("checked");
    var cbWork = $("#cbBusiness").prop("checked");
    var cbDate = $("#cbDate").prop("checked");
    
    //tried making placeholder loop to make every object of class ser visible since I don't have time to make a working search but I can't even get that to work :(
    $(".ser").each(css('visibility', 'visible'));
    
    //structure for what I wanted to loop to be, starting by making lists of all the elements checked then loopin to search through each restaurant's data attributes but I can't be bother to spend multiple hours on this right now
    /*var diet = []
    for (var i = 0; i < $("#seachList").child().length ; i++){
        if ()
    }*/
}

//initialise function
function init(){
    //gets these elements to call functions when their value is changed
    $("#rbvouch").change(togglePay);
    $("#rbcredit").change(togglePay);
    $("#samecheck").change(sameEmail);
    $(".collapse").click(toggle);
    $(".diet").change(toggleDietAll);
    $("#recSearch").click(recommend);
    
    //gets the form elements to call their respective validate functions when their submit button is clicked
    $("#regForm").submit(regValidate);
    $("#resForm").submit(resValidate);
    
}
//loads init when website is loaded
$(document).ready(init);