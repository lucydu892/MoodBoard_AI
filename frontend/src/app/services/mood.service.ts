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
    this.http.post('http://localhost:3000/mood', payload)
      .subscribe({
        next: (response) => {
          console.log('✅ Antwort vom Backend:', response);
        },
        error: (err) => {
          console.error('❌ Fehler beim Senden:', err);
        }
      });
  }
  // getResponse(mood: string) {
  //   this.http.get(this.backendUrl + '/mood', { params: { mood } })
  // }
  getMoodDate(mood: string) {
  //   if (this.sendMood(mood)) {
  //     try {
  //       this.http.get()
  //     }
  //   }
   }


}
