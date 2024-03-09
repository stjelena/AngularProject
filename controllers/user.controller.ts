import express from 'express'
import Employee from '../models/Employee'

export class UserController{

    getAllEmployees=(req: express.Request, res: express.Response)=>{
        Employee.find({}).then(employees=>{
            res.json(employees)
        }).catch((err)=>{
            console.log(err)
        })
    }

    getTotalWorkingHours=(req: express.Request, res: express.Response)=>{
       
            Employee.aggregate([
        {
            $group: { //GROUP BY EmployeeName
                _id: '$EmployeeName',
                totalWorkingHours: {
                    $sum: { //SUM(*)
                        $divide: [
                            { 
                                $subtract: [ //substact dates
                                    { $toDate: '$EndTimeUtc' }, // Convert EndTimeUtc(string) to Date object
                                    { $toDate: '$StarTimeUtc' } 
                                ]
                            }, 
                            1000 * 60 * 60 // Convert milliseconds to hours
                        ]
                    }
                }
            }
        },
        { $sort: { totalWorkingHours: -1 } } // Sort by total working hours
    ]).then((result) => {
        res.json(result)
    }).catch((err) => {
        console.error('Error calculating total working hours:', err);
        res.status(500).json({ error: 'Internal server error' });
    })
            
    }

   
}


   


