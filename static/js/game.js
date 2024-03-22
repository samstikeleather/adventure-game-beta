document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("begin-game").addEventListener("click", function() {
        fetch('/start-game')
            .then(response => response.json())
            .then(data => {
                displayNarrativeAndChoices(data);
            })
            .catch(error => console.error('Error:', error));
    });
});

// Function to dynamically display narrative and choices
function displayNarrativeAndChoices(data) {
    document.getElementById("narrative").textContent = data.message;
    document.getElementById("begin-game").style.display = 'none'; // Optionally hide the begin game button
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ''; // Clear previous choices

    data.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => {
            if (choice.next) {
                fetch(`/choice/${choice.next}`) // Fetch next choice
                    .then(response => response.json())
                    .then(data => displayNarrativeAndChoices(data)) // Display next choices
                    .catch(error => console.error('Error:', error));
            } else if (choice.action && choice.action === "add_to_inventory") {
                addToInventory(choice.item); // Perform action, e.g., add item to inventory
            }
        };
        choicesDiv.appendChild(button);
    });
}

function addToInventory(item) {
    fetch(`/add-to-inventory/${item}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateInventory(); // Update the inventory display if item added successfully
            } else {
                console.error('Failed to add item to inventory');
            }
        })
        .catch(error => console.error('Error:', error));
}

function removeFromInventory(item) {
    fetch(`/remove-from-inventory/${item}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateInventory(); // Refresh the inventory display if item removed successfully
            } else {
                console.error('Failed to remove item from inventory:', data.message);
            }
        })
        .catch(error => console.error('Error removing item from inventory:', error));
}

// Function to update the inventory display
function updateInventory() {
    fetch('/inventory')
        .then(response => response.json())
        .then(data => {
            const inventoryList = document.getElementById("inventory");
            inventoryList.innerHTML = '';  // Clear current inventory list
            data.inventory.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;

                // Create a drop button for each item
                const dropButton = document.createElement("button");
                dropButton.textContent = "Drop";
                dropButton.onclick = () => removeFromInventory(item);

                // Append the item and its drop button to the inventory list
                li.appendChild(dropButton);
                inventoryList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Initial inventory update on page load
updateInventory();
