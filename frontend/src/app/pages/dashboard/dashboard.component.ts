import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MoodService} from '../../services/mood.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // moodData: MoodData | null = null;
  mood: string = 'neutral';

  @ViewChild('imageOut') imageOut!: ElementRef<HTMLImageElement>;
  @ViewChild('quoteOut') quoteOut!: ElementRef<HTMLParagraphElement>;
  @ViewChild('colorPalette') colorPalette!: ElementRef<HTMLParagraphElement>;
  constructor(private moodService: MoodService) {
  }


  setMood(mood: string) {
    try {
      console.log('Setting mood:', mood);
      this.mood = mood;
      this.moodService.sendMood(this.mood)
        .subscribe({
          next: (response) => {
            console.log('✅ Antwort vom Backend:', response);
            this.showMoodData(response);
            return response;
          },
          error: (err) => {
            console.error('❌ Fehler beim Senden:', err);
          }
        });
      return mood;
    } catch (error) {
      console.error('Error beim setzten vom mood:', error);
      return null;
    }
  }

  async showMoodData(response: any) {
    const receivedImage = response.receivedImage;

    const receivedQuote = response.receivedQuote;
    const {quote, author} = receivedQuote[0];

    const receivedColor = response.receivedColor;
    //test
    console.log('Received data: wowi', {receivedImage, receivedQuote, receivedColor});

    this.imageOut.nativeElement.src = receivedImage ?? '';
    this.quoteOut.nativeElement.innerText = `${quote}${author ? ' \n-' + author : ''}`;

    this.colorPalette.nativeElement.style.backgroundColor = receivedColor ?? '#ffffff';
  }
}
