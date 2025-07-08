import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;

  ngOnInit(): void {
    console.log('Dashboard component initialized');
  }

  getImage(): void {
    alert("Picture");
    axios
      .get('https://api.unsplash.com/search/photos?query=mood&client_id=EfSZG-Q6XKRhmL2ZaQoWvgSumgPkp-H8LfizA1QuM6A')
      .then(response => {
        const imageUrl = response.data.results[0].urls.regular;
        this.imageRef.nativeElement.src = imageUrl;
      })
      .catch(error => {
        console.error('Fehler beim Laden des Bildes:', error.message);
      });
  }
}
