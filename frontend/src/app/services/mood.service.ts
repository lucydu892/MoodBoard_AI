import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MoodService {
  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  sendMood(mood: string) {
    const payload = {mood};
    return this.http.post(this.backendUrl, payload);
  }

  // useResponse(response: any) {
  //   const image = response.receivedImage;
  //   const quote = response.receivedQuote;
  //   const color = response.receivedColor;
  //
  //   image.nativeElement.src = image;
  //   quote.nativeElement.innerText = quote;
  //   document.body.style.backgroundColor = color;
  //
  // }
}
