import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload3',
  templateUrl: './upload3.component.html',
  styleUrls: ['./upload3.component.css']
})
export class Upload3Component implements OnInit {
  public progress: number;
  public message: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onUploadFinished3 = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
   
    let filesToUpload : File[] = files;
    const formData = new FormData();
      
    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file'+ index, file, file.name);
    });
   
    this.http.post('https://localhost:44330/api/Market/Upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished3.emit(event.body);
        }
      });
  }
}
