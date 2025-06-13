# Book Management System (BMS) - SOLID Principles Implementation

This project demonstrates the application of the **SOLID** principles in designing a clean, maintainable, and extensible Book Management System (BMS).

---

## SOLID Principles Applied

### Single Responsibility Principle (SRP)
- Divided code into classes with a single focus (e.g., `BookManager` for book logic, `Book Service` for book management).
- Each class handles only one responsibility.

### Open/Closed Principle (OCP)
- Used interfaces and abstractions to allow adding new features without modifying existing code.
- e.g., `Book` Interface for Book structure, `BookInterface` for book managing abstract methods

### Liskov Substitution Principle (LSP)
- Ensured classes implementing interfaces (e.g., `BookService` implements `BookInterface`) can be used interchangeably without breaking code.
- Followed interface contracts strictly.

### Interface Segregation Principle (ISP)
- Created small, focused interfaces so classes only implement methods they need.
- e.g., `Book` Interface, `GenreMap` Interface, `BookInterface`

### Dependency Inversion Principle (DIP)
- High-level modules depend on abstractions (interfaces), not concrete classes.
- e.g., `BookManager` depends on `BookInterface` not direct concerete classes
