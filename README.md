<p align="center">
  <img width="405" alt="Screenshot 2025-02-19 at 1 56 57 PM" 
       src="https://github.com/user-attachments/assets/94bbfde8-8ae2-4c27-86af-5852e4155728" />
</p>

<p align="center">
	<h2>
		A platform to keep track of unsolved problems on LeetCode, CodeForces and AtCoder and upsolve.
	</h2>
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
cd backend
node server.js

cd ../frontend-web
npm run dev

cd ../frontend-extension
npm run build
```

3️⃣ Load the Extension in Chrome
- Open chrome://extensions/ in Chrome.
- Enable Developer Mode (top right corner).
- Click “Load Unpacked” and select the frontend-extension/build folder.
- The extension is now loaded and ready to use!

📸 Screenshots

<p align="center">
	<img width="1710" alt="Screenshot 2025-02-19 at 1 32 44 PM" src="https://github.com/user-attachments/assets/8a03a638-ea60-42bc-b5b2-32043522d165" />
	<img width="1710" alt="Screenshot 2025-02-19 at 1 33 37 PM" src="https://github.com/user-attachments/assets/bff77a40-7124-47b9-b3bd-960adcb0b38a" />
	<img width="227" alt="Screenshot 2025-02-19 at 1 33 49 PM" src="https://github.com/user-attachments/assets/c597e02b-4cf3-4724-8eeb-dfe6b9fd5c67" />
</p>


🖥️ Tech Stack
- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express.js + MongoDB
- Browser API: Chrome Extensions API (content scripts, background scripts, messaging)
- State Management: Recoil.js


👨‍💻 How It Works
- User opens a problem on Codeforces, LeetCode, or AtCoder.
- Extension extracts problem details automatically.
- User adds the problem to their unsolved list.
- User can mark the problem as revisited or remove it from the list.
- Data is stored and fetched from MongoDB via the Express.js backend.

🔥 Future Enhancements
- 📌 Advanced Filtering Options – Enable users to filter problems by tags, difficulty, and platform for a more streamlined experience.
- 📌 Personalized Filters – Allow users to save custom filters based on their preferences, making problem selection faster and more efficient.
- 📌 Difficulty-Based Sorting – Implement sorting functionality to prioritize problems based on difficulty levels, helping users track their progress more effectively.
- 📌 Enhanced UI & UX – Improve visual appeal and responsiveness, ensuring a more fluid and intuitive user experience across different screen sizes.


