import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-formgroup',
  templateUrl: './formgroup.component.html',
  styleUrls: ['./formgroup.component.css'],
})
export class FormgroupComponent implements OnInit, AfterViewChecked {
  public formGroup: FormGroup = new FormGroup({});
  public formEditGroup!: FormGroup;
  public questions: FormArray = new FormArray([]);
  public answers: FormArray = new FormArray([]);
  editQuetion: boolean = false;
  checked: boolean = true;
  answerInterface: Answer = { name: '', correct: '' };
  questionInterface: QuestionInterface = {
    id: 0,
    name: '',
    level: 1,
    point: 1,
    typeanswer: '1',
    validateBoolean: '',
  };

  isVisiblemodel: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.FormGruopQuestion();
    this.initarray();
  }

  FormGruopQuestion() {
    this.formGroup = this.formBuilder.group({
      questions: this.formBuilder.array([this.createQuestion()]),
    });
  }

  /*  ng Question  */
  GroupQuestion() {
    this.formGroup = this.formBuilder.group({
      questions: this.formBuilder.array([this.createQuestion()]),
    });
  }

  createQuestion(): FormGroup {
    return this.formBuilder.group({
      id: [this.questionInterface.id],
      name: [this.questionInterface.name, Validators.required],
      level: [this.questionInterface.level, Validators.required],
      point: [this.questionInterface.point, Validators.required],
      typeanswer: [this.questionInterface.typeanswer, Validators.required],
      validateBoolean: [this.questionInterface.validateBoolean],
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
    let itemarray = 0;
    if (this.editQuetion === true) {
      itemarray = this.idquestionedit;
    } else {
      itemarray = this.questionControls.length - 1;
    }
    while (
      (this.questionControls[itemarray].get('answers') as FormArray).length !==
      0
    ) {
      (this.questionControls[itemarray].get('answers') as FormArray).removeAt(
        0
      );
    }
    this.answerInterface.name = '';
    this.answerInterface.correct = '';
  }

  onChangeCorrectBoolean(ev: any) {
    if (this.editQuetion === true) {
      this.questionControls[this.idquestionedit].patchValue({
        validateBoolean: ev,
      });
    } else {
      this.questionControls[this.questionControls.length - 1].patchValue({
        validateBoolean: ev,
      });
    }
  }

  datamodelTypeAnswer: string = '';

  showModal(): void {
    this.isVisiblemodel = true;
  }
  handleOk(): void {
    this.questionInterface = {
      id: this.questionInterface.id,
      name: '',
      level: 1,
      point: 1,
      typeanswer: '1',
      validateBoolean: '',
    };
    this.questionInterface.typeanswer = this.datamodelTypeAnswer;
    this.questionInterface.id++;
    this.addQuestion();
    this.isVisiblemodel = false;
  }

  handleCancel(): void {
    this.isVisiblemodel = false;
  }

  /* Falta el array de validacion para cocretar todo esto gracias */

  /* Manito error en la validacion de verdadero y falso ..... Iddequestion */

  initarray() {
    (this.formGroup.get('questions') as FormArray).removeAt(0);
    this.questions12.forEach((question: any, index: number) => {
      this.questionInterface = {
        id: question.id,
        name: question.name,
        level: question.level,
        point: question.point,
        typeanswer: question.typeanswer,
        validateBoolean: question.validateBoolean,
      };
      this.addQuestion();
      this.cleanArrayAnswer();
      question.answers.forEach((answer: any) => {
        this.answerInterface = { name: answer.name, correct: answer.correct };
        this.addAnswer(index);
      });
    });
  }
  questions12 = [
    {
      id: 0,
      name: '¿Como se llama esta musica?',
      level: '1',
      point: 10,
      typeanswer: '1',
      validateBoolean: '',
      answers: [
        {
          name: 'C1',
          correct: true,
        },
        {
          name: 'C2',
          correct: true,
        },
        {
          name: 'C3',
          correct: true,
        },
        {
          name: 'C4',
          correct: 'false',
        },
      ],
    },
    {
      id: 1,
      name: '¿Como de be estar mu ?',
      level: '1',
      point: 10,
      typeanswer: '2',
      validateBoolean: 0,
      answers: [
        {
          name: 'Verdadero',
          correct: 0,
        },
        {
          name: 'Falso',
          correct: 0,
        },
      ],
    },
    {
      id: 2,
      name: '¿Como de be estar mu bbebebas132?',
      level: '1',
      point: 10,
      typeanswer: '2',
      validateBoolean: 1,
      answers: [
        {
          name: 'Verdadero',
          correct: 1,
        },
        {
          name: 'Falso',
          correct: 1,
        },
      ],
    },
  ];
}

export interface Answer {
  name: string;
  correct: string;
}
export interface QuestionInterface {
  id: number;
  name: string;
  level: number;
  point: number;
  typeanswer: string;
  validateBoolean: string;
}
