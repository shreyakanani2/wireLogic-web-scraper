//External Imports
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

//Internal Imports
import { ScraperService } from './scraper.service';
import { environment } from '../../environments/environment';

describe('ScraperService', () => {
  let service: ScraperService;
  let httpMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ScraperService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProductDetails', () => {
    it('should return the response from the API', (done) => {
      const mockURL = 'https://example.com/product';
      const mockResponse = { name: 'Product Name', price: 10.99 };

      service.getProductDetails(mockURL).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(`${environment.apiURL}/scrape`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });
});
