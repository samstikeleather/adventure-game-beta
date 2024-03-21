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
});
