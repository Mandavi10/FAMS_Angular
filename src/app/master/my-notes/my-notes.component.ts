import { Component, OnInit } from '@angular/core';
import { MynotesService } from '../../Services/MyNotes/mynotes.service';
import {Bindallfields} from '../../../Models/MyNotes/bindallfields';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent implements OnInit {
 Note : any;  BindallfieldsList: Array<Bindallfields> = []; SearchList: Array<Bindallfields> = [];
 AllDiv : boolean = true; UnReadDiv : boolean = false; UnReadDataList: Array<Bindallfields> = [];
 constructor(private MyNService :MynotesService) { }

  ngOnInit(): void {
    this.BindGrid();
  }
  BindGrid(){
    let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
    var UserId = Sessionvalue.UserId;
    var JsonData ={
      "UserId": UserId
    }
    this.MyNService.BindGrid(JSON.stringify(JsonData)).subscribe(
      (data) => {  
        this.BindallfieldsList = data.Table;
        this.SearchList = this.BindallfieldsList;
        this.UnReadDataList =  [];
  });
}
   BindMessage(Note){
      this.Note = Note;
      // let Sessionvalue = JSON.parse(sessionStorage.getItem('User'));
      // var UserId = Sessionvalue.UserId;
      // var JsonData ={
      //   "UserId" : UserId,
      //   "Result" : NMId
      // }
      // this.MyNService.ReadMessage(JSON.stringify(JsonData)).subscribe(
      //   (data) => {  
         
      //   });
}
  SearchFun(SearchData){
    debugger;
    //alert(SearchData);
    if(SearchData != ""){
      let k = 0;
      this.SearchList = [];
      for (let i=0 ;i< this.BindallfieldsList.length; i++){
          if(SearchData == this.BindallfieldsList[i].UserName
            || SearchData == this.BindallfieldsList[i].Subject){
              this.SearchList[k] = this.BindallfieldsList[i];
              k++;
          }
      }
    }
    else{
        this.SearchList = this.BindallfieldsList;
    }
  }
    UnReadFun(){
        this.AllDiv = false;
        this.UnReadDiv = true;
        this.Note = "";
     }
     AllFun(){
      this.BindGrid();
      this.AllDiv = true;
      this.UnReadDiv = false;
      this.Note = "";

     }

}
