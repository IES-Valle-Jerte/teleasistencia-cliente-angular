import {IUsers} from '../interfaces/i-users';
export class User implements IUsers{
  id:          number;
  url:         string;
  last_login:  null;
  password : string;
  username:    string;
  first_name:  string;
  last_name:   string;
  email:       string;
  date_joined: Date;
  groups:      any;
  imagen:       File;
}

export interface Group {
  id:          number;
  name:        string;
  permissions: number[];
}
