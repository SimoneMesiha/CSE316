'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown = function() {
            /* my stuff*/
            let popUpTab = confirm("are you sure you want to delete?")
            if(popUpTab === false){
                return
            }

            
            appModel.removeCurrentList();
        }
        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
        }  

        document.getElementById("close-list-button").onmousedown = function(){
            appModel.view.clearItemsList();
            appModel.view.blackoutButtons();
        }
         document.getElementById("delete-list-button").onmousedown = function(){
            appModel.view.clearItemsList();
            appModel.view.blackoutButtons();
        }
        document.getElementById("add-item-button").onmousedown = function(){
            appModel.view.clearItemsList();
            appModel.view.blackoutButtons();
        }
        document.getElementById("delete-list-button").onmousedown = function(){
            appModel.view.clearItemsList();
            appModel.view.blackoutButtons();
        }
        document.getElementById("delete-list-button").onmousedown = function(){
            appModel.view.clearItemsList();
            appModel.view.blackoutButtons();
        }
         
        
        // document.getElementsByClassName("material-icons").onmousedown = function() {
        //     appModel.removeItem();
        // } 

    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
        //console.log(this.model.toDoList);
    }
}