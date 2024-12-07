// Function to fetch AI content based on user input
async function loadContent() {
    const resultDiv = document.getElementById('resultDiv');
    const userPrompt = document.getElementById('userPrompt').value;
  
    if (!userPrompt.trim()) {
      resultDiv.innerHTML = '<p>Please enter a valid prompt.</p>';
      return;
    }
  
    try {
      const response = await fetch('/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userPrompt }), // Send user prompt as JSON
      });
  
      const data = await response.json();
  
      if (data.text) {
        resultDiv.innerHTML = `<p>${data.text}</p>`; // Display AI-generated content
      } else {
        resultDiv.innerHTML = `<p>Failed to get AI content.</p>`;
      }
    } catch (error) {
      console.error('Error fetching AI content:', error);
      resultDiv.innerHTML = `<p>Error loading AI content: ${error.message}</p>`;
    }
  }
  
  // Add an event listener to the button
  document.getElementById('generateContent').addEventListener('click', loadContent);
  