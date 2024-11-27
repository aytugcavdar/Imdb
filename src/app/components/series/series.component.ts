import { Component, OnInit } from '@angular/core';
import { ImdbService } from '../../services/imdb.service';


@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  searchQuery: string = '';
  seriesList: any[] = [];
  selectedSeries: any;
  seasons: any[] = [];
  episodes: any[] = [];


  constructor(private imdbService: ImdbService) {}

  ngOnInit(): void {}

  search(): void {
    this.imdbService.searchSeries(this.searchQuery).subscribe(response => {
      this.seriesList = response.Search || [];
    });
  }

 
  selectSeries(imdbID: string): void {
    this.imdbService.getSeriesDetails(imdbID).subscribe(response => {
      console.log(response)
      this.selectedSeries = response;
  
      // Sezonları manuel olarak kontrol et ve sayısını belirle
      const totalSeasons = +response.totalSeasons;
      this.seasons = Array.from({ length: totalSeasons }, (_, i) => `Season ${i + 1}`);
      this.episodes = []; // Sezon seçilince bölümleri sıfırla
    });
  }
  
  getEpisodes(seasonNumber: number): void {
    this.imdbService.getSeasonDetails(this.selectedSeries.imdbID, seasonNumber).subscribe(response => {
      this.episodes = response.Episodes || []; // Bölüm listesi güncelleniyor
    });
  }
  getRatingClass(rating: string): string {
    if (parseFloat(rating) >= 7) {
      return 'green';
    } else if (parseFloat(rating) >= 4) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
  
  
}
