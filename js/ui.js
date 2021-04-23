import * as map from "./map.js"

//需要用到的常量
const gameDom = document.querySelector("#game");
const domWidth = 45;
const domHeight = 45;
//设置游戏区域宽高
function setGameArae(){
    gameDom.style.width = domHeight * map.colLength + 'px'
    gameDom.style.height = domWidth * map.rowLength + 'px'

}

//根据地图信息设置页面元素
function setPage() {
    gameDom.innerHTML = '';
    for (let row = 0; row < map.rowLength; row++) {
        for (let col = 0; col < map.colLength; col++) {
            //创建一个div元素
            creatDom(row, col)
        }

    }

}
/**
 * 根据行列的位置，创建不同位置的div元素
 * @param {*} row 
 * @param {*} col 
 */
function creatDom(row, col) {
    
    const value = map.mapContent[row][col];
    let div = document.createElement('div');
    div.className = 'item';
    //设置div的宽高

    //根据位置不同设置div的位置
    div.style.left = col * domWidth + "px";
    div.style.top = row * domHeight + "px";

    //设置不同div的class
    //如果正确位置放的是箱子----让箱子变绿
    //如果正确位置是空白----为div加上边框
    if (value == map.player) {
        div.classList.add("player")
    } else if (value == map.WALL) {
        div.classList.add("wall")
    } else if (value == map.BOX) {
        if (isCorrect(row, col)) {
            div.classList.add("correct-box")
        } else {
            div.classList.add('box')
        }
    } else {
        if (isCorrect(row, col)) {
            div.classList.add('correct')
        } else {
            return
        }
    }


    //
    gameDom.appendChild(div)

}


function isCorrect(row, col) {
    let result = map.correct.find((item) => {
        return item.row == row && item.col == col
    })
    return result != undefined;
    // for (let index = 0; index < map.correct.length; index++) {
    //     const item = map.correct[index];
    //     if (row == item.row && col == item.col){
    //         return true
    //     }
    // }
    // return false
}



export default function () {
    setGameArae()
    setPage();

}