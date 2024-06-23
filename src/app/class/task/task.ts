export class Task {
  id: any;
  name: string;
  description: string;
  priority: string;
  date: string;
  weather: any;

  constructor(name: string, description: string, priority: string, date: string, id?: string, weather?: string){
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.date = date;
    this.weather = weather
  }
}