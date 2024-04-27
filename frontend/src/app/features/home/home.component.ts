import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../../api/services/flashCard.service'

@Component({
  selector: 'app-flashcard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  flashcard: any;
  response: any;

  constructor (
    private readonly flashCardService: FlashcardService,
  ) {}

  id: number = 1;

  ngOnInit(): void {
    this.fetchFlashcardById(this.id);
  }
  
  fetchFlashcardById(id: number): void {
    this.flashCardService.getFlashcardById(id).subscribe(
      (response) => {
        this.response = response;
      },
      (error) => {
        console.error('Error fetching flashcard:', error);
      }
    );
  }
  
  getVocabulary(): any {
    return {
      word: this.response.word,
      definition: this.response.meaning,
      sentence: this.response.sentence,
      reference: this.response.reference
    };
  }
  
  isFlipped: boolean = false;

  get term(): string {
    return this.getVocabulary().word;
  }

  get meaning(): string {
    return this.getVocabulary().definition
  }
  
  get sentence(): string{
    return this.getVocabulary().sentence
    
  }
  get reference(): string{
    return this.getVocabulary().reference
    
  }

  toggleCard() {
    this.isFlipped = !this.isFlipped;
  }

  showPreviousCard() {
    this.id--; 
    this.fetchFlashcardById(this.id);
    this.isFlipped = false
    return this.getVocabulary();
  }

  showNextCard() {
    this.id++; 
    this.fetchFlashcardById(this.id);
    this.isFlipped = false
    return this.getVocabulary();
  }
}

  

