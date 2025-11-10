const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
    Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            const notification = new Notification("Start Reminder", {
                body: "You clicked the start button!",
                icon: "waterDrop.png"
            })

            notification.addEventListener("error", e=>{
                alert("error")
            })
        } else if (perm === "denied") {
            alert("Notification permission was denied.")

        }
    })
})

let notification
let interval
document.addEventListener("visibilitychange", () => {
    if(document.visibilityState === "hidden") {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
        // const leaveDate = new Date()
        // interval = setInterval(() => {
        //     notification = new Notification("Remember to Drink Your Water!", {
        //         body: `You have been away for ${
        //             Math.round((new Date() - leaveDate) / 1000
        //         )} seconds.`,
        //         tag: "Come Back",
        //         icon: "waterDrop.png"
        //     })
        // }, 100)
        const timeout = 5000
        setTimeout(() => {
            notification = new Notification("Remember to Drink Your Water!", {
                body: `You have been away for ${
                    Math.round(timeout / 1000
                )} seconds.`,
                tag: "Come Back",
                icon: "waterDrop.png"
            })
        }, 5000)
    } else {
        // if (inteval) clearInterval(interval)
        if (notification) notification.close()
    }
})