# SkillTrade

## 🚀 How to Run Locally

### Prerequisites

Before running SkillTrade locally, ensure you have the following installed:

- **Docker Desktop:Windows & MacOS** (with Kubernetes enabled) **OR**
- **Docker:Linux** (with [minikube](https://minikube.sigs.k8s.io/docs/start/?__hstc=226609730.4b44870ec4a577029c49e44b73bd3bee.1704931200262.1704931200263.1704931200264.1&__hssc=226609730.1.1704931200265&__hsfp=659407567&arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download) installed).

- **kubectl** - Kubernetes command-line tool
- **Skaffold** - For development workflow automation
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Rezaul-2020331029/SkillTrade.git

cd SkillTrade
```

#### 2. Enable Kubernetes in Docker Desktop

- Open Docker Desktop
- Go to Settings → Kubernetes
- Check "Enable Kubernetes"
- Click "Apply & Restart"

#### 3. Install Skaffold

```bash
# For macOS
brew install skaffold

# For Linux
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64
sudo install skaffold /usr/local/bin/

# For Windows
choco install skaffold
```

#### 4. Setup Ingress Controller (NGINX)

```bash
# For Minikube users
minikube addons enable ingress

# For other users
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

#### 5. Configure Local Domain

Add the following to your `/etc/hosts` file (or `C:\Windows\System32\drivers\etc\hosts` on Windows):

```bash
#For Docker Dekstop
127.0.0.1 skilltrade.dev
```

For minikube we first need to find the minikube IP and add it to the config file by:

```bash
minikube ip
```

#### 6. Set Environment Variables

Create the required Kubernetes secrets:

```bash
# JWT Secret
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_jwt_secret_key

# Stripe Secret (for payments)
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=your_stripe_secret_key
```

#### 7. Start the Development Environment

```bash
# Run all microservices with hot reload
skaffold dev
```

This will:

- Build all Docker images
- Deploy all microservices to Kubernetes
- Set up port forwarding
- Enable hot reload for development

### 🏗️ Architecture Overview

The SkillTrade platform consists of the following microservices:

- **skilltrade-client** - Next.js frontend application
- **skilltrade-auth** - User authentication and authorization
- **skilltrade-community** - Post management and community features
- **skilltrade-connection** - Session management and connections
- **skilltrade-payments** - Payment processing with Stripe
- **NATS Streaming** - Event-driven communication between services

### 📱 Access the Application

Once everything is running:

- **Frontend**: https://skilltrade.dev
- **API Services**: Available through the ingress controller at https://skilltrade.dev/api/*

### 🛠️ Development Commands

#### Individual Service Development

```bash
# Run specific service locally (outside Kubernetes)
cd skilltrade-auth
npm install
npm run dev

# Run tests
npm test

# Build shared library
cd shared
npm run build
npm publish  # If you have publish permissions
```

#### Kubernetes Management

```bash
# View all pods
kubectl get pods

# View services
kubectl get services

# View logs for a specific service
kubectl logs -f deployment/skilltrade-auth-depl

# Delete all resources
kubectl delete -f infra/k8s/
```

#### Database Access

Each microservice has its own MongoDB instance:

```bash
# Port forward to access databases
kubectl port-forward service/skilltrade-auth-mongodb-srv 27017:27017
kubectl port-forward service/skilltrade-community-mongodb-srv 27018:27017
kubectl port-forward service/skilltrade-connection-mongodb-srv 27019:27017
kubectl port-forward service/skilltrade-payments-mongodb-srv 27020:27017
```

### 🐛 Troubleshooting

#### Common Issues:

1. **Ingress not working**: Ensure NGINX ingress controller is installed and running. Sometimes the NGNIX deployment can take upto 5mins to be ready
2. **Services not starting**: Check if all secrets are created properly
3. **Database connection issues**: Verify MongoDB services are running
4. **Hot reload not working**: Restart skaffold with `skaffold dev --no-prune=false --cache-artifacts=false`

#### Useful Debug Commands:

```bash
# Check ingress
kubectl get ingress

# Describe problematic pods
kubectl describe pod <pod-name>

# Check events
kubectl get events --sort-by=.metadata.creationTimestamp
```

### 🧪 Running Tests

```bash
# Run all tests across services
npm run test:all

# Run tests for specific service
cd skilltrade-auth
npm test

# Run tests in watch mode
npm test -- --watch
```

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
