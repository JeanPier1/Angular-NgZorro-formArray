import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
/*export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  radioValue = 'A';

  loading = false;
  avatarUrl?: string;
  contador: number = 0;

  formGroup: FormGroup = new FormGroup({});
  arrayfiles: any[] = [];

  /*  Ngform */

  constructor(private msg: NzMessageService, private _fb: FormBuilder) {}

  ngOnInit(): void {
    /* Init FormGroup */
    this.newFormgroup();
  }

  newFormgroup() {
    this.formGroup = this._fb.group({
      value: ['A', Validators.required],
      controlValue: [''],
    });
  }

  clicknew() {
    console.log(this.formGroup.value);
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'application/pdf';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 10024 / 10024 < 10;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 10MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      /*callback(reader.result!.toString().split(',')[1])*/
      callback(reader.result!.toString())
    );
    reader.readAsDataURL(img);
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    this.getBase64(file!.originFileObj!, (img: string) => {
      this.loading = false;
      this.avatarUrl = img;
    });
    if (this.contador === 1 && fileList.length > 1) {
      for (let index = 0; index < fileList.length; index++) {
        const element = fileList[index];
        this.getBase64(element.originFileObj!, (img: string) => {
          this.arrayfiles.push({ avatarUrl: img });
        });
      }
    }

    if (file.status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully`);
    } else if (file.status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
    this.contador++;
  }
}
