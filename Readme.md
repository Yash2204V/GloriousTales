# Glorious Tales

## Short Description

**Glorious Tales** is an open-source platform dedicated to telling the authentic, raw, and inspiring stories of India's greatest heroes—freedom fighters, spiritual giants, revolutionaries, and wisdom legends. Our mission is to give justice to history’s greatest souls by presenting their struggles, sacrifices, and legacies in a deeply emotional and immersive format.

---

## Features

- **Curated Stories**: Read powerful, true stories following a consistent emotional blueprint: Historical Context → Childhood → Sufferings → Struggles → Milestone Acts → Legacy.
- **Condition-Based Filtering**: Discover heroes by life conditions (widow, paralyzed, mentally stressed, social outcast, etc.) to make their struggles visible and relatable.
- **Immersive Experience**: Book-like reading, authentic imagery, and upcoming audio narration with Indian classical music backgrounds.
- **Voice Narration**(to-be-added in future): Human-like, emotionally powerful voiceovers for each story. 
- **Suggest a Legend**: Community-driven story suggestions—submit stories of unsung heroes for inclusion.
- **Admin Dashboard**: Manage stories, comments, suggestions, and subscriptions with secure authentication.
- **Comment & Subscription System**: Engage with stories and subscribe for updates.
- **Open Source**: Actively welcoming contributions for new features, stories, and improvements.

---

## Installation Guide

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB (local or remote instance)

### 1. Clone the Repository

```bash
git clone https://github.com/Yash2204V/glorious-tales.git
cd glorious-tales
```

### 2. Setup Environment Variables

Copy the example environment file and fill in your values:

```bash
cd backend
cp env.example .env
# Edit .env to set MongoDB URI, email credentials, JWT secret, etc.
```

### 3. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ..
npm install
```

### 4. Initialize the Database

Create the initial admin user (default: username `admin`, password `admin123`):

```bash
cd backend
npm run create-admin
```
> ⚠️ Change the admin password after first login for security.

### 5. Run the Application

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd ..
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## Contribution & Pull Requests

We welcome all contributions to make Glorious Tales even more prosperous! Whether you want to add new stories, improve features, fix bugs, or enhance the UI/UX, your help is appreciated.

**How to contribute:**
1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes with clear messages.
4. Push to your fork and submit a pull request.
5. Describe your changes and reference any related issues.

**Guidelines:**
- Please follow the existing code style and naming conventions.
- For major changes, open an issue first to discuss what you would like to change.
- Make sure to test your changes before submitting a PR.

---

**This project is open source and thrives on community contributions. Let’s honor the legends of history together!** 

# 🙏 Tribute to Acharya Ji (Acharya Prashant)

This is a humble tribute to **Acharya Prashant**, a modern-day Vedanta teacher and a beacon of clarity in a confused world. His teachings cut through noise, helping seekers walk the path of truth with courage and insight.

🔗 [Acharya Prashant – YouTube](https://www.youtube.com/channel/UCMgapddJymOC6MBOiOqia1A)

🔗 [Acharya Prashant – Life and Work](https://acharyaprashant.org/en/acharya-prashant-life-and-work)

---
## 🕊 Topics He Speaks On

- Vedanta & Upanishads
- Bhagavad Gita
- Right Living in Modern Times
- Purpose, Clarity, and Inner Freedom
- Spirituality without Blind Belief

---

> May his words continue to serve those in search of Truth.