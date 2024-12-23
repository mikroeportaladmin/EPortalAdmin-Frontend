import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortalHttpClientService {

  constructor(private httpClient: HttpClient, @Inject("apiUrl") private apiUrl: string) { }

  private createUrl(requestParameter: Partial<RequestParameter>) {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : 
      this.apiUrl}/${requestParameter.controllerName}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

  private createRequestOptions(requestParameter: Partial<RequestParameter>) {
    const options: any = {
      headers: requestParameter.headers,
      withCredentials: requestParameter.options?.withCredentials || false,
      observe: requestParameter.options?.observe || 'body', 
      reportProgress: requestParameter.options?.reportProgress || false,
      responseType: requestParameter.options?.responseType || 'json',
      params: new HttpParams({ fromString: requestParameter.queryString || '' }),
      body: requestParameter.body || null,
      maxRedirects: requestParameter.options?.maxRedirects || 5,
      timeout: requestParameter.options?.timeout || 0,
    };

    return options;
  }

  get<T>(requestParameter: Partial<RequestParameter>, id?: string): Observable<T> {
    let url = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.createUrl(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    const options = this.createRequestOptions(requestParameter);
    return this.httpClient.get<T>(url, {
      headers: options.headers,
      withCredentials: options.withCredentials,
      reportProgress: options.reportProgress,
      responseType: options.responseType,
      params: options.params,
    });
  }

  post<T>(requestParameter: Partial<RequestParameter>, body: any): Observable<T> {
    let url = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.createUrl(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    const options = this.createRequestOptions(requestParameter);
    
    return this.httpClient.post<T>(url, body, {
      headers: options.headers,
      withCredentials: options.withCredentials,
      reportProgress: options.reportProgress,
      responseType: options.responseType,
      params: options.params,
    });
  }

  put<T>(requestParameter: Partial<RequestParameter>, body?: Partial<T>): Observable<T> {
    let url = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.createUrl(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    const options = this.createRequestOptions(requestParameter);

    return this.httpClient.put<T>(url, body, {
      headers: options.headers,
      withCredentials: options.withCredentials,
      reportProgress: options.reportProgress,
      responseType: options.responseType,
      params: options.params,
    });
  }

  delete<T>(requestParameter: Partial<RequestParameter>, id: string): Observable<T> {
    let url = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint;
    else
      url = `${this.createUrl(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    const options = this.createRequestOptions(requestParameter);
    return this.httpClient.delete<T>(url, {
        headers: options.headers,
        withCredentials: options.withCredentials,
        reportProgress: options.reportProgress,
        responseType: options.responseType,
        params: options.params,
    });  
  }
}

export class RequestParameter {
  controllerName: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
  queryString?: string;
  body?: any;
  options?: {
    withCredentials?: boolean;
    observe?: 'body' | 'response' | 'events';
    reportProgress?: boolean;
    responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
    maxRedirects?: number;
    timeout?: number;
  };
}
