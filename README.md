# Запуск приложения
## 1.Установка зависимостей
Перейти в корневую папку проекта и выполнить команду 
npm install
## 2.Запустить клиентский сервер
Открыть терминал и выполнить команду 
node catalog-server/server.js
## 3.Запустить панель администратора
Открыть второй терминал и выполнить команду 
node admin-server/server.js
## Использование
Клиентская часть доступна по 
```http://localhost:3000```\
Панель администратора доступна по ```http://localhost:8080```



# Спецификация API
- Метод GET
- URL:/products

Запрос:
```
[
  {
    "id": 1,
    "name": "Товар 1",
    "price": 100,
    "description": "Описание товара 1",
    "categories": [
      "Категория 1"
    ]
  },
  {
    "id": 2,
    "name": "Товар 2",
    "price": 200,
    "description": "Описание товара 2",
    "categories": [
      "Категория 1"
    ]
  },
  {
    "id": 3,
    "name": "Товар 3",
    "price": 300,
    "description": "Описание товара 3",
    "categories": [
      "Категория 2"
    ]
  }, ........
```
