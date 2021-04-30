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


if(chartType == "year")
{
  let Chartyear =  req.query.year;
  let lessYear = (parseInt(Chartyear)+1)+"-01-01";
  let greatYear = Chartyear+"-01-01";

  User.aggregate(
  [
    { $match: { date: { $lt: new Date(lessYear), $gte: new Date(greatYear) } } },
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

if(chartType == "month")
{
  let currentMonth = 0;
  let nextMonth = 0;
if(req.query.month.length == 1)
{
  console.log(parseInt("0"+req.query.month));
  nextMonth = parseInt("0"+req.query.month)  +2;
  currentMonth = parseInt("0"+req.query.month)  +1;
}
else {
  nextMonth = parseInt(req.query.month)  +2;
  currentMonth = parseInt(req.query.month)  +1;
}
  let lessYear = req.query.year+"-"+nextMonth+"-01";
  let greatYear = req.query.year+"-"+currentMonth+"-01";;
console.log(greatYear);
  User.aggregate(
  [
    { $match: { date: { $lt: new Date(lessYear), $gte: new Date(greatYear) } } },
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
                  $dateToString: { format: "%d", date: "$date" }
              },
              count: 1,
              _id: 0
          }
      }
  ],function(err,result){console.log(result);res.status(200).json(result);});
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
