document.addEventListener('DOMContentLoaded', function () {
    fetchBusinessSpotlight();
});

async function fetchBusinessSpotlight() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayBusinessSpotlight(data);
}

function displayBusinessSpotlight(data) {
    const spotlightContainer = document.querySelector('#business-spotlight');
    spotlightContainer.innerHTML = '';

    const membershipLevels = {
        1: 'Member',
        2: 'Silver',
        3: 'Gold'
    };

    const silverAndGoldMembers = data.filter(member => member.membership_level >= 2);
    const shuffledMembers = silverAndGoldMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffledMembers.slice(0, 3);

    selectedMembers.forEach(member => {
        const businessCard = document.createElement('div');
        businessCard.classList.add('business-card');
        businessCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.logo}" alt="${member.name} logo">
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${membershipLevels[member.membership_level]}</p>
        `;
        spotlightContainer.appendChild(businessCard);
    });
}
