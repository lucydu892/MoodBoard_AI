import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import axios from 'axios';
import {response} from 'express';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';
  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('colorPalette') colorPalette!: ElementRef<HTMLDivElement>;
  accessToken: string = 'BQCsg6zt6bOX_PDbfrJqsNfsK6xHjAtvqOp-lXEKvm0MwhcM8l4MaCJI-L7ptM2Y09cYyLefPyEplzkNyszWObHIBNwNzGJsfY9EySkrbGAgV38pQrw7kN31VtT53KPLHXOeWeU4xKM';
  quote: string = '';
  author: string = '';
  playlistUrl: string = '';
  playlistName: string = '';
  mood: string = '';

  async ngOnInit() {
    const quote = await this.getQuote();
    if (quote) {
      this.quote = quote.quote;
      this.author = quote.author;
    }
    axios.get('http://localhost:3000/spotify-token')
      .then(response => {
        this.accessToken = response.data.access_token;
        console.log('✅ Token empfangen:', this.accessToken);
      });

  }

  getImage(): void {
    alert("Picture");
    axios
      .get('https://api.unsplash.com/photos/random?client_id=EfSZG-Q6XKRhmL2ZaQoWvgSumgPkp-H8LfizA1QuM6A')
      .then(response => {
        this.imageRef.nativeElement.src = response.data.urls.regular;
      })
      .catch(error => {
        console.error('Fehler beim Laden des Bildes:', error.message);
      });
  }
  setMood(mood: string): String{
    alert("Mood");
    this.mood = mood;
    return  mood ;
  }
  async getQuote() {
    const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
    const apiKey = 'Scxegq9UREjLrgANoaUSlA==wjdIDRxH7JU4rNwT';

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'X-Api-Key': apiKey
        }
      });

      const quote = response.data[0];
      console.log('Zitat:', quote.quote);
      console.log('Autor:', quote.author);

      return quote;
    } catch (error) {
      console.error('Fehler beim Abrufen des Zitats:', error);
      return null;
    }
  }
  getColorPalette(): void {
    alert("Color palette");
    axios
      .get('https://www.csscolorsapi.com/api/colors/cadetBlue')
      .then(response => {
        const hex = response.data.data.hex;

        const colorPaletteElement = document.getElementById('colorPalette');
        if (colorPaletteElement) {
          colorPaletteElement.style.backgroundColor = `#${hex}`;
        }
      })
      .catch(error => {
        console.error('Fehler beim Laden der Farbpalette:', error.message);
      });
  }
  getPlaylist(): void {
    const artistId = '53XhwfbYqKCa1cC15pYq2q'; // Imagine Dragons

    axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=CH`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
      .then(response => {
        const topTrack = response.data.tracks[0];
        if (topTrack) {
          this.playlistUrl = topTrack.external_urls.spotify;
          this.playlistName = topTrack.name;
          console.log('▶️ Spotify-Link:', this.playlistUrl);
          console.log('🎵 Top-Track:', this.playlistName);
        } else {
          console.warn('⚠️ Keine Tracks gefunden.');
        }
      })
      .catch(error => {
        console.error('Fehler beim Abrufen des Spotify-Tracks:', error);
      });
  }
}
