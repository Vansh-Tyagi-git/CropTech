// Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Login Form Submission
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!email || !password) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate login process
            showMessage('Logging in...', 'info');
            
            // Simulate API call with timeout
            setTimeout(() => {
                // For demo purposes, any login works
                localStorage.setItem('croptech_user', JSON.stringify({
                    email: email,
                    name: email.split('@')[0]
                }));
                
                showMessage('Login successful! Redirecting...', 'success');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }, 2000);
        });
    }
    
    // Signup Modal
    const signupLink = document.getElementById('show-signup');
    const signupModal = document.getElementById('signup-modal');
    const closeBtn = document.querySelector('.close');
    
    if (signupLink && signupModal) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.style.display = 'flex';
        });
        
        closeBtn.addEventListener('click', function() {
            signupModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === signupModal) {
                signupModal.style.display = 'none';
            }
        });
    }
    
    // Signup Form Submission
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Simple validation
            if (!fullname || !email || !password || !confirmPassword) {
                showMessage('Please fill in all fields', 'error', true);
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'error', true);
                return;
            }
            
            if (!terms) {
                showMessage('Please agree to the Terms of Service', 'error', true);
                return;
            }
            
            // Simulate signup process
            showMessage('Creating your account...', 'info', true);
            
            // Simulate API call with timeout
            setTimeout(() => {
                // For demo purposes, any signup works
                localStorage.setItem('croptech_user', JSON.stringify({
                    email: email,
                    name: fullname
                }));
                
                showMessage('Account created successfully! Redirecting...', 'success', true);
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }, 2000);
        });
    }
    
    // Password strength meter
    const passwordInput = document.getElementById('signup-password');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Length check
            if (password.length >= 8) strength += 1;
            
            // Uppercase check
            if (/[A-Z]/.test(password)) strength += 1;
            
            // Lowercase check
            if (/[a-z]/.test(password)) strength += 1;
            
            // Number check
            if (/[0-9]/.test(password)) strength += 1;
            
            // Special character check
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            
            // Update UI based on strength
            let strengthText = '';
            let strengthColor = '';
            
            switch (strength) {
                case 0:
                case 1:
                    strengthText = 'Weak';
                    strengthColor = '#f44336';
                    break;
                case 2:
                case 3:
                    strengthText = 'Medium';
                    strengthColor = '#ff9800';
                    break;
                case 4:
                case 5:
                    strengthText = 'Strong';
                    strengthColor = '#4caf50';
                    break;
            }
            
            // Create or update strength indicator
            let strengthIndicator = document.getElementById('password-strength');
            
            if (!strengthIndicator) {
                strengthIndicator = document.createElement('div');
                strengthIndicator.id = 'password-strength';
                strengthIndicator.style.marginTop = '5px';
                strengthIndicator.style.fontSize = '0.8rem';
                this.parentNode.appendChild(strengthIndicator);
            }
            
            strengthIndicator.textContent = `Password strength: ${strengthText}`;
            strengthIndicator.style.color = strengthColor;
        });
    }
    
    // Show message function
    function showMessage(message, type, isSignup = false) {
        // Create message element if it doesn't exist
        let messageElement = document.querySelector(isSignup ? '.signup-message' : '.login-message');
        
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = isSignup ? 'signup-message' : 'login-message';
            messageElement.style.padding = '10px';
            messageElement.style.marginBottom = '15px';
            messageElement.style.borderRadius = '4px';
            messageElement.style.textAlign = 'center';
            
            // Insert at the top of the form
            const form = isSignup ? signupForm : loginForm;
            form.insertBefore(messageElement, form.firstChild);
        }
        
        // Set message and style based on type
        messageElement.textContent = message;
        
        switch (type) {
            case 'error':
                messageElement.style.backgroundColor = '#ffebee';
                messageElement.style.color = '#c62828';
                break;
            case 'success':
                messageElement.style.backgroundColor = '#e8f5e9';
                messageElement.style.color = '#2e7d32';
                break;
            case 'info':
                messageElement.style.backgroundColor = '#e3f2fd';
                messageElement.style.color = '#1565c0';
                break;
        }
        
        // Auto-hide success and info messages
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);
        }
    }
    
    // Check if user is already logged in
    const loggedInUser = localStorage.getItem('croptech_user');
    
    if (loggedInUser) {
        const userInfo = JSON.parse(loggedInUser);
        
        // Show welcome back message
        const loginHeader = document.querySelector('.login-header');
        
        if (loginHeader) {
            const welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'welcome-message';
            welcomeMessage.style.backgroundColor = '#e8f5e9';
            welcomeMessage.style.color = '#2e7d32';
            welcomeMessage.style.padding = '10px';
            welcomeMessage.style.borderRadius = '4px';
            welcomeMessage.style.marginBottom = '20px';
            welcomeMessage.textContent = `Welcome back, ${userInfo.name}! You're already logged in.`;
            
            const logoutButton = document.createElement('button');
            logoutButton.textContent = 'Logout';
            logoutButton.className = 'btn';
            logoutButton.style.backgroundColor = '#f5f5f5';
            logoutButton.style.color = '#333';
            logoutButton.style.marginTop = '10px';
            logoutButton.style.padding = '8px 16px';
            
            welcomeMessage.appendChild(document.createElement('br'));
            welcomeMessage.appendChild(logoutButton);
            
            loginHeader.appendChild(welcomeMessage);
            
            // Logout functionality
            logoutButton.addEventListener('click', function() {
                localStorage.removeItem('croptech_user');
                window.location.reload();
            });
        }
    }
});