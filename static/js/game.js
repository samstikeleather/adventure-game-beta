document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("begin-game").addEventListener("click", function() {
        fetch('/start-game')
            .then(response => response.json())
            .then(data => {
                document.getElementById("narrative").textContent = data.message;
                // Hide the begin game button
                document.getElementById("begin-game").style.display = 'none';
                // Example: Display choices (further implementation required)
                const choicesDiv = document.getElementById("choices");
                data.choices.forEach(choice => {
                    const button = document.createElement("button");
                    button.textContent = choice;
                    // Add event listener for each choice
                    // (You will need to implement choice handling)
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
                    updateInventory();
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Initial inventory update on page load
    updateInventory();

    // Example usage (You might want to trigger this differently)
    // This is just for demonstration; you'll likely tie inventory updates to game events
    // document.getElementById("someButtonId").addEventListener("click", function() {
    //     addToInventory("Magic Wand");
    // });
});
