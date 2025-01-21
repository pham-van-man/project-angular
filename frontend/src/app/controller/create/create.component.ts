import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {CreateService} from '../../service/create/create.service';
import {Observable} from 'rxjs';
import {NotificationService} from '../../service/notification/notification.service';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  @Output() dataAdded: EventEmitter<void> = new EventEmitter<void>();
  loading: boolean = false;
  message$: Observable<string>;
  types: string[] = ['Danh từ', 'Động từ', 'Tính từ', "Khác"];
  createForm: FormGroup = new FormGroup({
    key: new FormControl("", [Validators.required]),
    value: new FormControl("", Validators.required),
    ipa: new FormControl,
    type: new FormControl(this.types[0]),
  });

  constructor(private createService: CreateService, private notificationService: NotificationService) {
    this.message$ = this.notificationService.message$;
  }

  onSubmit(): void {
    if (!this.createForm.valid) {
      return;
    }
    this.loading = true;
    this.createService.create(this.createForm.value).subscribe({
      next: (): void => {
        this.loading = false;
        this.createForm.reset({type: this.types[0]});
        this.dataAdded.emit();
        this.notificationService.updateMessage('Thêm từ thành công!');
      },
      error: (): void => {
        this.loading = false;
        this.notificationService.updateMessage('Từ này đã có!');
      }
    })
  }
}
