import { displayBlogPosts, updatePaginationControls, createBlogPostSnippet } from './pagination.js';

// Sample blog posts
const blogPosts = [
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]",
		url: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    },
    {
        title: "[REDACTED]",
        date: "[REDACTED]",
        thumbnail: "[REDACTED]",
        description: "[REDACTED]",
        tags: "[REDACTED]"
    }
];

let selectedTags = []; // Declare once globally

// Sort blog posts by date in descending order
blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Populate tags and filter blog posts on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    const tagsContainer = document.querySelector('.tags-container');
    const specialTagsContainer = document.querySelector('.special-tags-container');
    const blogPostsContainer = document.querySelector('.blog-posts-container');
    const paginationContainer = document.querySelector('.pagination-container');

    if (tagsContainer && specialTagsContainer && blogPostsContainer && paginationContainer) {
        // Get unique tags from blog posts
        const uniqueTags = [...new Set(blogPosts.flatMap(post => post.tags))];
        const filteredTags = uniqueTags.filter(tag => tag !== "Project" && tag !== "Other").sort();
        const specialTags = uniqueTags.filter(tag => tag === "Project" || tag === "Other");

        // Display the main tags
        filteredTags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('available-tag');
            tagElement.textContent = tag;
            tagElement.addEventListener('click', () => {
                tagElement.classList.toggle('selected');
                toggleTagSelection(tag); // Update selectedTags
                filterBlogPosts(); // Re-filter blog posts based on tags
            });
            tagsContainer.appendChild(tagElement);
        });

        // Display special tags
        specialTags.forEach(tag => {
            const specialTagElement = document.createElement('span');
            specialTagElement.classList.add('special-tag');
            specialTagElement.textContent = tag;
            specialTagElement.addEventListener('click', () => {
                specialTagElement.classList.toggle('selected');
                toggleTagSelection(tag); // Update selectedTags
                filterBlogPosts(); // Re-filter blog posts based on tags
            });
            specialTagsContainer.appendChild(specialTagElement);
        });

        // Select all tags by default
        const allTagElements = document.querySelectorAll('.available-tag, .special-tag');
        allTagElements.forEach(tagElement => {
            tagElement.classList.add('selected'); // Visually select all tags
        });
        selectedTags = [...uniqueTags]; // Start with all tags selected

        filterBlogPosts(); // This will call displayBlogPosts internally
    } else {
        console.error("Required elements are not found in the DOM.");
    }
});

// Toggle tag selection in the selectedTags array
function toggleTagSelection(tag) {
    if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag); // Remove tag
    } else {
        selectedTags.push(tag); // Add tag
    }
}

// Function to filter blog posts based on selected tags
function filterBlogPosts() {
    const blogPostsContainer = document.querySelector('.blog-posts-container');
    const paginationContainer = document.querySelector('.pagination-container');

    // Filter blog posts based on selected tags
    const filteredPosts = blogPosts.filter(post => {
        // If no tags are selected, show no posts
        if (selectedTags.length === 0) return false;
        return post.tags.some(tag => selectedTags.includes(tag)); // Match selected tags
    });

    // Call displayBlogPosts with filtered posts (first page)
    displayBlogPosts(1, blogPostsContainer, paginationContainer, filteredPosts);
}

// Export necessary functions and variables
export { blogPosts, displayBlogPosts, updatePaginationControls };
