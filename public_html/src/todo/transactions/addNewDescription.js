'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR Removing A NEW ITEM TO A TODO LIST

//we need the id of what we're trying to change
export default class addNewDescription extends jsTPS_Transaction {
    constructor(initModel,Listitem, textElement) { // textelement has the input value, description
        super();
        this.model = initModel;
        this.textElement =textElement;
        this.Listitem = Listitem;
        this.oldText = Listitem.getDescription(); // old text
        this.newText = null;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        if(this.newText ===null){
            this.model.EditTransaction(this.Listitem,this.textElement);
        }else{
            this.textElement.value = this.newText;
            this.model.EditTransaction(this.Listitem,this.textElement);
        }
    }

    undoTransaction() {
        this.textElement.value = this.oldText;
        this.newText = this.Listitem.getDescription();
        console.log(this.oldText);
        this.model.EditTransaction(this.Listitem,this.textElement);
        console.log("hello world");

    }
}