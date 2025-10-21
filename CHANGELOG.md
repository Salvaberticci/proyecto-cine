# Changelog

All notable changes to the Cine Glorimar project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive project documentation
- Professional README with architecture diagrams
- Contributing guidelines and code of conduct
- Troubleshooting guide for common issues
- Database schema documentation
- Screenshots and mockups section
- MIT license
- Git ignore file with comprehensive exclusions

### Changed
- Enhanced README with detailed sections and Mermaid diagrams
- Improved project structure documentation

### Fixed
- Documentation formatting and organization

## [1.0.0] - 2025-01-XX

### Added
- ✅ Complete cinema management system with MVC architecture
- ✅ RESTful APIs for movies, showtimes, theaters, and payments
- ✅ Product and order management system
- ✅ Modern web interface with EJS templates and responsive design
- ✅ MariaDB database integration with complete schema
- ✅ Complete CRUD operations for all entities
- ✅ Error handling and input validation
- ✅ Mobile-first responsive UI with gradient designs
- ✅ Separation of concerns with clean architecture
- ✅ Async/await implementation throughout
- ✅ Professional documentation and setup guides

### Technical Features
- **Backend**: Node.js + Express.js framework
- **Database**: MariaDB with normalized relational schema
- **Frontend**: EJS templates with modern CSS and JavaScript
- **Architecture**: MVC pattern with service layer
- **APIs**: RESTful endpoints with JSON responses
- **Validation**: Client and server-side input validation
- **Security**: SQL injection prevention and secure coding practices

### Database Schema
- **peliculas**: Movie catalog with title, year, duration
- **salas**: Theater rooms with capacity management
- **funciones**: Showtime scheduling system
- **metodos_pago**: Payment method definitions
- **categorias**: Movie genre classifications
- **ventas**: Sales transaction records
- **tickets**: Individual ticket management
- **productos**: Concession stand inventory
- **pedidos**: Customer order processing

### API Endpoints
- `GET/POST/PUT/DELETE /api/peliculas` - Movie management
- `GET/POST/PUT/DELETE /api/funciones` - Showtime management
- `GET/POST/PUT/DELETE /api/salas` - Theater management
- `GET/POST/PUT/DELETE /api/metodospago` - Payment methods
- `GET/POST/PUT/DELETE /api/productos` - Product management
- `GET/POST/PUT/DELETE /api/pedidos` - Order management

### User Interface
- **Dashboard**: Statistics and navigation hub
- **Product Management**: CRUD interface with search and validation
- **Order Management**: Order history and creation forms
- **Responsive Design**: Mobile-first approach with modern UI
- **Real-time Updates**: Dynamic content loading

## [0.9.0] - 2024-12-XX

### Added
- 🔄 Beta release with core functionality
- ✅ Basic CRUD operations for all entities
- ✅ Database schema and relationships
- ✅ Express routing and middleware
- ✅ EJS template integration
- ✅ Basic error handling
- ✅ Initial responsive design

### Changed
- Improved code organization
- Enhanced database relationships

### Fixed
- Initial bug fixes and optimizations

## [0.1.0] - 2024-11-XX

### Added
- 🎬 Initial project setup
- ✅ Basic project structure
- ✅ MVC architecture foundation
- ✅ Database schema design
- ✅ Basic Express server setup
- ✅ Initial EJS templates
- ✅ Package.json configuration

---

## Types of changes

- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities

---

**Legend:**
- ✅ Completed feature
- 🔄 In progress
- ❌ Removed or deprecated
- 🚀 Major new feature
- 🐛 Bug fix
- 📚 Documentation
- 🔧 Maintenance