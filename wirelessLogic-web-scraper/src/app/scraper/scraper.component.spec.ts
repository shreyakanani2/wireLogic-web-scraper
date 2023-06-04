//External Imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FormsModule } from '@angular/forms';

//Internal Imports
import { ScraperComponent } from './scraper.component';
import { ScraperService } from './scraper.service';

describe('ScraperComponent', () => {
  let component: ScraperComponent;
  let fixture: ComponentFixture<ScraperComponent>;
  let scraperService: ScraperService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScraperComponent],
      imports: [HttpClientTestingModule, NgxJsonViewerModule, FormsModule],
      providers: [ScraperService],
    });
    scraperService = TestBed.inject(ScraperService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ScraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getProductData', () => {
    it('should fetch product details, sort prices, and update producatData', () => {
      component.producatData = [
        { name: 'Product A', price: 5.99 },
        { name: 'Product B', price: 10.99 },
        { name: 'Product C', price: 15.99 },
      ];
      const expectedSortedItems = [
        { name: 'Product A', price: 5.99 },
        { name: 'Product B', price: 10.99 },
        { name: 'Product C', price: 15.99 },
      ];

      spyOn(scraperService, 'getProductDetails').and.returnValue(
        of(component.producatData)
      );

      component.getProductData();

      expect(scraperService.getProductDetails).toHaveBeenCalledWith({
        URL: component.webUrl,
      });

      expect(component.producatData).toEqual(expectedSortedItems);
    });
  });

  describe('sortPrices', () => {
    it('should sort prices in descending order based on priceByMonth', () => {
      const prices = [
        { price: '$9.99', priceByMonth: false },
        { price: '$19.99', priceByMonth: false },
        { price: '$5.99', priceByMonth: true },
        { price: '$14.99', priceByMonth: true },
      ];

      const sortedPrices = component.sortPrices(prices);

      expect(sortedPrices).toEqual([
        { price: '$14.99', priceByMonth: true },
        { price: '$5.99', priceByMonth: true },
        { price: '$19.99', priceByMonth: false },
        { price: '$9.99', priceByMonth: false },
      ]);
    });

    it('should handle prices without priceByMonth', () => {
      const prices = [
        { price: '$9.99' },
        { price: '$19.99' },
        { price: '$5.99' },
        { price: '$14.99' },
      ];

      const sortedPrices = component.sortPrices(prices);

      expect(sortedPrices).toEqual([
        { price: '$19.99' },
        { price: '$14.99' },
        { price: '$9.99' },
        { price: '$5.99' },
      ]);
    });
  });
});
