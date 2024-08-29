const milestonesData = JSON.parse(data).data;

//load course milestones data
function loadMilestones() {
    const milestones = document.querySelector('.milestones');
    milestones.innerHTML = `${milestonesData.map(function (milestone) {
        return ` <div class="milestone border-b" id= "${milestone._id}">
 <div class="flex">
   <div class="checkbox"><input type="checkbox" onclick = "markMilestone(this, ${milestone._id})" /></div>
   <div onclick = "openMilestone(this, ${milestone._id})" >
     <p>
       ${milestone.name}
       <span><i class="fas fa-chevron-down"></i></span>
     </p>
   </div>
 </div>
 <div class="hidden_panel">
${milestone.modules.map(function (module) {
            return `<div class="module border-b">
                <p>   ${module.name}</p>
              </div>`;
        }).join(" ")};
 </div>
</div>`;

    }).join(' ')}`;

}


// for showing hidden panel

function openMilestone(milestoneElement, id) {

    const currentPanel = milestoneElement.parentNode.nextElementSibling;

    const shownPanel = document.querySelector('.show');
    const active = document.querySelector(".active");



    //first remove previous active class if any other than the clicked one
    if (active && !milestoneElement.classList.contains('active')) {
        active.classList.remove("active");

    }

    milestoneElement.classList.toggle('active');




    // .contain checks if the show class is availabe or not

    if (!currentPanel.classList.contains('show') && shownPanel)
        shownPanel.classList.remove('show');


    currentPanel.classList.toggle('show');


    showMilestone(id);

}

function showMilestone(id) {
    const milestoneImage = document.querySelector(".milestoneImage");
    const name = document.querySelector(".title");
    const details = document.querySelector(".details");


    milestoneImage.style.opacity = "0";
    milestoneImage.src = milestonesData[id].image;
    name.innerText = milestonesData[id].name;
    details.innerText = milestonesData[id].description;


}

// for image trsnsitiom

const milestoneImage = document.querySelector(".milestoneImage");

milestoneImage.onload = function () {
    this.style.opacity = "1";
};

function markMilestone(checkbox, id) {
    const doneList = document.querySelector(".doneList");
    const milestonesList = document.querySelector(".milestones");
    const item = document.getElementById(id);

    if (checkbox.checked) {
        // Mark as done
        milestonesList.removeChild(item);
        doneList.appendChild(item);

        // Sort the doneList after adding the item
        sortList(doneList);
    } else {
        // Move back to the main list
        doneList.removeChild(item);
        milestonesList.appendChild(item);

        // Sort the milestonesList after adding the item
        sortList(milestonesList);
    }
}

// Function to sort the list by ID
function sortList(list) {
    
    // Convert HTMLCollection to an array
    const itemsArray = Array.from(list.children);

    itemsArray.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    // Reattach sorted elements to the list
    itemsArray.forEach(item => list.appendChild(item));
}

loadMilestones();