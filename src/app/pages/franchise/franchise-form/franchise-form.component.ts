import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms'
import { FranchiseService } from '../shared/franchise.service';

@Component({
  selector: 'franchise-form',
  templateUrl: './franchise-form.component.html',
  styleUrls: ['./franchise-form.component.scss']
})
export class FranchiseFormComponent implements OnInit {
  franchiseForm: FormGroup;

  constructor(private franchiseService: FranchiseService){

  }

  ngOnInit() {
    let name = new FormControl("", [Validators.required]);
    let outline = new FormControl();
    let games = new FormControl();
    let aliases = new FormControl();

    this.franchiseForm = new FormGroup({
      name : name,
      outline: outline,
      games : games,
      aliases : aliases
    })
  }

  addOrEditFranchise(formValues){
    if(this.franchiseForm.valid){
      this.franchiseService.addOrEditFranchise(formValues);
      this.franchiseForm.reset();
    }else{
      console.log("Form invalid")
    }
  }
}