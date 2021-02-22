'use strict'

import ToDoModel from './ToDoModel.js'
import ToDoView from './ToDoView.js'
import ToDoController from './ToDoController.js'

export class ToDoTrackerApp {
    constructor() {
        // FIRST MAKE THE APP COMPONENTS
        this.model = new ToDoModel();
        this.view = new ToDoView();
        this.controller = new ToDoController();

        // THE MODEL NEEDS THE VIEW TO NOTIFY IT EVERY TIME DATA CHANGES
        this.model.setView(this.view);

        // THE VIEW NEEDS THE CONTROLLER TO HOOK UP HANDLERS TO ITS CONTROLS
        this.view.setController(this.controller);

        // AND THE CONTROLLER NEEDS TO MODEL TO UPDATE WHEN INTERACTIONS HAPPEN
        this.controller.setModel(this.model);
    }

    /**
     * launch
     * 
     * @param {*} testFile The JSON file containing initial todo lists of data.
     */
    launch(testFile) {
        let xmlhttp = new XMLHttpRequest();
        let modelToUpdate = this.model;
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let json = JSON.parse(this.responseText);

                // GO THROUGH THE DATA AND LOAD IT INTO OUR APP
                for (let i = 0; i < json.lists.length; i++) {
                    let listToAdd = modelToUpdate.addNewList(json.lists[i].name);
                    for (let j = 0; j < json.lists[i].items.length; j++) {
                        let itemData = json.lists[i].items[j];
                        modelToUpdate.addNewItemToList(listToAdd, itemData.description, itemData.due_date, itemData.status);
                    }
                }
            }
        };
        xmlhttp.open("GET", testFile, true);
        xmlhttp.send();
    }
}

window.onload = function() {
    // MAKE THE APP AND LAUNCH IT
    let app = new ToDoTrackerApp();
    app.launch("./src/test/TestToDoLists.json");
}