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
  sortName: string='name';
  sortDirection: number=1;
  directionName: string="asc"
  users$: Observable<User[]> =this.userService.getAll(`?_sort=${this.sortName}&_order=${this.directionName}`);

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.users$=this.userService.getAll(`?_sort=${this.sortName}&_order=${this.directionName}`)
  }
  tableSort(name: string):void{
    if (name==this.sortName){
      this.sortDirection=this.sortDirection*-1;
    }else{this.sortName=name}
    this.sortDirection==1? this.directionName='asc': this.directionName='desc'
    console.log("sort name:", this.sortName , this.sortDirection);
    this.users$=this.userService.getAll(`?_sort=${this.sortName}&_order=${this.directionName}`)
  }
  deleteUser(id: number){
  if(confirm('Are you sure?')){
    this.userService.delete(id).subscribe(
      ()=>this.users$=this.userService.getAll(`?_sort=${this.sortName}&_order=${this.directionName}`)
    );
  }else{
    console.log("nincs törlés");}
  }
}

