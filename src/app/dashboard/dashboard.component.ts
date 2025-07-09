import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';
  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;
  private quoteRef: any;

  ngOnInit(): void {
    console.log('DashboardComponent component initialized');
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
    switch (mood) {
      case 'happy':
        mood = 'happy';
        break;
      case 'sad':
        mood = 'sad';
        break;
      case 'angry':
        mood = 'angry';
        break;
      case 'neutral':
        mood = 'neutral';
        break;
      default:
        mood = 'unknown';
    }
    return  mood ;
  }
  getQuote(): void {
    alert("Feature not implemented yet");
    // alert("Quote");
    // axios
    //   .get('https://api.quotable.io/random')
    //   .then(response => {
    //     const quote = response.data.content;
    //     const author = response.data.author;
    //     this.quoteRef.nativeElement.textContent = `"${quote}" - ${author}`;
    //   })
    //   .catch(error => {
    //     console.error('Fehler beim Laden des Zitats:', error.message);
    //   });
  }
}
