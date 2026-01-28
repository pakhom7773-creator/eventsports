# Frontend - Next.js приложение

## Описание

Современное веб-приложение на Next.js 14 с TypeScript и Tailwind CSS для информационно-справочной системы спортивных мероприятий.

## Технологии

- **Next.js 14** - React фреймворк с App Router
- **TypeScript** - типизированный JavaScript
- **Tailwind CSS** - utility-first CSS фреймворк
- **Axios** - HTTP клиент
- **Lucide React** - иконки
- **date-fns** - работа с датами

## Структура проекта

```
frontend_nextjs/
├── app/                    # App Router страницы
│   ├── events/[id]/       # Страница деталей мероприятия
│   ├── profile/           # Страница профиля
│   ├── layout.tsx         # Главный layout
│   ├── page.tsx           # Главная страница
│   └── globals.css        # Глобальные стили
├── components/            # React компоненты
│   ├── AddEventModal.tsx  # Модальное окно создания мероприятия
│   ├── EventList.tsx      # Список мероприятий
│   ├── Filters.tsx        # Фильтры поиска
│   ├── Header.tsx         # Шапка сайта
│   ├── LoginModal.tsx     # Модальное окно входа/регистрации
│   ├── ReviewForm.tsx     # Форма отзыва
│   ├── ReviewList.tsx     # Список отзывов
│   └── SubscriptionButton.tsx # Кнопка подписки
├── hooks/                 # React хуки
│   └── useAuth.ts        # Хук для аутентификации
├── lib/                   # Утилиты
│   └── api.ts            # API клиент
└── types/                 # TypeScript типы
    └── index.ts
```

## Установка и запуск

### Локальная разработка

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Создайте файл `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Запустите dev сервер:**
   ```bash
   npm run dev
   ```

4. **Откройте http://localhost:3000**

### Production сборка

```bash
npm run build
npm start
```

## Деплой на Vercel

1. **Подключите репозиторий к Vercel**

2. **Настройте переменные окружения:**
   - `NEXT_PUBLIC_API_URL` - URL вашего backend API

3. **Деплой произойдет автоматически**

Подробнее в [DEPLOY.md](../DEPLOY.md)

## Основные страницы

- `/` - Главная страница со списком мероприятий
- `/events/[id]` - Детальная страница мероприятия
- `/profile` - Профиль пользователя

## Компоненты

### EventList
Отображает список мероприятий в виде карточек с возможностью перехода к деталям.

### Filters
Фильтры для поиска мероприятий:
- По названию
- По виду спорта
- По городу
- По дате начала/окончания

### ReviewForm
Форма для создания отзыва с рейтингом (1-5 звезд).

### ReviewList
Список отзывов с отображением рейтинга и комментариев.

### SubscriptionButton
Кнопка для подписки на мероприятия по виду спорта или городу.

## API интеграция

Все запросы к API выполняются через `lib/api.ts`. API клиент автоматически добавляет JWT токен из localStorage к запросам.




