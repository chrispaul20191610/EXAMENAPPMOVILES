import { Message } from './../../services/chat.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';// permiten interactuar con el usuario
import { finalize,tap } from 'rxjs/operators';
import {  NgZone } from '@angular/core';
import { CallbackID, Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { ActionSheetController } from '@ionic/angular';
import { UserPhoto, PhotoService} from '../../services/photo.service';
import { AngularFireStorage,AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';



export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  coordinate: any;
  watchCoordinate: any;
  watchId: any;


  @ViewChild(IonContent) content: IonContent;
 
  messages: Observable<Message[]>;
  newMsg = '';
  // File upload task 
  fileUploadTask: AngularFireUploadTask;

  // Upload progress
  percentageVal: Observable<number>;

  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;

  // Uploaded File URL
  UploadedImageURL: Observable<string>;

  // Uploaded image collection
  files: Observable<imgFile[]>;

  // Image specifications
  imgName: string;
  imgSize: number;

  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  private filesCollection: AngularFirestoreCollection<imgFile>;

  constructor(private chatService: ChatService, private router: Router,private afs: AngularFirestore,
    private afStorage: AngularFireStorage, private zone: NgZone,public photoService: PhotoService, public actionSheetController: ActionSheetController) { 
      {
        this.isFileUploading = false;
        this.isFileUploaded = false;
        
        // Define uploaded files collection
        this.filesCollection = afs.collection<imgFile>('imagesCollection');
        this.files = this.filesCollection.valueChanges();
      }
    
    }

    async ngOnInit() {
    this.messages = this.chatService.getChatMessages();
    await this.photoService.loadSaved();
    
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }

  uploadImage(event: FileList) {
      
    const file = event.item(0)

    // Image validation
    if (file.type.split('/')[0] !== 'image') { 
      console.log('File type is not supported!')
      return;
    }

    this.isFileUploading = true;
    this.isFileUploaded = false;

    this.imgName = file.name;

    // Storage path
    const fileStoragePath = `filesStorage/Nathaly/${new Date().getTime()}_${file.name}`;

    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);

    // File upload task
    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);

    // Show uploading progress
    this.percentageVal = this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      
      finalize(() => {
        // Retreive uploaded image storage path
        this.UploadedImageURL = imageRef.getDownloadURL();
        
        this.UploadedImageURL.subscribe(resp=>{
          this.storeFilesFirebase({
            name: file.name,
            filepath: resp,
            size: this.imgSize
          });
          this.isFileUploading = false;
          this.isFileUploaded = true;
        },error=>{
          console.log(error);
        })
      }),
      tap(snap => {
          this.imgSize = snap.totalBytes;
      })
    )
}


storeFilesFirebase(image: imgFile) {
    const fileId = this.afs.createId();
    
    this.filesCollection.doc(fileId).set(image).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
}


async requestPermissions() {
  const permResult = await Geolocation.requestPermissions();
  console.log('Perm request result: ', permResult);
}

getCurrentCoordinate() {
  if (!Capacitor.isPluginAvailable('Geolocation')) {
    console.log('Plugin geolocation not available');
    return;
  }
  Geolocation.getCurrentPosition().then(data => {
    this.coordinate = {
      latitude: data.coords.latitude,
      longitude: data.coords.longitude,
      accuracy: data.coords.accuracy
    };
    

  }).catch(err => {
    console.error(err);
  });
}

watchPosition() {

    this.watchId = Geolocation.watchPosition({}, (position, err) => {
      console.log('Watch', position);
      this.newMsg="Mi ubicación es " + `latitude: ${position.coords.latitude}  longuitude: ${position.coords.longitude}`
      this.zone.run(() => {
        this.watchCoordinate = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      }); 
    });
}


clearWatch() {
  if (this.watchId != null) {
    Geolocation.clearWatch({ id: this.watchId });
  }
}

public async showActionSheet(photo: UserPhoto, position: number) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Photos',
    buttons: [{
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.photoService.deletePicture(photo, position);
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        // Nothing to do, action sheet is automatically closed
       }
    }]
  });
  await actionSheet.present();
}
 
}


  

