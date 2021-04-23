import * as map from "./map.js"

export function move(direction) {

    /**
     * 移动的过程
     *  1.判断下一步的信息是什么
     *      1)是墙 则不能移动
     *      2)是空白可以移动
     *      3)是箱子
     *          a：如果箱子跟玩家方向相同的下一步信息是墙同样不能移动
     *          b：如果箱子跟玩家方向相同的下一步信息是空白则可以移动
     * 2.移动的本质：
     *   在可移动的前提下，交换两个位置的信息
     *   修改地图数组的内容
     */


    const playerPoint = getPlayerInfo();
    const nextInfo = getNextInfo(playerPoint.row, playerPoint.col, direction);
    if(nextInfo.value == map.WALL){
        return false;
    }else if(nextInfo.value == map.SPACE){
        exChange(playerPoint,nextInfo)
        return true;
    }else if(nextInfo.value == map.BOX){
        const boxNextInfo = getNextInfo(nextInfo.row,nextInfo.col,direction);
        if(boxNextInfo.value == map.SPACE){
            //1.箱子与箱子下一个位置交换
            exChange(boxNextInfo,nextInfo)
            //2.玩家与箱子交换
            exChange(playerPoint,nextInfo)
            return true;
        }else{
           return false
        }
    }
}

export function isWin(){
    for (const item of map.correct) {
        if(map.mapContent[item.row][item.col] != map.BOX){
            return false
        }
    }   
    return true 
}





//先得获取玩家的位置信息
function getPlayerInfo() {
    for (let row = 0; row < map.rowLength; row++) {
        for (let col = 0; col < map.colLength; col++) {
            if (map.mapContent[row][col] == map.player) {
                return {
                    row,
                    col
                }
            }
        }
    }
    throw new Error('居然没有玩家')
}

//获取某个方向下一个的位置信息
/**
 * 
 * @param {*} row 横坐标
 * @param {*} col 纵坐标
 * @param {*} direction 方向 left right up down
 */
function getNextInfo(row, col, direction) {
    
    if (direction == "left") {
        return {
            row: row,
            col: col - 1,
            value : map.mapContent[row][col - 1]

        }
    }
    if (direction == "right") {
        return {
            row: row,
            col: col + 1,
            value : map.mapContent[row][col + 1]

        }
    }
    if (direction == "up") {
        return {
            row: row - 1,
            col: col,
            value : map.mapContent[row - 1][col]

        }
    }
    if (direction == "down") {
        return {
            row: row + 1,
            col: col,
            value : map.mapContent[row + 1][col]

        }
    }
}

function exChange(p1,p2){
    const temp = map.mapContent[p1.row][p1.col];
    map.mapContent[p1.row][p1.col] = map.mapContent[p2.row][p2.col];
    map.mapContent[p2.row][p2.col] = temp;
}
