import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Muscle } from '../model/muscle';

@Injectable({
  providedIn: 'root'
})
export class MuscleService {
  url=environment.baseUrl+"/api/Muscle";

  constructor(private http:HttpClient) { }

  getMuscles(){
    return this.http.get<Muscle[]>(this.url);
  }
}
