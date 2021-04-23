import {move,isWin} from './paly.js'
import showUi from  "./ui.js"

showUi();
let over = false;
window.onkeydown = (e)=>{
    if(over){
        return;
    }
    let res = false;
    if(e.keyCode == 38){
        //上
       res = move('up')
    }else if(e.keyCode == 39){
        //右
       res = move('right')
    }else if(e.keyCode == 40){
        //下
       res = move('down')
    }else if(e.keyCode == 37){
        //左
       res = move('left')
    }
    showUi()
    if(res){
        
        console.log(1)
        if(isWin()){
            
            // alert('游戏胜利')
            over = true
            setTimeout(()=>{
                alert("游戏胜利")
            },0)
        }
    }
}