
// 1. 以Template宣告牌卡
// 2. 宣告Modal
// 3. 以AJXA讀取LOL JSON資料 -請優先用fetch指令, 其次是XHR [https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json](https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json)
// 4. let imgUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${keyname}_0.jpg`
// 5. 將陣列資料設定到Card牌卡中
// 6. 每個牌卡, 點<詳細>按鈕要彈出Modal, (1) Title (2)英雄圖片 (3)各種數值

//宣告
let url = 'https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json'

//DOM
const row = document.querySelector('.row')
const heroCard = document.querySelector('#heroCard')

const infoModal = document.querySelector('#infoModal')
const videoModal = document.querySelector('#videoModal')


window.onload = function () {
    requestJSON()
}


//function

function requestJSON() {
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            let heroObj = response.data
            let heroArr = Object.keys(heroObj)
            //['Aatrox', 'Ahri',...]

            let num = 0
            heroArr.forEach((hero, index) => {
                let InfoObj = heroObj[hero]
                let blurb = `${InfoObj.blurb}`.substring(0, 55)


                let info = ''
                console.log(Object.entries(InfoObj.info))
                Object.entries(InfoObj.info).forEach(el => {
                    info += `${el[0]} : ${el[1]} <br>`
                })
                num++
                showCard(num, `${InfoObj.id}-${InfoObj.name}`, `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hero}_0.jpg`, `${blurb}...`, `${InfoObj.title}`, info)

            })


        })
        .catch((response) => {
            console.log(response)
        })
        .finally()
}

function showCard(num, name, imgUrl, blurb, title, info) {
    let cardClone = heroCard.content.cloneNode(true)

    cardClone.querySelector('.num').innerText = `${num}.`
    cardClone.querySelector('#cardImg').src = imgUrl
    cardClone.querySelector('#cardTitle').innerText = name
    cardClone.querySelector('#cardText').innerText = blurb

    cardClone.querySelector('#moreBtn').addEventListener('click', function () {
        bootstrap.Modal.getOrCreateInstance(infoModal).show()
        showMoreInfo(title, imgUrl, info)

    })
    cardClone.querySelector('#videoBtn').addEventListener('click', function () {
        bootstrap.Modal.getOrCreateInstance(videoModal).show()
        showVideo(name)
    })

    row.appendChild(cardClone)
}

function showMoreInfo(title, imgUrl, info) {
    document.querySelector('.info-title').innerText = title
    document.querySelector('.info-img').src = imgUrl
    document.querySelector('.info-p').innerHTML = info
}

function showVideo(name) {
    document.querySelector('.video-title').innerText = name
}
