export interface Signup {
  id?: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'unknown';
}

export interface Login {
  username: string;
  password: string;
}

export interface Token {
  token: any;
}
