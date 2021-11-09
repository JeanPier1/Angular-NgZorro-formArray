import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formgroup',
  templateUrl: './formgroup.component.html',
  styleUrls: ['./formgroup.component.css'],
})
export class FormgroupComponent implements OnInit {
  form = this.formBuilder.group({
    lessons: this.formBuilder.array([]),
  });

  public formGroup: FormGroup;
  public formEditGroup!: FormGroup;
  public questions: FormArray = new FormArray([]);
  public answers: FormArray = new FormArray([]);
  editQuetion: boolean = false;
  checked: boolean = true;
  answerInterface: Answer = { name: '', correct: '' };

  isVisiblemodel:boolean = false;


  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      questions: this.formBuilder.array([this.createQuestion()]),
    });
  }

  ngOnInit() {}
  get lessons() {
    return this.form.controls['lessons'] as any;
  }

  addLesson() {
    const lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required],
    });
    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }

  confirmation() {
    console.log(this.form.get('lessons')?.value);
  }

  /*  ng Question  */
  GroupQuestion() {
    this.formGroup = this.formBuilder.group({
      questions: this.formBuilder.array([this.createQuestion()]),
    });
  }

  index: number = 0;
  createQuestion(): FormGroup {
    return this.formBuilder.group({
      id: [this.index++],
      name: ['', Validators.required],
      level: [1, Validators.required],
      point: [1, Validators.required],
      typeanswer: [1, Validators.required],
      validateBoolean: [''],
      answers: this.formBuilder.array([this.createAnswer()]),
    });
  }

  createAnswer(): FormGroup {
    return this.formBuilder.group({
      name: [this.answerInterface.name, Validators.required],
      correct: [this.answerInterface.correct, Validators.required],
    });
  }

  addQuestion() {
    this.questions = this.formGroup.get('questions') as FormArray;
    this.questions.push(this.createQuestion());
    this.editQuetion = false;
  }

  get questionControls() {
    return (this.formGroup.get('questions') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }

  okves(data: any) {
    console.log(data);
  }
  addAnswer(id: number): void {
    this.answers = this.questionControls[id].get('answers') as FormArray;
    this.answers.push(this.createAnswer());
  }

  answerControls(id: number) {
    return (this.questionControls[id].get('answers') as FormArray).controls;
  }

  idquestionedit: number = 0;
  clickCard(index: number) {
    this.idquestionedit = index;
    let num = this.questionControls.find((x) => x.value.id === index);
    this.editQuetion = true;
    this.formEditGroup = num as FormGroup;
  }

  modelSelectTypeAnswer(e: any) {
    this.typeAnswerSelect(parseInt(e));
  }

  typeAnswerSelect(id: number) {
    let itemarray = 0;
    if (this.editQuetion === true) {
      itemarray = this.idquestionedit;
    } else {
      itemarray = this.questionControls.length - 1;
    }
    switch (id) {
      case 1:
        this.cleanArrayAnswer();
        this.answerInterface.correct = 'false';
        this.addAnswer(itemarray);
        this.addAnswer(itemarray);
        this.addAnswer(itemarray);
        this.addAnswer(itemarray);
        break;
      case 2:
        this.cleanArrayAnswer();
        this.answerInterface.name = 'Verdadero';
        this.addAnswer(itemarray);
        this.answerInterface.name = 'Falso';
        this.addAnswer(itemarray);
        break;
      case 3:
        this.cleanArrayAnswer();
        this.addAnswer(itemarray);
        break;

      default:
        this.cleanArrayAnswer();
        this.addAnswer(itemarray);
        this.addAnswer(itemarray);
        this.addAnswer(itemarray);
        this.addAnswer(itemarray);
        break;
    }
  }

  cleanArrayAnswer() {
    while (
      (
        this.questionControls[this.questionControls.length - 1].get(
          'answers'
        ) as FormArray
      ).length !== 0
    ) {
      (
        this.questionControls[this.questionControls.length - 1].get(
          'answers'
        ) as FormArray
      ).removeAt(0);
    }
    this.answerInterface.name = '';
    this.answerInterface.correct = '';
  }

  onChangeCorrectBoolean(ev: any) {
    this.questionControls[this.questionControls.length - 1].patchValue({
      validateBoolean: ev,
    });
  }


  showModal(): void {
    this.isVisiblemodel = true;
  }
handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisiblemodel = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisiblemodel = false;
  }
  
}

export interface Answer {
  name: string;
  correct: string;
}
