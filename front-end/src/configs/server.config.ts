import {HttpHeaders} from '@angular/common/http';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const httpOptionsUpload = {
  headers: new HttpHeaders({
    'Content-Type': 'image/png'
  })
};

export const serverUrl = 'http://localhost:9428/api/';
