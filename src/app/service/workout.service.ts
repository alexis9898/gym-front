import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Workout } from '../model/wourkout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  url = `${environment.baseUrl}/api/workout`;

  constructor(private http:HttpClient) { }

  getWorkout(id: number) {
    return this.http.get<Workout>(`${this.url}/${id}`);
  }

  post(workout: Workout){
    return this.http.post(`${this.url}`, workout);
  }

  put(workout: Workout){
    return this.http.put(`${this.url}`, workout);
  }
}
