//your JS code here. If required.
// Function to download a single image
function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => resolve(img); // If image loads successfully
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${imageUrl}`)); // If image fails to load
  });
}

// Function to download all images in parallel and handle errors
function downloadImages(imageArray) {
  const outputDiv = document.getElementById('output');
  const errorDiv = document.getElementById('error');
  const loadingDiv = document.getElementById('loading');

  // Show the loading spinner
  loadingDiv.style.display = 'block';
  outputDiv.innerHTML = ''; // Clear previous results
  errorDiv.innerHTML = ''; // Clear previous errors

  // Create an array of promises for downloading images
  const imagePromises = imageArray.map(image => downloadImage(image.url));

  // Use Promise.all to download all images in parallel
  Promise.all(imagePromises)
    .then(images => {
      // Hide the loading spinner after all images are downloaded
      loadingDiv.style.display = 'none';

      // Display the images in the output div
      images.forEach(img => {
        outputDiv.appendChild(img);
      });
    })
    .catch(error => {
      // Hide the loading spinner and display error message
      loadingDiv.style.display = 'none';
      errorDiv.textContent = error.message;
    });
}

// Example image array
const imagesToDownload = [
  { url: 'https://via.placeholder.com/150' },
  { url: 'https://via.placeholder.com/200' },
  { url: 'https://via.placeholder.com/250' }
];

// Call the function to download images
downloadImages(imagesToDownload);
