# Frontend Mentor - Multi-step form solution (Full-Stack Version)

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YV7mN9yZan). This project is heavily focused on advanced frontend logic, with an added custom Node.js backend to ensure secure checkout validation.

## 🚀 Features

- **Dynamic Multi-Step UI:** Seamlessly transitioning between form steps without reloading the page by manipulating DOM classes.
- **Client-Side Validation:** Real-time checking of user inputs (Name, Email, Phone) using Regular Expressions (Regex) and `blur` events to show error states instantly.
- **Complex State Management:** Tracking user choices across different steps (Plan type, Billing cycle, Add-ons) and updating the final summary dynamically.
- **Responsive Layout:** A clean, mobile-first design that adapts perfectly to desktop screens using modern CSS/Tailwind utilities.
- **API Integration:** Sending the final collected data via a `POST` request using the `fetch` API to a custom Node.js backend to verify prices before showing the success screen.

## 🛠️ Tech Stack

**Frontend:**

- HTML5 & Semantic Elements
- CSS3 & Responsive Design
- Vanilla JavaScript (DOM Manipulation, Events, Regex, Fetch API)

**Backend (For Validation):**

- Node.js & Express.js
- Vercel Serverless Functions

## 🧠 What I Learned (Frontend Focus & AI Collaboration)

Building this project was a massive level-up for my Vanilla JavaScript and UI development skills:

1. **DOM Manipulation & State Management:** I learned how to store user selections in variables and objects, and use JavaScript to inject new HTML elements or update text content (like prices and plan names) dynamically based on those selections.
2. **Form Validation Logic:** I gained practical experience using Regex to validate email and phone formats. I also learned how to improve UX by triggering these checks when the user leaves the input field, applying visual error styles dynamically.
3. **Handling Complex Interactions:** Building the Monthly/Yearly toggle switch was a great challenge. It taught me how to loop through multiple DOM elements to hide/show them and update their values simultaneously with a single click.
4. **Connecting to a Backend (`fetch` API):** I learned how to gather all the frontend data, convert it to JSON, and send it to a real server to handle the Promise response.
5. **Pair-Programming with AI:** I developed this project with the continuous guidance of an AI assistant (Gemini,GPT). Acting as a mentor, the AI helped me debug complex logic, understand full-stack architecture (the communication between Frontend and Backend), and write cleaner, more professional code. This collaborative process greatly accelerated my learning curve.

## 🔗 Links

- **Live Site URL (Frontend):** [Deploy your frontend and paste link here]
- **Live API URL (Backend):** `https://gaming-form-backend.vercel.app`
- **Solution URL on GitHub:** [Paste your GitHub repository link here]
