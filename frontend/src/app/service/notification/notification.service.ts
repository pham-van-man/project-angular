import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  message$: Observable<string> = this.messageSubject.asObservable();

  updateMessage(message: string): void {
    this.messageSubject.next(message);
  }
}
