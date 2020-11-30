let bookingController = {};

bookingController.getBooking = (req, res) =>{
    res.render('booking');
}

bookingController.sendBooking = (req, res) =>{
    let {day, time, email} = req.body;
    console.log({day, time, email})
    res.json(`A confirmation email has been sent with the following information: ${day}, ${time}, ${email}`);
}

module.exports = bookingController;