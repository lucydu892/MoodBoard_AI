import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private accessToken: string = '';

  constructor(private http: HttpClient) {}

  async fetchToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;

    try {
      const response: any = await firstValueFrom(
        this.http.get(`${environment.backendUrl}/spotify-token`)
      );
      this.accessToken = response?.access_token || '';
      return this.accessToken;
    } catch (error) {
      console.error('❌ Fehler beim Abrufen des Spotify-Tokens:', error);
      return '';
    }
  }

  async getTopTrack(artistId: string): Promise<{ url: string; name: string } | null> {
    const token = await this.fetchToken();
    if (!token) return null;

    try {
      const response: any = await firstValueFrom(
        this.http.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=CH`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      const topTrack = response?.tracks?.[0];
      return topTrack
        ? { url: topTrack.external_urls.spotify, name: topTrack.name }
        : null;
    } catch (error) {
      console.error('❌ Fehler beim Abrufen des Spotify-Tracks:', error);
      return null;
    }
  }
}
