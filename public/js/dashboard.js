import axios from 'axios';
function getImage() {
  alert("Picture");
    axios
        .get('https://api.unsplash.com/search/photos?query=mood&client_id=EfSZG-Q6XKRhmL2ZaQoWvgSumgPkp-H8LfizA1QuM6A')
        .then(response => {
            const imageUrl = response.data.results[0].urls.regular;
            document.getElementById('image').src = imageUrl;
        })
        .catch(error => {
            console.error('Fehler beim Laden des Bildes:', error.message);
        });
}
