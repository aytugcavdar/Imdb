import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImdbService } from '../../services/imdb.service';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.css']
})
export class SeriesDetailsComponent implements OnInit {
  series: any;  // Detaylı dizi bilgisi
  seasons: any[] = [];  // Sezonlar
  seriesId: string = "";
  episodes:any[]=[];
  organizedEpisodes: any[] = [];

  totalSeasons: number[] = []; // Toplam sezonlar dizisi
  

  constructor(
    private route: ActivatedRoute,
    private imdbService: ImdbService
  ) {}

  ngOnInit(): void {
    // URL parametresinden dizi ID'sini al
    this.seriesId = this.route.snapshot.paramMap.get('id')!;
    // Dizi detaylarını API'den al
    this.getSeriesDetails();
  }

  // Dizi detaylarını almak için servis çağrısı
  getSeriesDetails() {
    this.imdbService.getSeriesDetails(this.seriesId).subscribe(
      (data: any) => {
        this.series = data;
        if (this.series?.imdbID) {
          // Sezon bilgilerini almak için ek bir API çağrısı yapalım
          this.getSeasons(this.series?.imdbID);
        }
      },
      (error) => {
        console.error('Error fetching series details', error);
      }
    );
  }

  // Sezon bilgilerini almak için servis çağrısı
 /* getSeasons(imdbID: string) {
    // Burada her sezon için API'den veri alıyoruz
    const seasonsCount = this.series?.totalSeasons;
    for (let season = 1; season <= seasonsCount; season++) {
      this.imdbService.getSeasonDetails(imdbID, season).subscribe(
        (data: any) => {
          // Sezon bilgilerini alıyoruz
          this.seasons.push(data);
        },
        (error) => {
          console.error('Error fetching season details', error);
        }
      );
    }
  } */


    getSeasons(imdbID: string) {
      const seasonsCount = this.series?.totalSeasons;
      this.totalSeasons = Array.from({ length: seasonsCount }, (_, i) => i + 1);
    
      for (let season = 1; season <= seasonsCount; season++) {
        this.imdbService.getSeasonDetails(imdbID, season).subscribe(
          (data: any) => {
            this.seasons.push(data);
    
            // Bölümleri organize et
            this.organizeEpisodes(data.Episodes, season);
          },
          (error) => {
            console.error('Error fetching season details', error);
          }
        );
      }
    }
    
    // Bölümleri organize et
    organizeEpisodes(episodes: any[], season: number) {
      episodes.forEach((episode) => {
        const episodeLabel = `S${season}E${episode.Episode}`;
        let row = this.organizedEpisodes.find((r) => r.season === season);
    
        if (!row) {
          row = { season, episodes: [] };
          this.organizedEpisodes.push(row);
        }
    
        row.episodes.push({
          episodeNumber: episode.Episode,
          imdbRating: parseFloat(episode.imdbRating || '0'),
        });
      });
    }
    
    // Belirli bir sezon için bölümleri döndürme
    getEpisodesForSeason(season: number) {
      const seasonData = this.organizedEpisodes.find((s) => s.season === season);
      return seasonData ? seasonData.episodes : [];
    }



  getRatingClass(rating: number): string {
    if (rating >= 9) return 'awesome';
    if (rating >= 8.5) return 'great';
    if (rating >= 7.5) return 'good';
    if (rating >= 6.5) return 'regular';
    if (rating >= 5) return 'bad';
    return 'garbage';
  }
  
}
