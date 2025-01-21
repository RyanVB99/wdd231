document.addEventListener('DOMContentLoaded', async function() {
    const membersContainer = document.getElementById('members-container');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    async function fetchMembers() {
        const response = await fetch('./data/members.json');
        const members = await response.json();
        return members;
    }

    function displayMembers(members, view) {
        membersContainer.innerHTML = '';
        if (view === 'grid') {
            members.forEach(member => {
                const memberElement = document.createElement('div');
                memberElement.classList.add('card');
                memberElement.innerHTML = `
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <img src="./images/${member.image}" alt="${member.name}" width="50px" height="50px">
                    <ul>
                        <li>Address: ${member.address}</li>
                        <li>Phone: ${member.phone}</li>
                        <li>Website: <a href="${member.website}" target="_blank">${member.website}</a></li>
                    </ul>
                `;
                membersContainer.appendChild(memberElement);
            });
        } else if (view === 'list') {
            const table = document.createElement('table');
            table.classList.add('list-table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Business Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
            members.forEach(member => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${member.name}</td>
                    <td>${member.address}</td>
                    <td>${member.phone}</td>
                    <td><a href="${member.website}" target="_blank">${member.website}</a></td>
                `;
                table.querySelector('tbody').appendChild(row);
            });
            membersContainer.appendChild(table);
        }
    }

    const members = await fetchMembers();
    displayMembers(members, 'grid');

    gridViewButton.addEventListener('click', () => displayMembers(members, 'grid'));
    listViewButton.addEventListener('click', () => displayMembers(members, 'list'));
});
