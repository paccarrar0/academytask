export class Task {
  id: any;
  name: string;
  description: string;
  priority: string;
  date: string;

  constructor(name: string, description: string, priority: string, date: string, id?: string){
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.date = date;
  }
}