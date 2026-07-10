# Focus Session Dashboard ⏱️

A productivity application for planning tasks, running focus sessions (Pomodoro technique), and tracking productivity statistics.

The application works entirely on the client side and stores all user data locally, allowing users to continue their workflow after refreshing or reopening the application.

---

# ✨ Features

## 📋 Task Management

Create and manage your daily tasks:

- Add new tasks
  - Required task title
  - Optional description
- Edit task information
- Mark tasks as completed or active
- Delete tasks
- Select a task for the current focus session
- Search tasks by title
- Filter tasks by status:
  - All
  - Active
  - Completed

Each task displays:

- Task title
- Description (if available)
- Completion status
- Indicator if the task is selected for the current focus session

---

# ⏱️ Focus Sessions

A Pomodoro-style timer designed to help users stay focused and improve productivity.

## Timer Controls

Users can:

- ▶️ Start a focus session
- ⏸ Pause the timer
- 🔄 Reset the timer
- ⏭ Skip the current phase

A task must be selected before starting a focus session.

---


---

# 🤖 Automatic Behavior

When a focus session is completed:

- The completed sessions counter increases
- A new history record is created
- Task statistics are updated
- A break starts automatically if enabled

When a break finishes:

- The next focus session starts automatically if enabled

---

# 📊 Statistics

Track productivity progress and review previous sessions.

## Available Metrics

- Completed sessions today
- Total completed sessions
- Completed tasks count
- Recent session history

Each history item contains:

- Task name
- Session start time
- Session end time
- Duration
- Session type:
  - Focus
  - Break

---

# ⚙️ Settings

Customize timer behavior and application preferences.

## Timer Settings

Users can configure:

- Focus session duration
- Short break duration
- Long break duration
- Number of focus sessions before a long break

## Automation Settings

Available options:

- Auto-start breaks
- Auto-start next focus session

All changes are saved automatically and restored when the application starts.





