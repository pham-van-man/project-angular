import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../service/notification/notification.service';
import {Observable} from 'rxjs';
import {HomeService} from '../../service/home/home.service';
import {Word} from '../../model/word';
import {NgForOf, NgIf} from '@angular/common';
import {CreateComponent} from '../create/create.component';
import {RunComponent} from '../run/run.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CreateComponent,
    RunComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  message$: Observable<string>;
  words: Word[] = [];
  isModalVisible: boolean = false;

  constructor(private homeService: HomeService, private notificationService: NotificationService) {
    this.message$ = this.notificationService.message$;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.homeService.get().subscribe({
      next: (response: Word[]): void => {
        this.words = response;
      }
    })
  }

  deleteWord(id: number): void {
    this.loading = true;
    this.homeService.delete(id).subscribe({
      next: (): void => {
        this.loading = false;
        this.loadData();
        this.notificationService.updateMessage("Xóa thành công");
      },
      error: (): void => {
        this.loading = false;
        this.notificationService.updateMessage("Xóa thất bại");
      }
    });
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
