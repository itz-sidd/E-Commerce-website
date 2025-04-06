# 🛍️ Django E-Commerce Website

A beginner-friendly eCommerce web application built with **Django** and **Tailwind CSS**. This project features product listings, cart management, and a basic order system. Perfect for learning how eCommerce works with Django!

---

## 🚀 Features

- 📦 Product catalog with categories
- 🛒 Shopping cart functionality
- ✅ Simple order placement
- 🎨 Responsive UI with Tailwind CSS
- 🔐 Secure with CSRF protection and session-based cart

---

## 📁 Project Structure

ecommercesite/ ├── cart/ ├── orders/ ├── products/ ├── templates/ ├── static/ ├── media/ ├── db.sqlite3 └── manage.py


---

## 🔧 Tech Stack

- **Backend:** Django (Python)
- **Frontend:** HTML, Tailwind CSS
- **Database:** SQLite (default)
- **Other:** Django ORM, Sessions, Template Inheritance

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommercesite.git
cd ecommercesite

Create a Virtual Environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

Install Dependencies
pip install -r requirements.txt

Apply Migrations
python manage.py migrate

Run the Development Server
python manage.py runserver

Visit http://127.0.0.1:8000/ in your browser.
