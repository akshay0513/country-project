# country-project
This project is a full-stack web application for managing countries, including their details and images. The backend is built with Express.js, Node.js and the frontend is built with Vue.js, styled using Tailwind CSS.

## Features

### Backend (Express.js, Node.js)
- **Get List of Countries:** A GET API that returns a list of countries with their IDs and names.
- **Get Country Details:** A GET API that returns detailed information about a specific country based on its ID.
- **Add New Country:** A POST API that accepts a country object and an image, saving the details in a JSON file and the image in a directory. Server-side validation ensures that the country name and rank are unique.

### Frontend (Vue.js with Tailwind CSS)
- **Country Dropdown:** Displays a dropdown list of countries. Selecting a country shows its details.
- **Add New Country Form:** Allows users to add a new country with validations:
  - Country name (min 3 chars, max 20 chars).
  - Country image (only JPG and PNG, max 4MB).
  - Continent selection from a dropdown.
  - Rank (numeric, must be unique).
- **Live Updates:** After adding a country, the list updates dynamically without a page refresh.
- **Error Handling:** Server-side validation errors are highlighted with a red border.

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Running the Project Locally

### setup
1. **Clone the repository:**
     git clone https://github.com/akshay0513/country-project.git
  ### Backend Setup   
   - cd backend
   - npm install
   - node app.js // use this command for run project
   - The backend will run on http://localhost:8081

  ### Frontend Setup
  - cd frontend
  - npm install
  - npm run serve // use this command for run project
  - The frontend will be available at http://localhost:8080

### Note- 
- If the frontend is running on http://localhost:8080, CORS is configured accordingly in the backend. If, for any reason, the frontend port changes, the CORS configuration in the backend should be updated to reflect the new port.


