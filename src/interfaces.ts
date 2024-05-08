export const enum HTTPSMETHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

export interface IRouteEntity {
  url: string
  method: HTTPSMETHODS
}