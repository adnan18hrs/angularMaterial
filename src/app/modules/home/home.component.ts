import { Component, OnInit, Input } from '@angular/core';
import { LoggingData } from 'src/app/model/loggingData';
import { HomeService } from 'src/app/modules/home.service';
import { HttpClient } from "@angular/common/http";
import { Product } from 'src/app/model/product';
import { Router } from '@angular/router';
import { YoutubeRepository } from 'src/app/service/youtube-repository';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  //storing array in localStorage
  public cart:Product[]=[];
  //store colors
  //var storedColors = JSON.parse(localStorage.getItem("my_colors")); //get them back

  headers:any;
  products: Product[]=[];
  carts: Product[]=[];
  public oneProduct:Product;
  public popup:boolean;
  public loading:boolean;
  public error:boolean;
  constructor(private homeService:HomeService,private httpClient: HttpClient, private router:Router, public youtubeRepo:YoutubeRepository) { }
  data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //students: Student[] = studentsData; 
  
  validateEmail(email:any) {
    return true;
    //const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(String(email).toLowerCase());
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
    this.fetchData();
    /*this.httpClient.get("assets/product.json").subscribe(data =>{
      for (let index in data) {
        this.converter(data[index]);
      }
      console.log("products = ",this.products);
    })
    this.headers = this.homeService.getHttpHeader(); //this.myList.filter=""; this.myList.data.length=0;*/
  }
  fetchData(){
    const observer$ = this.youtubeRepo.getProductList();
    const loading$ = observer$[0];
    const product$ = observer$[1];
    const error$ = observer$[2];
    const loaded$ = observer$[3];
    product$.subscribe((data)=>{
      this.products = data;
      //console.log(data);
    });
    loading$.subscribe((data)=>{
      this.loading = data;
    });
    error$.subscribe((data)=>{
      this.error = data;
    });
  }

  onProduct(event, obj:Product){
    localStorage.setItem('currentProduct',JSON.stringify(obj));
    //this.router.navigate(["/product/x"]);
  }
  
  converter(p:any){
    this.oneProduct = new Product();
    this.oneProduct._id = p['_id'];
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

/*
users:User[]=[];
  loading=false;
  error=false;
  @Input() user:User;
  
  constructor(private apiService:ApiService, private youtubeRepository:YoutubeRepository,private dialog:MatDialog)  { }

  ngOnInit(): void {
    //console.log("inside ngOnInit");
    this.fetchData();
  }
  fetchData(){
    const observer$ = this.youtubeRepository.getUserList()
    const userData$ = observer$[1];
    const loading$ = observer$[0];
    const error$ = observer$[2];
    
    //(getUserData$) this data is fetched from reducer
    userData$.subscribe((data)=>{
      this.users = data;
      //console.log(data);
    });
    loading$.subscribe((data)=>{
      this.loading = data;
    });
    error$.subscribe((data)=>{
      this.error = data;
    });
  }
  tryAgain(){
    this.youtubeRepository.getUserList()
  }
  addUser(){
    this.dialog.open(UpdateUserComponent, {
      width:'256px'
    });
  }
  */
 