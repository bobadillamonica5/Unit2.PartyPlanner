// Skeleton
    // body
        // div
            // ul - name
                // li dates, description, etc
        // button

// rendor
    // get parties
    // rendor parties

// retrieve parties data (GET)

// add parties (POST)

// remove parties (DELETE)

const state = {
    parties: []
}

const partyContainer = document.querySelector('#party-list');

async function getParties(){
    try {

        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events');
        const json = await response.json();
        state.parties = json.data;
        console.log('parties array in state: ', state.parties)    

    } catch(err) {

        document.querySelector('body').append('error please try again later'); 
    }
}

async function rendor() {
    await getParties();
    rendorParties();
}

function renderParty(){
    const partyDiv = document.createElement('div');
    partyDiv.innerHTML = `
        <ul>Name: ${state.parties.name} </li>
        <li>Date & Time: ${state.parties.date} </li>
        <li>Location: ${state.parties.location} </li>
        <li>Description: ${state.parties.description} </li>
        <button type="button" class="delete-button">Delete</button>
        </ul>`;
    return partyDiv;
}

function rendorParties(){
    
    partyContainer.innerHTML = '';

    if (state.parties.length === 0){
        const sorryDiv = document.createElement('div');
        sorryDiv.innerHTML = "<div>Sorry, no parties :( </div>";
        partyContainer.append(sorryDiv);
    } else {
        const partyDivCreator = state.parties.map(renderParty);
        partyContainer.append(...partyDivCreator)
}
}

rendor();


const form = document.querySelector("form");
form.addEventListener('submit', addParty);

async function addParty(event){

    event.preventDefault();
    
    try {
        const nameFieldValue = document.querySelector("#name").value;
        const descriptionFieldValue = document.querySelector("#description").value;
        const locationFieldValue = document.querySelector("#location").value;
        const dateFieldValue = new Date(document.getElementById("date").value).toISOString();
        
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: nameFieldValue,
                date: dateFieldValue,
                location: locationFieldValue,
                description: descriptionFieldValue
            })
        })

    if (!response.ok) {
        throw new Error("Failed to add party");
      }

    rendor();
      
    } catch (error) {
      console.error(error);

    }
}

// };

async function deleteParties(id) {
    try {
        await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events${id}`, {
            method: 'DELETE',
        });
    } catch (err) {
        console.log(err);
    }
}

const deleteBtn = document.querySelector('.delete-button');
deleteBtn.addEventListener('click', async function(){
    await deleteParties(id);
})

// Questions:
    // Why are some async and others not? Have