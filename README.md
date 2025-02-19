
<p align="center">
  <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="40" font-family="Arial, sans-serif" font-size="40" font-weight="bold">
          <tspan fill="url(#blue-gradient)">Re</tspan>
          <tspan fill="white" dx="-8">Solve.</tspan>
      </text>
      <defs>
          <linearGradient id="blue-gradient" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2563eb"/>  
              <stop offset="1" stop-color="#1e40af"/>  
          </linearGradient>
      </defs>
  </svg>
</p>

<p align="center">
  A Platform to keep track of unsolved problems on LeetCode, CodeForces and AtCoder and upsolve.
</p>

## 📌 Features
- ✅ **Extract problem details** from supported platforms.
- 🔍 **Track unsolved problems** directly from the problem page.
- 🔄 **Mark problems as revisited** or delete them from the list.
- 📊 **Categorize problems** based on difficulty and tags.
- 🌙 **Dark mode support** for better UI experience.

---

## 🛠 Installation

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/yourusername/ReSolve.git
cd ReSolve
```

2️⃣ Install Dependencies

```bash
cd frontend-extension
npm install
```

3️⃣ Load the Extension in Chrome
	1.	Open chrome://extensions/ in Chrome.
	2.	Enable Developer Mode (top right corner).
	3.	Click “Load Unpacked” and select the frontend-extension/public folder.
	4.	The extension is now loaded and ready to use!

📸 Screenshots

<img width="1710" alt="Screenshot 2025-02-19 at 1 32 44 PM" src="https://github.com/user-attachments/assets/8a03a638-ea60-42bc-b5b2-32043522d165" />
<img width="1710" alt="Screenshot 2025-02-19 at 1 33 37 PM" src="https://github.com/user-attachments/assets/bff77a40-7124-47b9-b3bd-960adcb0b38a" />
<img width="227" alt="Screenshot 2025-02-19 at 1 33 49 PM" src="https://github.com/user-attachments/assets/c597e02b-4cf3-4724-8eeb-dfe6b9fd5c67" />
	

🖥️ Tech Stack
	•	Frontend: React.js + Tailwind CSS
	•	Backend: Node.js + Express.js + MongoDB
	•	Browser API: Chrome Extensions API (content scripts, background scripts, messaging)
	•	State Management: Recoil.js


👨‍💻 How It Works
	1.	User opens a problem on Codeforces, LeetCode, or AtCoder.
	2.	Extension extracts problem details automatically.
	3.	User adds the problem to their unsolved list.
	4.	User can mark the problem as revisited or remove it from the list.
	5.	Data is stored and fetched from MongoDB via the Express.js backend.

🔥 Future Enhancements
	•	📌 Advanced Filtering Options – Enable users to filter problems by tags, difficulty, and platform for a more streamlined experience.
	•	📌 Personalized Filters – Allow users to save custom filters based on their preferences, making problem selection faster and more efficient.
	•	📌 Difficulty-Based Sorting – Implement sorting functionality to prioritize problems based on difficulty levels, helping users track their progress more effectively.
	•	📌 Enhanced UI & UX – Improve visual appeal and responsiveness, ensuring a more fluid and intuitive user experience across different screen sizes.


