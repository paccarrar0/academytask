export class User {
  name: string;
  password: string;
  id: any;

  constructor(name: string, password: string, id?: string) {
    this.name = name;
    this.password = password;
    this.id = id
  }
}
