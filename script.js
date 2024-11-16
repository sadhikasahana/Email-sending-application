document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const emailInput = document.getElementById('emailInput').value;
    const promptInput = document.getElementById('promptInput');
    const scheduleInput = parseInt(document.getElementById('scheduleInput').value);
    const throttleInput = parseInt(document.getElementById('throttleInput').value);
    const delayBetweenEmails = (60 / throttleInput) * 1000; 

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const rows = content.split('\n').map(row => row.split(','));
            const headers = rows[0]; 
            const statusTableBody = document.getElementById('statusTableBody');
            statusTableBody.innerHTML = ''; 

            const detectedColumnsContainer = document.getElementById('detectedColumns');
            detectedColumnsContainer.innerHTML = '<h3>Detected Columns:</h3>'; 

            headers.forEach(column => {
                const columnElement = document.createElement('button');
                columnElement.textContent = `Insert ${column.trim()}`;
                columnElement.onclick = () => {
                    promptInput.value += `{${column.trim()}} `; 
                    promptInput.focus();
                };
                detectedColumnsContainer.appendChild(columnElement);
            });

            let totalSent = 0;
            let totalPending = rows.length - 1;

            rows.slice(1).forEach((row, index) => {
                const companyName = row[0]; 
                const recipientEmail = row[1]; 
                const emailContent = generateEmailContent(promptInput.value, companyName);

                const initialStatus = 'Scheduled';
                const initialDeliveryStatus = 'Pending';

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${companyName}</td>
                    <td>${recipientEmail}</td>
                    <td>${initialStatus}</td>
                    <td>${initialDeliveryStatus}</td>
                `;
                statusTableBody.appendChild(tr);

                setTimeout(() => {
                    sendEmail(recipientEmail, emailContent, tr);
                }, index * delayBetweenEmails); 
            });

            function updateAnalyticsDisplay() {
                const analyticsContainer = document.getElementById('analyticsContainer');
                analyticsContainer.innerHTML = `
                    <h3>Analytics</h3>
                    <p>Total Emails Sent: ${totalSent}</p>
                    <p>Emails Pending: ${totalPending}</p>
                `;
            }

            function generateEmailContent(prompt, companyName) {
                return prompt.replace(/{Company Name}/g, companyName); 
            }

            function simulateDeliveryStatus() {
                const statuses = ['Delivered', 'Bounced', 'Failed'];
                return statuses[Math.floor(Math.random() * statuses.length)]; 
            }

            function sendEmail(recipientEmail, emailContent, tr) {
                const deliveryStatus = simulateDeliveryStatus(); 
                if (deliveryStatus === 'Delivered') {
                    totalSent++;
                    totalPending--;
                    tr.cells[2].innerText = 'Sent'; 
                } else {
                    tr.cells[2].innerText = 'Failed'; 
                }
                tr.cells[3].innerText = deliveryStatus; 

                updateAnalyticsDisplay();
                const dashboardTableBody = document.getElementById('dashboardTableBody');
                const dashboardRow = document.createElement('tr');
                dashboardRow.innerHTML = `
                    <td>${recipientEmail}</td>
                    <td>${tr.cells[2].innerText}</td>
                    <td>${tr.cells[3].innerText}</td>
                `;
                dashboardTableBody.appendChild(dashboardRow);
            }
        };

        reader.readAsText(file);
    }
});
