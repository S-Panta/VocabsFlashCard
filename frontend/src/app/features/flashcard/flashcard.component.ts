import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [MatCardModule, MatButtonToggleModule, MatIconButton],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss',
})
export class FlashcardComponent {}
