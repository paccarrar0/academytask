export class Task {
  id: string;
  name: string;
  description: string;
  priority: string;
  date: string;

  constructor(id: string, name: string, description: string, priority: string, date: string){
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.date = date;
  }
}