	
/*
 * GET home page.
 */

 var template = '/views/layout';

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.StudentsAtt = function(req, res){
	res.render('StudentsAtt', {title: 'Students Attendance'});
};

exports.studentlist = function(db) {
	return function(req, res) {
		var collection = db.get('Students');
		collection.find({},{},function(e,docs){
			res.render('studentlist', {
				"studentlist" : docs
			});
		});
	};
};
exports.attendance_page = function(db) {
	return function(req, res) {
		var collection = db.get('AttendanceDb');
		collection.find({},{},function(e,docs){
			res.render('attendance_page', {
				"attendance_page" : docs
			});
		});
	};
};

exports.feestrack_page = function(db) {
	return function(req, res) {
		var collection = db.get('FeesTrackDb');
		collection.find({},{},function(e,docs){
			res.render('feestrack_page', {
				"feestrack_page" : docs
			});
		});
	};
};
exports.newstudent = function(req, res){
	res.render('newstudent', { title: 'Add new student'});
};

exports.attmark = function(req, res){
	res.render('attmark', { title: 'Add Attendance Details'});
};

exports.feestrack = function(req, res){
	res.render('feestrack', { title: 'Fees Tracking'});
};

exports.addstudent = function(db) {
	return function(req, res) {

		var studentName = req.body.studentname;
		var studentEmail = req.body.studentemail;
		var studentContactNum = req.body.studentcontactnum;
		var enrollmentDate = req.body.enrollmentdate;
		var hoursPerMnth = req.body.hourspermnth;

		var collection = db.get('Students');

        collection.insert({
        	"studentname": studentName,
        	"studentemail": studentEmail,
        	"studentcontactnum": studentContactNum,
        	"enrollmentdate": enrollmentDate,
        	"hourspermnth": hoursPerMnth
        }, function (err, doc) {
        	if (err) {
        		res.send("There was a problem adding the information to the database")
        	}
        	else {
        		res.redirect("studentlist");
        		res.location("studentlist");
        	}
        }); 
	}

}

exports.addattendance = function(db) {
	return function(req, res) {

		var studentName = req.body.studentname;
		var studentEmail = req.body.studentemail;
		var studentContactNum = req.body.studentcontactnum;
		var currentDate = req.body.currentdate;
		var presentStatus = req.body.presentstatus;
		var absentStatus = req.body.absentstatus;

		var collection = db.get('AttendanceDb');

        collection.insert({
        	"studentname": studentName,
        	"studentemail": studentEmail,
        	"studentcontactnum": studentContactNum,
        	"currentdate": currentDate,
        	"presentstatus": presentStatus,
        	"absentstatus": absentStatus
        }, function (err, doc) {
        	if (err) {
        		res.send("There was a problem adding the information to the database")
        	}
        	else {
        		res.redirect("attendance_page");
        		res.location("attendance_page");
        	}
        }); 
	}

}

exports.addfeestrack = function(db) {
	return function(req, res) {

		var studentName = req.body.studentname;
		var enrollmentDate = req.body.enrollmentdate;
		var feesPaid = req.body.feespaid;
		var feesPending = req.body.feespending;
		var totalHrs = req.body.totalhrs;
		var hrsAttended = req.body.hrsattended;

		var collection = db.get('FeesTrackDb');

        collection.insert({
        	"studentname": studentName,
        	"enrollmentdate": enrollmentDate,
        	"feespaid": feesPaid,
        	"feespending": feesPending,
        	"totalhrs": totalHrs,
        	"hrsattended": hrsAttended
        }, function (err, doc) {
        	if (err) {
        		res.send("There was a problem adding the information to the database")
        	}
        	else {
        		res.redirect("feestrack_page");
        		res.location("feestrack_page");
        	}
        }); 
	}

}



