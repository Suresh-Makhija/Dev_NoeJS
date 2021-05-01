const axios = require('axios');
const Patient = require('../models/Patient_Tbl');
const Operation = require('../models/Patient_Operation_History_Tbl');
const MasterOperation = require('../models/Master_Operation_Tbl');
const PaMedical = require('../models/Patient_Medicine_History_Tbl');
const dashboard = (req, res, next) => {
    res.render('dashboard');
}


const revenueData = async (req,res,next) =>{
  try{
        let chartType =  req.query.chartType;
        if(chartType == "year")
        {
          let Chartyear =  req.query.year;
          let lessYear = (parseInt(Chartyear)+1)+"-01-01";
          let greatYear = Chartyear+"-01-01";

          PaMedical.aggregate(
          [
            { $match: { insert_date_time: { $lt: new Date(lessYear), $gte: new Date(greatYear) } } },
              {
                  $group:
                  {
                      _id:
                      {
                          month: { $month: "$insert_date_time" }
                      },
                      medicine: { $sum:"$total_price_per_medicine" }
                     ,
                       insert_date_time: { $first: "$insert_date_time" }
                  }},
                  {
                      $project:
                      {
                          date:
                          {
                              $dateToString: { format: "%m", date: "$insert_date_time" }
                          },
                          medicine: 1,
                          _id: 0
                      }
                  }



          ],function(err,result){console.log(result);res.status(200).json(result);});

        }

  }
  catch (error) {
          res.status(400).send(error.message);
      }

}

const operationHistoryData = async (req, res, next) => {
  try {
   let chartType =  req.query.chartType;


  if(chartType == "year")
  {
    let Chartyear =  req.query.year;
    let lessYear = (parseInt(Chartyear)+1)+"-01-01";
    let greatYear = Chartyear+"-01-01";

    Operation.aggregate(
    [
      { $match: { insert_date_time: { $lt: new Date(lessYear), $gte: new Date(greatYear) } } },
        {
            $group:
            {
                _id:
                {
                    month: { $month: "$insert_date_time" }
                },
                count: { $sum:1 }
               ,
                 insert_date_time: { $first: "$insert_date_time" }
            }
        },
        {
            $project:
            {
                date:
                {
                    $dateToString: { format: "%m", date: "$insert_date_time" }
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

    nextMonth = parseInt("0"+req.query.month)  +2;
    currentMonth = parseInt("0"+req.query.month)  +1;
  }
  else {
    nextMonth = parseInt(req.query.month)  +2;
    currentMonth = parseInt(req.query.month)  +1;
  }
    let lessYear = req.query.year+"-"+nextMonth+"-01";
    let greatYear = req.query.year+"-"+currentMonth+"-01";;

    Operation.aggregate(
    [
      { $match: { insert_date_time: { $lt: new Date(lessYear), $gte: new Date(greatYear) } } },
        {
            $group:
            {
                _id:
                {
                    day: { $dayOfMonth: "$insert_date_time" }
                },
                count: { $sum:1 }
               ,
                 insert_date_time: { $first: "$insert_date_time" }
            }
        },
        {
            $project:
            {
                date:
                {
                    $dateToString: { format: "%d", date: "$insert_date_time" }
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
const patientHistoryData = async (req, res, next) => {
try {
 let chartType =  req.query.chartType;


if(chartType == "year")
{
  let Chartyear =  req.query.year;
  let lessYear = (parseInt(Chartyear)+1)+"-01-01";
  let greatYear = Chartyear+"-01-01";

  Patient.aggregate(
  [
    { $match: { insert_date_time: { $lt: new Date(lessYear), $gte: new Date(greatYear) } } },
      {
          $group:
          {
              _id:
              {
                  month: { $month: "$insert_date_time" }
              },
              count: { $sum:1 }
             ,
               insert_date_time: { $first: "$insert_date_time" }
          }
      },
      {
          $project:
          {
              date:
              {
                  $dateToString: { format: "%m", date: "$insert_date_time" }
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

  nextMonth = parseInt("0"+req.query.month)  +2;
  currentMonth = parseInt("0"+req.query.month)  +1;
}
else {
  nextMonth = parseInt(req.query.month)  +2;
  currentMonth = parseInt(req.query.month)  +1;
}
  let lessYear = req.query.year+"-"+nextMonth+"-01";
  let greatYear = req.query.year+"-"+currentMonth+"-01";;

  Patient.aggregate(
  [
    { $match: { insert_date_time: { $lt: new Date(lessYear), $gte: new Date(greatYear) } } },
      {
          $group:
          {
              _id:
              {
                  day: { $dayOfMonth: "$insert_date_time" }
              },
              count: { $sum:1 }
             ,
               insert_date_time: { $first: "$insert_date_time" }
          }
      },
      {
          $project:
          {
              date:
              {
                  $dateToString: { format: "%d", date: "$insert_date_time" }
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
    operationHistoryData,
    patientHistoryData,
    revenueData
}
