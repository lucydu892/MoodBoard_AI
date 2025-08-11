import {Component, OnInit} from '@angular/core';
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

  constructor(private moodService: MoodService) {
  }


  setMood(mood: string) {
    try {
      console.log('Setting mood:', mood);
      this.mood = mood;// this.moodService.getResponse(this.mood);

      return mood;
    } catch (error) {
      console.error('Error beim setzten vom mood:', error);
      return null;
    }
  }

  showMoodData(response: any) {
    this.moodService.getResponse(response);

  }
}
