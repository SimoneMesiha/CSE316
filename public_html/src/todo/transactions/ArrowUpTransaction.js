'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"


export default class ArrowUpTrans extends jsTPS_Transaction {
    constructor(initModel,ListItems, Index) { // date
        super();
        this.model = initModel;
        this.ListItems=ListItems;
        this.NewIndex = Index; //new Index 
        this.oldIndex = ListItems.getIndexOfItem(ListItems[Index]); // old starting index

    }

    doTransaction() {
        // MoveUp
        this.model.ArrowUpTransactionDoer(this.ListItems,this.NewIndex);
    }

    undoTransaction() {
        //Move Down
        this.model.ArrowUpTransactionDoer(this.ListItems,this.NewIndex);
    }
}