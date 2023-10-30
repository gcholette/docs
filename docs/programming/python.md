# Python

## List Slicing
```python
lst = [0, 1, 2, 3, 4, 5, 6, 7]

lst[2:5]        # [start:end]              # [2, 3, 4]
lst[3:]         # [start:]                 # [3, 4, 5, 6, 7]
lst[:4]         # [:end]                   # [0, 1, 2, 3]
lst[-3:]        # [-take_from_end:]        # [5, 6, 7]
lst[:-2]        # [:-drop_from_end]        # [0, 1, 2, 3, 4, 5]
lst[3:-2]       # [start:-drop_from_end]   # [3, 4, 5]
lst[2:8:2]      # [start:end:step]         # [2, 4, 6] 
lst[::3]        # [::step]                 # [0, 3, 6]
lst[::-3]       # [::-step]                # [7, 4, 1]
```

## List comprehension
```python
[x for x in range(10)]
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

[x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

[x**2 if x % 2 == 0 else x**3 for x in range(10)]
# [0, 1, 4, 27, 16, 125, 36, 343, 64, 729]

[(x, y) for x in range(2) for y in range(3)]
# [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)]

[(x, y) for x in range(3) for y in range(3) if x != y]
# [(0, 1), (0, 2), (1, 0), (1, 2), (2, 0), (2, 1)]

nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
[x for sublist in nested_list for x in sublist]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Lambdas
```python
add = lambda x, y: x + y

xs = [1, 2, 3, 4]
list(map(lambda x: x**2, xs))
list(filter(lambda x: x % 2 == 0, xs))
```

## Bitwise operators
```python
a & b
a | b
a ^ b
~a
a << 1
a >> 1
```

## Dictionaries
```python
d = {
    'name': 'John',
    'age': 30
}

d['name']             # 'John'
d.get('age')          # 30
d.keys()              # ['name', 'age']
d.values()            # ['John', 30]
d.items()             # [('name', 'John'), ('age', 30)]
d['city'] = 'NYC'     # {'name': 'John', 'age': 30, 'city': 'NYC'}
```
