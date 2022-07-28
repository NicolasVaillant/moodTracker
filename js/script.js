//JS FILE

let array = []
window.onload = function (){
    getYear()
}

window.onscroll = function (){
    const calendar_year_label = document.querySelector('.calendar-year-label')
    const current_month = document.querySelector('.current-month')
    const title_calendar = document.querySelector('.title-calendar')
    const current_month_label = document.querySelector('.current-month-label')

    if(window.scrollY >= calendar_year_label.offsetTop){
        current_month.classList.add("show-element")
    }
    if(window.scrollY <= title_calendar.offsetTop){
        current_month.classList.remove("show-element")
    }

    if(window.scrollY >= array[0].offsetTop &&
        window.scrollY <= array[1].offsetTop){
        current_month_label.innerHTML = "Février"
    }else if(window.scrollY >= array[1].offsetTop &&
        window.scrollY <= array[2].offsetTop){
        current_month_label.innerHTML = "Mars"
    }else if(window.scrollY >= array[2].offsetTop &&
        window.scrollY <= array[3].offsetTop){
        current_month_label.innerHTML = "Avril"
    }else if(window.scrollY >= array[3].offsetTop &&
        window.scrollY <= array[4].offsetTop){
        current_month_label.innerHTML = "Mai"
    }else if(window.scrollY >= array[4].offsetTop &&
        window.scrollY <= array[5].offsetTop){
        current_month_label.innerHTML = "Juin"
    }else if(window.scrollY >= array[5].offsetTop &&
        window.scrollY <= array[6].offsetTop){
        current_month_label.innerHTML = "Juillet"
    }else if(window.scrollY >= array[6].offsetTop &&
        window.scrollY <= array[7].offsetTop){
        current_month_label.innerHTML = "Août"
    }else if(window.scrollY >= array[7].offsetTop &&
        window.scrollY <= array[8].offsetTop){
        current_month_label.innerHTML = "Septembre"
    }else if(window.scrollY >= array[8].offsetTop &&
        window.scrollY <= array[9].offsetTop){
        current_month_label.innerHTML = "Octobre"
    }else if(window.scrollY >= array[9].offsetTop &&
        window.scrollY <= array[10].offsetTop){
        current_month_label.innerHTML = "Novembre"
    }else if(window.scrollY >= array[10].offsetTop &&
        window.scrollY <= array[11].offsetTop){
        current_month_label.innerHTML = "Décembre"
    }else{
        current_month_label.innerHTML = "Janvier"
    }


}

function getYear(){
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const json = JSON.parse(this.responseText)
            const current_year = json.current.year
            const max_days = json.current.days

            initCalendar()

            Object.entries(json.current.month).forEach(
                (month) =>
                    moodCalendar(
                        current_year, max_days, month[1].days, month[1].uid
                    )
            )
        }
    };
    request.open("GET", `https://stuff.nicolasvaillant.net/moodTracker/php/public/get_current_year.php`, true);
    request.send();
}

function getMoods(){
    const calendar_container_day = document.querySelectorAll('.calendar_container_day')
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const json = JSON.parse(this.responseText)
            for (let i = 0; i < json.length; i++) {
                const mood = json[i].mood
                const date = json[i].date

                const day = date.split("/")[0]
                const month = date.split("/")[1]

                for (let j = 0; j < calendar_container_day.length; j++) {
                    const label = calendar_container_day[j].querySelector('p')
                    if(label.innerText === day){
                        if(stack[mood] === stack.triste || stack[mood] === stack.fatigue || stack[mood] === stack.saoule){
                            label.style.color = "white"
                        }
                        calendar_container_day[j].style.background = stack[mood]
                    }
                }
            }
        }
    };
    request.open("GET", `https://trip.nicolasvaillant.net/php/get_mood.php`, true);
    request.send();
}

const stack = {
    "content" : "#61e18b",
    "incroyable" : "#e7a646",
    "normal" : "#61e1d6",
    "mauvais" : "#959897",
    "fatigue" : "#33754c",
    "triste" : "#521d93",
    "enerve" : "#f34949",
    "stresse" : "#eee75a",
    "saoule" : "#102825"
}

const defaultColor = "#ffffff"
const calendar = document.querySelector('.calendar-year')

function initCalendar(){
    for (let i = 1; i < 6; i++) {
        const days = document.createElement('div')
        days.classList.add('mood-days')
        calendar.appendChild(days)
    }
}

function moodCalendar(current_year, max_days, days, uid){

    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    for (let i = 1; i < days + 1; i++) {
        const days = document.createElement('div')
        days.classList.add('mood-days')
        days.setAttribute("uid", uid)
        const days_label = document.createElement('p')
        days_label.classList.add('mood-days-inner')

        // if(month <= uid){
        //     days.setAttribute("date", "after")
        //     if(day <= i){
        //         days.setAttribute("date", "after")
        //     }
        // }else{
        //     days.setAttribute("date", "before")
        // }

        if(i === 24){
            days.setAttribute("offset", "24")
            array.push(days)
        }

        days_label.innerHTML = i.toString()
        days.appendChild(days_label)
        calendar.appendChild(days)
    }
}


