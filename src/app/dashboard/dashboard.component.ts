import {OnInit, ViewChild, ElementRef, Component} from '@angular/core';
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

  ngOnInit(): void {
    console.log('DashboardComponent component initialized');
  }

  getImage(): void {
    alert("Picture");
    axios
      .get('https://api.unsplash.com/photos/random?client_id=EfSZG-Q6XKRhmL2ZaQoWvgSumgPkp-H8LfizA1QuM6A')
      .then(response => {
        const imageUrl = response.data.urls.regular;
        this.imageRef.nativeElement.src = imageUrl;
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
}
