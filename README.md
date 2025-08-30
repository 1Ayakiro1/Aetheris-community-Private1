# Aetheris community private repo

Структура проекта:

```plaintext
colorit-vue-rewrite/
├─ frontend/
│  ├─ public/                   # статические файлы
│  ├─ src/
│  │  ├─ assets/                #png, svg, шрифты, иконки, scss
│  │  ├─ components/            # общие компоненты которые можно переиспользовать
│  │  │   ├─ Header.vue   
│  │  │   └─ ...
│  │  ├─ composables/           #переиспользуемый код и хуки   
│  │  ├─ views/                 # вьюшки
│  │  │   └─ Home.vue
│  │  ├─ stores/                # Pinia store
│  │  │   └─ exampleStore.ts
│  │  ├─ router/                # Vue Router - роутеры
│  │  │   └─ index.ts
│  │  ├─ App.vue                #Основной vue компонент в который монтируются остальные view
│  │  ├─ main.ts                #точка входа в приложение
│  │  └─ types/                 #TypeScript типы
│  │      └─ models.ts
│  ├─ package.json
│  ├─ index.html                #основной html в который монтируется main.ts
│  ├─ package-lock.json
│  └─ vite.config.ts
├─ backend/
│  ├─ main.py                   # FastAPI точка входа 
│  ├─ models.py                 # модели БД
│  ├─ routers/                  #роутеры
│  │   └─ exampleRouter.py
│  └─ database.py             
├─ TODO-List.md
└─ README.md
```

Аласталоба лоба
