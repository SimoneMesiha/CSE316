'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR Removing A NEW ITEM TO A TODO LIST

//we need the id of what we're trying to change
export default class addNewDate extends jsTPS_Transaction {
    constructor(initModel,Listitem, dateElement) { // date
        super();
        this.model = initModel;
        this.dateElement = dateElement;
        this.Listitem = Listitem;
        this.oldDate = null; // old text
        this.newDate = dateElement;

    }

    doTransaction() {
        // MAKE A NEW ITEM
        if(this.oldDate==null){
        this.oldDate = this.Listitem.getDueDate();    
        this.model.EditDate(this.Listitem,this.newDate);
        }else{
            //this.dateElement.value = this.newDate;
            this.model.EditDate(this.Listitem,this.newDate);


        }
    }

    undoTransaction() {
        //this.date = this.oldDate;
        //console.log(this.oldDate);
        this.model.EditDate(this.Listitem,this.oldDate);
        //console.log("hello world");

    }
}