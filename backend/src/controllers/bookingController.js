const Booking = require('../models/Booking');
const Property = require('../models/Property');

exports.createBooking = async (req, res) => {
  try {
    const { property: propertyId, checkIn, checkOut, guests } = req.body;

    if (!propertyId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ message: 'Check-out must be after check-in' });
    }

    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (guests > property.guests) {
      return res.status(400).json({ message: `This property allows a maximum of ${property.guests} guests` });
    }

    // Block overlapping dates on any pending/confirmed booking for this property
    const overlapping = await Booking.findOne({
      property: propertyId,
      status: { $in: ['pending', 'confirmed'] },
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate },
    });

    if (overlapping) {
      return res.status(409).json({ message: 'These dates are not available' });
    }

    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * property.price;

    const booking = await Booking.create({
      property: propertyId,
      guest: req.user._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
    });

    res.status(201).json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user._id })
      .populate('property', 'name location image price')
      .sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getHostBookings = async (req, res) => {
  try {
    const hostProperties = await Property.find({ host: req.user._id }).select('_id');
    const propertyIds = hostProperties.map((p) => p._id);

    const bookings = await Booking.find({ property: { $in: propertyIds } })
      .populate('property', 'name location image')
      .populate('guest', 'name email')
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id).populate('property');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.property.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only manage bookings on your own properties' });
    }

    booking.status = status;
    await booking.save();
    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};