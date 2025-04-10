// Listen for messages from the extension popup
const defaultOptions = ["Skip deploy", "Last deployed", "Latest (from main)", "----------"];
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'filterOptions' && typeof message.substring === 'string') {

        // Build a CSS selector that targets immediate child <option> elements for specified select IDs
        const selector = "#job_meta_data_platform-version > option, " +
            "#job_meta_data_portal-version > option, " +
            "#job_meta_data_config-version > option, " +
            "#job_meta_data_content-version > option, " +
            "#job_meta_data_metrics-dashboards-version > option";

        // Select only the immediate child <option> elements of the target select tags
        const options = document.querySelectorAll(selector);

        options.forEach(option => {
            if (defaultOptions.includes(option.textContent)) {
                return; // Skip default options
            }

            // Remove the <option> element if its text content does not include the provided substring (case-sensitive), ignoring default options
            if (!option.textContent.includes(message.substring)) {
                option.remove();
            }
        });

        // Optionally, provide a response back to the popup
        sendResponse({ result: "Filtered options based on substring: " + message.substring });
    }

    // Return true to indicate asynchronous response if needed
    return true;
});
