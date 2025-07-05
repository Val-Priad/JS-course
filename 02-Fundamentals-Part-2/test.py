def calc_age(birth_year):
    return 2037 - birth_year

person = {
    "firstName": "Valerii",
    "lastName": "Priadchenko",
    "age": 18,
    "jog": "unemployed",
    "calcAge": calc_age
}

print(person["calcAge"](2020))