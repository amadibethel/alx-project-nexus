# Online Poll System Backend

## Overview

The **Online Poll System Backend** is a real-world backend development project designed as part of the **ProDev Backend Engineering Program**.  
It focuses on building a scalable, efficient, and well-documented API that powers a real-time online polling application.

The backend provides functionalities for creating polls, casting votes, and computing results dynamically.  
This project simulates real-world backend engineering challenges — such as **API scalability**, **database optimization**, and **real-time result processing**.

---

## Project Goals

The primary objectives of the Online Poll System Backend are to:

- **API Development:**  
  Develop RESTful APIs for creating polls, casting votes, and fetching results.
  
- **Database Efficiency:**  
  Design normalized database schemas optimized for frequent voting operations and fast result computation.
  
- **Documentation:**  
  Provide comprehensive API documentation using **Swagger (drf-yasg)** for easy understanding and public access.

---

## Technologies Used

| Technology | Purpose |
|-------------|----------|
| **Django** | High-level Python web framework for building scalable backend services. |
| **PostgreSQL** | Relational database used for storing polls, options, and votes. |
| **Swagger / drf-yasg** | For interactive API documentation and endpoint visualization. |
| **Docker** *(optional)* | Containerization for consistent development and deployment environments. |
| **Git & GitHub** | Version control and collaboration. |

---

## 🧩 Key Features

### 1. Poll Management

- APIs to **create polls** with multiple options.  
- Each poll includes metadata such as title, description, creation date, and expiry time.  
- Admin users can manage or delete polls.

### 2. Voting System

- APIs that allow users to **cast votes** for any available option.  
- Includes **validations to prevent duplicate voting** from the same user or IP address.  
- Handles concurrent vote submissions efficiently.

### 3. Result Computation

- Real-time calculation of **vote counts per option**.  
- Optimized database queries for scalability with large datasets.  
- Live update of poll results with minimal latency.

### 4. API Documentation

- All endpoints are documented with **Swagger** for easy exploration.  
- Documentation hosted at:

allowing both developers and testers to view, test, and integrate endpoints easily.

---

## Implementation Process

### Git Commit Workflow

| Stage | Commit Message | Description |
|--------|----------------|-------------|
| **Initial Setup** | `feat: set up Django project with PostgreSQL` | Initialize Django project and configure database. |
| **Feature Development** | `feat: implement poll creation and voting APIs` | Add core API logic for polls and votes. |
| **Feature Extension** | `feat: add result computation API` | Implement real-time results endpoint. |
| **Optimization** | `perf: optimize vote counting queries` | Enhance performance of result computation queries. |
| **Documentation** | `feat: integrate Swagger documentation` | Add API documentation using drf-yasg. |
| **Readme Update** | `docs: update README with API usage` | Document setup and endpoint usage. |

---

## Evaluation Criteria

### 1. Functionality

- Polls and options can be created and stored accurately.  
- Voting works correctly with **no duplication** or data inconsistency.

### 2. Code Quality

- Code follows **Django best practices** and is modular.  
- PostgreSQL models are efficient, normalized, and well-indexed.  
- Proper use of **serializers**, **views**, and **permissions**.

### 3. Performance

- Vote counting queries optimized for real-time response.  
- Application supports **high concurrency** efficiently.

### 4. Documentation

- Swagger API documentation is detailed, accurate, and accessible.  
- `README.md` includes setup instructions and endpoint examples.

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- Python 3.10+
- PostgreSQL
- pipenv / venv
- Git

### Steps

1. **Clone the repository**
 ```bash
 git clone https://github.com/your-username/online-poll-backend.git
 cd online-poll-backend



