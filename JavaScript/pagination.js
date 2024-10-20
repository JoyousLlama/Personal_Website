// Function to display blog post snippets for a given page
export function displayBlogPosts(page, blogPostsContainer, paginationContainer, filteredPosts) {
    const postsPerPage = 5; // Number of posts to show per page
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const blogPostsToDisplay = filteredPosts.slice(startIndex, endIndex);

    blogPostsContainer.innerHTML = ''; // Clear existing blog post snippets

    blogPostsToDisplay.forEach(post => {
        // Create and append blog post snippet elements
        const snippet = createBlogPostSnippet(post);
        blogPostsContainer.appendChild(snippet);
    });

    // Calculate total pages here
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    // Update pagination controls after displaying posts
    updatePaginationControls(page, totalPages, paginationContainer, blogPostsContainer, filteredPosts);
}

// Function to create a blog post snippet
export function createBlogPostSnippet(post) {
    const snippet = document.createElement('div');
    snippet.classList.add('blog-post-snippet');

    const link = document.createElement('a');
    link.href = post.url;
    link.style.textDecoration = 'none';
    link.classList.add('blog-snippet-link');

    const title = document.createElement('h3');
    title.classList.add('blog-title');
    title.textContent = post.title;

    const tagsContainer = document.createElement('div');
    tagsContainer.classList.add('blog-tags');
    post.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.classList.add('blog-tag');
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });

    const thumbnail = document.createElement('img');
    thumbnail.src = post.thumbnail;
    thumbnail.alt = 'Blog Thumbnail';
    thumbnail.classList.add('blog-thumbnail');

    const date = document.createElement('p');
    date.classList.add('blog-date');
    date.textContent = `Published on ${new Date(post.date).toLocaleDateString()}`;

    const description = document.createElement('p');
    description.classList.add('blog-description');
    description.textContent = post.description;

    link.appendChild(title);
    link.appendChild(tagsContainer);
    link.appendChild(thumbnail);
    link.appendChild(date);
    link.appendChild(description);

    snippet.appendChild(link);

    return snippet;
}

// Function to update the pagination controls
export function updatePaginationControls(currentPage, totalPages, paginationContainer, blogPostsContainer, filteredPosts) {
    paginationContainer.innerHTML = ''; // Clear existing pagination controls

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-btn');
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            displayBlogPosts(i, blogPostsContainer, paginationContainer, filteredPosts); // Ensure pagination respects filtered posts
			
		// Scroll near the top of the page
		const tagsContainer = document.getElementById('available-tags');
        tagsContainer.scrollIntoView({
            behavior: 'smooth', // Smooth scroll effect
            block: 'start' // Scroll to the top of the element
        });
			
        });
        paginationContainer.appendChild(button);
    }
}
