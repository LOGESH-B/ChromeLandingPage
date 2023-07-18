var formdis = false
document.onload = featchdata();
async function featchdata() {
    var lsdata = JSON.parse(await localStorage.getItem("data"))
    lsdata = lsdata == null ? [] : lsdata
    let ele = ""
    lsdata.forEach(element => {
        ele += `<li class='items' ><a href='${element.url}' ><div class="qlink" style="background-image: url('${element.img}');"
         ></div><p>${element.title}</p></a></li>`
    });
    ele += '<li><div class=" qlink-add" onclick="addfunc()">+</div></li>'
    document.getElementsByTagName("ul")[0].innerHTML = ele
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