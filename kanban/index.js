const mainDisplay = document.querySelector('.main-display-area')
const addBtn = document.querySelector('.add-task-btn');
const removeBtn = document.querySelector('.remove-task-btn');
const task_form = document.querySelector('.new-task-form');
const task_status_colors = document.querySelectorAll('.color-selector')

let addTaskFlag = false;
let removeTaskFlag = false;
let taskId = 1;
let ticket_status_color = 'light-blue' 

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

// || -------- adding remove tikcet from board functionality ------- || 
removeBtn.addEventListener('click', (event) => {
    removeTaskFlag = !removeTaskFlag

    if( removeTaskFlag ) {
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

    const ticketHTMLBody = `<div class="${ticket_status_color}"></div>
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
    mainDisplay.appendChild(ticketContainer);
    // console.log(mainDisplay);
}
