import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';

  // 🔧 Referenzen auf DOM-Elemente (Image + Farbfeld)
  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('colorPalette') colorPalette!: ElementRef<HTMLDivElement>;

  // 🔒 Zugangstoken & States
  accessToken: string = '';
  quote: string = '';
  author: string = '';
  playlistUrl: string = '';
  playlistName: string = '';
  mood: string = 'neutral';

  ngOnInit(): void {
    this.fetchSpotifyToken();
  }

  // ✅ 1. Beispiel: Unnötigen Import entfernt (`response` von express)

  // ✅ 2. Beispiel: API-Key nicht hart im Code, sondern hier zentral (kannst du später in environment.ts verschieben)
  private unsplashClientId = 'EfSZG-Q6XKRhmL2ZaQoWvgSumgPkp-H8LfizA1QuM6A';
  private quotesApiKey = 'Scxegq9UREjLrgANoaUSlA==wjdIDRxH7JU4rNwT';

  // ✅ 3. Beispiel: setMood ohne Rückgabewert (void) und ohne alert()
  setMood(mood: string): void {
    this.mood = mood;
    console.log('🧠 Stimmung gesetzt auf:', mood);
  }

  // ✅ 4. Beispiel: getImage ohne alert(), mit sicherem Zugriff und nur einem Bild
  getImage(): void {
    const moodQuery = this.mood || 'neutral';

    axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: moodQuery,
        client_id: this.unsplashClientId,
        per_page: 1 // nur 1 Bild laden
      }
    })
      .then((response) => {
        const imageUrl = response.data?.results?.[0]?.urls?.regular;

        if (imageUrl && this.imageRef?.nativeElement) {
          this.imageRef.nativeElement.src = imageUrl;
          console.log('📷 Bild geladen:', imageUrl);
        } else {
          console.warn('⚠️ Kein Bild gefunden');
        }
      })
      .catch((error) => {
        console.error('Fehler beim Laden des Bildes:', error.message);
      });
  }

  // ✅ 5. Beispiel: Quotes mit API-Key, sicherer Zugriff
  async getQuote(): Promise<void> {
    const apiUrl = 'https://api.api-ninjas.com/v1/quotes';

    try {
      const response = await axios.get(apiUrl, {
        headers: { 'X-Api-Key': this.quotesApiKey }
      });

      const quote = response.data?.[0];
      if (quote) {
        this.quote = quote.quote;
        this.author = quote.author;
        console.log('📜 Zitat:', this.quote, '-', this.author);
      } else {
        console.warn('⚠️ Kein Zitat gefunden');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des Zitats:', error);
    }
  }

  // ✅ 6. Beispiel: Farbpalette holen, sauberer Zugriff
  getColorPalette(): void {
    axios.get('https://www.csscolorsapi.com/api/colors/cadetBlue')
      .then((response) => {
        const hex = response.data?.data?.hex;

        if (hex && this.colorPalette?.nativeElement) {
          this.colorPalette.nativeElement.style.backgroundColor = `#${hex}`;
          console.log('🎨 Farbpalette geladen:', hex);
        } else {
          console.warn('⚠️ Farbcode fehlt');
        }
      })
      .catch((error) => {
        console.error('Fehler beim Laden der Farbpalette:', error.message);
      });
  }

  // ✅ 7. Beispiel: Playlist holen mit sicherem Zugriff
  getPlaylist(): void {
    const artistId = '53XhwfbYqKCa1cC15pYq2q'; // Imagine Dragons

    axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=CH`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
      .then((response) => {
        const topTrack = response.data?.tracks?.[0];
        if (topTrack) {
          this.playlistUrl = topTrack.external_urls?.spotify || '';
          this.playlistName = topTrack.name || '';
          console.log('▶️ Spotify-Link:', this.playlistUrl);
          console.log('🎵 Top-Track:', this.playlistName);
        } else {
          console.warn('⚠️ Keine Tracks gefunden.');
        }
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen des Spotify-Tracks:', error);
      });
  }

  // ✅ 8. Beispiel: Token abrufen in separate Methode ausgelagert
  private fetchSpotifyToken(): void {
    axios.get('http://localhost:3000/spotify-token')
      .then((response) => {
        this.accessToken = response.data?.access_token || '';
        console.log('✅ Spotify-Token empfangen');
      })
      .catch((error) => {
        console.error('Fehler beim Laden des Spotify-Tokens:', error.message);
      });
  }
}
