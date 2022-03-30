import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Product } from '../model/product';

@Injectable()
export class ApiService {
  
  constructor(private httpService: HttpService) {
  }

  getAllPost(): Observable<Product[]> {
      return this.httpService.get('/products').pipe(map(data=>data as Product[]));
  }
}