import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

/**
 * @title Worksheet - To Be Named
 */

@Component({
  selector: 'requestForm',
  templateUrl: 'requestForm.html',
  styleUrls: ['requestForm.css']
})

export class requestForm implements OnInit {
  isLinear = false;
  testNameFormGroup: FormGroup;
  labInfoFormGroup: FormGroup;
  contactFormGroup: FormGroup;
  testInfoFormGroup: FormGroup;
  collectionInfoFormGroup: FormGroup;
  stabilityInfoFormGroup: FormGroup;
  reportInfoFormGroup: FormGroup;
  refRangeFormGroup: FormGroup;
  attachmentsFormGroup: FormGroup;
  submitFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    /**
    this.stabilityInfoFormGroup = this._formBuilder.group({
      
       conditions: this._formBuilder.array([]),
       stabilityCondition: '',
        
    });
    */
  }

task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Monday', completed: false, color: 'accent'},
      {name: 'Tuesday', completed: false, color: 'accent'},
      {name: 'Wednesday', completed: false, color: 'accent'},
      {name: 'Thursday', completed: false, color: 'accent'},
      {name: 'Friday', completed: false, color: 'accent'},
      {name: 'Saturday', completed: false, color: 'accent'},
      {name: 'Sunday', completed: false, color: 'accent'}
    ]
  };

  allComplete: boolean = false;
  tmp : boolean = false;

  ngOnInit() {
    this.testNameFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.labInfoFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.contactFormGroup = this._formBuilder.group({
      contactCtrl: ['', Validators.required]
    });
    this.testInfoFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      nextthirdCtrl: []
    });
    this.collectionInfoFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.stabilityInfoFormGroup = this._formBuilder.group({
        numberOfConditions: ['', Validators.required],
        stabilityCondition: ['', Validators.required],
        stabilityValue: ['', Validators.required],
        stabilityPeriod: ['', Validators.required],
      conditions: new FormArray([]),
    });
    this.reportInfoFormGroup = this._formBuilder.group({
      sixthCtrl: ['', Validators.required]
    });
    this.refRangeFormGroup = this._formBuilder.group({
      seventhCtrl: ['', Validators.required]
    });
    this.attachmentsFormGroup = this._formBuilder.group({
      eighthCtrl: ['', Validators.required]
    });
    this.reviewFormGroup = this._formBuilder.group({
      ninthCtrl: ['', Validators.required]
    });
    this.submitFormGroup = this._formBuilder.group({
      tenthCtrl: ['', Validators.required]
    });

  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  get f() { return this.stabilityInfoFormGroup.controls; }
  get t() { return this.f.conditions as FormArray; }
  get stabilityInfoFormGroups() { return this.t.controls as FormGroup[]; }

    onAddCondition() {
        this.t.push(this._formBuilder.group({
        numberOfConditions: ['', Validators.required],
        stabilityCondition: ['', Validators.required],
        stabilityValue: ['', Validators.required],
        stabilityPeriod: ['', Validators.required],
        }));
    }

}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */