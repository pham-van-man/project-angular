import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Word} from '../../model/word';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private apiUrl: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  create(word: Word): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/word", word);
  }
}
