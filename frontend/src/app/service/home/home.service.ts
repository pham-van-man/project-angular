import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Word} from '../../model/word';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  get(): Observable<Word[]> {
    return this.http.get<Word[]>(this.apiUrl + "/word");
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/word/" + id);
  }
}
