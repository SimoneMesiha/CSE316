'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR Removing A NEW ITEM TO A TODO LIST

//we need the list of what we're trying to change
export default class Remove_Transaction extends jsTPS_Transaction {
    constructor(initModel, Listitem) {
        super();
        this.model = initModel;
        this.Listitem = Listitem;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.removeItem(this.Listitem);
    }

    undoTransaction() {
        this.model.addItemToCurrentList(this.Listitem);
    }
}