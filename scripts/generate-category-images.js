const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create the directory if it doesn't exist
const categoryDir = path.join(__dirname, '..', 'public', 'images', 'store', 'cate');
if (!fs.existsSync(categoryDir)) {
  fs.mkdirSync(categoryDir, { recursive: true });
}

// Categories with their colors
const categories = [
  { id: 'office-furniture', name: 'Office Furniture', color: '#4CAF50' },
  { id: 'books', name: 'Books', color: '#2196F3' },
  { id: 'teachers-supplies', name: 'Teacher\'s Supplies', color: '#FFC107' },
  { id: 'gifts-decoration', name: 'Gifts & Decoration', color: '#E91E63' },
  { id: 'school-supplies', name: 'School Supplies', color: '#9C27B0' },
  { id: 'office-supplies', name: 'Office Supplies', color: '#FF5722' },
  { id: 'kids', name: 'Kids', color: '#00BCD4' },
  { id: 'Kits', name: 'Kits', color: '#795548' },
  { id: 'uniforms', name: 'Uniforms', color: '#607D8B' },
  { id: 'courses', name: 'Courses', color: '#3F51B5' }
];

// Generate images
categories.forEach(category => {
  const canvas = createCanvas(300, 300);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = category.color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(category.name, canvas.width / 2, canvas.height / 2);
  
  // Save to file
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(categoryDir, `${category.id}.jpg`), buffer);
  
  console.log(`Generated image for ${category.name}`);
});

console.log('All category images generated successfully!');
