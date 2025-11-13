const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
    Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            const notification = new Notification("Start Reminder", {
                body: "You clicked the start button!",
                icon: "waterDrop.png"
            })
            setTimeout(() => { notification.close(); }, 5000);
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

// document.addEventListener("visibilitychange", () => {
//      if (Notification.permission !== "granted") {
//                 Notification.requestPermission();
//             }
    
//         if(document.visibilityState === "hidden") {
//             let wentBack = false
//             const timeout = 5000 //user define(drop down:25 min, 30 min, 1hr); default value
//             while (!wentBack) {
//                 setTimeout(() => {
//                     notification = new Notification("Remember to Drink Your Water!", {
//                         body: `You have been away for ${
//                             Math.round(timeout / 1000
//                         )} seconds.`,
//                         tag: "Come Back",
//                         icon: "waterDrop.png"
//                     })
//                 }, 5000)
//                 if (notification) notification.close();
//             }
//         } else {
//             if (notification) notification.close();
//             wentBack = true;
//         }
    
// })
document.addEventListener("visibilitychange", () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    if (document.visibilityState === "hidden") {
        const leaveDate = new Date();
        const timeout = 5000; // User-defined (e.g., dropdown: 25 min, 30 min, 1 hr); default value
        const interval = setInterval(() => {
            const currentDate = new Date();
            const notification = new Notification("Remember to Drink Your Water!", {
                body: `You have been away for ${Math.round((currentDate - leaveDate)/1000)} seconds.`,
                tag: "Come Back",
                icon: "waterDrop.png"
            });

            setTimeout(() => {
                notification.close();
            }, 3000);
        }, timeout);

        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                clearInterval(interval);
            }
        });
    }
});