

document.addEventListener("DOMContentLoaded", function() {
	const navbar = document.querySelector('.navbar');
	const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navLinks = document.querySelectorAll('.nav-link:not([href^="assets/"], [href^="https"])');
	const mainBtns = document.querySelectorAll('.btn:not([href^="assets/"], [href^="blog"], [href^="https"], #contactForm button)');


	function isMobile() {
		return window.innerWidth <= 480;
	}
	
	
	function updateNavbarScrollThreshold() {
    let scrollThreshold;
    if (window.innerWidth > 480) {
        scrollThreshold = window.innerHeight * 0.8; // 80% for most screens
    } else {
		scrollThreshold = window.innerHeight * 0.6; // 60% for smallest screens
	}

    return scrollThreshold;
}


	
    // Navbar functionality

	//Hamburger menu toggle
	hamburgerMenu.addEventListener('click', function() {
		navbar.classList.toggle('active'); //Toggle the active class on the Navbar
		this.classList.toggle('active');   //Toggle the active class on the hamburger icon
	});
	
	window.addEventListener('scroll', function() {
	const scrollThreshold = updateNavbarScrollThreshold();

    if (window.scrollY > scrollThreshold) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
});


    // Smooth scrolling for main buttons (e.g., About, Experience, Blog, Contact)
    mainBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // If on mobile, hide the mobile navbar when a section is clicked
                if (isMobile()) {
                    navbar.classList.remove('active'); // Hide the mobile navbar
                }
            } else {
                console.error('Target element not found:', targetId);
            }
        });
    });

    // Smooth scrolling for navbar links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                console.error('Target element not found:', targetId);
            }
			
			if (isMobile()) {
                navbar.classList.remove('active'); // Hide the mobile navbar
            }
        });
    });

    // Smooth scrolling for Home Link (Top)
    const homeLink = document.querySelector('.navbar a[href="#top"]');
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
		
		// If on mobile, hide the mobile navbar when "Top" is clicked
        if (isMobile()) {
            navbar.classList.remove('active'); // Hide the mobile navbar
            hamburgerMenu.classList.remove('active'); // Hide the hamburger icon
        }
    });


    // ###############################
    // Contact Form Functionality
    // ###############################
    
	const form = document.getElementById('contactForm');	

    if (!form) {
        console.error('Contact form not found!');
        return;
    }

    const nameField = form.querySelector('#name');
    const emailField = form.querySelector('#email');
    const messageField = form.querySelector('#message');
	
	
	// Function to check the time of last form submission
function checkLastSubmission() {
    const lastSubmissionTime = localStorage.getItem("lastSubmissionTime");
    const currentTime = Date.now();
	
	// If there is no record of last submission, allow submission
    if (!lastSubmissionTime) {
        return true; // Allowed to submit
    }
	
	const elapsedTime = currentTime - parseInt(lastSubmissionTime);
    const sixHoursInMillis = 6 * 60 * 60 * 1000;
	
	    if (elapsedTime >= sixHoursInMillis) {
        return true; // Allowed to submit
    } else {
        // Time remaining in milliseconds
        const timeRemaining = sixHoursInMillis - elapsedTime;
        return timeRemaining; // Return the time remaining if not allowed
    }
}
	
	
	
// Function to handle form submission
async function handleFormSubmission() {
	
	// Check if all fields are filled
    if (!nameField.value.trim() || !emailField.value.trim() || !messageField.value.trim()) {
        showToast("Please fill in all fields before submitting."); // Show an error message
        return; // Prevent submission if any field is empty
    }
	
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value)) {
        showToast("Please enter a valid email address.");
        return; // Prevent submission if email is invalid
    }
	
    const checkResult = checkLastSubmission();
	if (checkResult === true) {
    // Allowed to submit, proceed with form submission
    // You would add your API call here
	
	    const formData = {
            name: nameField.value,
            email: emailField.value,
            message: messageField.value,
        };
	
		try {
		const response = await fetch('[REDACTED API GATEWAY ENDPOINT URL]', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Origin': '[REDACTED ORIGIN HEADER OF WEBSITE],
			},
			body: JSON.stringify(formData),
		});

		const result = await response.json();

		if (response.ok) {
			console.log("Message sent successfully");
			showToast("Message sent successfully!");   // If allowed to submit & it works, show the success toast
			localStorage.setItem("lastSubmissionTime", Date.now());
		} else {
			console.error('Failed to send message:', result);
			alert('Failed to send message: ' + (result.error || 'Unknown error'));
			showToast("Uh oh, no idea what happened there...");  // If allowed to submit & it fails, show "idk bro" toast
		}
		} catch (error) {
			console.error('Error sending message:', error.message);
			alert('Error sending message: ' + error.message);
			showToast("An error occurred while sending the message.");
		}
	} else {
		// Not allowed to submit; show the remaining Time
		const timeRemaining = Math.ceil(checkResult / (60 * 1000)); // Convert to minutes
		showToast(`Slow down! You can send another message in ${timeRemaining} minutes.`);
	}
}

// Function to show the toast
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message; // Set the toast message
    toast.classList.add("show");
	
	// Hide the toast after 3s
    setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}

// Assuming this function is called when the form is submitted
document.getElementById("submitButton").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent actual form submission
    handleFormSubmission(); // Call the submission handler
});
});