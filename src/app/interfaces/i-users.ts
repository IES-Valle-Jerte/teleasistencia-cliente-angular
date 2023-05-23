export interface IUsers {
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
  imagen:       File | any;
}

export interface Group {
  id:          number;
  name:        string;
  permissions: number[];
}
