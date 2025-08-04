import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}

  /**
   * Lädt ein Bild basierend auf der Stimmung.
   * @param mood Stimmung, z. B. "happy", "sad", "neutral"
   * @returns Bild-URL oder null, wenn kein Bild gefunden wird
   */
  async getImageByMood(mood: string): Promise<string | null> {
    try {
      const response: any = await firstValueFrom(
        this.http.get(environment.imageUrl, {
          params: {
            query: mood || 'neutral',
            client_id: environment.unsplashApiKey,
            per_page: 1
          }
        })
      );

      return response?.results?.[0]?.urls?.regular || null;
    } catch (error) {
      console.error('❌ Fehler beim Laden des Unsplash-Bildes:', error);
      return null;
    }
  }
}
