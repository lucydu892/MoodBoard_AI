import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MoodService {
  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  sendMood(mood: string) {
    const payload = { mood };
    this.http.post(this.backendUrl, payload)
      .subscribe({
        next: (response) => {
          console.log('✅ Antwort vom Backend:', response);
        },
        error: (err) => {
          console.error('❌ Fehler beim Senden:', err);
        }
      });
   }
}
