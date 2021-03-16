import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  phrase: string='';
  orderName: string='name';
  users$: Observable<User[]> =this.userService.getAll(`?_sort=${this.orderName}&_order=asc`);

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.users$=this.userService.getAll(`?_sort=${this.orderName}&_order=asc`)
  }
  tableSort(name: string){
    this.orderName=name;
    console.log("sort name:", this.orderName );
    this.users$=this.userService.getAll(`?_sort=${this.orderName}&_order=asc`)
  }
  deleteUser(id: number){
  if(confirm('Are you sure?')){
    this.userService.delete(id).subscribe(
      ()=>this.users$=this.userService.getAll(`?_sort=${this.orderName}&_order=asc`)
    );
  }else{
    console.log("nincs törlés");}
  }
}

