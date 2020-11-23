import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {


  MOBILE_BAAS_ULR: string = 'https://mobilebaas.com/backend/api/manage/db';
  tableName:string = 'meeting';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'MOBILEBAASKEY': 'MTYwNTIxOTk3MzA2MkZyYW5jaXMgS2xheSBSb2NoYQ=='
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  insert(meeting: any) {
    return this.http.post(this.MOBILE_BAAS_ULR+'?table='+this.tableName,meeting,this.httpOptions);
  }

  update(meeting: any) {
    return this.http.put(this.MOBILE_BAAS_ULR+'?table='+this.tableName,meeting,this.httpOptions);
  }

  delete(id: string) {
    return this.http.delete(this.MOBILE_BAAS_ULR+'/'+id+'?table='+this.tableName,this.httpOptions);
  }

  getById(id: string) {
    return this.http.get(this.MOBILE_BAAS_ULR+'/'+id+'?table='+this.tableName,this.httpOptions);
  }

  getAll(pageNumber: number,totalRecordsPerPage: number, sortField:string,filters:string) {
    let parameters = '?table='+this.tableName;

    if(pageNumber != null){
        parameters += '&pageNumber='+pageNumber;
    }

    if(totalRecordsPerPage != null){
        parameters += '&totalRecordsPerPage='+totalRecordsPerPage;
    }

    if(sortField != null){
        parameters += '&sortField='+sortField;
    }
    
    if(filters != null){
      parameters+= '&filters='+filters;
    }
    return this.http.get(this.MOBILE_BAAS_ULR+'/find'+parameters,this.httpOptions);
  }

}
