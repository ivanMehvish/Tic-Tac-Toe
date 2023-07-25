        const menu=document.querySelector("#modeSelect")
        const cellc=document.getElementById("cellContainer")
        const cells = document.querySelectorAll(".cell");
        const stat = document.querySelector("#stat");
        const wincombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        let twoPlayer = true;
        let cpu = false;
        let running = false;
        let gameWon = false;
        let currentplayer = "X";
        let options = ["", "", "", "", "", "", "", "", ""];
        var restart = document.getElementById("restart");
        restart.addEventListener("click", restartGame);
        var vc= document.getElementById("vcpu");
        vc.addEventListener("click",vsCpu);
        var vh= document.getElementById("player");
        vh.addEventListener("click",vHuman)
        
        startGame();
        function restartGame() {
            vc.disabled=false;
            vh.disabled=false;
            running = true;
            gameWon = false;
            currentplayer = "X";
            options = ["", "", "", "", "", "", "", "", ""];
            cells.forEach((cell) => {
                cell.innerHTML = "";
            });
            stat.textContent = "";
            menu.style.opacity=100;
            cellc.style.opacity=0;
            restart.style.opacity=0;
            startGame();
        }

        function startGame() {
            // restart.style.opacity=100;
            menu.style.height=0;
            vc.addEventListener("click",vsCpu);
            vh.addEventListener("click",vHuman);
            console.log("started");
            cells.forEach((cell) => cell.addEventListener("click", onClickCell));
            running = true;
           
        }

        function onClickCell() {
            vc.removeEventListener("click",vsCpu);
            vh.removeEventListener("click",vHuman);
            const cellIndex = this.getAttribute("cellid");
            if (options[cellIndex] !== "" || !running) {
                return;
            }
            updateCell(this, cellIndex);
            checkWin();
            if(!twoPlayer) cpuMove();
        }

        function updateCell(cell, index) {
            if(!twoPlayer){
            options[index] = "X";
            cell.textContent = "X";
            }
            else{
                options[index] = currentplayer;
            cell.textContent = currentplayer;
            }
        }

        function change() {
            if (currentplayer === "X") {
                currentplayer = "O";
                cpu=true;
            } 
            else if (currentplayer === "O") {
                currentplayer = "X";
                cpu=false;
            }
        }

        function checkWin() {
            for (let i = 0; i < wincombos.length; i++) {
                const condition = wincombos[i];
                const A = options[condition[0]];
                const B = options[condition[1]];
                const C = options[condition[2]];

                if (A === "" || B === "" || C === "") {
                    continue;
                }

                if (A === B && B === C && C === A) {
                    gameWon = true;
                    running = false;
                    stat.textContent = `${A} WINS`;
                    return;
                }
            }

            if (!options.includes("")) {
                gameWon = true;
                running = false;
                stat.textContent = "DRAW";
            } 
            else{
                change();
            }
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

       
        function cpuMove() {
               var move=0;
               var flag=0;
            if(currentplayer==="O"){
                for(var i=0; i<wincombos.length; i++){
                    const c= wincombos[i];
                    const p= options[c[0]];
                    const q= options[c[1]];
                    const r= options[c[2]];

                    if(p==q && q!="" && r==""){
                         move=c[2];
                         cells[move].innerHTML = "O";
                         options[move] = "O";
                         flag=1
                         break;
                    }
                    else if(q==r && r!="" && p==""){
                        move=c[0];
                        cells[move].innerHTML = "O";
                        options[move] = "O";
                        flag=1
                        break;
                       
                    }
                    else if(p==r && p!="" && q==""){
                        move=c[1];
                        cells[move].innerHTML = "O";
                        options[move] = "O";
                        flag=1
                        break;
                    }
                    else if(flag===0){
                        move = getRandomInt(9);
                        while (options[move] !== "") {
                            move = getRandomInt(9);
                        }
                        cells[move].innerHTML = "O";
                        options[move] = "O";
                        flag=0
                        break;
                    }
                }
                
            }
            checkWin();
        }
        
        function vsCpu(){
            vc.disabled=true;
            vh.disabled=true;
             menu.style.opacity=0;
             cellc.style.opacity=100;
             restart.style.opacity=100;
             twoPlayer=false;
        }

        function vHuman(){
            vc.disabled=true;
            vh.disabled=true;
            menu.style.opacity=0;
            restart.style.opacity=100;
            twoPlayer=true;
            cellc.style.opacity=100;
            console.log("started");
        }