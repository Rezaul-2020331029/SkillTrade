# SkillTrade

## Shared Library Documentation

**NPM Package:** [@cse-350/shared-library](https://www.npmjs.com/package/@cse-350/shared-library)

The `@cse-350/shared-library` is a TypeScript-based shared library designed specifically for the SkillTrade microservices architecture. This library provides common functionality, error handling, middleware, and event management across all microservices in the SkillTrade ecosystem.

### 🎯 Purpose

This shared library ensures consistency and reduces code duplication across the SkillTrade microservices by providing:

- Standardized error handling and custom error classes
- Authentication and authorization middleware
- Event-driven communication patterns using NATS Streaming
- Request validation utilities
- Common types and interfaces

### 📦 What's Included

#### **Error Handling System**

- `CustomError` - Base abstract error class for consistent error serialization
- `BadRequestError` - HTTP 400 errors for invalid requests
- `DatabaseError` - HTTP 500 errors for database connectivity issues
- `NotAuthenticatedError` - HTTP 401 errors for unauthenticated users
- `NotAuthorizeError` - HTTP 403 errors for unauthorized access
- `NotFoundError` - HTTP 404 errors for missing resources
- `RequestValidationError` - HTTP 400 errors for validation failures

#### **Middleware Components**

- `errorHandler` - Global error handling middleware that serializes custom errors
- `requireAuth` - Authentication middleware that ensures user is logged in
- `setCurrentUser` - JWT token parsing middleware that sets current user context
- `requestValidationHandler` - Express-validator error processing middleware

#### **Event-Driven Architecture**

- `Publisher` - Abstract base class for publishing events to NATS Streaming
- `Listener` - Abstract base class for subscribing to events from NATS Streaming
- **Event Types:**
  - `PaymentCreated` - Payment processing events
  - `ConnectionRequested` - Skill exchange connection requests
  - `ConnectionAccepted` - Approved connection events
  - `ConnectionRejected` - Rejected connection events
  - `ConnectionCancelled` - Cancelled connection events
  - `PostDeleted` - Post deletion events
  - `ReviewCreated` - Review creation events

#### **Key Dependencies**

- Express.js and TypeScript support
- JWT token handling with jsonwebtoken
- Cookie-session for session management
- Express-validator for request validation
- NATS Streaming for event communication

### 🔧 Usage in Microservices

Each microservice in the SkillTrade ecosystem (`skilltrade-auth`, `skilltrade-community`, `skilltrade-payments`, etc.) imports and utilizes this shared library to maintain consistency in:

- **Error responses** across all API endpoints
- **Authentication patterns** for protected routes
- **Event publishing/subscribing** for inter-service communication
- **Request validation** for API input sanitization

### 📊 Current Version

**v1.0.10** - Published and maintained for the SkillTrade microservices ecosystem
