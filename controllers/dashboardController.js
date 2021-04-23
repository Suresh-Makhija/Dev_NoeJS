const axios = require('axios');
const User = require('../models/User_Tbl');
const url = 'https://covid19.mathdro.id/api';
const dashboard = (req, res, next) => {
    res.render('dashboard');
}

const pieChart = async (req, res, next) => {
    try {
        const fecthData = await axios.get(url);
        res.status(200).json(fecthData.data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const patientHistoryData = async (req, res, next) => {
try {
 let chartType =  req.query.chartType;
 if(chartType == "year"){
User.aggregate(
[
    {
        $group:
        {
            _id:
            {
                year: { $year: "$date" }
            },
            count: { $sum:1 }
           ,
             date: { $first: "$date" }
        }
    },
    {
        $project:
        {
            date:
            {
                $dateToString: { format: "%Y", date: "$date" }
            },
            count: 1,
            _id: 0
        }
    }
],function(err,result){res.status(200).json(result);});

}

if(chartType == "month")
{
  User.aggregate(
  [
      {
          $group:
          {
              _id:
              {
                  month: { $month: "$date" }
              },
              count: { $sum:1 }
             ,
               date: { $first: "$date" }
          }
      },
      {
          $project:
          {
              date:
              {
                  $dateToString: { format: "%m", date: "$date" }
              },
              count: 1,
              _id: 0
          }
      }
  ],function(err,result){res.status(200).json(result);});
}

if(chartType == "week")
{
  User.aggregate(
  [
      {
          $group:
          {
              _id:
              {
                    day: { $dayOfMonth: "$date" }
              },
              count: { $sum:1 }
             ,
               date: { $first: "$date" }
          }
      },
      {
          $project:
          {
              date:
              {
                  $dateToString: { format: "%d-%m-%Y", date: "$date" }
              },
              count: 1,
              _id: 0
          }
      }
  ],function(err,result){res.status(200).json(result);});
}

} catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    dashboard,
    pieChart,
    patientHistoryData
}
