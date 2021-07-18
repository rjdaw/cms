import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [];
  maxMessageId: number;

  @Output() messageSelectedEvent = new EventEmitter<Message>();
  @Output() messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  sortAndSend() {
    this.messages.sort((a, b) => {
      if (+a.id < +b.id) {
        return -1;
      }
      if (+a.id > +b.id) {
        return 1;
      }
      return 0;
    })
    this.messageChangedEvent.emit(this.messages.slice());
  }

  getMessages() {
    this.http.get('http://localhost:4200/messages').subscribe(
       (messages: any) => {
         console.log(messages);
         console.log("hello")
         this.messages = messages.messages;
         this.sortAndSend();
       },
       (error: any) => {
         console.log(error);
       });
  }

  getMessage(id: string) {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId() {
    let maxId: number = 0;
    for (let message of this.messages) {
      let currentId: number = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    newMessage.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, newMessage: Message }>('http://localhost:3000/messages',
      newMessage,
      { headers: headers })
      .subscribe(
        (responseData) => {

          console.log(responseData.newMessage);
          this.messages.push(responseData.newMessage);
          this.sortAndSend();
        }
      );
  }
}