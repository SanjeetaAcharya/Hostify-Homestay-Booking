const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getHostBookings,
  updateBookingStatus,
} = require('../controllers/bookingController');
const { protect, requireRole } = require('../middleware/auth');

router.post('/', protect, requireRole('guest'), createBooking);
router.get('/mine', protect, requireRole('guest'), getMyBookings);
router.get('/host', protect, requireRole('host'), getHostBookings);
router.put('/:id/status', protect, requireRole('host'), updateBookingStatus);

module.exports = router;