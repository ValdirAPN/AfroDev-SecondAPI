const listaCompras = {
    batata: 13,
    sabao: 3,
    abobrinha: 5,
    toalha: 1,
    cenoura: 8,
    balas: 10,
    xuxu: 0
}

const sleep = (time, callback) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(callback)
        }, time)       
    })
}

const pegar = (item) => {
    return sleep(5000, listaCompras[item])
}

const looping = async () => {
    console.log('Começou')
    for (let item in listaCompras) {
        let quantidade = await pegar(item)
        console.log(item, quantidade)
    }
    console.log('Terminou')
}

looping();