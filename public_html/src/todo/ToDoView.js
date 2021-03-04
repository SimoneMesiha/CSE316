'use strict'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            
        thisController.handleLoadList(newList.id);
            
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {


        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }


    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");
        

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];   
            //
                let everything = document.createElement('div');
                    everything.id = 'todo-list-item-' + listItem.id;
                    everything.className   = 'list-item-card';
                    itemsListDiv.appendChild(everything)
                

                
                 let text = document.createElement('input');
                    text.className   = 'task-col'+ listItem.description;
                    text.id = 'todo-list-item-' + listItem.id;
                    text.type='text';
                    text.value= listItem.description;
                    text.innerHTML = listItem.description;
                    text.description = listItem.description;
                    everything.appendChild(text);


                   text.addEventListener("blur",
                    ()=>{
                    listItem.setDescription(text.value);
                    //console.log(text);
                    this.viewList(list);
                    })

                    


                let date = document.createElement('input');
                    date.className   = 'due-date-col'+ listItem.dueDate;
                    date.id = 'todo-list-item-' + listItem.id;
                    date.type='date';
                    date.value=listItem.dueDate;
                    everything.appendChild(date);

                    date.addEventListener("blur",
                    ()=>{
                    listItem.setDueDate(date.value);
                    //console.log(date);
                    this.viewList(list);
                    })



                 let selection = document.createElement('select');
                    selection.className   = 'status-col' + listItem.status;
                    selection.id = 'complete';
                        let option1 = document.createElement('option');
                        option1.value =0;
                        option1.innerHTML = 'incomplete';
                        

                        let option2 = document.createElement('option');
                        option2.value =1;
                        option2.innerHTML = 'complete';
                        
                        

                    selection.appendChild(option1);
                    selection.appendChild(option2);
                    selection.value = option2.value;
                    selection.id = 'complete';

                everything.appendChild(selection);


                    selection.addEventListener("blur",
                        ()=>{
                        listItem.setStatus(selection.value);
                        console.log(selection.value)
                        //console.log(date);
                        this.viewList(list);
                        })


                let up = document.createElement('button');
                up.innerHTML=('keyboard_arrow_up')
                up.className=('list-item-control material-icons')
                up.id = 'arroUP'+listItem.id
                everything.appendChild(up);
                //css
                




                let down = document.createElement('button');
                down.innerHTML=('keyboard_arrow_down')
                down.className=('list-item-control material-icons')
                down.id = 'arroDOWN'+listItem.id
                everything.appendChild(down);

                let close = document.createElement('button');
                close.innerHTML='close'
                 close.className='list-item-control material-icons';
                 close.id ="KLOSE"+listItem.id ;
                 everything.appendChild(close);

                
        //         let arrowwrapper =document.createElement('button');
        //         arrowwrapper.className='list-controls-col';
        //         itemsListDiv.appendChild(arrowwrapper);

        //         let up = document.createElement('button');
        //         up.className='list-item-control material-icons';
        //         up.id ="arroUP"+listItem.id ;
        //         arrowwrapper.appendChild(up);

        //         up.addEventListener("click",()=>{
        //         if(i==0){
        //         return
        //          }else{
        //     let temp = list.items[i]; /* element on top*/
        //     list.items[i] = list.items[i-1];
        //     list.items[i-1] = temp;
            
        // }                    
        // c.viewList(list); /*rendering the new list so user can see effect */
        // })
    
                

        //         let down = document.createElement('div')
        //         up.className='list-item-control material-icons';
        //         up.id ="arroDOWN"+listItem.id 
        //         arrowwrapper.appendChild(down);

        //         let close = document.createElement('div');
        //         up.className='list-item-control material-icons';
        //         up.id ="KLOSE"+listItem.id ;
        //         arrowwrapper.appendChild(close);
                    
            //
            // let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"

            //                     + "<input type='text' class='task-col'>" + listItem.description +"</input>"
            //                     + "<div class='due-date-col'>" + listItem.dueDate + "</div>"
            //                     + "<select name='complete' id='complete'> ' class='status-col'>" + listItem.status + "<option value='complete'>Complete</option><option value='incomplete'>incomplete</option>"
                                
            //                     +"</select>"



            //                     + "<div class='list-controls-col'>"

            //                     + " <button type='button' class='list-item-control material-icons' id ='arroUP"+listItem.id + "'> keyboard_arrow_up</button>"
                                
            //                     +" <button type='button'class='list-item-control material-icons' id = 'arroDOWN" + listItem.id + "'> keyboard_arrow_down</button>"
                                
            //                     + " <button type = 'button' class='list-item-control material-icons' id = 'KLOSE"+ listItem.id + "'>close</button>"


            //                     + " <div class='list-item-control'></div>"
            //                     + " <div class='list-item-control'></div>"

            //                     + "</div>";

            //let todolistitem = document.createElement("div");
            //listItemElement.appendChild(everything);
            itemsListDiv.appendChild(everything); 
        }






        //this for highlightinh selected
        for(let i = 0; i<this.controller.model.toDoLists.length;i++){ 
            //console.log(this.controller.model.toDoLists[i].id); //how to iterate through left sodebar
            let currSideBar = this.controller.model.toDoLists[i]
            document.getElementById("todo-list-"+currSideBar.id).addEventListener("click",()=>{
                document.getElementById("todo-list-"+currSideBar.id).style.background = "green";
                    //console.log(this.controller.model.toDoLists[i]);
                //this.controller.model.toDoLists[i].style.background = "red";
                this.refreshLists(this.controller.model.toDoLists); //refresh the lists
            })
        }


        //This one is for the input change
        // for(let i =0;i<list.items.length;i++){
        //     let listItem = list.items[i];
        //     document.getElementById("todo-list-item-"+ listItem.id).addEventListener("focus",
        //     ()=>{
        //         listItem.description = listItem.value;
        //         this.viewList(list);
        //     })
        // }
       



        let c = this;
        let s = c.controller.model.currentList.items;


        /**This things does arroUP */
         for(let i = 0; i<list.items.length;i++){
         let listItem = list.items[i];
         document.getElementById("arroUP"+listItem.id).addEventListener("click",()=>{
         if(i==0){
             return
         }else{
             let temp = list.items[i]; /* element on top*/
             list.items[i] = list.items[i-1];
             list.items[i-1] = temp;
            
         }                    
         c.viewList(list); /*rendering the new list so user can see effect */
         })
     }






        

         /**This things does arroDOWN */
         for(let i = 0; i<list.items.length;i++){
         let listItem = list.items[i];
         document.getElementById("arroDOWN"+listItem.id).
         addEventListener("click",()=>{
        if(i==list.items.length-1){
            return
         }else{
             let temp = list.items[i]; /* element on top*/
            list.items[i] = list.items[i+1];
             list.items[i+1] = temp;
            
         }                    
         c.viewList(list); /*rendering the new list so user can see effect */
         })
     }
        
        /**
         * removing using X
          */
        

         /**This things does delete */
         for(let i = 0; i<list.items.length;i++){          //needed to get index
         let listItem = list.items[i];
         document.getElementById("KLOSE"+listItem.id).
         addEventListener("click",()=>{
          
          let s = this.controller.model;

         //list.items.splice(i,1);
         //list.removeItem(listItem);
         s.RemoveNewItemTransaction(listItem);
         c.viewList(list); /*rendering the new list so user can see effect */
         })
         list.items.find
     }

     
    

        
    }

    

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}