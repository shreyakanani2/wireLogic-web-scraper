//External Imports
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

//Internal Imports
import { ScraperService } from './scraper.service';

@Component({
  selector: 'app-scraper',
  templateUrl: './scraper.component.html',
  styleUrls: ['./scraper.component.scss'],
})
export class ScraperComponent implements OnInit {
  public webUrl: string = 'https://wltest.dns-systems.net/';
  public producatData: any = [];

  constructor(private scraperService: ScraperService) {}

  ngOnInit(): void {}

  //get product options from API
  public getProductData() {
    this.scraperService
      .getProductDetails({ URL: this.webUrl })
      .pipe(map((items) => this.sortPrices(items)))
      .subscribe((data: any) => {
        this.producatData = data.map((item: any) => {
          delete item.priceByMonth;
          return item;
        });
      });
  }

  //sort price
  sortPrices(prices: any) {
    return prices.sort((a: any, b: any) => {
      const priceA = this.getPriceValue(a);
      const priceB = this.getPriceValue(b);
      return priceB - priceA;
    });
  }

  getPriceValue(item: any) {
    const price = item.price;
    const priceByMonth = item.priceByMonth;
    if (typeof price === 'string') {
      const value = parseFloat(price.substring(1));
      return priceByMonth ? value * 12 : value;
    }
    return 0;
  }
}
