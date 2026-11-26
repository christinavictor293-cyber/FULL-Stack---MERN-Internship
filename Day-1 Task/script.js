const updateBanner = (message, color) => {
    let banner = document.getElementById("banner");
    banner.innerHTML = message;
    banner.style.backgroundColor = color;
};

function checkStatus() {

    updateBanner("System is Checking...", "yellow");

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let online = true;

            if (online)
                resolve();
            else
                reject();
        }, 2000);
    });

    promise
        .then(() => updateBanner("System is Online", "green"))
        .catch(() => updateBanner("System is Offline", "red"));
}
