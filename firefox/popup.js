document.addEventListener("DOMContentLoaded", function () {
    const filterButton = document.getElementById('filterButton');

    filterButton.addEventListener('click', function () {
        // Get the user-provided substring
        const substring = document.getElementById('searchString').value;

        // Send a message to the active tab's content script
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            if (tabs[0].id) {
                browser.tabs.sendMessage(tabs[0].id, {
                    action: 'filterOptions',
                    substring: substring
                });
            }
        });
    });
});
