import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'l45-portfolio';

  constructor(@Inject(PLATFORM_ID) private platform: any) { }
  
  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {
      // use localStorage API
      console.log(window.location)
    }
  }
}
