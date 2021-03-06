'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import RemoveNewItem_Transaction from './transactions/RemoveNewItem_Transaction.js'
import addNewDescription from './transactions/addNewDescription.js'
import addNewDate from './transactions/addNewDate_transaction.js'
import addNewSelection from './transactions/addNewSelection.js'
import ArrowUpTrans from './transactions/ArrowUpTransaction.js'
import ArrowDownTrans from './transactions/ArrowDownTransaction.js'



/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.items.push(itemToAdd); //added items
        this.view.viewList(this.currentList); //added 
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
    }

    //RemoveItemTransaction
    RemoveNewItemTransaction(ListItem) {
        let transaction = new RemoveNewItem_Transaction(this, ListItem); //we're passing the model and teh Item that will be removed
        this.tps.addTransaction(transaction);
    }




    //creating a new transaction for text
    ChangeDescriptionTransaction(listItem, text){
                let transaction = new addNewDescription(this, listItem, text); //we're passing the model and teh Item that will be removed
                this.tps.addTransaction(transaction);

    }

    //Methods for addTransacton
    EditTransaction(ListItem,text){
        console.log(ListItem);
        ListItem.setDescription(text.value);
        this.view.viewList(this.currentList);
    }

    //creating new transaction for date
      ChangeDateTransaction(listItem, date){
                let transaction = new addNewDate(this, listItem, date); //we're passing the model and teh Item that will be removed
                this.tps.addTransaction(transaction);
      }

    EditDate(ListItem,dateValue){
    
        //console.log(date);
        ListItem.setDueDate(dateValue);
        this.view.viewList(this.currentList);
    }

    ChangeSelectionTransaction(listItem, selection){
                let transaction = new addNewSelection(this, listItem, selection); //we're passing the model and teh Item that will be removed
                this.tps.addTransaction(transaction);
      }

    EditSelection(ListItem,selection){
    
        //console.log(ListItem);
        ListItem.setStatus(selection);
        this.view.viewList(this.currentList);
    }

    ArrowUpTransaction(ListItem, Index){
                let transaction = new ArrowUpTrans(this, ListItem, Index); //we're passing the model and teh Item that will be removed
                this.tps.addTransaction(transaction);
      }
      ArrowUpTransactionDoer(ListItem, Index){
          if(Index<=0){
              
             return //empty 
         }else{
             let temp = ListItem.items[Index]; /* element on top*/
             ListItem.items[Index] = ListItem.items[Index-1];
             ListItem.items[Index-1] = temp;
             console.log(ListItem.items[0].id);
            this.view.trial(ListItem);
            console.log("Sono nawa Eren Yeager");

         } 
         this.view.viewList(this.currentList);                
      }

    ArrowDownTransaction(ListItem, Index){
                let transaction = new ArrowDownTrans(this, ListItem, Index); //we're passing the model and teh Item that will be removed
                this.tps.addTransaction(transaction);
      }
      ArrowDownTransactionDoer(ListItem, Index){
          if(Index==ListItem.items.length-1){
            return
         }else{
             let temp = ListItem.items[Index]; /* element on top*/
            ListItem.items[Index] = ListItem.items[Index+1];
            ListItem.items[Index+1] = temp;
            
         }                    
         this.view.viewList(this.currentList);                
      }



    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        return newItem;
    }

    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }

    /**
     * Load the items for the listId list into the UI.
     */
    loadList(listId) {
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
            this.view.viewList(this.currentList);
        }
        // console.log("gold");
        // this.view.TopListGold();

        this.view.whiteout();
        
        
    }

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
    }   

    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.toDoLists.splice(indexOfList, 1);
        this.currentList = null;
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
    } 
}