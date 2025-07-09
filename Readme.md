# 📝 PDR – **Glorious Tales: Stories of Grit & Glory**

---

## 1. 🎯 Project Essence

> A platform solely dedicated to telling the **true, raw, and soul-touching stories of India's greatest heroes** — **freedom fighters**, **spiritual giants**, **revolutionaries**, and **wisdom legends** — in a way that **gives them justice**.

No fiction, no fluff — just the **reality of their struggles**, the **brutality of their times**, and their **unshakable resolve**.

---

## 2. 📖 Story Format Blueprint

Every story follows a consistent emotional structure:

1. **Historical Context**
   The era, prevailing mindset, social conditions, colonial rule, caste/gender biases.

2. **Childhood & Early Life**
   Birthplace, upbringing, cultural influence, early environment.

3. **Sufferings**
   Poverty, widowhood, mental trauma, discrimination, societal rejection, shame.

4. **Struggles & Stand**
   How they evolved — through action, rebellion, speech, art, or sacrifice.

5. **Milestone Acts**
   Key moments of courage, war, writing, or revolution.

6. **Legacy Message**
   What they left behind, and why they still matter today.

---

## 3. 🧠 Filtering & Categorization

### 🔍 Filter By

* Gender
* Time Period / Era
* Region / Kingdom / Colony

### 🎯 Types of Heroes

| Type                  | Examples                         |
| --------------------- | -------------------------------- |
| ✊ Warrior by Weapon   | Maharana Pratap, Rani Laxmi Bai  |
| ✍️ Warrior by Writing | Bhagat Singh, Subramania Bharati |
| 🔥 Warrior by Revolt  | Birsa Munda, Mangal Pandey       |
| 💬 Warrior by Words   | Kabir Sahab, Swami Vivekananda   |

### ⚠️ Condition Tags

* Widow
* Paralyzed
* Mentally Stressed
* Social Outcast
* Caste/Ashram Discrimination
* Victim of Violence / Backlash

> These tags bring **raw visibility** to their hidden struggles — not just glory, but pain too.

---

## 4. 🎧 Reading + Listening Experience

### 4.1 Audio Mode

* **Voice Reference**: Human-like, emotionally powerful — inspired by *Piyush Garg*.
  Female voices = grace + pain.
  Male voices = power + restraint.

* **Soundscapes**: Subtle Indian instruments — **bansuri**, **tanpura**, **tabla** — based on story tone.

* **Narration Controls**:
  Rewind 10s • Highlight Line • Pause with mini-summaries

---

### 4.2 Reading Mode

* **Visual Style**:

  * Book-like pages with fast, smooth transitions
  * Typography: Indian-style readable font (Devanagari-inspired)
  * Instant fold animation (like flipping real pages)

* **In-Story Enhancements**:

  * Margin quotes, glossary tips, timeline references
  * **Collage-style Posters**:

    * Authentic old portraits
    * Modern-fused artwork
    * One image per chapter (like film scenes)

---

## 5. 🖼️ User Experience Goals

| Feature                   | Purpose                                    |
| ------------------------- | ------------------------------------------ |
| Realistic Storytelling    | Emotional, immersive human-like experience |
| Smooth Page Transitions   | Keeps engagement high                      |
| Condition-Based Filtering | Highlight unspoken battles                 |
| High-Impact Posters       | Visual connection to each legend           |
| AI Voice Narration        | Makes every story feel personally told     |

---

## 6. 🔐 Tech & Implementation Stack

> ⚠️ Use **JavaScript** (not TypeScript).
> ⚠️ Use **Shadcn UI** and **Lucide Icons**.

| Layer    | Technology                           |
| -------- | ------------------------------------ |
| Frontend | React + Tailwind CSS + Framer Motion |
| Backend  | Node.js + Express                    |
| Audio    | ElevenLabs / Play.ht / Google TTS    |
| CMS      | Sanity.io / Headless WordPress       |
| Database | MongoDB / PostgreSQL                 |
| Hosting  | Vercel / Firebase                    |

---

## 7. 🎯 Target Audience

* Teenagers with no access to **real Indian history**
* Youth seeking **inspiration rooted in truth**
* Spiritual seekers exploring **Kabir, Vivekananda, etc.**
* Parents wanting to **introduce Indian heroes** to kids
* Teachers, institutions, cultural activists

---

## 8. 🔮 Future Expansions

* 📱 Mobile App (Android/iOS)
* 📤 Public Upload Portal (e.g., "Submit your grandfather's story")
* 📚 Ancient Wisdom Series – Guru-disciple stories
* 🏛 Collaboration with museums & archives
* 🌐 Multi-lingual: Tamil, Marathi, Kannada, Urdu, Bengali

---

## 9. ✅ Summary Quote

> *"This is not just storytelling — this is a mirror of time.*
> *Let people walk with those who bled for truth, wrote in fire, and died unheard."*

Perfect — you want to **enable story management** through an **Admin Panel** with full **CRUD operations (Create, Read, Update, Delete)**. Let's now **extend the PDR** and include this **Admin Workflow**, so that managing your stories becomes easy, secure, and scalable.

---

## 🔧 10. 🛠️ Admin Panel – Story Management System (CMS)

### 🎯 Purpose:

A **secure, minimal, and modern** Admin Dashboard to:

* Add new legends and their stories
* Update existing story content or tags
* View and preview all stories
* Delete or archive older drafts

---

## 🧩 Features of Admin Panel

| Feature                 | Description                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| 📝 **Add Story**        | Add new story using a structured form: title, type, tags, timeline, voice type, story sections |
| 📋 **List All Stories** | Display all added stories with filtering (by type, tag, date added)                            |
| ✏️ **Edit Story**       | Update parts of the story (e.g., new section, poster update, correction)                       |
| ❌ **Delete/Archive**    | Permanently delete or soft archive story (for unpublishing)                                    |
| 📤 **Upload Posters**   | Upload hero images or collage posters via drag-drop                                            |
| 🏷️ **Manage Tags**     | Edit/create tags like "Widow", "Warrior by Writing", "Caste Backlash"                          |
| 🧪 **Preview Mode**     | Preview the story in "Reader View" or "Audio Narration View" before publishing                 |

---

## 🔐 Authentication (Admin Only)

* Login with email + password
* JWT-based token for API protection
* Role-Based Access (only Admins can edit/delete)
* Optional: Multi-admin support later

---

## 📑 Story Form Structure (for Admin Entry)

```json
{
  "title": "Birsa Munda",
  "slug": "birsa-munda",
  "type": "Warrior by Revolt",
  "gender": "Male",
  "timeline": "1875–1900",
  "conditions": ["Tribal Oppression", "Killed Young"],
  "language": "Hindi",
  "audioVoice": "Male – Deep",
  "posterImage": "URL_to_image",
  "story": {
    "context": "...",
    "childhood": "...",
    "suffering": "...",
    "struggles": "...",
    "milestones": "...",
    "message": "..."
  }
}
```

---

## 💻 Tech Stack for Admin Panel

| Layer       | Tools                             |
| ----------- | --------------------------------- |
| UI          | React + Tailwind + Shadcn UI      |
| Auth        | JWT + Bcrypt                      |
| Backend     | Express.js                        |
| DB          | MongoDB (for story schemas)       |
| CMS         | Optional: Sanity.io OR custom CMS |
| File Upload | Cloudinary / Firebase Storage     |

---

## 🧠 Sample Admin Flow (UI)

```
[Login Page]
   ↓
[Dashboard]
   - Add New Story
   - View All Stories
   - Manage Tags
   - Upload Posters
   ↓
[Story Form]
   - Title, Tags, Type
   - Section-wise content
   - Upload Image
   ↓
[Preview → Publish]
```

---

## 🔄 CRUD API Endpoints

| Method | Route              | Function        |
| ------ | ------------------ | --------------- |
| POST   | `/api/stories`     | Create Story    |
| GET    | `/api/stories`     | Get All Stories |
| GET    | `/api/stories/:id` | Get Story By ID |
| PUT    | `/api/stories/:id` | Update Story    |
| DELETE | `/api/stories/:id` | Delete Story    |

> All APIs will be **protected via middleware**, ensuring only Admin can access them.

---

## ✅ Add to PDR Index

We'll now **append this section to the PDR**:

### `10. Admin Panel (Story Management)`

* Secure access for adding, editing, updating, and deleting stories
* Poster uploads, tag management, preview mode
* Built with React + Express + MongoDB
* JWT Protected Admin Login

---

## 🌟 Features

### ✨ Core Features
- **Authentic Storytelling**: Raw, unfiltered stories with historical accuracy
- **Dark/Light Mode**: Beautiful theme switching with system preference detection
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Immersive Experience**: Book-like reading with smooth transitions

### 📧 Email Subscription System ✅ **100% COMPLETE**
- **Newsletter Signup**: Users can subscribe to get notified of new stories
- **Automatic Notifications**: Email alerts when new stories are published
- **Easy Unsubscribe**: One-click unsubscribe functionality with dedicated page
- **Beautiful Email Templates**: Professionally designed email notifications
- **Email Management**: Admin can view all subscribers and statistics

### 💬 Interactive Features ✅ **100% COMPLETE**
- **Comment System**: Users can comment and rate stories
- **Comment Moderation**: Admin approval system for comments
- **Reply System**: Nested comments with replies
- **Rating System**: 5-star rating for stories
- **Comment Management**: Admin can approve, reject, and delete comments

### 🎯 Legend Suggestions ✅ **100% COMPLETE**
- **User Submissions**: Community can suggest new legends to feature
- **Structured Forms**: Detailed suggestion forms with validation
- **Admin Review**: Admin panel to review and approve suggestions
- **Status Tracking**: Track suggestion status (pending, approved, rejected, implemented)
- **Suggestion Management**: Admin can review and update suggestion status

### 📤 Share Functionality
- **One-Click Sharing**: Copy story URLs to clipboard
- **Visual Feedback**: Share button shows "Copied!" confirmation
- **Social Ready**: URLs ready for social media sharing

### 🔧 Admin Panel ✅ **100% COMPLETE**
- **Secure Authentication**: JWT-based admin login system
- **Story Management**: Full CRUD operations for stories
- **Comment Moderation**: Approve/reject comments with admin interface
- **Suggestion Review**: Review and manage user suggestions
- **Dashboard Stats**: Overview of site statistics
- **Admin User Management**: Create and manage admin users
- **Email Notifications**: Automatic email sending when stories are published

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Gmail account for email notifications

### 1. Clone the Repository
```bash
git clone <repository-url>
cd GloriousTales
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Environment Setup

#### Backend Environment
Create a `.env` file in the `backend` directory:
```bash
cd backend
cp env.example .env
```

Edit `.env` with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/glorious-tales

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Glorious Tales <your-email@gmail.com>

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### Gmail Setup for Email Notifications
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this password in your `EMAIL_PASS` environment variable

### 4. Database Setup

#### Start MongoDB
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your Atlas connection string
```

### 5. Create Admin User
```bash
cd backend
npm run create-admin
```

This will create the initial admin user:
- **Username**: admin
- **Password**: admin123
- **Email**: admin@glorioustales.com

⚠️ **Important**: Change the password after first login!

### 6. Start the Development Servers

#### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

#### Start Frontend Server
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

### 7. Access the Application
- **Main Site**: http://localhost:5173
- **Admin Login**: http://localhost:5173/admin/login
- **Admin Panel**: http://localhost:5173/admin (after login)

## 📁 Project Structure

```
GloriousTales/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Shadcn/ui components
│   │   ├── SubscriptionForm.jsx
│   │   ├── SuggestionForm.jsx
│   │   ├── CommentSection.jsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── StoriesPage.jsx
│   │   ├── StoryDetailPage.jsx
│   │   ├── AboutPage.jsx
│   │   └── AdminStoriesPage.jsx
│   └── data/              # Static data and utilities
├── backend/               # Node.js/Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── server.js         # Main server file
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Nodemailer** - Email service
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📧 Email Features

### Email Templates
- **Welcome Email**: Sent when users subscribe
- **New Story Notification**: Sent when stories are published
- **Unsubscribe Confirmation**: Sent when users unsubscribe

### Email Configuration
The email service uses Gmail SMTP with:
- Professional HTML templates
- Responsive design
- Branded styling
- Clear call-to-action buttons

## 🔐 Admin Features

### Admin Panel Access
- Navigate to `/admin` to access the admin panel
- Currently open access (authentication coming soon)

### Admin Capabilities
- **Story Management**: Create, edit, delete, publish stories
- **Comment Moderation**: Approve/reject comments
- **Suggestion Review**: Review user suggestions
- **Dashboard Analytics**: View site statistics

## ✅ **COMPLETED FEATURES - 100% IMPLEMENTED**

### 🔐 **Admin Authentication System**
- **JWT-based authentication** with secure token management
- **Protected admin routes** with middleware verification
- **Admin login page** with beautiful UI and validation
- **Automatic token refresh** and session management
- **Logout functionality** with proper cleanup

### 📧 **Email Subscription System**
- **Complete subscription workflow** with MongoDB storage
- **Beautiful email templates** for welcome, notifications, and unsubscribe
- **Automatic email notifications** when stories are published
- **Unsubscribe page** with email parameter handling
- **Admin email management** with subscriber statistics

### 💬 **Comment System with Moderation**
- **Full comment functionality** with ratings and replies
- **Admin comment moderation** with approve/reject actions
- **Comment statistics** and analytics
- **Spam detection** and management
- **Nested reply system** for threaded discussions

### 🎯 **Suggestion System**
- **User suggestion forms** with comprehensive validation
- **Admin suggestion review** with status management
- **Suggestion statistics** and tracking
- **Status workflow** (pending → approved/rejected → implemented)

### 🔧 **Admin Panel**
- **Complete dashboard** with real-time statistics
- **Story management** with full CRUD operations
- **Comment moderation** interface
- **Suggestion review** system
- **Admin user management** with role-based permissions

### 🛠 **Technical Improvements**
- **Centralized API utility** for consistent API calls
- **Protected route components** for admin pages
- **Error handling** and user feedback
- **Loading states** and proper UX
- **Responsive design** for all admin interfaces

## 🎨 Design Features

### Theme System
- **System Preference**: Automatically detects user's theme preference
- **Manual Toggle**: Users can manually switch between light/dark modes
- **Persistent**: Theme choice is saved in localStorage
- **Smooth Transitions**: Beautiful theme switching animations

### Color Scheme
- **Primary**: Orange/Amber gradient
- **Secondary**: Red accents
- **Dark Mode**: Rich dark grays with orange accents
- **Accessibility**: High contrast ratios for readability

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablets
- **Desktop Experience**: Enhanced features for larger screens
- **Touch Friendly**: Optimized for touch interactions

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
```
Deploy the `dist` folder to your hosting service.

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables
3. Deploy to your preferred hosting service (Heroku, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Stories of India's greatest heroes and their sacrifices
- The community for suggesting new legends to feature
- Open source contributors and libraries used in this project

---

**Glorious Tales** - Giving justice to history's greatest souls through authentic storytelling.