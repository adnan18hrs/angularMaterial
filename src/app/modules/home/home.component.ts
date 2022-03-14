import { Component, OnInit, Input } from '@angular/core';
import { LoggingData } from 'src/app/model/loggingData';
import { HomeService } from 'src/app/modules/home.service';
import { HttpClient } from "@angular/common/http";
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  headers:any;
  products: Product[]=[];
  public oneProduct:Product;
  public popup:boolean;
  constructor(private homeService:HomeService,private httpClient: HttpClient) { }
  data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //students: Student[] = studentsData; 
  
  validateEmail(email:any) {
    return true;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  public onLogin(dataUI:LoggingData){
    if(true){
      console.log("username = ",dataUI.username);
      console.log("password = ",dataUI.password);
      this.homeService.tryLogging(dataUI,this.headers).subscribe(
        (response:any)=>{
          console.log("response is ",response);
            //alert(response.message);
        }
      )
    }
    else{alert("Please insert correct Email Id");}
  }
  
  ngOnInit() {
    this.httpClient.get("assets/product.json").subscribe(data =>{
      for (let index in data) {
        this.converter(data[index]);
      }
      console.log("products = ",this.products);
    })
    this.headers = this.homeService.getHttpHeader(); //this.myList.filter=""; this.myList.data.length=0;
  }
  
  converter(p:any){
    this.oneProduct = new Product();
    this.oneProduct.name = p['name'];
    this.oneProduct.image = p['image'];
    this.oneProduct.description = p['description'];
    this.oneProduct.brand = p['brand'];
    this.oneProduct.category = p['category'];
    this.oneProduct.price = p['price'];
    this.oneProduct.countInStock = p['countInStock'];
    this.oneProduct.rating = p['rating'];
    this.oneProduct.numReviews = p['numReviews'];;
    this.products.push(this.oneProduct);
  }

}
