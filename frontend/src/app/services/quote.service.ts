import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  constructor(private http: HttpClient) {}

  async getQuote(): Promise<{ quote: string; author: string } | null> {
    try {
      const headers = new HttpHeaders({ 'X-Api-Key': environment.quotesApiKey });
      const response: any = await firstValueFrom(
        this.http.get(environment.quotesUrl, { headers })
      );
      const quote = response?.[0];
      return quote ? { quote: quote.quote, author: quote.author } : null;
    } catch (error) {
      console.error('❌ Fehler beim Abrufen des Zitats:', error);
      return null;
    }
  }
}
