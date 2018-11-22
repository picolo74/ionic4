import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Params } from '@angular/router';
import { Page } from '../models/paging/page.model';

@Injectable({
  providedIn: 'root'
})
export class HttpGenericService {

  constructor(private _http: HttpClient) {}

  /*************************************** GET ***************************************/

  /**
   * Service générique GET
   *
   * @param {any} ressource Nom de la ressource backend
   * @param {string} [id=""] Id de l'ogjet ou fin de l'url
   * @returns {Observable<any>}
   * @memberof GenericService
   */
  get(ressource: string, id: string = ''): Observable<any> {
    const postUrl = id !== '' ? `/${id}` : '';
    return this._http.get(`api/${ressource}${postUrl}`);
  }

  /**
   * Service générique GET Async
   *
   * @param {string} ressource : nom de la ressource backend
   * @param {string} id: id de l'objet
   * @returns {Promise<any>}
   * @memberof HttpGenericService
   */
  async getAsync(ressource: string, id: string = ''): Promise<any> {
    const postUrl = id !== '' ? `/${id}` : '';
    return this._http.get(`api/${ressource}${postUrl}`).toPromise();
  }

  /*************************************** SEARCH ***************************************/
  /**
   * Service générique POST SEARCH Async
   *
   * @param {string} ressource : nom de la ressource backend
   * @param {string} id: id de l'objet
   * @returns {Promise<any>}
   * @memberof HttpGenericService
   */
  async searchAsync(ressource: string, params: Params): Promise<any> {
    return this._http.post(`api/${ressource}/_search`, params).toPromise();
  }

  /**
   * Service générique de recherche
   * @param {string} ressource Nom de la ressource backend
   * @param {object} [params=null] Parametres supplementaires
   * @param {Page} [page=null] pour la pagination
   * @param {boolean} [search=true] permet d'ajouter _search à la fin de l'url
   * @returns Observable<any>
   * @memberof GenericService
   */
  search(
      ressource: string,
      params: object = null,
      page: Page = null,
      search = true,
      api: string = 'api'
  ): Observable<any> {
    const postUrl = search ? '/_search' : '';
    return this._http.post(`${api}/${ressource}${postUrl}`, {
      ...params,
      ...{ page: page }
    });
  }

  /*************************************** SAVE: PUT && POST GENERIC ***************************************/
  /**
   * Update ou create une ressource
   * @param ressource
   * @param obj
   * @param hasPutEndpointNoId : endpoint PUT de type /ressource
   * @param api : api utilisée
   */
  save(
    ressource: string,
    obj: any,
    hasPutEndpointNoId?: boolean,
    api: string = 'api'
  ): Observable<any> {
    let request: Observable<any>;
    let objUrlPart: string;

    if (obj.id) {
      objUrlPart = hasPutEndpointNoId ? '' : `/${obj.id}`;
      request = this._http.put(`${api}/${ressource}${objUrlPart}`, obj);
    } else {
      request = this._http.post(`${api}/${ressource}`, obj);
    }

    return request;
  }

  /*************************************** PUT ***************************************/
  /**
   * update générique
   * @param url url de l'api
   * @param obj objet à modifier
   */
  put(url: string, obj: any): Observable<any> {
    return this._http.put(`${url}`, obj);
  }

  /*************************************** POST ***************************************/
  /**
   * post parametrable (utilisé pour l'api référentiel utilisateur)
   * @param url url de l'api
   * @param formData: data représentant le fichier à envoyer
   * @param obj objet à modifier ou options pour l'envoie de fichier
   */
  post(url: string, obj: any | {headers: HttpHeaders}, formData?: FormData): Observable<any> {
    let req: Observable<any>;
    if (formData) {
      const options = obj;
      req = this._http.post(url, formData, options);
    } else {
      req = this._http.post(`${url}`, obj);
    }
    return req;
  }

  /**
   * post parametrable synchrone
   * @param url url de l'api
   * @param obj objet à modifier
   */
  async postAsync(url: string, obj: any): Promise<any> {
    return this._http.post(`${url}`, obj).toPromise();
  }

  /*************************************** DELETE ***************************************/
  /**
   * Delete generique
   * @param ressource ressource de l'api
   * @param obj : soit l'objet à delete soit des parametres
   * @param api : api utilisé, default : 'api'
   */
  delete(ressource: string, obj: any, api: string = 'api'): Observable<any> {
    let req: Observable<any>;
    if (obj && obj.id) {
      req = this._http.delete(`${api}/${ressource}/${obj.id}`);
    } else {
      req = this._http.request('delete', `${api}/${ressource}`, {
        body: obj
      });
    }
    return req;
  }
}
