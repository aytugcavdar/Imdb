import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImdbService } from '../../services/imdb.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
})
export class SeriesComponent implements OnInit {
  searchQuery: string = '';
  suggestions: any[] = [];
  noResults: boolean = false; // Sonuç bulunamadığında gösterilecek durum
  searchQuerySubject: Subject<string> = new Subject();

  constructor(private imdbService: ImdbService, private router: Router) {}

  ngOnInit(): void {
    this.searchQuerySubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        if (query.trim()) {
          this.imdbService.searchSeries(query).subscribe(
            (data: any) => {
              this.suggestions = data.Search || [];
              this.noResults = this.suggestions.length === 0;
            },
            (error) => {
              console.error('Error fetching autocomplete data:', error);
            }
          );
        } else {
          this.suggestions = [];
          this.noResults = false;
        }
      });
  }

  onSearch(): void {
    this.searchQuerySubject.next(this.searchQuery);
  }

  onOptionSelected(event: any): void {
    const selectedTitle = event.option.value;
    const selectedSeries = this.suggestions.find((s) => s.Title === selectedTitle);

    if (selectedSeries && selectedSeries.imdbID) {
      this.router.navigate(['/details', selectedSeries.imdbID]);
    } else {
      console.error('Seçilen dizi bilgisi eksik.');
    }
  }
}
