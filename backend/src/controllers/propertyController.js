const Property = require('../models/Property');
const Booking = require('../models/Booking');

exports.createProperty = async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    if (imageUrls.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const property = await Property.create({
      ...req.body,
      image: imageUrls[0],
      images: imageUrls,
      host: req.user._id,
    });

    res.status(201).json({ property });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isActive: true }).populate('host', 'name email');
    res.json({ properties });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('host', 'name email');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ property });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ host: req.user._id });
    res.json({ properties });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.toggleActive = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only manage your own properties' });
    }

    property.isActive = !property.isActive;
    await property.save();
    res.json({ property });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const bookings = await Booking.find({
      property: req.params.id,
      status: { $in: ['pending', 'confirmed'] },
    }).select('checkIn checkOut -_id');

    res.json({ bookedRanges: bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own properties' });
    }

    Object.assign(property, req.body);
    await property.save();
    res.json({ property });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    const isOwner = property.host.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'You can only delete your own properties' });
    }

    await property.deleteOne();
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};