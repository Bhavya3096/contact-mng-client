   **Contact Management Frontend**



**Project Overview:**


It is a web-based user interface designed to manage contact information. It allows users to perform **CRUD operations (Create, Read, Update, Delete) on contacts** through an intuitive and responsive interface.




 **Tech Stack**
      - Framework: React  
      - Language: JavaScript  
      - Styling: CSS  
      - Routing: React Router  
      - API Handling: Axios  
      - Build Tool: Vite



**Core Features**  
--> Authentication (JWT-based login/signup)  
--> Add, update, and delete contacts  
--> View list of contacts with structured UI  
--> Form validation for user input--> Pagination for contacts  
--> Responsive design for mobile and desktop  
--> Integration with backend APIs



**API Integration**  
The application interacts with backend services using REST APIs:

GET /contacts → Retrieve contacts  
POST /contacts → Create contact  
PUT /contacts/:id → Update contact  
DELETE /contacts/:id → Delete contact



**Project Structure**  
src/  
├── components/                     (# Reusable UI components)  
├── pages/                          (# Page-level components)  
├──assets/                          (# Static resources)  
├── App.jsx     



 **Deployment**
The frontend is deployed using: Vercel


  **Future Enhancements**  
    - Export contacts (CSV/PDF)  
    - Dark mode UI
