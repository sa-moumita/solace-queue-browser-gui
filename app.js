// Function to populate the queue dropdown
async function loadQueueList() {
    try {
        const response = await fetch('http://localhost:3000/queue-list');
        const data = await response.json();
        
        const queueSelect = document.getElementById('queueName');
        queueSelect.innerHTML = '<option value="">Select a queue</option>';
        
        data.forEach(queue => {
            const option = document.createElement('option');
            option.value = queue.queueName;
            option.textContent = queue.queueName;
            queueSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading queue list:', error);
        document.getElementById('response').textContent = 'Error loading queue list. Please check if the server is running.';
    }
}

// Function to browse queue
async function browseQueue() {
    const queueName = document.getElementById('queueName').value;
    const key = document.getElementById('key').value;
    const value = document.getElementById('value').value;
    const responseDiv = document.getElementById('response');
    
    if (!queueName) {
        responseDiv.textContent = 'Please select a queue name';
        return;
    }

    try {
        // Build the URL with query parameters
        let url = `http://localhost:3000/queue-browse?queueName=${encodeURIComponent(queueName)}`;
        if (key) url += `&key=${encodeURIComponent(key)}`;
        if (value) url += `&value=${encodeURIComponent(value)}`;

        const response = await fetch(url);
        const text = await response.text();
        responseDiv.textContent = text;
    } catch (error) {
        console.error('Error browsing queue:', error);
        responseDiv.textContent = 'Error browsing queue. Please try again.';
    }
}

// Load queue list when the page loads
document.addEventListener('DOMContentLoaded', loadQueueList); 