document.addEventListener('DOMContentLoaded', function () {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu-container');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const menu = data.menu;

            function displayMenu(category) {
                menuContainer.innerHTML = '';
                for (const cat in menu) {
                    if (category === 'all' || category === cat) {
                        const categoryCard = document.createElement('div');
                        categoryCard.classList.add('menu-card');

                        const categoryTitle = document.createElement('h3');
                        categoryTitle.textContent = cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ');
                        categoryCard.appendChild(categoryTitle);

                        const itemList = document.createElement('ul');
                        itemList.classList.add('menu-items');

                        menu[cat].forEach(item => {
                            const itemElement = document.createElement('li');
                            itemElement.classList.add('menu-item');

                            const itemName = document.createElement('h4');
                            itemName.textContent = item.name;
                            itemElement.appendChild(itemName);

                            const itemDescription = document.createElement('p');
                            itemDescription.textContent = item.description;
                            itemElement.appendChild(itemDescription);

                            const itemPrice = document.createElement('p');
                            itemPrice.textContent = `$${item.price.toFixed(2)}`;
                            itemElement.appendChild(itemPrice);

                            itemList.appendChild(itemElement);
                        });

                        categoryCard.appendChild(itemList);
                        menuContainer.appendChild(categoryCard);
                    }
                }
            }

            filterButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const category = this.getAttribute('data-category');
                    displayMenu(category);
                });
            });

            displayMenu('all');
        })
        .catch(error => console.error('Error fetching menu:', error));
});
