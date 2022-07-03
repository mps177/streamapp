import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({

  
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Output() newfileData:any = new EventEmitter();

  selectedFile!: File;
  importedFile64: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelect(event : any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.importedFile64 = event.target.result;
        this.newfileData.emit(this.importedFile64);
      };
    } else {
      window.alert('Please select correct image format');
    }
  }

}
