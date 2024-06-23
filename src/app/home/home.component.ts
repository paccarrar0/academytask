import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from '../service/task/task.service';
import { Task } from '../class/task/task';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { NewModalComponent } from '../new-modal/new-modal.component';
import { DescModalComponent } from '../desc-modal/desc-modal.component';
import { ModalService } from '../service/modal/modal.service';
import { DatePipe } from '@angular/common';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    NewModalComponent,
    DescModalComponent,
    DatePipe,
    EditModalComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public tasks!: Task[];
  public itemId!: number;
  public taskId!: string;
  public taskDescription!: string;
  public taskToShow!: Task;
  public latitude!: number;
  public longitude!: number;
  public forecast!: any;
  public loading: boolean = true;

  constructor(
    private _taskService: TaskService,
    private modalService: ModalService,
    private _httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadTasks(); // Carrega as tarefas imediatamente

    if (typeof navigator !== 'undefined' && typeof navigator.geolocation !== 'undefined') {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getWeather(this.latitude, this.longitude).subscribe((response) => {
            this.forecast = response;
            this.loadTasks(); // Recarrega as tarefas após obter a previsão do tempo
          });
        },
        (error) => {
          console.error('Erro ao obter geolocalização:', error);
          this.loadTasks();
          this.loading = false;
        }
      );
    } else {
      console.error('Geolocalização não é suportada ou indisponível pelo navegador.');
    }
  }

  openNewModal() {
    this.modalService.openModal('newModal');
  }

  loadTasks() {
    this._taskService.getTasks().subscribe((retorno) => {
      this.tasks = retorno.map((item) => {
        return new Task(
          item.name,
          item.description,
          item.priority,
          item.date,
          item.id,
          item.weather
        );
      });

      if (this.tasks.length === 0) {
        this.loading = false; // Se não houver tarefas, pare o carregamento
      } else {
        this.getForecast(); // Atualiza as previsões após carregar as tarefas
      }
    });
  }

  deleteTask(taskId: number) {
    this._taskService
      .deleteTask(taskId)
      .then(() => {
        this.loadTasks();
        console.log(`Tarefa ${taskId} excluida.`)
      })
      .catch((error) => {
        console.error('Erro ao deletar a tarefa:', error);
      });
  }

  onSubmit(newTask: Task) {
    let newTaskLocal = newTask;
    this._taskService.setTasks(newTaskLocal).subscribe(() => {
      this.loadTasks();
    });
    location.reload();
  }

  getWeather(lat: number, lon: number): Observable<any> {
    let apiKey = 'b9490bee4d65d3c8d24d96589116e0dc'; // Substitua com sua chave de API do OpenWeatherMap
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    return this._httpClient.get<any>(url);
  }

  getForecast(): void {
    if (!this.forecast || !this.forecast.list) {
      console.error('Dados de previsão não estão disponíveis ou incompletos.');
      return;
    }

    for (let i = 0; i < this.tasks.length; i++) {
      const desiredDate = this.tasks[i].date;
      let taskId = this.tasks[i].id;
      let dayForecast = this.forecast.list.find((p: any) => {
        return p.dt_txt.includes(desiredDate);
      });

      if (!dayForecast) {
        const desiredDateTime = new Date(desiredDate).getTime();
        dayForecast = this.forecast.list.reduce((closest: any, current: any) => {
          const currentDateTime = new Date(current.dt_txt).getTime();
          const closestDateTime = closest ? new Date(closest.dt_txt).getTime() : Infinity;
          const currentDiff = Math.abs(currentDateTime - desiredDateTime);
          const closestDiff = Math.abs(closestDateTime - desiredDateTime);
          return currentDiff < closestDiff ? current : closest;
        });
      }

      let dataToUpdate: Partial<Task> = { weather: dayForecast.weather.map((w: any) => w.main) };

      this._taskService.patchTask(taskId, dataToUpdate).subscribe(
        updatedTask => {
          updatedTask.description = dayForecast;
          this.tasks[i].weather = dataToUpdate.weather;
          if (i === this.tasks.length - 1) {
            this.loading = false;
          }
          console.log(`Tarefa ${taskId} atualizada com sucesso.`);
        },
        error => {
          console.log(`Erro ao atualizar a tarefa ${taskId}`, error);
        }
      );
    }
  }
}
