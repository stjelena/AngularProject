import { Component, OnInit, Output  } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Employee } from '../models/Employee';
import { Observable } from 'rxjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  allEmployees: Employee[] = [];

  employees: any[] = [];

  chart: any;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {

    this.calculateTotalWorkingHours();

  }

  calculateTotalWorkingHours() {
    this.service.getTotalWorkingHours().subscribe({
      next: (data: any[]) => {
          this.employees = data;
          this.createChart();
      },
      error: (error: any) => {
          console.error('Error fetching total working hours:', error);
      }
    });
  }

  getIntegerPart(number: number): number {
   return Math.floor(number); // Convert number to integer just for display
  }


  createChart() {
    const employeeData = this.employees.filter(employee => employee._id != null);
  
    const empNames = employeeData.map(employee => employee._id);
    const empWorkingHours = employeeData.map(employee => employee.totalWorkingHours);

    const totalWorkingHours = empWorkingHours.reduce((total, hours) => total + hours, 0);

    //convert number of hours to percentage
    const percentageWorkingHours = empWorkingHours.map(hours => (hours / totalWorkingHours) * 100);
    
    const getRandomColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    };

    //Make random colors
    const backgroundColors = Array.from({ length: empNames.length }, () => getRandomColor());


    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: empNames,
        datasets: [{
          label: 'Total Working Hours',
          data: percentageWorkingHours,
          backgroundColor: backgroundColors,
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  const percentage = Number(context.raw).toFixed(2); // Format to two decimal places
                  label += ': ' + percentage + '%'; // Add percentage value to label
                }
                return label;
              }
            }
          }
        }
      }
    });
  }
  

 


}
