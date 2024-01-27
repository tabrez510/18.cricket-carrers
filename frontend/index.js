const axiosInstance = axios.create({
    baseURL : 'http://localhost:3000/api'
});

async function handleFormSubmit (event) {
    event.preventDefault();


    const formData = new FormData(event.target);

    const obj = {};

    formData.forEach((value, key) => {
        obj[key] = value;
    });

    try {
        const res = await axiosInstance.post('/career', obj);
        
        document.getElementById('name').value = '';
        document.getElementById('dob').value = '';
        document.getElementById('imageUrl').value = '';
        document.getElementById('birthPlace').value = '';
        document.getElementById('careerDesc').value = '';
        document.getElementById('matches').value = '';
        document.getElementById('score').value = '';
        document.getElementById('fifties').value = '';
        document.getElementById('centuries').value = '';
        document.getElementById('wickets').value = '';
        document.getElementById('average').value = '';
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
}


async function handleSearch(event) {
    event.preventDefault();
    const searchValue = document.getElementById('search-player').value;
    try {
        const players = await axiosInstance.get('/career');
        const result = players.data.filter ((player) => {
            return player.name.toLowerCase() === searchValue.toLowerCase();
        })
        showPlayer(result);

        document.getElementById('search-player').value = '';

        scrollToSection('player-container');
    } catch(err) {
        console.log(err);
        alert(err.message);
    }
}

function showPlayer (players) {
    const playerContainer = document.querySelector('.player-container');
    playerContainer.innerHTML = ''; // Clear existing content

    players.forEach((value, index) => {
        if(index==0) {
            playerContainer.innerHTML = getHTML(value)
        } else {
            playerContainer.innerHTML += getHTML(value)
        }
    })
}

async function editPlayer(id, event){
    try {
        const player = await axiosInstance.get(`/career/${id}`);
        
        scrollToSection('playerinfo-form');

        document.getElementById('name').value = player.data.name;
        document.getElementById('dob').value = player.data.dob;
        document.getElementById('imageUrl').value = player.data.imageUrl;
        document.getElementById('birthPlace').value = player.data.birthPlace;
        document.getElementById('careerDesc').value = player.data.careerDesc;
        document.getElementById('matches').value = player.data.matches;
        document.getElementById('score').value = player.data.score;
        document.getElementById('fifties').value = player.data.fifties;
        document.getElementById('centuries').value = player.data.centuries;
        document.getElementById('wickets').value = player.data.wickets;
        document.getElementById('average').value = player.data.average;

        document.getElementById('submit').style.display = 'none';
        const update = document.getElementById('update')
        update.style.display = 'block';

        update.addEventListener('click', async() => {
            const name = document.getElementById('name').value;
            const dob = document.getElementById('dob').value;
            const imageUrl = document.getElementById('imageUrl').value;
            const birthPlace = document.getElementById('birthPlace').value;
            const careerDesc = document.getElementById('careerDesc').vaue;
            const matches = document.getElementById('matches').value;
            const score = document.getElementById('score').value;
            const fifties = document.getElementById('fifties').value;
            const centuries = document.getElementById('centuries').value;
            const wickets = document.getElementById('wickets').value;
            const average = document.getElementById('average').value;

            const obj = {
                name,
                dob,
                imageUrl,
                birthPlace,
                careerDesc,
                matches,
                score,
                fifties,
                centuries,
                wickets,
                average
            }

            const updatedPlayer = await axiosInstance.put(`/career/${id}`, obj);
            const players = await axiosInstance.get('/career');
            const result = players.data.filter ((player) => {
                return player.name.toLowerCase() === updatedPlayer.data.name.toLowerCase();
            });
            showPlayer(result);
            
            scrollToSection('player-container');

            document.getElementById('name').value = '';
            document.getElementById('dob').value = '';
            document.getElementById('imageUrl').value = '';
            document.getElementById('birthPlace').value = '';
            document.getElementById('careerDesc').value = '';
            document.getElementById('matches').value = '';
            document.getElementById('score').value = '';
            document.getElementById('fifties').value = '';
            document.getElementById('centuries').value = '';
            document.getElementById('wickets').value = '';
            document.getElementById('average').value = '';
        });

    } catch(err){
        console.log(err);
        alert(err.message);
    }
}

function getHTML (value) {
    return `
        <div class="main-and-edit">
            <div class="player-main">
                <img src="${value.imageUrl}" alt="Player's Picture" />
                <h3>${value.name}</h3>
                <p>${value.dob}</p>
            </div>
            <div class="player-editBtn">
                <button type="button" id="edit-player" onclick="editPlayer(${value.id}, this)">Edit Info</button>
            </div>
        </div>

        <div class="info-and-disc">
            <div class="player-info">
                <h2>Player Information</h2>
                <p>Place Of Birth : ${value.birthPlace}</p>
                <p>No. Of Matches : ${value.matches}</p>
                <p>Runs : ${value.score}</p>
                <p>No Of Fifties : ${value.fifties}</p>
                <p>No Of Centuries : ${value.centuries}</p>
                <p>No Of Wickets : ${value.wickets}</p>
                <p>Average : ${value.average}</p>
            </div>
            <div class="player-disc">
            ${value.careerDesc}
            </div>
        </div>`
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView();
    }
}