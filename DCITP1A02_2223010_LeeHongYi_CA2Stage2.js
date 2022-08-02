//Name: Lee Hong Yi
//Class: DCITP/1A/02
//Adm: 2223010
//

/*variable declaration*/
var input = require("readline-sync");
var name = "", menuOption = "", presentTF = "", subMenuOption = "";
var tf ="true", tf2 = "true"; //used as conditions for main-menu and sub-menu
var targetMemberID = 0 ; //used for main-menu option 1/2/4
var rankRuby = [], rankGold = [], rankPlatinum = [] , rankDiamond = [] ; //used for submenu options
/*end of variable declaration*/

/*classes*/
class Member {
    constructor(name, rank, doj, dob, pointsEarned){
        this.name = name;
        this.rank = rank;
        this.doj = doj;
        this.dob = dob;
        this.pointsEarned = pointsEarned; //defines memberobjects
    }
}

class MemberGroup { 
    constructor(){
        this.testSet = [] ;//places members within a array called testSet, created within the object. name here can also be changed to create different groups of members
        this.testSet.push(new Member("Leonardo","Gold", "1 Dec 2019", "1 Jan 1980", "1400"));
        this.testSet.push(new Member("Catherine", "Ruby", "14 Jan 2020", "28 Oct 1985", "250"));
        this.testSet.push(new Member("Luther", "Gold", "29 Apr 2020", "16 Mar 1992", "3350"));
        this.testSet.push(new Member("Bruce", "Diamond", "3 Jun 2020", "18 Mar 1994", "40200"));
        this.testSet.push(new Member("Amy", "Ruby", "5 Jun 2020", "31 May 2000", "500")) ;//remove at end of testing
    }

    memberPrint(id){ // (option 1) used to print member details 
        console.log("\nName: " + this.testSet[id].name);
        console.log("Membership Type: " + this.testSet[id].rank);
        console.log("Date Joined: "+ this.testSet[id].doj);
        console.log("Date of Birth: "+ this.testSet[id].dob);
        console.log("Points Earned: "+ this.testSet[id].pointsEarned);
    }
    
    memberSearch(name){ // (option 2/3/4) used to search for members 
        var id = 0, membertoSearch = "" ;//function variable declaration
        membertoSearch = name;
       for(id = 0 ;  id < this.testSet.length ; id++){ //uses loop to search if input name matches name of member in loop
            if(membertoSearch == this.testSet[id].name){
                targetMemberID = id ;
                return 1 ;
            }
       }
        return 0 ;
    }

    memberAdd(name){ // (option 3) used when adding new members 
    var memAddProve = 0, option3cont = true
    memAddProve = this.memberSearch(newMemberName) 
    do{
        if (memAddProve == 1){  //uses memberSearch function to check if member is present
            do{
                console.log("Member's name exists in database. Please enter new name.");
                var name = memberEnquire()
                memAddProve = this.memberSearch(name)
            }while (memAddProve == 1) //re-prompts user to enter valid member if name is already present in system.
        } else if (memAddProve == 0){ //if member is not present, add member with correct details.
        var dob = input.question("Enter member's date of birth: ");
        var todayDate = "", joinDate = "" ;
        var monthName = ["Jan","Feb", "Mar", "Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; //array used to set join months
        todayDate = new Date() ;// used to set join date
        joinDate += todayDate.getDate() + " " ; 
        joinDate += monthName[todayDate.getMonth()]  + " ";  //concenacates joindate string with date and month.
        joinDate += todayDate.getFullYear() ;//used to set join date to present day
        this.testSet.push(new Member(name, "Ruby", joinDate, dob, "0")) ;//initializes new member 
        option3cont = false
        }
    } while (option3cont) //ensures that user is continiously reprompted until proper name has been input.
    }   

    pointsUpdater(valSpent){ // (option 4) used to add points to member
        var addPoints = 0 ;
        if (valSpent <= 50){ //tree with point values to be added
            addPoints = 10 ;
        } else if (valSpent > 50 && valSpent <= 100){
            addPoints = 50 ;
        } else if (valSpent > 100 && valSpent <= 200){
            addPoints = 100 ;
        } else if (valSpent > 200 && valSpent <= 500){
            addPoints = 200 ;
        } else if (valSpent > 500 && valSpent <= 1000){
            addPoints = 500 ;
        } else if (valSpent > 1000 && valSpent <= 2500){
            addPoints = 1000 ; 
        } else if (valSpent > 2500){
            addPoints = 2000 ;
        }
        return addPoints ; 
    }

    pointIncrementer(){ //(option 4) used to add points, and display updated details.
        var targetMember = memberEnquire();
        var amountSpent = 0, pointsToAdd = 0;
        presentTF = this.memberSearch(targetMember);  //uses memberSearch function to find if member if present in system.
        if(presentTF == 1){ //if member is present, allow for points to be added.
            do{  //repeatedly prompts for amount spent until valid input is entered
                amountSpent = input.question("Please enter amount spent: ") ;
                if(isNaN(amountSpent) == true || amountSpent.length == 0){ //checks if empty string or NaN was input
                    console.log("Please enter valid value.  \n")
                    var option4TF = true
                } else { //if valid input, run program.
                    var option4TF = false
                    pointsToAdd = this.pointsUpdater(amountSpent);  //uses pointsUpdater to determine how many points should be added to the member
                    this.testSet[targetMemberID].pointsEarned = parseInt(this.testSet[targetMemberID].pointsEarned) + pointsToAdd ;//testSet.testSet[targetMemberId].pointsEarned refers to value of points earned by member.
                    console.log("\nAwarded " + pointsToAdd + " points.");
                    console.log("You now have " + this.testSet[targetMemberID].pointsEarned + " points.\n"); // allows member to see how many points they have
                    this.rankValidator() ;
                }
            } while(option4TF)  
        } else { //if member is not present, show error message.
            console.log("Member does not exist.");
        }
    }
    rankValidator(){ //used within pointIncrementer()
        if (this.testSet[targetMemberID].pointsEarned >= 0 && this.testSet[targetMemberID].pointsEarned < 500){ //ifelse tree splits member ranks using point boundaries
            this.testSet[targetMemberID].rank = "Ruby" ;
        } else if (this.testSet[targetMemberID].pointsEarned >= 500 && this.testSet[targetMemberID].pointsEarned < 5000){
            this.testSet[targetMemberID].rank = "Gold" ;
        } else if (this.testSet[targetMemberID].pointsEarned >= 5000 && this.testSet[targetMemberID].pointsEarned < 20000){
            this.testSet[targetMemberID].rank = "Platinum" ;
        } else if (this.testSet[targetMemberID].pointsEarned >= 20000){
            this.testSet[targetMemberID].rank = "Diamond" ;
        }
        console.log("Current rank of member is " + this.testSet[targetMemberID].rank + ".") ;
    }

    memberRemove(targetArr){  //removes specific member from array.
        if (this.testSet.length == 0){ //ensures that no members can be removed if the database is empty
            console.log("There are no members present in the database.") 
        } else { 
            var itemToRemove = multiStringCapitalize(memberEnquire())
            if (this.memberSearch(itemToRemove) == 0){ //if member is not present in database, show error message
                console.log("Member is not present in database. Please try again.")
            } else {
                var targetArrIndex = 0 , tempArray = []
                for (var i = 0 ; i < targetArr.length ; i++){ //identifies the index of the member to be removed
                    if  (itemToRemove == targetArr[i].name){
                        targetArrIndex = i
                    }
                }
            
                for (var e = 0 ; e < targetArrIndex ; e++){ //pushes the members infront of the member to be removed into a new array
                    tempArray.push(targetArr.shift())
                }
            
                targetArr.shift() //removes the specific member
            
                for (var x = (tempArray.length - 1) ; x >= 0 ; x--){ //adds the members back into the original array.
                    targetArr.unshift(tempArray[x])
                }
                console.log("\n"+ itemToRemove + " has been removed from the database.")
                return targetArr
            }
        }
    }   
    

    //submenu functions

    rankScan(){  //scans rank of members and places members into indiviual, rank seperated arrays.
        var rankCheck = "", memberID = 0 ;
        for(memberID = 0 ; memberID < this.testSet.length ; memberID++){  //checks which rank a member is via use of which position they are in the array
            rankCheck = this.testSet[memberID].rank ;
            if (rankCheck == "Ruby"){
                rankRuby.push(memberID) ; //memberID signifies the member's index in the testSet array
            } else if (rankCheck == "Gold"){
                rankGold.push (memberID) ;
            } else if (rankCheck == "Platinum"){
                rankPlatinum.push (memberID) ;
            } else if(rankCheck == "Diamond"){
                rankDiamond.push (memberID) ;
            }
        }
    }


    rankNamePrint(){ // prints members according to rank.
        var sm1tf = true ;
        do{ //this loop checks if the rank entered is one that is valid.
        var inputRank = input.question("Enter Membership Type: ") ;
        inputRank = multiStringCapitalize(inputRank) ;
        if(inputRank == "Ruby" || inputRank =="Gold" || inputRank == "Platinum" || inputRank == "Diamond"){ //checks if the input is equal to one of the 4 ranks
            sm1tf = false ;
        } else { //prints error message if the input is not equivalent to one of the 4 ranks.  
            console.log("Please enter a valid rank. \n") ;
        }
        }while(sm1tf) ; //do-while loop ensures that the program runs at least once

        var i = 0 ;
        var outputString = "Member(s) of membership type \"" ; 
        outputString += inputRank + "\": " ;

        if (inputRank == "Ruby"){ //riding off the arrays created in the rankScan function, the loop adds the names of the members in the rank to the end of the outputstring.
            for(i = 0; i < rankRuby.length; i++){ //adds the name of the members in the rank array to a string which is printed at the end of the function
            outputString += this.testSet[rankRuby[i]].name ;  //adds name of member in rank via their index to the output string
            outputString += ", " ;
            }
        } else if (inputRank == "Gold"){
            for(i = 0; i < rankGold.length; i++){
                outputString += this.testSet[rankGold[i]].name ;
                outputString +=", " ;
                }
        } else if (inputRank == "Platinum"){
            for(i = 0; i < rankPlatinum.length; i++){
                outputString += this.testSet[rankPlatinum[i]].name ;
                outputString +=", " ;
                }
        } else if (inputRank == "Diamond"){
            for(i = 0; i < rankDiamond.length; i++){
                outputString += this.testSet[rankDiamond[i]].name ;
                outputString +=", " ;
                }
        }

        outputString = outputString.slice(0 , outputString.length - 2) ;//cuts the extra " ," from the end of the statement, as there is a extra ", " due to the use of the loop.
        console.log("\n\t"+outputString) ;
        rankRuby = [], rankGold = [], rankPlatinum = [],  rankDiamond = [] ; //reinitalizes rank arrays to prevent stacking 
    }

    dateConverter(ms){
        var TimeNow = new Date() ; //sets date to current time
        var days =  Math.floor((TimeNow - ms)/(1000*60*60*24)) ;//converts date to days
        var years = Math.floor(days/365.25) ;//uses 365.25 to account for leap years
        days = Math.floor(days - years*365.25) ; //obtains the number of days from the remainder.
        return years + " years and " + days + " days old." ;
    }

    memberDurationPrinter(){ //this functions prints the oldest and youngest member, along with their age in years and days. the age logic is also reversed for this function, as JS counts time as ms elapsed from 1/1/1970. hence, the older a member is, the closer their age is to 0.
        var i = 0 ;
        var tempDate = 0 , oldestMs = 0 , youngestMs = -100000000000000000000000, youngestMember = "", oldestMember = "", oldestDays = 0, youngestDays = 0 ;

        oldestMs = Date.now() ; //initalizes oldestMs (Date.parse defines the number of miliseconds elapsed from the input to 1/1/1970.)
        for(i = 0 ; i < this.testSet.length ; i++){ //for loop is used here scan through all members.
            tempDate = Date.parse(this.testSet[i].dob) ;//converts members date of birth into milisecond integer
            if (tempDate < oldestMs){  //if the current age of the member is smaller than that of the current oldest, set the current member's details to the new oldest
                oldestMs = tempDate ;
                oldestDays = this.dateConverter(tempDate) ;
                oldestMember = this.testSet[i].name ;
            }
            if (tempDate > youngestMs){  //if the current age of the member is larger than that of the youngest, set the current member's details to the new youngest.
                youngestMs = tempDate ;
                youngestDays = this.dateConverter(tempDate) ;
                youngestMember = this.testSet[i].name ;
            }
        }

        console.log("\n\tYoungest Member: " + youngestMember + " (" + youngestDays + ")") ;
        console.log("\tOldest Member: " + oldestMember + " (" + oldestDays + ")") ;
    } 

    memberPointPrinter(){ //uses memberID variable to store member's id, then using the id to ident. each member.
        var i = 0, temp = 0, highestPointID = 0, lowestPointID = 0 ;

        for (i = 0 ; i < this.testSet.length ; i++){  //for loop is used here to scan through all members.
            temp = parseInt(this.testSet[i].pointsEarned) ;
            if (parseInt(this.testSet[highestPointID].pointsEarned) < temp){ //if the current member has points higher than that of the current highest,  set as the new highest.
                highestPointID = i ;
            }
            if(parseInt(this.testSet[lowestPointID].pointsEarned) > temp){ //if the current member has points lower than that of the current lowest,  set as the new lowest.
                lowestPointID = i ;
            }
        }
        console.log("\n\tMember with the highest points is " + this.testSet[highestPointID].name +". (Member has "+ this.testSet[highestPointID].pointsEarned + " points)") ;
        console.log("\tMember with the lowest points is " + this.testSet[lowestPointID].name +". (Member has "+ this.testSet[lowestPointID].pointsEarned + " points)") ;
    }

    rankLengthPrint(){
        console.log("\n\tRuby: " + rankRuby.length) ; //uses.length function to find how many members there are in each rank array.
        console.log("\tGold: " + rankGold.length) ;
        console.log("\tPlatinum: " + rankPlatinum.length) ;
        console.log("\tDiamond: " + rankDiamond.length) ;
        rankRuby = [], rankGold = [], rankPlatinum = [],  rankDiamond = [] ; //reinitializes rank arrays to prevent stacking
    }

    rankPointSumPrint(){
        var rubySum = 0, goldSum = 0, platinumSum = 0, diamondSum = 0, i = 0 ;
        for(i = 0 ; i < rankRuby.length ; i++){
            rubySum += parseInt(this.testSet[rankRuby[i]].pointsEarned) ;//adds up all the points earned by members in the rank, using the index to identify who is who.
        }
        for(i = 0 ; i < rankGold.length ; i++){
            goldSum += parseInt(this.testSet[rankGold[i]].pointsEarned) ;
        }
        for(i = 0 ; i < rankPlatinum.length ; i++){
            platinumSum += parseInt(this.testSet[rankPlatinum[i]].pointsEarned) ;
        }
        for(i = 0 ; i < rankDiamond.length ; i++){
            diamondSum += parseInt(this.testSet[rankDiamond[i]].pointsEarned) ;
        }

        console.log("\n\tSum of points in Ruby rank: " + rubySum) ;
        console.log("\tSum of points in Gold rank: " + goldSum) ;
        console.log("\tSum of points in Platinum rank: " + platinumSum) ;
        console.log("\tSum of points in Diamond rank: " + diamondSum) ;
        rankRuby = [], rankGold = [], rankPlatinum = [],  rankDiamond = []  ;//reinitializes rank arrays to prevent stacking
    }

}

/*end of classes*/

/*function declaration*/

function menuPrint(){ //prints main menu
    console.log("\nHi "+ name +", please select your choice:");
    console.log("\t 1. Display all members' information");
    console.log("\t 2. Display member information");
    console.log("\t 3. Add new member");
    console.log("\t 4. Update points earned");
    console.log("\t 5. Statistics");
    console.log("\t 6. Remove member");
    console.log("\t 7. Exit")
    menuOption = input.question("\t >> ");
}

function mainMenuNameInput(){ //checks if name of user is not a empty string
    name = input.question("Please enter your name: ");
    if (name.length == 0){
        console.log("Please enter a valid input.") ;
        return 0 ;
    } 
    return 1 ;
}

function multiStringCapitalize(inputMultiString){ //used to capitalize multiword names.
    var splitString = [], properStringArr = new Array, properString = "" //variable declatation
     
    function stringCapitalize(inputString){ //used to convert strings with irregular capitalization to one w/ proper caps (used in all functions with input.)
        var lowerString = inputString.toLowerCase().slice(1)  //removes the first letter from the string, setting it to small letters.
        var firstLetter = inputString.charAt(0) //takes the first letter from the string
        var upperString = firstLetter.toUpperCase() //turns the first letter to caps
        return upperString + lowerString //returns the string with propercaps
    }
    
    splitString = inputMultiString.split(" ") //generates a array from the input

    for (i = 0 ; i < splitString.length ; i++){ //properly capitalizes the input string word by word
        properStringArr[i] = stringCapitalize(splitString[i]) //uses stringCapitalize to capitalize the words
        properString += properStringArr[i] + " " //adds them to a string
    }

    properString = properString.slice(0, properString.length - 1) //removes the excess string from the end of the output
    return properString 
}

function memberEnquire(){ //asks for name of member , used in memberAdd() and MemberSearch() functions
    var tf3 = false ;
    do{
        var memberAtHand = input.question("\nPlease enter member's name: ");
        memberAtHand = multiStringCapitalize(memberAtHand);
        if (memberAtHand.length == 0){ //checks if the input is a empty string.
            console.log("Please enter a valid input. \n") ;  //prints if member is not found within the database
            tf3 = true ;
        } else { //if the input is not a empty string, allow the program to continue.
            tf3 = false ;
            return memberAtHand ;
        }
    }while (tf3) ; 
}

function subMenuPrint(){ //prints submenus
    console.log("\n\tPlease select an option from the sub-menu:");
    console.log("\t1. Display names of (all) a certain type of members only.");
    console.log("\t2. Display the name of the youngest and oldest member in the system");
    console.log("\t3. Display the name of members with the highest and lowest points earned.");
    console.log("\t4. Display the total number of members in each membership type.");
    console.log("\t5. Display the total points in each membership type.");
    console.log("\t6. Return to main-menu.");
    subMenuOption = input.question("\t >> ");
}
/*end of function declaration*/

/*--------------
--main program--
---------------*/

var testSet = new MemberGroup() ; //opens new membergroup called testSet


/*name input*/
console.log("Welcome to XYZ Membership Loyalty Programme!");
do{
    var mainMenuVeri = mainMenuNameInput() ; //verifies that a proper name is input
}while (mainMenuVeri == 0) ;

    //input tree
    do{ //do-while loop is used to ensure that the menu is printed at least once.
        menuPrint() ; //input validation is included in input tree
         if (isNaN(menuOption) == false){ //checks if input is a number
                if (menuOption == 1){
                    for (var count = 0; count < testSet.testSet.length; count++){ //prints memberdetails 1-by-1
                        testSet.memberPrint(count) ; //prints individual members (selected by member index)
                    }
                } else if (menuOption == 2){
                    presentTF = testSet.memberSearch(memberEnquire()) ; //searches if the member to be added
                    if(presentTF == 1){ //if else tree for verifying if member is present in database
                        testSet.memberPrint(targetMemberID) ; //such a input tree is neccesary here, as the function is also used for menu option 1
                    } else if (presentTF == 0 ){ //if member is not present, the variable is false.
                        console.log("Member does not exist.") ;
                    }
                } else if (menuOption == 3){
                    var newMemberName = memberEnquire() ; //asks for name of member to be added
                    testSet.memberAdd(newMemberName) ; //adds membername with correct details
                } else if(menuOption == 4){
                    testSet.pointIncrementer() ; //uses pointUpdater,pointIncrementer and rankValidator.
                } else if(menuOption == 5){
                    console.clear() //clears console
                    if (testSet.testSet.length == 0){
                        console.log("Database is empty. Statistics unavailable.")
                    } else {
                        do{
                            subMenuPrint() //prints submenu
                            tf2 = true  
                            if(isNaN(subMenuOption) == false){ //checks if the submenu option is a number
                                if (subMenuOption == 1){
                                    testSet.rankScan() //identifies the rank of each member and stores it in a array
                                    testSet.rankNamePrint() //prints the name of members in each rank
                                } else if (subMenuOption == 2){
                                    testSet.memberDurationPrinter() //prints the age of the oldest and youngest members
                                } else if (subMenuOption == 3){
                                    testSet.memberPointPrinter() //prints the members with the highest and lowest points
                                } else if (subMenuOption == 4){
                                    testSet.rankScan() //identifies the rank of each member and stores it in a array
                                    testSet.rankLengthPrint() //prints the number of members in each rank
                                } else if (subMenuOption == 5){
                                    testSet.rankScan() //identifies the rank of each member and stores it in a array
                                    testSet.rankPointSumPrint() //prtins the sum of members in each rank
                                } else if (subMenuOption == 6){
                                    console.log("Returning to main menu.") ;
                                    console.clear() //clears console
                                    tf2 = false ; // used in dowhile loop to check if the submenu should print again.
                                } else { 
                                    console.log("Please enter a valid input. \n")  //prints if submenu input is not between 1 and 6.
                                }
                            } else {
                                console.log("Please enter a valid input. \n")  //prints if submenu input is not a number.
                            }
                        } while(tf2) ;
                    }
                  
                } else if (menuOption == 6){
                    testSet.memberRemove(testSet.testSet)
                } else if (menuOption == 7){
                    console.log("Thank you & goodbye! \n") ; //exit clause
                    tf = false ;
                } else { 
                    console.log("Please enter a valid input. \n")  ;//prints if menu input is not between 1 and 7.
                }
            } else {
                console.log("Please enter a valid input. \n") ; //prints if menu input is not a number
            }
    }while(tf) ;