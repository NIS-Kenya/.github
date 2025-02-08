import config from './config.js';

export async function handleFormSubmission(username, email) {
    try {
        // First verify if the GitHub username exists
        const githubUserResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!githubUserResponse.ok) {
            throw new Error('GitHub username not found');
        }

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: config.WEB3FORMS_ACCESS_KEY,
                github_username: username,
                email: email,
                subject: 'New THE NIS Kenya GitHub Membership Request',
                message: `New membership request from GitHub user: ${username} (${email})`
            })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Form submission error:', error);
        throw error;
    }
}
