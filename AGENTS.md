# AGENTS.md

## Purpose

This document defines how AI coding agents should contribute to this repository.

All generated code must follow these guidelines.

---

# Primary Goal

Build a scalable, maintainable, production-ready Next.js application.

Optimization for readability is preferred over optimization for brevity.

---

# Engineering Principles

Follow:

- SOLID
- DRY
- KISS
- Separation of Concerns
- Composition over Inheritance

---

# Architecture

UI
↓

Custom Hooks

↓

Services

↓

API

Business logic must never live inside UI components.

---

# Directory Responsibilities

app/

Routing only.

components/

Reusable UI.

features/

Feature-specific components.

hooks/

Reusable business logic.

services/

API communication.

types/

Shared interfaces.

utils/

Pure helper functions.

constants/

Application constants.

providers/

Context providers.

---

# Component Rules

Components should:

- receive props
- render UI
- avoid business logic

If a component exceeds ~200 lines, consider splitting it.

---

# Hook Rules

Hooks should:

- encapsulate logic
- expose simple APIs
- never return JSX

---

# Service Rules

Services:

- call APIs
- transform responses
- throw meaningful errors
- never manipulate UI

---

# API Rules

Use Axios instance.

Never call fetch directly throughout the app.

Create:

lib/axios.ts

Reuse the same instance.

---

# Form Rules

Use:

React Hook Form

+

Zod

Validation belongs in schemas.

---

# State Rules

Default:

React Query

Global:

Zustand

Avoid Context for frequently changing state.

---

# TypeScript

Strict mode.

Never use:

any

Prefer:

unknown

or

Generics.

---

# Error Handling

Every async operation must handle:

Loading

Success

Failure

Empty State

---

# Performance

Prefer:

Server Components

Streaming

Dynamic Imports

Memoization only when profiling indicates.

---

# Security

Never expose secrets.

Never hardcode API URLs.

Read configuration from environment variables.

---

# Accessibility

Every form control needs:

- label
- placeholder
- keyboard accessibility

---

# Code Review Checklist

Before submitting generated code ensure:

✓ No duplicated logic

✓ Type-safe

✓ No unnecessary re-renders

✓ Reusable

✓ Responsive

✓ Accessible

✓ Production-ready

✓ Consistent naming

---

# AI Behaviour

When modifying code:

1. Read surrounding files first.

2. Preserve project architecture.

3. Avoid introducing breaking changes.

4. Prefer incremental improvements.

5. Explain non-obvious decisions.

6. Do not invent APIs.

7. Ask for clarification if requirements are ambiguous.

8. Prefer maintainability over cleverness.

9. Generate idiomatic Next.js code.

10. Follow existing project conventions before introducing new patterns.