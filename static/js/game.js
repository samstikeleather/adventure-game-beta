document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("begin-game").addEventListener("click", function() {
        fetch('/start-game')
            .then(response => response.json())
            .then(data => {
                document.getElementById("narrative").textContent = data.message;
                document.getElementById("begin-game").style.display = 'none'; // Hide the begin game button
                const choicesDiv = document.getElementById("choices");
                choicesDiv.innerHTML = ''; // Clear previous choices
                
                // Display choices and add event listeners
                data.choices.forEach(choice => {
                    const button = document.createElement("button");
                    button.textContent = choice;
                    button.addEventListener('click', function() {
                        if (choice === "Enter") {
                            fetch('/enter-forest') // Fetch the "Enter Forest" scenario
                                .then(response => response.json())
                                .then(data => {
                                    document.getElementById("narrative").textContent = data.message;
                                    choicesDiv.innerHTML = ''; // Clear previous choices
                                    data.choices.forEach(subChoice => {
                                        const subChoiceButton = document.createElement("button");
                                        subChoiceButton.textContent = subChoice;
                                        subChoiceButton.addEventListener('click', function() {
                                            if (subChoice === "Take Sword") {
                                                addToInventory("Sword"); // Add sword to inventory
                                            }
                                            // Handle "Leave it" choice or other actions
                                        });
                                        choicesDiv.appendChild(subChoiceButton);
                                    });
                                });
                        } else if (choice === "Camp outside") {
                            // Handle camping outside
                        } else if (choice === "Go back") {
                            // Handle going back
                        }
                        // Add handling for other choices as needed
                    });
                    choicesDiv.appendChild(button);
                });
            })
            .catch(error => console.error('Error:', error));
    });

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
                    dropButton.onclick = function() {
                        removeFromInventory(item);
                    };

                    // Append the item and its drop button to the inventory list
                    li.appendChild(dropButton);
                    inventoryList.appendChild(li);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // Function to add an item to the inventory
    function addToInventory(item) {
        fetch(`/add-to-inventory/${item}`)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    updateInventory(); // Refresh the inventory display
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Function to remove an item from the inventory
    function removeFromInventory(item) {
        fetch(`/remove-from-inventory/${item}`)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    updateInventory(); // Refresh the inventory display
                } else {
                    console.error('Failed to remove item from inventory');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Initial inventory update on page load
    updateInventory();

    // Further game logic and item interaction can be added here
    // This setup provides a flexible foundation for expanding your game
});
