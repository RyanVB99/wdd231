document.addEventListener('DOMContentLoaded', () => {
    fetch('discover_data.json')
        .then(response => response.json())
        .then(data => {
            const cardsContainer = document.getElementById('cards-container');
            data.locations.forEach((location, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h2>${location.title}</h2>
                    <figure>
                        <img src="${location.image}" alt="${location.title}" loading="lazy">
                    </figure>
                    <address>${location.address}</address>
                    <p>${location.description}</p>
                    <button onclick="openModal('modal${index + 1}')">Learn More</button>
                `;
                cardsContainer.appendChild(card);

                const modal = document.createElement('div');
                modal.id = `modal${index + 1}`;
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close" onclick="closeModal('modal${index + 1}')">&times;</span>
                        <h2>${location.title}</h2>
                        <p>${location.modalContent}</p>
                    </div>
                `;
                document.body.appendChild(modal);
            });

            // I added this to make the first modal work, it was not correctly pulling from the JSON without
            if (data.locations.length > 0) {
                const firstLocation = data.locations[0];
                const firstModal = document.getElementById('modal1');
                if (firstModal) {
                    firstModal.querySelector('h2').textContent = firstLocation.title;
                    firstModal.querySelector('p').textContent = firstLocation.modalContent;
                }
            }
        });
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
