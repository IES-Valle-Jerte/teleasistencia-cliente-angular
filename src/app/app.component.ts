import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TLA - Servicio de teleasistencia';

  ngOnInit(): void {
    this.addGoogleAnalytics();
  }

  private addGoogleAnalytics(): void {
    const gaKey = environment.googleAnalyticsKey;
    if (!gaKey) return;

    // Insert gtag.js script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaKey}`;
    document.head.appendChild(script1);

    // Insert gtag config script
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaKey}');
    `;
    document.head.appendChild(script2);
  }
}
