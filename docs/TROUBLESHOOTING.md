# Troubleshooting Guide

This guide helps you resolve common issues when working with the Cine Glorimar project.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Database Problems](#database-problems)
- [Server Startup Issues](#server-startup-issues)
- [API Errors](#api-errors)
- [Frontend Issues](#frontend-issues)
- [Performance Problems](#performance-problems)
- [Development Environment](#development-environment)
- [Deployment Issues](#deployment-issues)

## Installation Issues

### Node.js Version Problems

**Error:** `Error: Node.js version 18+ required`

**Solution:**
```bash
# Check current Node.js version
node --version

# If using nvm, install and use Node.js 18
nvm install 18
nvm use 18

# Verify version
node --version
```

### npm Install Fails

**Error:** `npm ERR! code ENOTFOUND` or network issues

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Use different registry
npm config set registry https://registry.npmjs.org/

# Try with verbose logging
npm install --verbose

# If still failing, try yarn
npm install -g yarn
yarn install
```

### Permission Errors on Windows

**Error:** `EPERM: operation not permitted`

**Solution:**
```bash
# Run command prompt as administrator
# or use npm config to fix permissions
npm config set prefix %APPDATA%\npm
```

## Database Problems

### XAMPP MySQL Not Starting

**Symptoms:**
- MySQL service won't start
- Port 3306 already in use

**Solutions:**
```bash
# Check if port is in use
netstat -ano | findstr :3306

# Kill process using port 3306
taskkill /PID <PID> /F

# Or change XAMPP MySQL port in my.ini
# Change port from 3306 to 3307
```

### Database Connection Failed

**Error:** `ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost'`

**Solutions:**
```bash
# Reset MySQL root password
# 1. Stop MySQL service
# 2. Start MySQL with --skip-grant-tables
mysqld --skip-grant-tables

# 3. Connect and reset password
mysql -u root
UPDATE mysql.user SET Password=PASSWORD('newpassword') WHERE User='root';
FLUSH PRIVILEGES;
EXIT;

# 4. Restart MySQL normally
```

### Import Database Schema Fails

**Error:** `ERROR 1062 (23000): Duplicate entry`

**Solution:**
```bash
# Drop existing database
mysql -u root -p -e "DROP DATABASE IF EXISTS cine;"

# Recreate and import
mysql -u root -p -e "CREATE DATABASE cine;"
mysql -u root -p cine < cine.sql
```

## Server Startup Issues

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3002`

**Solutions:**
```bash
# Find process using port 3002
netstat -ano | findstr :3002

# Kill the process
taskkill /PID <PID> /F

# Or change port in app.js
const PORT = process.env.PORT || 3003;
```

### Module Not Found Errors

**Error:** `Error: Cannot find module 'express'`

**Solutions:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check if module exists
ls node_modules/express

# Clear npm cache and reinstall
npm cache clean --force
npm install
```

### EJS Template Errors

**Error:** `Error: Failed to lookup view "index" in views directory`

**Solutions:**
```bash
# Check views directory structure
ls -la views/

# Ensure EJS files exist
ls views/*.ejs

# Check app.js view configuration
# Ensure correct path in app.set('views', './views');
```

## API Errors

### 404 Not Found

**Common causes:**
- Wrong endpoint URL
- Missing route parameters
- Case sensitivity issues

**Debugging:**
```bash
# Check available routes
curl http://localhost:3002/

# Test specific endpoint
curl http://localhost:3002/api/productos

# Check route definitions in routes/*.js files
```

### 500 Internal Server Error

**Debugging steps:**
```bash
# Check server logs
tail -f logs/app.log

# Enable debug mode
DEBUG=* npm start

# Test with Postman for detailed error messages
```

### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** Add CORS middleware to `app.js`:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
```

## Frontend Issues

### Templates Not Rendering

**Symptoms:**
- Blank pages
- EJS syntax errors
- Missing styles

**Solutions:**
```bash
# Check EJS syntax
# Ensure proper opening/closing tags
<% if (condition) { %>
  <!-- content -->
<% } %>

# Verify static file serving
app.use(express.static('public'));

# Check browser console for JavaScript errors
```

### Form Submission Issues

**Common problems:**
- CSRF protection missing
- Incorrect form action URLs
- Missing form fields

**Debugging:**
```javascript
// Check form data in controller
console.log('Form data:', req.body);

// Verify form fields match controller expectations
const { nombre, precio, stock } = req.body;
```

### JavaScript Errors

**Error:** `Uncaught ReferenceError: $ is not defined`

**Solution:** Ensure jQuery or vanilla JS is loaded before custom scripts:
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/js/app.js"></script>
```

## Performance Problems

### Slow Database Queries

**Symptoms:**
- API responses taking too long
- High CPU usage

**Solutions:**
```sql
-- Add indexes to frequently queried columns
CREATE INDEX idx_pelicula_titulo ON peliculas(titulo);
CREATE INDEX idx_funcion_fecha ON funciones(fecha_hora);

-- Analyze query performance
EXPLAIN SELECT * FROM peliculas WHERE titulo LIKE '%search%';
```

### Memory Leaks

**Detection:**
```bash
# Monitor Node.js memory usage
node --inspect app.js

# Use Chrome DevTools Memory tab
# Look for growing heap size
```

**Solutions:**
- Close database connections properly
- Use connection pooling
- Implement proper error handling
- Avoid global variables

### High CPU Usage

**Debugging:**
```bash
# Profile application
node --prof app.js

# Analyze profile output
node --prof-process isolate-*.log > profile.txt
```

## Development Environment

### VS Code Extensions

**Recommended extensions:**
- ES6 Mocha Snippets
- Auto Rename Tag
- Bracket Pair Colorizer
- ESLint
- Prettier
- GitLens

### Debugging Setup

**Launch configuration (.vscode/launch.json):**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug App",
      "program": "${workspaceFolder}/app.js",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

### Testing Environment

**Setup test database:**
```bash
# Create test database
mysql -u root -p -e "CREATE DATABASE cine_test;"

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Deployment Issues

### Environment Variables

**Missing environment variables:**
```bash
# Create .env file
NODE_ENV=production
PORT=3002
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=cine
```

### Build Failures

**Common issues:**
- Missing build dependencies
- Incorrect file paths
- Permission issues

**Solutions:**
```bash
# Install production dependencies only
npm ci --only=production

# Check file permissions
chmod +x scripts/build.sh

# Verify all required files exist
ls -la config/ views/ public/
```

### PM2 Deployment

**PM2 configuration (ecosystem.config.js):**
```javascript
module.exports = {
  apps: [{
    name: 'cine-glorimar',
    script: 'app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3002
    }
  }]
};
```

**Start with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Getting Help

### Debug Information

When reporting issues, include:

```bash
# System information
node --version
npm --version
mysql --version

# Project status
git status
git log --oneline -5

# Dependencies
npm list --depth=0

# Environment
echo $NODE_ENV
echo $PORT
```

### Log Files

**Enable detailed logging:**
```javascript
// In app.js
const morgan = require('morgan');
app.use(morgan('combined'));

// Custom error logging
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### Community Support

- Check [Issues](https://github.com/your-username/proyecto-cine-glorimar/issues) on GitHub
- Review [CONTRIBUTING.md](CONTRIBUTING.md) guidelines
- Join our community discussions

---

**Last updated:** January 2025
**Version:** 1.0.0