import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MoodService } from '../../services/mood.service';
import { ColorService } from '../../services/color.service';
import { SpotifyService } from '../../services/spotify.service';
import { ImageService } from '../../services/image.service';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  title = 'Dashboard';
  colors: string[] = [];
  quote = '';
  author = '';
  playlistUrl = '';
  playlistName = '';
  mood = 'neutral';

  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;

  constructor(
    private moodService: MoodService,
    private colorService: ColorService,
    private spotifyService: SpotifyService,
    private imageService: ImageService,
    private quotesService: QuoteService
  ) {}

  async ngOnInit() {
    await this.getColorPalette();
    this.getQuote();
    await this.getPlaylist();
    await this.getColorPalette();
  }

  ngAfterViewInit() {
    this.getImage();
  }

  async getImage() {
    try {
      const imageUrl = await this.imageService.getImageByMood(this.mood);
      if (imageUrl && this.imageRef) {
        this.imageRef.nativeElement.src = imageUrl;
      }
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }

  async getQuote() {
    try {
      const quoteData = await this.quotesService.getQuote();
      if (quoteData) {
        this.quote = quoteData.quote;
        this.author = quoteData.author;
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  }

  async getPlaylist() {
    try {
      const playlist = await this.spotifyService.getTopTrack('53XhwfbYqKCa1cC15pYq2q');
      if (playlist) {
        this.playlistUrl = playlist.url;
        this.playlistName = playlist.name;
      }
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  }

  async setMood(mood: string) {
    try {
      const data = await this.moodService.loadMoodData(mood);
      this.mood = data.mood ?? 'neutral';
      this.colors = data.colors;
      this.quote = data.quote;
      this.author = data.author;
      this.playlistUrl = data.playlistUrl;
      this.playlistName = data.playlistName;

      if (this.imageRef) {
        this.imageRef.nativeElement.src = data.imageUrl ?? '';
      }
    } catch (error) {
      console.error('Error setting mood:', error);
    }
  }

  async getColorPalette() {
    try {
      const colorData = await this.colorService.getColorsByMood(this.mood);
      const colorPaletteElement = document.getElementById('colorPalette');
      if (colorData && colorPaletteElement) {

        colorPaletteElement.style.backgroundColor = `${colorData}`;
      }
    }catch (error) {
      console.error('Error loading colors:', error);
    }
  }
}
