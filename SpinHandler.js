const canvas = document.getElementById("myCanvas");
const canvasW = canvas.width;
const canvasH = canvas.height;
const ctx = canvas.getContext("2d");
let isClosePopUp = false;
let isInfoPopUp = false;
var NameData = [];
var DateData = [];
var ItemsData = [];

// Define the number of segments and their labels
const numSegments = 12;
const segmentLabels = [
    ["Nước ĐTHT", "Lon Nice"],// 0->20 20%
    ["Stronger", "Stronger"],// 20->40 20%
    ["Yến Lon", "Yến Lon"],// 40->60 20%
    ["Canh ĐTHT", "Canh Rau"],//60->70 10%
    ["Cháo ĐTHT", "Cháo"],//70->80 10%
    ["Hũ Kid", "Hũ Yến Kid"],//80->85 5%
    ["Hũ Yến", "Yến"],//85->90 5%
    ["Hũ Kiêng", "Hũ Yến Kiêng"],//90->95 5%
    ["Bánh ĐTHT", "Bánh"],//95->97 2%
    ["Bột ĐTHT", "Bột"],//97->99 2%
    ["Hộp Yến", "Hộp Yến"],//99->99.5 0.5%
    ["Khô 10g", "Khô"]//99.5->100 0.5%
];
const fullLabels = [
    "01 Nước Đông Trùng Hạ Thảo Nice",
    "01 Nước Đông Trùng Hạ Thảo Vị Chanh Stronger",
    "01 Nước Đông Trùng Hạ Thảo Yến HT+",
    "01 Canh Rau Dược Liệu Đông Trùng Hạ Thảo",
    "01 Cháo Dược Liệu Đông Trùng Hạ Thảo",
    "01 Hũ Đông Trùng Hạ Thảo Yến Kid",
    "01 Hũ Đông Trùng Hạ Thảo Yến HT+",
    "01 Hũ Đông Trùng Hạ Thảo Yến Kiêng",
    "01 Bánh Đông Trùng Hạ Thảo",
    "01 Bột Dinh Dưỡng Đông Trùng Hạ Thảo",
    "01 Hộp Đông Trùng Hạ Thảo Yến",
    "01 Đông Trùng Hạ Thảo Sấy Thăng Hoa 10g"
]
//initialize
let i = 0;
const img = new Image();

img.src = "Images/Wheel.png";
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvasW, canvasH);
    function showInfoPopUp() {
        const info_pop_up = document.getElementById('info-pop-up');

        info_pop_up.classList.remove('d-none');
        isInfoPopUp = true;
        setTimeout(() => {
             document.querySelector('#info-pop-up input').focus();
         }, 500);
    }
    function getRandomFloat(min, max, decimals) {
        const str = (Math.random() * (max - min) + min).toFixed(decimals);

        return parseFloat(str);
    }
    function chances(i) {
        if (i >= 0 && 20 > i) return 0;
        else if (i >= 20 && 40 > i) return 1;
        else if (i >= 40 && 60 > i) return 2;
        else if (i >= 60 && 70 > i) return 3;
        else if (i >= 70 && 80 > i) return 4;
        else if (i >= 80 && 85 > i) return 5;
        else if (i >= 85 && 90 > i) return 6;
        else if (i >= 90 && 95 > i) return 7;
        else if (i >= 95 && 97 > i) return 8;
        else if (i >= 97 && 99 > i) return 9;
        else if (i >= 99 && 99.5 > i) return 10;
        else if (i >= 99.5 && 100 > i) return 11;
    }
    function removeStartSpace(str) {
        for (let i = 0; i < str.length; i++) {
            if (str[i] != ' ') return str.slice(i);
        }
        return '';
    }

    let isAnimating = false;
    let totalRotation = 0;
    let numRounds = 1;
    let animationId = null;
    let today, date, time, CustomerName;

    function rotateCanvas() {
        today = new Date();
        date = String(today.getDate()).padStart(2, '0') + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + today.getFullYear();
        time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0');

        window.addEventListener('keypress', checkKeyPress);
        document.querySelector('#wheel-container #center').addEventListener('click', checkState);
        canvas.addEventListener('click', checkState);

        if (!isAnimating) {
            isAnimating = true;
            const start = performance.now();
            let targetSegment = chances(getRandomFloat(0, 99.9, 1));
            // console.log(targetSegment);
            function animate(currentTime) {
                let elapsedTime = currentTime - start;
                let rotationAngle = elapsedTime / 1500 * 360; // calculate rotation angle in degrees
                totalRotation = rotationAngle;
                ctx.save();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(totalRotation * Math.PI / 180);    
                ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvasW, canvasH  );
                ctx.restore();
                console.log(totalRotation);
                if (totalRotation >= 720 + 30 * (11-targetSegment+1)) {
                    setTimeout(()=>{
                        cancelAnimationFrame(animationId);
                        isAnimating = false;
                        console.log(`you have won the ${segmentLabels[targetSegment][0]}`)
                        addItemToRewardList(fullLabels[targetSegment]);
                        showPopUp(fullLabels[targetSegment], segmentLabels[targetSegment][1]);
                        window.addEventListener('keypress', checkKeyPress);
                        document.querySelector('#wheel-container #center').addEventListener('click', checkState);
                        canvas.addEventListener('click', checkState);
                        return;
                    },3000);
                }
                else {
                    animationId = requestAnimationFrame(function (currentTime) {
                        animate(currentTime);
                    });
                }
            }
            animationId = requestAnimationFrame(function (currentTime) {
                animate(currentTime);
            });
        }
    }

    function drawSegments() {
        // for (let i = 0; i < numSegments; i++) {
        //     ctx.beginPath();
        //     ctx.rotate(30 * Math.PI / 180);
        //     ctx.arc(0, 0, 375, 0, 30 * Math.PI / 180, false);
        //     ctx.lineTo(0, 0);
        //     ctx.closePath();
        //     ctx.fillStyle = (i % 2 === 0 ? "#a11d21" : "green");
        //     ctx.fill();

        //     const tempCanvas = document.createElement('canvas');
        //     tempCanvas.width = 500;
        //     tempCanvas.height = 50;
        //     const CtxTemp = tempCanvas.getContext('2d');
        //     CtxTemp.translate(50, 25);
        //     CtxTemp.rotate(Math.PI * 15 / 180);
        //     CtxTemp.fillStyle = "white";
        //     CtxTemp.textAlign = "center";
        //     CtxTemp.font = "bold 20px Roboto";
        //     CtxTemp.fillText(segmentLabels[i][0], 0, 0);
        //     ctx.drawImage(tempCanvas, 610 - canvas.width / 2, 425 - canvas.height / 2);
        // }
    }


    let list_num = 0;
    function addItemToRewardList(list) {
        let ItemsList = document.querySelectorAll('#Top10Rewards #RewardsContainer #Items li');
        let NameList = document.querySelectorAll('#Top10Rewards #RewardsContainer #Name li');
        let DateList = document.querySelectorAll('#Top10Rewards #RewardsContainer #Date li');
        for (let i = 9; i > 0; i--) {
            ItemsList[i].innerHTML = ItemsList[i - 1].innerHTML;
            NameList[i].innerHTML = NameList[i - 1].innerHTML;
            DateList[i].innerHTML = DateList[i - 1].innerHTML;
        }
        ItemsList[0].innerHTML = list;
        NameList[0].innerHTML = CustomerName;
        DateList[0].innerHTML = date + ' ' + time;

        ItemsData.push(list);
        NameData.push(CustomerName);
        DateData.push(date + ' ' + time);

    }
    function showPopUp(items, imgLink) {
        isClosePopUp = true;

        const close_pop_up = document.getElementById('close-pop-up');
        const item = document.querySelector('#close-pop-up #ItemsAlert');
        let items_img = document.querySelector('#close-pop-up img');


        items_img.src = `Images/HinhSanPham/${imgLink}.png`;
        item.innerHTML = `Bạn đã nhận được ${items}! `;
        close_pop_up.classList.remove('d-none');
    }
    function hidePopUp() {
        isClosePopUp = false;
        isInfoPopUp = false;

        const close_pop_up = document.getElementById('close-pop-up');
        const info_pop_up = document.getElementById('info-pop-up');

        close_pop_up.classList.add('d-none');
        info_pop_up.classList.add('d-none');
    }

    function checkState() {
        const input = document.querySelector('#info-pop-up input');
        if (isInfoPopUp && !isClosePopUp) {

            if (removeStartSpace(input.value) == '') return;
            else {
                //Save Data Here
                input.value = removeStartSpace(input.value);
                CustomerName = input.value;

                hidePopUp();
                rotateCanvas();
            }
        }
        else if (isClosePopUp && !isInfoPopUp) {
            input.value = '';

            hidePopUp();
            showInfoPopUp();
        }
    }

    function checkKeyPress(e) {
        if (e.keyCode == 13) {
            checkState();
        }
    }

    window.addEventListener('keypress', checkKeyPress);
    document.querySelector('#wheel-container #center').addEventListener('click', checkState);
    canvas.addEventListener('click', checkState);
    document.querySelector('#info-pop-up>div').addEventListener('click',checkState);
    document.querySelector('#close-pop-up>div').addEventListener('click',checkState);
    showInfoPopUp();
}
