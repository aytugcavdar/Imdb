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
    return this.http.get<any>(this.apiUrl, { params });
  }

  getSeriesDetails(id: string): Observable<any> {
    const url = `${this.apiUrl}?i=${id}&apikey=${this.apiKey}&plot=full`;
    return this.http.get<any>(url);  // API'den dizi detaylarını döndür
  }
  getSeasonDetails(imdbID: string, season: number): Observable<any> {
    const params = new HttpParams()
      .set('i', imdbID)
      .set('Season', season.toString())
      .set('apiKey', this.apiKey);
    return this.http.get(this.apiUrl, { params });
  }
  
  getSeriesById(imdbID: string) {
    return this.http.get<any>(`https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=fd545580`);
  }
  
  getEpisodesBySeason(imdbID: string, season: number) {
    return this.http.get<any>(`https://www.omdbapi.com/?i=${imdbID}&Season=${season}&apikey=fd545580`);
  }
}
