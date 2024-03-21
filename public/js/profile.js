const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const author = document.querySelector('#author').value.trim();

  
    if (title && content && author) {
      const response = await fetch(`/api/blog/post`, {
        method: 'POST',
        body: JSON.stringify({ "title" : `${title}`, "content" : `${content}`, "author" : `${author}`}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create project');
      }
    }
  };

document.querySelector('.form').addEventListener('submit', newFormHandler);