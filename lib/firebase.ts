import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let cachedAuth: Auth | null = null;

/**
 * Firebase Auth, inicializado sob demanda.
 *
 * Precisa ser lazy: Client Components também rodam no servidor durante o
 * prerender, e inicializar no topo do módulo faria o SDK subir no servidor
 * — inútil (a sessão só existe no browser) e capaz de quebrar o build
 * inteiro se as chaves não estiverem presentes. Todas as chamadas partem de
 * event handlers ou effects, ou seja, sempre do browser.
 */
export function getFirebaseAuth(): Auth {
  if (!cachedAuth) {
    const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
    cachedAuth = getAuth(app);
  }
  return cachedAuth;
}
