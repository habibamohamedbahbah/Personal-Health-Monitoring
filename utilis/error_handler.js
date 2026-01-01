export function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

export function clearError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.style.display = 'none';
    }
}

export function handleApiError(error, defaultMessage = 'An error occurred') {
    console.error('API Error:', error);
    const message = error.response?.data?.message || error.message || defaultMessage;
    return { success: false, error: message };
}
