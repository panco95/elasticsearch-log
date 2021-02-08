// 手动指定id插入数据
PUT test/_doc/1
{
    "name": "panco"
}

// 自动生成id插入数据
POST test/_doc
{
    "name": "panco"
}

// 插入数组(任何类型都支持多个数据->数组)
// 查询的时候只要查到一个，就会查询出数组的数据
PUT test/_doc/2
{
    "name": [
        "panco",
        "panco2",
        "panco3"
    ]
}

PUT test/_doc/3
{
    "name": "panco",
    "age": 22,
    "family": {
        "father": "mather",
        "mather": "father"
    }
}