import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) {}

  async getColorsByMood(mood: string): Promise<string[]> {
    try {
      const response: any = await firstValueFrom(
        this.http.get(`${environment.backendUrl}/colors/${mood || 'neutral'}`) // Backend-URL anpassen
      );
      return response?.colors || null;
    } catch (error) {
      console.error('❌ Fehler beim Laden der Mood Colors:', error);
      return [];
    }
  }
}
