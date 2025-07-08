import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
}
