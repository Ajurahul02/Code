import { Component, OnInit, Input } from '@angular/core';
import { Seller } from 'src/app/shared/models/seller';
import { Product } from 'src/app/shared/models/product';
import { FormBuilder } from '@angular/forms';
import { DealsForTodayService } from '../deals-for-today.service';
import { deals } from 'src/app/shared/models/deals-for-today';


@Component({
  selector: 'display-deals-for-today',
  templateUrl: './display-deals-for-today.component.html',
  styleUrls: ['./display-deals-for-today.component.css']
})
export class DisplayDealsForTodayComponent implements OnInit {


  errorMessage: string = "";
  successMessage: string = "";
  seller: Seller
  product
  productCategoryList: string[]
  @Input()
  productRecieved: Product
  productList: Product[]
  
  displayProducts: Boolean

  productSortedList: Product[]

  dealsProductCategoryList: string[]
  dealsProductList: deals[] =[]                           
  deal: deals;
  p:Number =1;
  count: Number = 10;

  constructor(private fb:FormBuilder,private dealsService:DealsForTodayService) { }

  
  ngOnInit() {
    
    this.seller = JSON.parse(sessionStorage.getItem("seller"));



    this.dealsService.getProductInDeals(this.seller.emailId)
      .subscribe(deals => {
        this.dealsProductList = deals;
        console.log(this.dealsProductList);
        this.errorMessage = ''
      }
      , error => {
        this.errorMessage = <any>error
        this.successMessage = "";
      }
      
    )

     

    this.displayProducts = true
    
    
     
     }

     
     
     selectedProductDetails(deal:deals){
      this.displayProducts = false
      this.deal=deal
     

     }
  isDisabled(deal:deals):boolean{
    
    let curDateTime:Date=new Date();
    let curHour = curDateTime.getHours();
    let curMin = curDateTime.getMinutes();

    let endHour =deal.dealsEndsAt[3];
    let endMin = deal.dealsEndsAt[4];

    let curDate1 = curDateTime.getDate();
    let curMonth = curDateTime.getMonth();
    let curYear = curDateTime.getFullYear();

    let endDate = deal.dealsEndsAt[2];
    let endMonth = deal.dealsEndsAt[1];
    let endYear = deal.dealsEndsAt[0];
    

    if(endYear>=curYear && endMonth>=curMonth && endDate>=curDate1)
    {
    if(endHour>curHour )
      return true;
    else if(endHour == curHour && endMin > curMin)
      return true;
    }
    return false;
   
    
  }


     
  
  }