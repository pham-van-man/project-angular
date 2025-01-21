import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Word} from '../../model/word';
import {NgIf} from '@angular/common';
import {MapWord} from '../../model/map-word';

@Component({
  selector: 'app-run',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './run.component.html',
  styleUrl: './run.component.css'
})
export class RunComponent implements OnInit, OnDestroy {
  @Input() words: Word[] = [];
  count: number = 0;
  map: MapWord = {};
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  private intervalId: any;
  array: any;

  closeModal(): void {
    this.close.emit();
  }

  ngOnInit(): void {
    this.toArray();
    this.intervalId = setInterval(() => {
      this.map = this.array[this.count++];
      if (this.count > this.array.length - 1) {
        this.clearInterval();
      }
    }, 500)
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  private clearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private toArray(): void {
    this.array = this.words.flatMap(({key, ipa, value, type}) => [
      {label: key, detail: ipa},
      {label: value, detail: type}
    ]);
  }
}
