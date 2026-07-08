const express = require('express');
const router = express.Router();
const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  toggleActive,
  getAvailability,
} = require('../controllers/propertyController');
const { protect, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getProperties);
router.get('/mine', protect, requireRole('host'), getMyProperties);
router.get('/:id', getProperty);
router.get('/:id/availability', getAvailability);
router.post('/', protect, requireRole('host'), upload.array('images', 10), createProperty);
router.put('/:id', protect, requireRole('host'), updateProperty);
router.put('/:id/toggle-active', protect, requireRole('host'), toggleActive);
router.delete('/:id', protect, requireRole('host', 'admin'), deleteProperty);

module.exports = router;