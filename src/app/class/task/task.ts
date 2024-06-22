export class Task {
  id: any;
  name: string;
  description: string;
  priority: string;
  date: string;
  //userId: string;

  constructor(name: string, description: string, priority: string, date: string, /*userId: string,*/ id?: string){
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.date = date;
    //this.userId = userId;
  }
}