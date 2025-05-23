# Запуск приложения
Перейти в корневую папку проекта и выполнить команду 
./start.sh
## Использование
Клиентская часть доступна по 
```http://localhost:3000```\
Панель администратора доступна по ```http://localhost:8080```



# Спецификация API
- Метод GET
- URL:/products

Описание: вывод товаров

Ответ:
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

- Метод POST 
- URL:/add

Описание: добавлние товара

Тело запроса:
```
{
    "name": "Новый товар",
    "price": 100,
    "description": "Описание товара",
    "categories": ["Категория1", "Категория2"]
}
```
Ответ:
```
{
    "message": "Товар добавлен",
    "id": 6
}
```

- Метод PUT
- URL:/edit

Описание: обновление товара

Тело запроса:
```
{
    "id": 6,
    "name": "Обновлённый товар",
    "price": 150,
    "description": "Новое описание товара",
    "categories": ["Категория1", "Категория3"]
}
```
Ответ:
```
{
    "message": "Товар обновлен"
}
```

- Метод DELETE
- URL:/delete?id=6

Описание: удаление товара

Тело запроса:
Ответ:
```
{
    "message": "Товар удален"
}
```
