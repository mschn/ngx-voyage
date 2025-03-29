import { Component, input } from "@angular/core";
import { MessageModule } from "primeng/message";
import { VoyageIconComponent } from "../icon";
import { Message } from "../model/message";

@Component({
  selector: "ngx-voyage-message",
  imports: [VoyageIconComponent, MessageModule],
  templateUrl: "./message.component.html",
})
export class MessageComponent {
  message = input<Message>();
}
