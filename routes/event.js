const express = require('express');
const router = express.Router();

 const {createEvent,getEventDetail,updateEvent,deleteEvent}=require('../controllers/event')


router.post('/',createEvent);
router.get('/:userId',getEventDetail);
router.put('/:id',updateEvent);
router.delete('/:id/:userId',deleteEvent);

module.exports=router;