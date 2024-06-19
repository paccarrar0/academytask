export class Task {
  id: string;
  name: string;
  description: string;
  priority: string;

  constructor(id: string, name: string, description: string, priority: string){
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
  }
}
