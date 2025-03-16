import { Injectable } from '@angular/core';
import { LoginResponse } from '../modele/LoginResponse';
import * as CryptoJs   from 'crypto-js';
import { Constants } from '../util/constants';

// npm i --save-dev @types/crypto-js optional after installing cryptojs for intellisense


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private static keyLoginInfo : string = "loginInfo";

  // Set an item in session storage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get an item from session storage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Remove an item from session storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all session storage
  clear(): void {
    localStorage.clear();
  }

  getLoginInfo(): LoginResponse | null{
    const encryptedData: string | null = this.getItem(LocalStorageService.keyLoginInfo);
    if (encryptedData == null) {
      return null;
    }
    try {
      const bytes = CryptoJs.AES.decrypt(encryptedData, Constants.SECRET_KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
      return decryptedData;
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null;
    }
  }

  storeLoginInfo(loginInfo: LoginResponse): void{
    const encryptedData = CryptoJs.AES.encrypt(JSON.stringify(loginInfo), Constants.SECRET_KEY).toString();
    this.setItem(LocalStorageService.keyLoginInfo, encryptedData);
  }

  // getIdUtilisateur(){
  //   return this.getLoginInfo()?.iduser;
  // }

  logout(){
    this.removeItem(LocalStorageService.keyLoginInfo);
  }
}