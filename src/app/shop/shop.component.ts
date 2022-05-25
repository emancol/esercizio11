import { Component, OnInit } from '@angular/core';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { IBeer } from '../models/beer';
import { BeerService } from '../services/beer.service';
import { filter, distinct, map, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  reactiveForm!: FormGroup;

  ob$!: Observable<any>;

  beers: IBeer[] = [];

  beersSelected!: IBeer[];

  beersnameFilter: IBeer[] = [];
  beersTypeFilter: IBeer[] = [];
  constructor(private beerService: BeerService, private fb: FormBuilder) {
    this.reactiveForm = this.fb.group(
      {
        beerName: ['', Validators.required],
        beerSize: ['', Validators.required]
      }
    )
  }

  ngOnInit(): void {
    this.ob$ = this.beerService.getBeers();

    this.ob$.subscribe(data => this.beers = data)


    this.ob$.subscribe(data => {
      from(data).pipe(distinct((beer: any) => beer.name)).subscribe(data => this.beersnameFilter.push(data))
    })
    this.ob$.subscribe(data => {
      from(data).pipe(distinct((beer: any) => beer.type)).subscribe(data => this.beersTypeFilter.push(data))
    })



  }

  get(id: number): Observable<IBeer> {
    const result = this.beers.find(beer => beer.id) as IBeer;
    return new BehaviorSubject(result)
  }


  showCards(): void {
    console.log(this.beers)
    console.log(this.reactiveForm.value)

    this.beersSelected = this.beers.filter(el => el.name === this.reactiveForm.value.beerName && el.type === this.reactiveForm.value.beerSize);
  }

}
