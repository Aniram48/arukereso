import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule), provideFirebaseApp(() => initializeApp({ projectId: "web-arukereso", appId: "1:433770585668:web:73db964313889f4b982611", storageBucket: "web-arukereso.firebasestorage.app", apiKey: "AIzaSyDD8Nul5Tf9a9mIAAJlkZ6CkfRMSLSIBZo", authDomain: "web-arukereso.firebaseapp.com", messagingSenderId: "433770585668" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));