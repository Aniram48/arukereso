import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-rating',
  imports:[CommonModule,MatIcon],
  template: `
    <div class="rating">
      <mat-icon 
        *ngFor="let star of stars; let i = index"
        (click)="setRating(i + 1)"
        [class.filled]="i < rating">
        {{ i < rating ? 'star' : 'star_border' }}
      </mat-icon>
    </div>
  `,
  styles: [`
    .rating mat-icon {
      cursor: pointer;
      color: #ccc;
    }

    .rating mat-icon.filled {
      color: #FFD700;
    }
  `]
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];

  setRating(value: number) {
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }
}
