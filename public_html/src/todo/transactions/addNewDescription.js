'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR Removing A NEW ITEM TO A TODO LIST

//we need the id of what we're trying to change
export default class Remove_Transaction extends jsTPS_Transaction {
    constructor(initModel, oldText, newText, ID) {
        super();
        this.model = initModel;
        this.oldText = oldText;
        this.newText = newText;
        this.ID = ID;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.removeItem(Listitem);
    }

    undoTransaction(Listitem) {
        this.model = this.model.add
    }
}