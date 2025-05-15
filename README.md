# Ship Maintenance Dashboard

A comprehensive web application designed for managing ship maintenance operations. This application provides a centralized platform for administrators, inspectors, and engineers to track ships, components, and maintenance jobs with role-based access control.

## Purpose

This application helps maritime organizations efficiently manage their fleet maintenance by:

- Tracking the status and details of all ships in the fleet
- Managing maintenance jobs and their assignments
- Monitoring component health and maintenance schedules
- Providing role-specific access to different features

## Key Features

- **Interactive Dashboard**: Visual representation of KPIs and maintenance status
- **Ship Management**: Add, view, edit, and track ships in the fleet
- **Job Management**: Create, assign, and monitor maintenance jobs
- **Maintenance Calendar**: Schedule and visualize maintenance activities
- **Role-Based Access Control**: Different access levels for Admins, Inspectors, and Engineers
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: User-selectable interface theme
- **Local Storage**: Persistent data storage between sessions

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository
   ```
   git clone https://github.com/khyatin03/Ship_Maintenance_Dashboard.git
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Build for production
   ```
   npm run build
   ```

5. Preview production build
   ```
   npm run preview
   ```

## Deployed Link

The application is deployed and can be accessed at:
[https://ship-maintenance-dashboard-theta.vercel.app/](https://ship-maintenance-dashboard-theta.vercel.app/)

## Project Structure

### Root Files
- **App.tsx**: Main application component with routing and context providers
- **main.tsx**: Entry point that renders the App component
- **index.html**: HTML template with font imports and root element
- **tailwind.config.js**: Tailwind CSS configuration

### State Management
The application uses Zustand for state management with the following stores:
- **authStore.ts**: Manages user authentication, login/logout, and role-based access
- **shipStore.ts**: Manages ship data including CRUD operations
- **taskStore.ts**: Manages maintenance tasks, assignments, and status
- **notificationStore.ts**: Manages system notifications

### Pages
The application includes the following pages:
- **Dashboard.tsx**: Main dashboard with KPIs, charts, and notifications
- **ShipInventory.tsx**: Displays a list of ships with filtering and sorting options
- **ShipDetails.tsx**: Shows detailed information about a specific ship and its components
- **MaintenanceTasks.tsx**: Displays and manages maintenance jobs with filtering by status
- **MaintenanceCalendar.tsx**: Calendar view for scheduling and visualizing maintenance activities

### Components
Organized by feature area:
- **Authentication**: Login forms and authentication-related components
- **Layout**: Layout components including Navbar and Sidebar
- **UI**: Reusable UI components like cards, badges, and modals

## Routing Structure

The application uses `react-router-dom` to define routes:

### Public Routes
- `/login`: Displays the login page for authentication

### Private Routes
Protected routes are wrapped in the `ProtectedRoute` component, which ensures:
1. The user is authenticated
2. The user has the required role(s) to access the route

#### Routes and Roles
| Path               | Component          | Roles Allowed                  | Description                       |
|--------------------|--------------------|---------------------------------|-----------------------------------|
| `/dashboard`       | Dashboard          | All authenticated users        | Main dashboard with KPIs and charts |
| `/ships`           | ShipInventory      | Admin, Inspector               | List of all ships in the fleet    |
| `/ships/:id`       | ShipDetails        | Admin, Inspector               | Detailed view of a specific ship  |
| `/tasks`           | MaintenanceTasks   | Admin, Inspector, Engineer     | List and management of jobs       |
| `/calendar`        | MaintenanceCalendar| All authenticated users        | Calendar view of maintenance tasks|

## Role-Based Access Control

The application implements a comprehensive role-based access control system with three user roles:

### User Roles
1. **Admin**: Full access to all features
   - Can manage ships, components, and jobs
   - Can assign jobs to engineers
   - Can view all dashboard data

2. **Inspector**:
   - Can view and edit ships and components
   - Can create and assign maintenance jobs
   - Cannot delete critical data

3. **Engineer**:
   - Can view assigned maintenance jobs
   - Can update job status and add notes
   - Limited access to ship details

### Default User Accounts
The system comes with pre-configured user accounts for testing:
- Admin: admin@entnt.com / admin123
- Inspector: inspector@entnt.in / inspect123
- Engineer: engineer@entnt.in / engine123

## UI and Styling
The application features a clean, professional design with:
- **Tailwind CSS**: For utility-based styling
- **Responsive Layout**: Adapts to different screen sizes
- **Dark/Light Theme**: Toggle between color schemes
- **Interactive Elements**: Hover effects and transitions for buttons and links

## Data Management
The application uses Zustand for state management and localStorage for persistence:
- **Zustand Stores**: Each major data type (auth, ships, tasks) has its own store
- **Local Storage**: Data persists between sessions using browser localStorage
- **Mock Data**: Initial data is loaded when the application first runs

## Technologies Used
- **React 18**: Component-based UI library
- **TypeScript**: For type safety and better developer experience
- **React Router 6**: For routing and navigation
- **Zustand**: For state management
- **Tailwind CSS**: For styling and responsive design
- **Lucide React**: For icons
- **date-fns**: For date manipulation
- **Vite**: Fast build tool and development server

## License
This project is licensed under the MIT License.
