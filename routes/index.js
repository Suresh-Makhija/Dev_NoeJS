const express = require('express');
var multer = require('multer');
var path = require('path');
var moment = require('moment');
var NumberInt = require("mongodb").Int32;
var moment_timezone = require('moment-timezone');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Patient_Appointment = require('../models/Patient_Appointment_Tbl');
const Patient_Tbl = require('../models/Patient_Tbl');
const Counter = require('../models/Counter_Tbl');

// cb- callback
var Storage= multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});

var upload = multer({
  storage:Storage
}).single('photo');



// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);


// Appointment
router.get('/appointment_user', ensureAuthenticated, (req, res) => {
  var data=[]


  //var dateoptions = new Date();
  //var a = moment.utc(dateoptions).local().format('YYYY-MM-DDTHH:mm:SS.sss');
  
  //console.log("A_Slash_12Hr-->",moment(a).format('DD/MM/YYYY, hh:mm a'));
  //console.log("A_Slash_24Hr-->",moment(a).format('DD/MM/YYYY, hh:mm'));
  //var b = moment(a).format('DD/MM/YYYY, hh:mm a');



  res.render('appointment_user',{ title: 'Upload File', records:data, success:''})
});

router.post('/appointment_user',upload,(req, res) => {

  const { first_name, last_name, mobile_no , gender,age,
          email_address,appointment_date_time} = req.body;
         
     var username = req.user.name;
     var userid = req.user.user_id;

      var data = [];
      var imageFile="";

    if(typeof req.file !== "undefined")
    {
      imageFile=req.file.filename;
      //  console.log("imageFile-->",imageFile);
       var success =req.file.filename+ " uploaded successfully";
       data.push({'name':imageFile});
    }
         


  let errors = [];

  if(!first_name || !last_name || !mobile_no || !appointment_date_time)
    {
      errors.push({ msg: 'Please enter all (*) Mandatory Fields' });
    } 

    //   -------------  mobile sms-----------------

   // require('dotenv').config();
    
    // const apisid = process.env.SID_ACCOUNT;
    // const authtoken = process.env.AUTH_TOKEN;
    // const client = require('twilio')(apisid,authtoken);
    // let smsResponse;
  
    

  if (errors.length > 0) {
    res.render('appointment_user', {
      errors,title: 'Upload File', records:data, success:''});
  } else {
//   -------------  mobile sms-----------------
  //  asyncCall();
    // async function asyncCall() {
    //   smsResponse = await client.messages.create({
    //    body : 'Appointment Data Added Successfully',
    //    from : process.env.MY_PHONE_NUMBER,
    //    to : req.body.phone
    //    })
   
    //    console.log("MessageCode---> ",smsResponse.errorCode)
   
    //    if(smsResponse.errorCode == null){
        

    //      const newAppointment_User = new Appointment_User({
    //       first_name,
    //       last_name, dob, gender,
    //       email,phone,service,
    //       doctor_name,appointment_date,textmsg
    //     });     

    //     newAppointment_User.save().then(appointment_user => {
    //       req.flash(
    //         'success_msg',
    //         'Appointment Details Added Successfully'
    //       );
    //        res.redirect('/appointment_user');
    //     }).catch(err => console.log(err));

    //    }else
    //    {
    //      return smsResponse.errorCode
    //    }
    // }




    const newpatient_User = new Patient_Tbl({
      first_name,
      last_name, gender,age,mobile_no,
      email_address
    });  
    
    
    const newAppointment_User = new Patient_Appointment({
      appointment_date_time
    });
    

        // toISOString.replace(/T/, ' ').replace(/\..+/, '')



        newAppointment_User.appointment_date_time = moment.utc(appointment_date_time).local().format('YYYY-MM-DDTHH:mm:SS.sss');
        // --(insert appointment Date) console.log("Current-->",newAppointment_User.appointment_date_time);

        //console.log("A--->",moment(newAppointment_User.appointment_date_time).format('DD MMM YYYY, hh:mm a'));
        //console.log("A_Slash-->",moment(newAppointment_User.appointment_date_time).format('DD/MM/YYYY, hh:mm a'));


        var duration = moment.duration({hours: 5, minutes: 30});
        var sub = moment(newAppointment_User.appointment_date_time, 'DD/MM/YYYY, hh:mm a').subtract(duration).format();
        //console.log("Subtract-->",sub);

        
        //console.log("A_Slash_sub-->",moment(sub).format('DD/MM/YYYY, hh:mm a'));

        //newAppointment_User.appointment_date_time = sub;

        //const formated_Date = '2017-07-30T15:01:13Z';
        // const date = new Date(newAppointment_User.appointment_date_time) // formated_Date - SDK returned date
        // console.log("DATE-->",date);
        // console.log(`${date.getDate()}, ${date.getMonth() +1 }, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);



        
        //console.log("Converted timezone", moment_timezone.tz(newAppointment_User.appointment_date_time, 'Asia/Kolkata').format('DD/MM/YYYY, hh:mm a'))

//         var dateoptions = new Date('2017-02-17T22:32:25.000Z');
//         //var date = new Date('2017-02-17T22:32:25.000Z');
//         const formatOptions = { 
//             day:    '2-digit', 
//             month:  '2-digit', 
//             year:   'numeric',
//             hour:   '2-digit', 
//             minute: '2-digit',
//             hour12: true 
//       };
// const dateString = dateoptions.toLocaleDateString('en-US', formatOptions);
// // => "02/17/2017, 11:32 PM"
// console.log("DATESTRING-->",dateString);
// console.log("DATESTRING2-->",dateString.replace(',', '').replace('PM', 'p.m.').replace('AM', 'a.m.'));
// dateString.replace(',', '').replace('PM', 'p.m.').replace('AM', 'a.m.');
// // => "02/17/2017 11:32 p.m."

// console.log("DATESTRING-->",dateString.replace(',', '').replace('PM', 'p.m.').replace('AM', 'a.m.'));


Patient_Tbl.findOne({mobile_no:mobile_no}).then(patienttbl => {
  if(patienttbl){
    Counter.findOne({ counter_id: "appointment_id" }).then(counter_appointment => {
      if (counter_appointment) {
        Counter.updateOne({counter_id: "appointment_id"}, {
          sequence_value : parseInt(counter_appointment.sequence_value) + 1
              }, function(err, numberAffected, rawResponse) {

                newAppointment_User.appointment_id = counter_appointment.sequence_value;
                newAppointment_User.patient_id = patienttbl.patient_id;
                newAppointment_User.save().then(appointment_user => {
                  
                  req.flash(
                    'success_msg',
                    'Appointment Details Added Successfully'
                  );
                   res.redirect('/appointment_user');
                }).catch(err => console.log(err));

                })
            }
    });


  }else
  {
    Counter.findOne({ counter_id: "patient_id" }).then(counter => {
      if (counter) {              
        Counter.updateOne({counter_id: "patient_id"}, {
            sequence_value : parseInt(counter.sequence_value) + 1
              }, function(err, numberAffected, rawResponse) {

                newpatient_User.patient_id = counter.sequence_value;
                newpatient_User.photo = imageFile;
                newpatient_User.save().then(patient_user => {

                  Counter.findOne({ counter_id: "appointment_id" }).then(counter_appointment => {
                    if (counter_appointment) {
                      Counter.updateOne({counter_id: "appointment_id"}, {
                        sequence_value : parseInt(counter_appointment.sequence_value) + 1
                            }, function(err, numberAffected, rawResponse) {
        
                                newAppointment_User.appointment_id = counter_appointment.sequence_value;
                                newAppointment_User.patient_id = newpatient_User.patient_id;
                                newAppointment_User.save().then(appointment_user => {
                                
                                  req.flash(
                                    'success_msg',
                                    'Appointment Details Added Successfully'
                                  );
                                  res.redirect('/appointment_user');
                                }).catch(err => console.log(err));
        
                                })
                             }
                          });
                        }).catch(err => console.log(err));
                      })
                    }
                });
      }
});

  }
});



router.get('/appointment_details', ensureAuthenticated, (req, res) => {


  var pipeline = [
    { 
      "$project" : { 
          "a" : "$$ROOT"
      }
  },  
  { 
      "$lookup" : { 
          "localField" : "a.patient_id", 
          "from" : "patient_appointment_tbls", 
          "foreignField" : "patient_id", 
          "as" : "b"
      }
  }, 
  { 
      "$unwind" : { 
          "path" : "$b", 
          "preserveNullAndEmptyArrays" : true
      }
  }, 
  { 
      "$lookup" : { 
          "localField" : "a.patient_id", 
          "from" : "appointment_cnt_view", 
          "foreignField" : "patient_id", 
          "as" : "c"
      }
  }, 
  { 
      "$unwind" : { 
          "path" : "$c", 
          "preserveNullAndEmptyArrays" : true
      }
  }, 
   
  { 
      "$sort" : { 
          "a.patient_id" : NumberInt(1),
          "b.appointment_date_time" : NumberInt(-1)
      }
  }, 
  { 
      "$project" : { 
          "patient_Objid" : "$a._id", 
          "patient_id" : "$a.patient_id", 
          "first_name" : "$a.first_name", 
          "last_name" : "$a.last_name", 
          "mobile_no" : "$a.mobile_no", 
          "age" : "$a.age", 
          "email_address" : "$a.email_address", 
          "photo" : "$a.photo", 
          "appointment_date_time" : { $ifNull: [ { $dateToString: { format: "%d/%m/%Y %H:%M:%S", 
          date: "$b.appointment_date_time" }} , ""]}, 
          "appointment_Objid" : "$b._id", 
          "appointment_id" : "$b.appointment_id", 
          "cnt" : "$c.cnt"
      }
  }
];

  Patient_Tbl.aggregate(pipeline,function(err,result)
  
  {
    if(err)
    {
      let errors = [];
      errors.push({ msg: err});
      res.render('appointment_details', {errors,title: 'Appoinments Details', records:''});

    }else
    {
        res.render('appointment_details', {title: 'Appoinments Details', records:result});
    }
  }
  );
});

module.exports = router;
