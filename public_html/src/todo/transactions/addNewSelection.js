'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR Removing A NEW ITEM TO A TODO LIST

//we need the id of what we're trying to change
export default class addnewSelection extends jsTPS_Transaction {
    constructor(initModel,Listitem, selection ) { // textelement has the input value, description
        super();
        this.model = initModel;
        this.Listitem = Listitem;
        this.oldSelection = Listitem.getStatus(); // old text
        this.newSelection = selection;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        //if(this.newSelection ===null){
            console.log("inside doTransaction"+this.newSelection);
            this.model.EditSelection(this.Listitem,this.newSelection);
        //}else{
            //this.selection.value = this.newSelection;
            //this.model.EditSelection(this.Listitem,this.selection);
        //}
        //this.model.viewList(this.model.currentList);
    }

    undoTransaction() {
       //this.selection.value = this.oldSelection;
        //this.newSelection = this.Listitem.getStatus();
        //console.log(this.oldSelection);
        console.log("inside UndoTransaction"+this.oldSelection);
        this.model.EditSelection(this.Listitem,this.oldSelection);
        //console.log("hello world");
        //this.model.viewList(this.model.currentList);


    }
}