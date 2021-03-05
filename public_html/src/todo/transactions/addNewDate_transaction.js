'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR Removing A NEW ITEM TO A TODO LIST

//we need the id of what we're trying to change
export default class addNewDate extends jsTPS_Transaction {
    constructor(initModel,Listitem, date) { // date
        super();
        this.model = initModel;
        this.Listitem = Listitem;
        this.date = date;
        this.oldDate = Listitem.getDueDate; // old text
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.EditTransaction(this.Listitem,this.date);
    }

    undoTransaction() {
        this.date = this.oldText;
        console.log(this.oldText);
        this.model.EditTransaction(this.Listitem,this.date);
        console.log("hello world");

    }
}