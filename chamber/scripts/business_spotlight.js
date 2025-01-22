document.addEventListener('DOMContentLoaded', function () {
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            const silverAndGoldMembers = data.filter(member => member.membership_level >= 2);
            const shuffledMembers = silverAndGoldMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = shuffledMembers.slice(0, 3);
            const spotlightContainer = document.getElementById('business-spotlight');

            selectedMembers.forEach(member => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                `;
                spotlightContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching members:', error));
});
