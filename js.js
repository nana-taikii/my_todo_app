const user_name = document.getElementById('user_name');
const create_btn = document.getElementById("create_btn");
const user_pic = document.getElementById("user_profile");
const user_pic_filename = user_pic.src.split("/").pop();
const user_new_pic = document.getElementById("user_pic");
const invalid_notif = document.getElementById("invalid_notif");

const create_panel = document.querySelector(".create_panel");

const back_btns = document.querySelectorAll(".back_btn");
const left_panel = document.querySelector(".left");
const right_panel = document.querySelector(".right");

const task_main_panel = document.querySelector(".task_panel");
const close_task_panel = document.querySelector(".close_task_panel");






//for log_in form
user_new_pic.onchange = () =>{
    user_pic.src = URL.createObjectURL(user_new_pic.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () =>{
        localStorage.setItem("user_profile_pic", reader.result);
    });
    reader.readAsDataURL(user_new_pic.files[0]);
};

create_btn.addEventListener("click", ()=>{
    
    if(user_name.value == ""){
        invalid_notif.style.display = "block";
        invalid_notif.innerHTML = "enter your name";
           
    }
    else{
        invalid_notif.style.display = "none";
        console.log("welcome" + user_name.value);
        save_details(user_name);
        const name = document.getElementById("name");
        const pic = document.querySelector(".user_picture");
        name.innerHTML = user_name.value;
        pic.src = localStorage.getItem("user_profile_pic");
        create_panel.style.display = "block";
 
    };
   
});

//toggling the panel
const right_header = document.querySelector(".right_header");
const left_main_background = document.querySelector(".main_background");
back_btns.forEach((back_button) => {
    back_button.addEventListener("click", () =>{
        left_panel.classList.toggle("active");
        right_panel.classList.toggle("active");
        left_main_background.classList.toggle("active");
        back_button.classList.toggle("active"); 
        right_header.classList.toggle("active");
        
    });
});



//for panel
const add_content_box = document.querySelector(".add_content_box");
add_content_box.addEventListener("click", () =>{
    console.log("okie");
})

let categories = [
    
];

let tasks = [
    
   
];


//display categories
const workplace_div = document.querySelector(".workspace_content");
let selected = categories[0];
const totalCategories = () => {
    categories.forEach((category) => {
    const categories_div = document.createElement("div");
    
    categories_div.classList.add("content_box");
    
    categories_div.innerHTML = ` <div class = "img_container">
                                            <img src="${category.img}" alt="personal" class = "workspace_img">
                                        </div>
                                <h2 class = "workplace_title">${category.title}</h2>`;
    workplace_div.insertBefore(categories_div, add_content_box);  
  

    categories_div.addEventListener("click", () => {
        selected = category;
        displayTask();
     });
   
    
    selected = category;
    totalTask(selected);
    
});   
    
}

//total tasks pending

const totalTask = (category) => {
    const total_no = tasks.filter((task) => task.category.toLowerCase() === selected.title.toLowerCase());
    console.log(total_no.length);
    const left_ul = document.createElement("ul");
    const left_content = document.querySelector(".left_content");
    const left_ul_list = document.querySelector(".left_ul_list");
    const left_li = document.createElement("li");
    left_li.classList.add("display_left_categories");
    left_li.innerHTML = `<div class = "img_circle" id = "circle"><img src="${category.img}" alt="icon"></div><span class = "task_span">${total_no.length}</span>`;

    left_ul_list.prepend(left_ul);
    left_ul.prepend(left_li);
    left_content.appendChild(left_ul_list);

    const new_left_li = document.querySelector(".display_left_categories");
    new_left_li.addEventListener("click", () =>{
        console.log("wawers");
        selected = category;
        
        task_main_panel.style.display = "block";
        displayTask();
        

        const delete_btn = document.querySelector(".left_delete");
        delete_btn.addEventListener("click", () =>{
            const index = categories.findIndex(index_no => index_no.title === selected.title && index_no.img === selected.img);
           
            categories.splice(index, 1);
            saveData();
            tasks = tasks.filter(task => task.category !== selected.title);
            saveData();
            left_li.remove();
            task_main_panel.style.display = "none";
            const targetDiv = document.querySelector(".content_box");
            if(targetDiv && !targetDiv.classList.contains("add_content_box")){
                targetDiv.remove();
            }
            
            display_total_task();
           
        });
    });          
}



const task_span = (category) => {
    const total_no = tasks.filter((task) => task.category.toLowerCase() === selected.title.toLowerCase());
    console.log(total_no.length);
    const span = document.querySelector(".task_span");
    span.innerHTML = total_no.length
}
const display_total_task = () =>{
    const total_task_no = document.querySelector(".total_task");
    total_task_no.innerHTML = `Tasks: ${tasks.length}`;
}


//display tasks per categories

const task_container = document.querySelector(".task_list_container");
const displayTask = () =>{
    task_container.innerHTML = "";
    const task_list = tasks.filter((task) => 
        task.category.toLowerCase() === selected.title.toLowerCase());
    if(task_list.length === 0){
        task_container.innerHTML = "";
    }
    else{
        task_list.forEach((task) => {
        const task_list_container = document.createElement("div");
        task_list_container.classList.add("task_list");
        const task_list_label = document.createElement("label");
        task_list_label.classList.add("task");
        task_list_label.setAttribute("for", task.id);
        const input = document.createElement("input");
        input.classList.add("task");
        input.type = "checkbox";
        input.id = task.id;
        input.checked = task.completed;
        input.addEventListener("change", () =>{
            const index = tasks.findIndex((t) => t.id == task.id);
            tasks[index].completed = !tasks[index].completed;
            saveData();
        })
        task_list_label.innerHTML = `<input type="checkbox" id = 'task' class = 'task'>
                                            <span class = "checkmark"><i class='bx bx-check'></i></span>
                                            <p>${task.task}</p>
                                            <div class="delete">
                                                <i class='bx bx-trash'></i>
                                            </div>`;
        task_list_label.prepend(input);
        task_list_container.prepend(task_list_label);
        task_container.appendChild(task_list_container);

        const delete_task = task_list_container.querySelector(".delete");
        delete_task.addEventListener("click", () =>{
            const index = tasks.findIndex((index_no) => 
            index_no.id == task.id);
            tasks.splice(index, 1);
            console.log(tasks.length);
            saveData();
            task_span();
            display_total_task();
            displayTask();
            });
        });
     };
};
   //add new task inside
   const new_task = document.querySelector(".add_new_task");
   const new_task_btn = document.querySelector(".new_task_btn");
   new_task_btn.addEventListener("click", () =>{
       if(new_task.value == ""){
           new_task.style.border = "2px solid red";
       }
       else{
           new_task.style.border = "2px solid rgba(209,162,230,0.3)";
           const newTask ={
               id:tasks.length+1,
               task:new_task.value,
               category:selected.title,
               completed:false
           };
           tasks.push(newTask);
           display_total_task();
           task_span();
           saveData();
           
       }
       displayTask();
       new_task.value = "";
       
   })


//add new category
const add_category = document.querySelector("#category_name");
const add_category_btn = document.querySelector("#add_btn");
const cancel_category_btn = document.querySelector("#cancel_btn");
const upload_image = document.querySelector("#upload_image");
const old_category_pic = document.querySelector("#new_worksplace_img");
const add_workspace_img = document.querySelector(".add_content_box");
const new_category = document.querySelector(".add_category");
const container_background = document.querySelector(".container_background");


let update_image_src = "";

upload_image.onchange = () =>{
    const reader = new FileReader();
    reader.onload = () =>{
        update_image_src = reader.result;
    }
    reader.readAsDataURL(upload_image.files[0]);
}

const error_notif = document.querySelector(".error_notif");
add_category_btn.addEventListener("click" , () =>{
    console.log(add_category.value);
    if(add_category.value == "" && !upload_image.files[0]){
        error_notif.innerHTML = `<p><i class='bx bx-error-circle'></i>enter details</p>`;
        
    }
    else if(add_category.value == ""){
        error_notif.innerHTML = `<p><i class='bx bx-error-circle'></i>enter caategory name</p>`;
    }
    else if(!upload_image.files[0]){
         error_notif.innerHTML = `<p><i class='bx bx-error-circle'></i>choose image</p>`
    }
    else{
        const newCategory = {
            title:add_category.value,
            img:update_image_src
        }
        categories.push(newCategory);
        const workplace_new_div = document.createElement("div");
        workplace_new_div.classList.add("content_box");
        workplace_new_div.innerHTML = ` <div class = "img_container">
                                            <img src="${update_image_src}" alt="personal" class = "workspace_img">
                                        </div>
                                       <h2 class = "workplace_title">${add_category.value}</h2>`;
        workplace_div.insertBefore(workplace_new_div,add_content_box);
        new_category.style.display = "none";
        container_background.style.display = "none";
        error_notif.innerHTML = "";
        add_category.value = "";
        upload_image.value = "";
        saveData();
        totalTask(newCategory);
        workplace_new_div.addEventListener("click", () => {
            selected = newCategory;
            displayTask();
        });
        const span = document.querySelector(".task_span");
        span.innerHTML = "0";
        
        
    };  
  
});

add_workspace_img.addEventListener("click" , () =>{
    new_category.style.display  = "block";
    container_background.style.display = "block";
    
})
cancel_category_btn.addEventListener("click", () => {
    new_category.style.display = "none";
    container_background.style.display = "none"; 
    error_notif.innerHTML = "";
    add_category.value = "";
    upload_image.value = "";
 
});



//close and open task panel

workplace_div.addEventListener("click", (event) => {
    const targetDiv = event.target.closest(".content_box");
   if(targetDiv && !targetDiv.classList.contains("add_content_box")){
        task_main_panel.style.display = "block";
   }
})
close_task_panel.addEventListener("click", ()=>{
    task_main_panel.style.display = "none";
});









//display tasks
function saveData(){
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function getData(){
    const categories_data = JSON.parse(localStorage.getItem("categories"));
    const tasks_data = JSON.parse(localStorage.getItem("tasks"));
    if(categories_data){
        categories = categories_data;
        console.log(categories);
    }
    if(tasks_data){
        tasks = tasks_data;
        console.log(tasks);
    }
    
}


getData();

document.addEventListener("DOMContentLoaded", () =>{
    const user = localStorage.getItem("user_name");
    const user_profile_pic = localStorage.getItem("user_profile_pic");
    const name = document.getElementById("name");
    const pic = document.querySelector(".user_picture");
    if(user_profile_pic){
        user_pic.src = user_profile_pic;
        console.log("welcome" + user);
        user_name.value = user;
        name.innerHTML = user;
        console.log(user);
        pic.src = user_profile_pic;
    };
});

function save_details(user){
    const name = localStorage.setItem("user_name", user.value);
}


totalCategories();
display_total_task();
displayTask();

