import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorHandle {

   /**
     * Handles errors with service requests.
     * @param error The error from the http response.
     */
    public handleError(error: HttpErrorResponse) {
      console.log(error);
      if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
      } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
              `Backend returned code ${error.status}, body was: ${error.error}`
          );
      }
      // return an ErrorObservable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
  }

}
