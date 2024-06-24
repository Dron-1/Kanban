const mainDisplay = document.querySelector('.main-display-area')
const addBtn = document.querySelector('.add-task-btn');
const removeBtn = document.querySelector('.remove-task-btn');
const task_form = document.querySelector('.new-task-form');
const task_status_colors = document.querySelectorAll('.color-selector')
const toolbarColors = document.querySelectorAll('.color') 
const lockClass = 'fa-lock'
const unlockClass = 'fa-lock-open'

let tickets = document.querySelectorAll('.ticket-container')
let addTaskFlag = false;
let removeTaskFlag = false;
let taskId = 1;
let ticket_status_color = 'lightpink' 
let lock_icon_clicked = false;
const colorsList = ['lightblue', 'lightpink','lightgreen', 'black'];
let index = 0;


// || -------- adding toggle add button functionality ------- || 
addBtn.addEventListener('click',( event ) => {
    addTaskFlag = !addTaskFlag;
    if(addTaskFlag) {
        task_form.style.display='flex';
    }
    else{
        task_form.style.display='none';
        document.querySelector('.task-text').value="";
    }
})

// || ------- creating a new ticket using task form ------- || 
task_form.addEventListener('keyup', (event) => {
    if( event.key === 'Shift' ) {
        const task_text = document.querySelector('.task-text');
        createTicketInDOM(task_text.value, ticket_status_color);
        task_text.value="";
        taskId ++;
        task_form.style.display='none';
        addTaskFlag=false;
    }
})


// || ---- colors dynamically gets chosen based on click selection in new task form ---- || 

task_status_colors.forEach(function(currentColorElement){
    currentColorElement.addEventListener('click',() => {
        // remove 'active' class from previously selected div 
        for( let i = 0; i < task_status_colors.length; i++ ) {
            if( task_status_colors[ i ].classList.contains('active') ) {
                task_status_colors[ i ].classList.remove('active')
            }
        }
        // add 'active' class to currently selected color div 
        currentColorElement.classList.add('active');
        ticket_status_color = currentColorElement.classList[0];
    })
})

// || -------- Activating DELETION Mode ------- || 
removeBtn.addEventListener('click', (event) => {
    removeTaskFlag = !removeTaskFlag

    if( removeTaskFlag ) {
        console.log(removeTaskFlag)
        alert("Delete Functionality Activated.");
        removeBtn.title="Disable Delete functionality";
        removeBtn.style.color='red';
        task_form.style.display='none'; // closing the task_form if it is open
    }else{
        removeBtn.style.color='white';
        removeBtn.title="Enable Delete functionality";
    }
})


// // helper functions
function createTicketInDOM( task_value, ticket_status_color) {
    const ticketContainer = document.createElement('div');
    ticketContainer.classList.add('ticket-container');

    const ticketHTMLBody = `<div class="ticket-status-color" style="background-color: ${ticket_status_color}    "></div>
                                <div class="ticket-unique-id">
                                    ${taskId}
                                </div>
                                <div class="ticket-body">
                                    <div class="ticket-text" >
                                        ${task_value}
                                    </div>
                                    <div class="lock-icon">
                                        <i class="fa-solid fa-lock"></i>
                                    </div>                
                            </div>`
                        
    ticketContainer.innerHTML = ticketHTMLBody;
    console.log(ticketContainer) 
    mainDisplay.appendChild(ticketContainer);

    // attaching events
    handleLockClick(ticketContainer)
    handleRemoval(ticketContainer)
    changeTaskStatus(ticketContainer)
    handleFilterColor()
}

// || -------- remove ticket when clicked in DELETION Mode ------- || 
function handleRemoval( currentTicket ) {
    currentTicket.addEventListener('click', (e) => {
        if( removeTaskFlag ) {
            console.log(currentTicket);
            currentTicket.remove()
        }
    })
}

function handleLockClick( currentTicket ) {
    const ticketText = currentTicket.querySelector('.ticket-text')
    const icon = currentTicket.querySelector('.lock-icon').children[0];

    icon.addEventListener('click', () => {
        if( icon.classList.contains(lockClass) ) {
            console.log(" ticket unlocked, ready to be edited")

            icon.classList.remove(lockClass)
            icon.classList.add(unlockClass)
            ticketText.setAttribute('contenteditable',true);        
        } else{
            console.log("ticket locked, can not be edited")
            
            icon.classList.add(lockClass)
            icon.classList.remove(unlockClass)
            ticketText.setAttribute('contenteditable',false)        
        }
    })
}

function changeTaskStatus( currentTicket ) {
    let statusColor = currentTicket.querySelector('div.ticket-status-color')
    statusColor.addEventListener('click', () => {
        let currentColor = statusColor.style.backgroundColor;
        console.log(currentColor);

        let currentColorIdx = colorsList.findIndex(function(color) {
            return color == currentColor
        })

        let newIdx = (currentColorIdx + 1) % colorsList.length;
        statusColor.style.backgroundColor=colorsList[newIdx]
    })    
}

// | ---- filter tickets based on color ---- |
function handleFilterColor() {
    tickets = document.querySelectorAll('.ticket-container');
    toolbarColors.forEach( function(color) {
        color.addEventListener('click', () => {
            const selectedColor = color.classList[0];
            console.log("toolbar selected color: ", selectedColor)
            tickets.forEach(function(ticket) {
                let ticketStatusColor = ticket.querySelector('.ticket-status-color')
                ticketStatusColor = ticketStatusColor.style.backgroundColor;
                console.log(ticketStatusColor); 
                if( ticketStatusColor === selectedColor ) {
                    // color matches , display ticket
                    ticket.style.display = 'flex';
                } else{
                    ticket.style.display = 'none';
                }
            })
        })
        //remove filter if any toolbar color double clicked
        color.addEventListener('dblclick', () => {
            tickets.forEach((ticket) => {
              ticket.style.display = 'flex';  
            })
        })
    } )
}