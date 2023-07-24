var formdis = false
document.onload = featchdata();
async function featchdata() {
    var lsdata = JSON.parse(await localStorage.getItem("data"))
    lsdata = lsdata == null ? [] : lsdata
    let ele = ""
    lsdata.forEach(element => {
        ele += `<li><a href='${element.url}' ><div class="qlink" style="background-image: url('${element.img}');" tooltip="${element.title}"></div></a></li>`
    });
    ele += '<li><div class=" qlink-add" onclick="addfunc()">+</div></li>'
    document.getElementsByTagName("ul")[0].innerHTML = ele
    patchDateTime();
}
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = `https://www.google.com/search?q=${document.getElementById('input').value}`;
})
const addfunc = () => {
    formdis = !formdis;
    document.getElementsByClassName("qlink-add")[0].style.transform = formdis ? "rotate(45deg)" : "rotate(0deg)"
    document.getElementById("addform").style.display = formdis ? 'block' : 'none';
}
document.getElementById("form1").addEventListener("submit", async (e) => {
    e.preventDefault();
    var f = new FormData(document.getElementById("form1"))
    let ls = JSON.parse(await localStorage.getItem("data"));
    ls = ls == null ? [] : ls
    console.log(ls)
    var data = {
        title: f.get("title"),
        img: f.get("img"),
        url: f.get("link")
    }
    ls.push((data))
    var a = JSON.stringify(ls)
    console.log(a)
    await localStorage.setItem("data", a);
    addfunc();
    location.reload()

})

let timeFormat = "railway";

function patchDateTime() {
    const everyMinute = 1000*60;
    performPatchDateTime();
    setInterval(() => {
        performPatchDateTime();
    }, everyMinute);
}

function performPatchDateTime() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
        const date = new Date();

        if(timeFormat == "standard") {
            console.log(date.getHours())
            if(date.getHours() == 0) {
                document.getElementById("systemTime").innerText = `${('0' + (date.getHours() + 12)).slice(-2)}:${('0' + date.getMinutes()).slice(-2)} AM`;
            }
            else if (date.getHours() == 12) {
                document.getElementById("systemTime").innerText = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)} PM`;
            }
            else if (date.getHours() >= 13) {
                document.getElementById("systemTime").innerText = `${('0' + (date.getHours() - 12)).slice(-2)}:${('0' + date.getMinutes()).slice(-2)} PM`;
            }
            else {
                document.getElementById("systemTime").innerText = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)} AM`;
            }
        }
        else {
            document.getElementById("systemTime").innerText = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
        }
        document.getElementById("systemDate").innerText = `${('0' + date.getDate()).slice(-2)}, ${monthNames[date.getMonth()]} ${days[date.getDay()]}`;
}

function swapTimeFormat() {
    if(timeFormat == "standard") {
        timeFormat = "railway"
    }
    else {
        timeFormat = "standard"
    }
    patchDateTime();
}