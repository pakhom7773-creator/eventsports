# ☕ Java Backend (Spring Boot)

## Backend API на Java для информационно-справочной системы спортивных мероприятий

---

## 🚀 Быстрый запуск

### Требования:
- Java 17+
- Maven 3.6+

### Запуск:

```bash
cd backend_java
mvn spring-boot:run
```

Backend будет доступен на: **http://localhost:8000**

---

## 📋 Технологии

- **Spring Boot 3.2** - фреймворк
- **Spring Data JPA** - работа с БД
- **Spring Security** - безопасность
- **JWT** - аутентификация
- **H2 Database** - для разработки
- **PostgreSQL** - для production

---

## ⚙️ Настройка

### База данных (H2 для разработки):
По умолчанию используется H2 in-memory база данных.

### Для PostgreSQL:
Измените `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/sports
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

---

## 📚 API Endpoints

- `POST /api/auth/register` - регистрация
- `POST /api/auth/login` - вход
- `GET /api/events` - список мероприятий
- `GET /api/events/{id}` - детали мероприятия
- `POST /api/events` - создание мероприятия
- `DELETE /api/events/{id}` - удаление мероприятия
- `GET /api/health` - проверка работы

---

## 🔧 Сборка

```bash
mvn clean package
java -jar target/sports-events-backend-1.0.0.jar
```

---

**Backend готов к использованию!**




