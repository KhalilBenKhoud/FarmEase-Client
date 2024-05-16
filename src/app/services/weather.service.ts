import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherAverageDTO } from '../models/WeatherAverageDTO';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'http://localhost:8080/weather/forecast';

  constructor(private http: HttpClient) { }

  getWeatherForecast(city: string): Observable<WeatherAverageDTO[]> {
    return this.http.get<WeatherAverageDTO[]>(`${this.baseUrl}?city=${city}`);
  }
}
