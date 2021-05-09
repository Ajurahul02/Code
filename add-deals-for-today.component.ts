import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DealsForTodayService } from '../deals-for-today.service';
import { Product } from 'src/app/shared/models/product';
import { Seller } from 'src/app/shared/models/seller';
import { deals } from 'src/app/shared/models/deals-for-today';

@Component({
  selector: 'app-deals-for-today',
  templateUrl: './add-deals-for-today.component.html',
  styleUrls: ['./add-deals-for-today.component.css']
})
export class AddDealsForTodayComponent implements OnInit {
  
  errorMessage: string = '';
  successMessage: string = '';
  seller: Seller
  product:Product
  productCategoryList: string[]
  @Input()
  productRecieved: Product
  productList: Product[]
  productToBeModified: Product
  displayProducts: Boolean

  productListFromSession : Product[]
  dealsProductCategoryList: string[]
  dealsProductList: deals[]                               
  deal= new deals();

  p:Number =1;
  count: Number = 10;
  
  constructor(private fb:FormBuilder,private dealsService:DealsForTodayService) { }

  
  ngOnInit() {
    
    this.productListFromSession = JSON.parse(sessionStorage.getItem("sellerProducts"));
    this.displayProducts = true
    this.seller = JSON.parse(sessionStorage.getItem("seller"));
    console.log(this.seller.emailId);

    this.productList=this.productListFromSession 

    this.dealsService.getProductInDeals(this.seller.emailId)
      .subscribe((dealList : deals[])=> {
        this.dealsProductList = dealList
       
        this.slice()
        this.errorMessage=''
      }
      , error => {
        this.errorMessage = <any>error
        this.successMessage = '';
      }
      
    )


  }
  slice(){
    var newProductList:Product[]=[]
    for (let product1 of this.productList) {
      var flag=0
  
     for (let deal1 of this.dealsProductList){
    
       if (product1.productId== deal1.productDTO.productId) {
          flag=1
          break;
        }
     }
     if(flag==0){
     newProductList.push(product1);
     }
   
    
   }
  
   this.productList=null
   this.productList=newProductList

  }
  

  
  addNewDeal(product: Product) 
  {
    this.seller = JSON.parse(sessionStorage.getItem("seller"));
    
    this.displayProducts = false 

    this.deal.productDTO=product
    //this.deal.seller.emailId = this.seller.emailId;
  }
 


  add() {
    this.seller = JSON.parse(sessionStorage.getItem("seller"));
    console.log(this.seller);
    this.deal.sellerDTO = this.seller;
    console.log(this.deal.sellerDTO.emailId);
    console.log(this.deal);
    this.dealsService.addDeals(this.deal).subscribe(
      (response) => {
        this.successMessage ="Product added successfully and dealId:"+ response;

        console.log("response____"+response)
        console.log("response____"+this.successMessage)


        this.errorMessage = ""
        let newProductList: Product[] = []
        for (let product1 of this.productList) {
          if (product1.productId != this.deal.productDTO.productId) {
            newProductList.push(product1);
        }

      }
      this.productList=newProductList


        this.displayProducts = true
      
      }, error => {
        this.errorMessage = <any>error
        console.log(error)
        this.successMessage = "";
        this.displayProducts = true;
      }
    )
  }

}