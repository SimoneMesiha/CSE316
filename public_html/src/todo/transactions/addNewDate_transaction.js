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
        this.oldDate = Listitem.getDueDate; // old text
        this.newDate = null;

    }

    doTransaction() {
        // MAKE A NEW ITEM
        if(this.newDate==null){
        this.model.EditDate(this.Listitem,this.date);
        }else{
            this.dateElement.value = this.newDate;
            this.model.EditDate(this.Listitem,this.date);


        }
    }

    undoTransaction() {
        this.date = this.oldText;
        console.log(this.oldText);
        this.model.EditDate(this.Listitem,this.date);
        console.log("hello world");

    }
}