import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {
  private apiUrl = 'http://www.omdbapi.com/';
  private apiKey = 'fd545580';

  constructor(private http: HttpClient) { }

  searchSeries(query: string): Observable<any> {
    const params = new HttpParams()
      .set('s', query)
      .set('type', 'series') // Sadece dizileri getirir
      .set('apiKey', this.apiKey);
    return this.http.get(this.apiUrl, { params });
  }

  getSeriesDetails(imdbID: string): Observable<any> {
    const params = new HttpParams()
      .set('i', imdbID)
      .set('apiKey', this.apiKey);
    return this.http.get(this.apiUrl, { params });
  }
  getSeasonDetails(imdbID: string, season: number): Observable<any> {
    const params = new HttpParams()
      .set('i', imdbID)
      .set('Season', season.toString())
      .set('apiKey', this.apiKey);
    return this.http.get(this.apiUrl, { params });
  }
  
}
